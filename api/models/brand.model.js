import mongoose from "mongoose";
import MachineName from "./machineName.model";

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    machineName: {
        type: mongoose.Schema.ObjectId,
        ref: MachineName
    }
})

const Brand = mongoose.model('Brand', brandSchema)

export default Brand