import Industry from '../models/industry.model.js'

export const createIndustry = async (req, res, next) => {

    try {
        await Industry.create(req.body)
        return res.status(201).json('Industry Added Successfully')

    } catch (error) {
        next(error)
    }
}

