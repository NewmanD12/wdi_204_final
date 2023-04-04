const mongoose = require('mongoose')
const { v4 : uuidv4 } = require('uuid')

const issueSchema = new mongoose.Schema({
    text : String,
    priority: String,
    assigneeID : String,
    creatorID : String,
    stage : String,
    activity : {
        history : [],
        comments : []
    },
    id : {type : String, default : uuidv4}
})

const Issue = mongoose.model('issues', issueSchema)
module.exports = Issue