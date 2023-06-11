const mongoose = require("mongoose")

//0.0.0.0 rn lugar de local host
const MONGODB_URI = "mongodb+srv://grupo2:FeNUdVSzIN2L3L1C@cluster0.jmb51re.mongodb.net/?retryWrites=true&w=majority"

connection = async()=>{
    try{
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Conectado a la base de datos")
    }catch(error){
        console.log(error)

    }
}


module.exports = connection
