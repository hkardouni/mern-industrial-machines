import MachineFunctionality from "../models/machineFunctionality.model.js";

export const getFunctionality = async (req, res, next) => {
    try {
        const fetchFunctionalities = await MachineFunctionality.find({})
        res.json(fetchFunctionalities)
    } catch (error) {
        next(error)
    }
}

export const createFunctionality = async (req, res, next) => {
    try {
        await MachineFunctionality.create(req.body)
        return res.status(201).json('Functionality Added Successfully')
    } catch (error) {
        next(error)
    }
}

export const updateFunctionality = async (req, res, next) => {
    try {
        const updatedFunctionality = await MachineFunctionality.findByIdAndUpdate(req.params.id, {

            $set: {
                name: req.body.name,
                industry: req.body.industry
            }
        }, { new: true })

        const { ...rest } = updatedFunctionality._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const removeFunctionality = async (req,res,next) => {
    try {
        await MachineFunctionality.findByIdAndDelete(req.params.id)
        res.status(200).json('عملکرد دستگاه با موفقیت حذف شد')
    } catch (error) {
        next(error)
    }
}