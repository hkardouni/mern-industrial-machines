import express from 'express'
import { createFunctionality, getFunctionality, updateFunctionality } from '../controllers/functionality.controller.js'

const router = express.Router()

router.get('/all', getFunctionality)
router.post('/create', createFunctionality)
router.put('/update/:id', updateFunctionality)

export default router