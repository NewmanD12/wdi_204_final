const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    id : {type : String, default: uuidv4},
    assignedProjectIds : [String],
    adminProjectIds : [String]
})

const User = mongoose.model('users', userSchema)

module.exports = User