const User = require('../models/Users')

const {
    generatePasswordHash,
    validatePassword,
    generateUserToken,
    verifyToken,
} = require("../auth");

async function createUser(req, res) {

    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password

        const user = await User.find({email : {$eq : email}})

        if(user.length === 0){
            const saltRounds = 10
            const hashedPW = await generatePasswordHash(password, saltRounds)
    
            const newUser = new User({
                firstName,
                lastName,
                email,
                password : hashedPW
            })
    
            const savedData = await newUser.save()
            res.json({
                success : true,
                user : savedData,
                userFound: user
            })
        }
        
        res.json({
            success : false,
            message : 'user already exists'
        })


    }
    catch (e) {
        console.log(e)
    }
}

async function allUsers (req, res) {
    try {
        const allUsers = await User.find({})
        res.json({users : allUsers})
    }   
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    createUser,
    allUsers
}