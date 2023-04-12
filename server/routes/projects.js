const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectsController')

router.post('/create-project', projectController.createProject) 
router.get('/all', projectController.allProjects)
router.get('/get-one/:id', projectController.findProjectByID)
router.put('/add-issue/:projectID', projectController.addIssue)
router.get('/get-issue/:projectID/:issueID', projectController.findIssueByID)
router.put('/add-comment/:projectID/:issueID', projectController.addComment)
router.put('/add-reply/:projectID/:issueID/:commentID', projectController.addReply)

module.exports = router 