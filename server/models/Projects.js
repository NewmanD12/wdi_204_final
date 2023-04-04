const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const projectSchema = new mongoose.Schema({
    title : String,
    description: String,
    issueIds : [String],
    adminIds : [String],
    userIds : [String],
    id : {type : String, default : uuidv4},
    stages : ['To Do', 'In Progress', 'In Review', 'Done']
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project