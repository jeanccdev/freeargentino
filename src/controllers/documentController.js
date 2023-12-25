import express from 'express'
import multer from 'multer'
import authenticateToken from '../services/authenticateToken.js'
import Document from '../models/document.js'

const router = express.Router()
const upload = multer()

router.get('/getAllDocumentsEmployee/:employeeId', authenticateToken, async (req, res) => {
    const { employeeId } = req.params
    const documents = await Document.findAll({
        where: {
            employeeId: employeeId
        }
    })
    documents.length > 0 ? res.status(200).send(documents) : res.status(404).send(false)
})

router.get('/getPublicStudentDocuments/:studentId', authenticateToken, async (req, res) => {
    const { studentId } = req.params
    const documents = await Document.findAll({
        where: {
            studentId: studentId
        }
    })
    documents.length > 0 ? res.status(200).send(documents) : res.status(404).send(false)
})

router.get('/getPublicCourseDocuments/:courseId', authenticateToken, async (req, res) => {
    const { courseId } = req.params
    const documents = await Document.findAll({
        where: {
            courseId: courseId
        }
    })
    documents.length > 0 ? res.status(200).send(documents) : res.status(404).send(false)
})

router.get('/getPublicOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const document = await Document.findByPk(id)
    if (!document) {
        res.status(404).send({ message: 'Document not found' })
    }
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}.pdf"`)
    res.send(document.document)
})

router.post('/postAuth', authenticateToken, upload.single('pdf'), async (req, res) => {
    try {
        const { originalName, docType, studentId, courseId, employeeId } = req.body
        const { buffer } = req.file
        const document = await Document.create({
            originalName: originalName,
            docType: docType,
            studentId: studentId,
            courseId: courseId,
            employeeId: employeeId,
            document: buffer
        })

        res.json({ success: true, document })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: 'Erro no servidor' })
    }
})

router.patch('/patchAuth/:id', authenticateToken, upload.single('pdf'), async (req, res) => {
    const data = req.body
    const { id } = req.params
    const { buffer } = req.file
    const document = await Document.findByPk(id)
    document.set(data)
    buffer ? document.buffer = buffer : null
    await document.save()
    res.send({ id: document.id, originalName: document.originalName, docType: document.docType })
})

router.delete('/deleteAuth/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const document = await Document.findByPk(id)
    await document.destroy()
    res.send({ id: document.id, originalName: document.originalName, docType: document.docType })
})

export default router