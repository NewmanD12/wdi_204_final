const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectsController')

router.post('/create-project', projectController.createProject) 
router.get('/all', projectController.allProjects)
router.put('/add-issue/:projectID', projectController.addIssue)
router.put('/add-comment/:projectID/:issueID', projectController.addComment)
router.put('/add-reply/:projectID/:issueID/:commentID', projectController.addReply)

module.exports = router 