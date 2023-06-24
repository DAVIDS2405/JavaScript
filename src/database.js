const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://grupo2:FeNUdVSzIN2L3L1C@cluster0.jmb51re.mongodb.net/?retryWrites=true&w=majority'


connection = async()=>{
    try {
         await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection


const {DBUSER,DBPASSWORD,DBNAME} = process.env
