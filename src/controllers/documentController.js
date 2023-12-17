import Document from '../models/document.js'

const documentGetAll = async (req, res) => {
    const documents = await Document.findAll({
        attributes: ['id', 'originalName', 'docType']
    })
    documents.length > 0 ? res.status(200).send(documents) : res.status(404).send({ message: 'No document found' })
}

const documentGetDocuments = async (req, res) => {
    const { id } = req.params
    const documents = await Document.findAll({
        where: {
            studentId: id
        }
    })
    documents.length > 0 ? res.status(200).send(documents) : res.status(404).send(false)
}

const documentGetOne = async (req, res) => {
    const { id } = req.params
    const document = await Document.findByPk(id)
    if (!document) {
        res.status(404).send({ message: 'Document not found' })
    }
    res.setHeader('Content-Type', 'application/pdf')
    res.send(document.document)
}

const documentInsertOne = async (req, res) => {
    try {
        const { originalName, docType, studentId } = req.body
        const { buffer } = req.file
        const document = await Document.create({
            originalName: originalName,
            docType: docType,
            studentId: studentId,
            document: buffer
        })

        res.json({ success: true, document })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: 'Erro no servidor' })
    }
}

const documentPatchOne = async (req, res) => {
    const data = req.body
    const { id } = req.params
    const { buffer } = req.file
    const document = await Document.findByPk(id)
    document.set(data)
    buffer ? document.buffer = buffer : null
    await document.save()
    res.send({ id: document.id, originalName: document.originalName, docType: document.docType })
}

const documentDeleteOne = async (req, res) => {
    const { id } = req.params
    const document = await Document.findByPk(id)
    await document.destroy()
    res.send({ id: document.id, originalName: document.originalName, docType: document.docType })
}

export { documentDeleteOne, documentGetAll, documentGetOne, documentGetDocuments, documentInsertOne, documentPatchOne }