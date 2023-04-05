const Project = require('../models/Projects')

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
    const projectID = req.params.projectID
    const project = await Project.find({id : projectID})
    const currentIssues = project[0].issues
    const fullIssues = [...currentIssues, 
        {
            "text" : req.body.text, 
            "priority" : req.body.priority, 
            "creatorID" : req.body.creatorID
        }]
    console.log(fullIssues)

    try{
        const updatedProject = await Project.findOneAndUpdate(projectID, {issues : fullIssues})

        res.json({
            success : true,
            project : updatedProject
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
    const projectID = req.params.projectID
    const issueID = req.params.issueID
    // console.log(projectID)
    // console.log(issueID)
    
    try{
        const project = await Project.find({id : projectID})
        const issueToAddComment = project[0].issues.filter(issue => issue.id === issueID)[0]
        const allOtherIssues = project[0].issues.filter(issue => issue.id !== issueID)
        issueToAddComment.comments = [...issueToAddComment.comments, {
            "text" : req.body.text,
            "creatorID" : req.body.creatorID
        }]
        const allIssues = allOtherIssues.concat(issueToAddComment)
        console.log(allIssues)

        const updatedProject = await Project.findOneAndUpdate(projectID, {issues : allIssues})


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