import express from 'express'
import multer from 'multer'
import authenticateToken from '../services/authenticateToken.js'
import { documentDeleteOne, documentGetAll, documentGetDocuments, documentGetOne, documentInsertOne, documentPatchOne } from '../controllers/documentController.js'

const router = express.Router()
const upload = multer()

router.get('/getAll', documentGetAll)
router.get('/getDocuments/:id', documentGetDocuments)
router.get('/getOne/:id', documentGetOne)
router.post('/insertOne', upload.single('pdf'), documentInsertOne)
router.patch('/patchOne/:id', upload.single('pdf'), documentPatchOne)
router.delete('/deleteOne/:id', documentDeleteOne)

export default router