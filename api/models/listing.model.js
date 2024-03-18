import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    functionality: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    voltage: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    },
    userRef: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

export default Listing