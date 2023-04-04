const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoDB = process.env.ATLAS_URI

async function mongooseConnect() {
    try {
        await mongoose.connect(mongoDB, {dbName : process.env.DATABASE})
        console.log('db connected')
    }   
    catch (err) {
        throw(err)
    }
}

module.exports = {
    mongooseConnect
}