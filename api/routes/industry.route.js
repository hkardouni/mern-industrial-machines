import express from 'express'
import { createIndustry, deleteIndustry, getIndustries, updateIndustry } from '../controllers/industry.controller.js'

const router = express.Router()

router.post('/create', createIndustry)
router.put('/update/:id', updateIndustry)
router.delete('/remove/:id', deleteIndustry)
router.get('/all', getIndustries)

export default router