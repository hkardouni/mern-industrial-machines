import express from 'express'
import { createIndustry } from '../controllers/industry.controller.js'

const router = express.Router()

router.post('/create', createIndustry)

export default router