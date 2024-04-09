import mongoose from "mongoose";
import MachineFunctionality from "./machineFunctionality.model";

const machineNameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    functionality: {
        type: mongoose.Schema.ObjectId,
        ref: MachineFunctionality
    }
})

const MachineName = mongoose.model('MachineName', machineNameSchema)

export default MachineName