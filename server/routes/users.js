const express = require('express')
const router = express.Router()

const userController = require('../controllers/usersContoller')

router.post('/register', userController.createUser)
router.get('/all', userController.allUsers) 


module.exports = router