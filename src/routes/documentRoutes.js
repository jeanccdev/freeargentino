import express from 'express'
import multer from 'multer'
import authenticateToken from '../services/authenticateToken.js'
import { documentDeleteOne, documentGetAll, documentGetDocuments, documentGetOne, documentInsertOne, documentPatchOne } from '../controllers/documentController.js'

const router = express.Router()
const upload = multer()

router.get('/getAll', authenticateToken, documentGetAll)
router.get('/getDocuments/:id', documentGetDocuments)
router.get('/getOne/:id', authenticateToken, documentGetOne)
router.post('/insertOne', authenticateToken, upload.single('pdf'), documentInsertOne)
router.patch('/patchOne/:id', authenticateToken, upload.single('pdf'), documentPatchOne)
router.delete('/deleteOne/:id', authenticateToken, documentDeleteOne)

export default router