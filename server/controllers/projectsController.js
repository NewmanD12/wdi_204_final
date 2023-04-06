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
        const user = await User.findOne({id : req.body.creatorID})
        const id = project._id
        const currentIssues = project.issues
        const currentHistory = project.history
        const fullIssues = [...currentIssues, 
            {
                "text" : req.body.text, 
                "priority" : req.body.priority, 
                "creatorID" : req.body.creatorID
            }]
        const fullHistory = [...currentHistory, 
            {
                "statement" : `${user.firstName} ${user.lastName[0]} added an issue`,
                "createdAt" : Date.now()
            }]
        
        const updatedProject = await Project.findByIdAndUpdate(id, 
            {
                issues : fullIssues,         
                history : fullHistory
            })
            
        res.json({
            success : true,
            updatedProject : updatedProject
        })
    }
    catch (e) {
        res.json({
            success : false,
            error : e
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
            "creatorID" : req.body.creatorID
        }]

        issueToAddComment.history = [...issueToAddComment.history, {
            statement : `${user.firstName} ${user.lastName[0]} added a comment`,
            'createdAt' : Date.now()
        }]

        const allIssues = allOtherIssues.concat(issueToAddComment)
        console.log(allIssues)

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


module.exports = {
    createProject,
    allProjects,
    addIssue, 
    addComment
}