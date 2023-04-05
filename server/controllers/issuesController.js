const Issue = require('../models/Issues')

async function createIssue(req, res) {

    try {
        const text = req.body.text
        const priority = req.body.priority
        const creatorID = req.body.creatorID
        const projectID = req.body.projectID

        const newIssue = new Issue({
            text,
            priority,
            creatorID : creatorID,
        })

        const savedData = await newIssue.save()

        res.json({
            success : true,
            issue : savedData
        })

    } 
    catch (e) {
        console.log(e)
    }

}

async function allIssues (req, res) {
    try {
        const allIssues = await Issue.find({})
        res.json({issues : allIssues})
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    createIssue, 
    allIssues
}