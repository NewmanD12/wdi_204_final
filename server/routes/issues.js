const express = require('express')
const router = express.Router()

const issueController = require('../controllers/issuesController')

router.post('/create-issue', issueController.createIssue) 
router.get('/all', issueController.allIssues)

module.exports = router