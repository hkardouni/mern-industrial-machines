import Industry from '../models/industry.model.js'


export const getIndustries = async (req,res,next) => {
    try {
        const fetchedIndustries = await Industry.find({})
        res.json(fetchedIndustries)
    } catch (error) {
        next(error)
    }
}
export const createIndustry = async (req, res, next) => {

    try {
        await Industry.create(req.body)
        return res.status(201).json('Industry Added Successfully')

    } catch (error) {
        next(error)
    }
}

export const updateIndustry = async (req,res, next) => {
    try {
        const updatedIndustry = await Industry.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name
            }
        }, {new: true})

        const {...rest} = updatedIndustry._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteIndustry = async (req,res,next) => {
    try {
        await Industry.findByIdAndDelete(req.params.id)
        res.status(200).json('صنعت با موفقیت حذف شد')
    } catch (error) {
        next(error)
    }
}