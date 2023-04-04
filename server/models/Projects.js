const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const projectSchema = new mongoose.Schema({
    title : String,
    description: String,
    issueIds : [String],
    commentIds : [String],
    adminIds : [String],
    userIds : [String],
    stages : ['To Do', 'In Progress', 'In Review', 'Done']
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project