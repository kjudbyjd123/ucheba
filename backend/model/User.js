const { Schema, model } = require('mongoose')

const User = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

})
module.exports = model('User', User)