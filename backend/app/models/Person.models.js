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
    },
    age: {
        type: String,
        required: false
    },
    about : {
        type: String,
        required: false
    },
    friends: [
        {
            type: String,
            required: false
        }
    ]
})

module.exports = mongoose.model("Person", PersonSchema)