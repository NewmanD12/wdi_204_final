const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectsController')

router.post('/create-project', projectController.createProject) 
router.get('/all', projectController.allProjects)

module.exports = router