const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const projectSchema = new mongoose.Schema({
    title : String,
    description: String,
    id : {type : String, default : uuidv4},
    issues : [{
        text : String,
        priority : String,
        creatorID : String,
        assigneeID : String,
        stage : String,
        id : {type : String, default : uuidv4},
        comments : [{
            text : String,
            creatorID : String,
            id : {type : String, default : uuidv4},
            replies : [{
                text : String,
                creatorID : String,
                id : {type : String, default : uuidv4}
            }]
        }]
    }],
    activity : {
        history : [String],
        comments : [String]
    },
    adminIds : [String],
    userIds : [String]
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project