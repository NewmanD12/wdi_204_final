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
            user : savedData
        })

    }
    catch (e) {
        console.log(e)
    }
}

async function allProjects (req, res) {
    try{
        const allProjects = await Project.find({})
        res.json({projects : allProjects})
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = {
    createProject,
    allProjects
}