import express from 'express'
import { createIndustry, updateIndustry } from '../controllers/industry.controller.js'

const router = express.Router()

router.post('/create', createIndustry)
router.post('/update/:id', updateIndustry)

export default router