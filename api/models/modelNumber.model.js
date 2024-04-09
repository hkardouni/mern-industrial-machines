import mongoose, { modelNames } from "mongoose";
import Brand from "./brand.model";

const modelNumberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: Brand
    }
})

const ModelNumber = mongoose.model('ModelNumber', modelNumberSchema)

export default ModelNumber