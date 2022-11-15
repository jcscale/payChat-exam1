const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Person", PersonSchema)