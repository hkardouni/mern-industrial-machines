import mongoose from "mongoose";
import Industry from "./industry.model.js";

const machineFunctionalitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Industry
    }
})

const MachineFunctionality = mongoose.model('MachineFunctionality', machineFunctionalitySchema)

export default MachineFunctionality