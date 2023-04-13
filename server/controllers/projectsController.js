const Project = require('../models/Projects')
const User = require('../models/Users')

async function createProject(req, res) {
    try {
        const title = req.body.title
        const description = req.body.description
        const creatorID = req.body.creatorID
        
        const newProject = new Project({
            title,
            description,
            adminIds: [creatorID]
        })

        const savedData = await newProject.save()

        res.json({
            success : true,
            project : savedData
        })

    }
    catch (e) {
        console.log(e)
    }
}

async function allProjects(req, res) {
    try{
        const allProjects = await Project.find({})
        res.json({projects : allProjects})
    }
    catch (e) {
        console.log(e)
    }
}

async function addIssue(req, res) {
    
    try{
        const projectID = req.params.projectID
        const project = await Project.findOne({id : projectID})
        const user = await User.find({id : req.body.creatorID})
        const id = project._id
        const currentIssues = project.issues
        const currentHistory = project.history
        const fullIssues = [...currentIssues, 
            {
                "text" : req.body.text, 
                "priority" : req.body.priority, 
                "creatorID" : req.body.creatorID,
                "stage" : "to-do",
                "history" : [{statement : 'issue was created', createdAt : Date.now()}]
            }]

        let fullHistory = []
        if(user){
            fullHistory = [...currentHistory, 
                {
                    "statement" : `${user[0].firstName} ${user[0].lastName[0]} added an issue`,
                    "createdAt" : Date.now()
                }]
        }
        
        const updatedProject = await Project.findByIdAndUpdate(id, 
            {
                issues : fullIssues,         
                history : fullHistory
            })
            
        res.json({
            success : true,
            updatedProject : updatedProject,
        })
    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

async function addComment(req, res) {
    try{
        const projectID = req.params.projectID
        const issueID = req.params.issueID
        const user = await User.findOne({id : req.body.creatorID})
        const project = await Project.findOne({id : projectID})
        const id = project._id

        const issueToAddComment = project.issues.filter(issue => issue.id === issueID)[0]
        const allOtherIssues = project.issues.filter(issue => issue.id !== issueID)

        issueToAddComment.comments = [...issueToAddComment.comments, {
            "text" : req.body.text,
            "creatorID" : req.body.creatorID,
            "createdAt" : Date.now()
        }]

        issueToAddComment.history = [...issueToAddComment.history, {
            "statement" : `${user.firstName} ${user.lastName[0]} added a comment`,
            "createdAt" : Date.now()
        }]

        const allIssues = allOtherIssues.concat(issueToAddComment)

        const updatedProject = await Project.findByIdAndUpdate(id, {issues : allIssues})

        res.json({
            success : true,
            project : updatedProject
        })
    }
    catch (e) {
        console.log(e)
    }

}

async function addReply(req, res){
    try{
        const projectID = req.params.projectID
        const issueID = req.params.issueID
        const commentID = req.params.commentID
        const creatorID = req.body.creatorID

        const project = await Project.findOne({id : projectID})
        const user = await User.findOne({id : creatorID})
        const issue = project.issues.filter(issue => issue.id === issueID)[0]
        const otherIssues = project.issues.filter(issue => issue.id !== issueID)
        const comment = issue.comments.filter(comment => comment.id === commentID)[0]
        
        comment.replies = [...comment.replies, {
            "text" : req.body.text,
            "creatorID" : req.body.creatorID,
            "createdAt" : Date.now()
        }]

        issue.history = [...issue.history, {
            "statement" : `${user.firstName} ${user.lastName[0]} added a reply to issue: ${issue.text}`
        }]

        const allIssues = otherIssues.concat(issue)

        const updatedProject = await Project.findByIdAndUpdate(project._id, {issues : allIssues})

        res.json({
            success : true,
            // issue : issue
        })
    }
    catch (e) {
        console.log(e)
    }
}

async function findProjectByID(req, res, next) {
    const id = req.params.id
    try {
        const project = await Project.find({id : id})
        res.json({
            success : true,
            project : project
        })
    }
    catch (e) {
        res.json({
            error : e.toString()
        })
    }
}

async function findIssueByID(req, res, next) {
    const projectId = req.params.projectID
    const issueId = req.params.issueID
    try {
        const project = await Project.find({id : projectId})
        const issue = project[0].issues.filter((issue) => issue.id === issueId)[0]
        res.json({
            success : true,
            issue : issue
        })
    }
    catch (e) {
        res.json({
            error : e.toString()
        })
    }

}



module.exports = {
    createProject,
    allProjects,
    findProjectByID,
    addIssue, 
    findIssueByID,
    addComment, 
    addReply
}