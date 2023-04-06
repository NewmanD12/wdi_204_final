const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const projectSchema = new mongoose.Schema({
    title : String,
    description: String,
    status: String,
    id : {type : String, default : uuidv4},
    issues : [{
        text : String,
        priority : String,
        creatorID : String,
        assigneeID : String,
        stage : String,
        createdAt : {type: Date, default : Date.now()},
        lastModified : {type: Date, default : Date.now()},
        lastModifiedByID : String,
        id : {type : String, default : uuidv4},
        history : [{
            statement : String,
            createdAt : {type: Date}
        }],
        comments : [{
            text : String,
            creatorID : String,
            id : {type : String, default : uuidv4},
            createdAt : {type: Date, default : Date.now()},
            lastModified : {type: Date, default : Date.now()},
            replies : [{
                text : String,
                creatorID : String,
                id : {type : String, default : uuidv4},
                createdAt : {type: Date, default : Date.now()},
                lastModified : {type: Date, default : Date.now()},
            }]
        }]
    }],
    history : [{
        statement : String,
        createdAt : {type: Date}
    }],
    adminIds : [String],
    userIds : [String],
    createdAt : {type: Date, default : Date.now()},
    lastModified : {type: Date, default : Date.now()},
    lastModifiedByID : String
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project