const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const projectSchema = new mongoose.Schema({
    title : String,
    description: String,
    status: String,
    id : {type : String, default : uuidv4},
    issues : [{
        text : String,
        description: String,
        priority : String,
        creatorID : String,
        assigneeID : String,
        stage : {type : String, default : 'to-do'},
        createdAt : Date,
        lastModified : Date,
        lastModifiedByID : String,
        id : {type : String, default : uuidv4},
        history : [{
            statement : String,
            createdAt : Date
        }],
        comments : [{
            text : String,
            creatorID : String,
            id : {type : String, default : uuidv4},
            createdAt : Date,
            lastModified : Date,
            replies : [{
                text : String,
                creatorID : String,
                id : {type : String, default : uuidv4},
                createdAt : Date,
                lastModified : Date,
            }]
        }]
    }],
    history : [{
        statement : String,
        createdAt : Date
    }],
    adminIds : [String],
    userIds : [String],
    createdAt : Date,
    lastModified : Date,
    lastModifiedByID : String
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project