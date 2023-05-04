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

async function loginUser(req, res) {

    try {
        const email = req.body.email;
        const password = req.body.password
        const user = await User.findOne({email : email})

        if(!user){
            res.json({
                success : false,
                message : 'Could not find user.'
            }).status(204)
        }
        
        const firstName = user.firstName
        const lastName = user.lastName

        
        const isPWValid = await validatePassword(password, user.password)

        
        if (!isPWValid) {
            res
            .json({ success: false, message: "Password was incorrect." })
            .status(204);
            return;
        } 

        // const userType = email.endsWith("@admin.com") ? "admin" : "user";

        const data = {
            date: new Date(),
            userId: user.id,
            userFirstName: user.firstName,
            userLastName: user.lastName, 
            email: email
          };


        const token = generateUserToken(data);

        res.json({ success: true, token, firstName, lastName, email});
        return;
  
    }
    catch (e) {
        console.log(e)
    }
}

async function getOneByEmail(req, res) {
    const email = req.params.email
    try {
        const user = await User.findOne({email : email})
        res.json({
            success : true,
            user : user
        })
    }
    catch (e) {
        res.json({
            error : e.toString()
        })
    }
}

module.exports = {
    createUser,
    allUsers,
    loginUser, 
    getOneByEmail
}