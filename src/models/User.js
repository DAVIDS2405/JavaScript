const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")
const { use } = require("passport")


const userSchema = new Schema(

    {
        name:{
            type:String,
            require: true
        },
        email:{
            type:String,
            require: true
        },
        password:{
            type: String,
            require: true
        }
    },
    {
        
        timestamps: true
        
    }

) 

//cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

//verificar si el password ingresado es el de la bd
userSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password, this.password)
    return response
}

//                      NOMBRE DE LA COLECCIÓN EN LA BD, ESQUEMA RELACIONADO
module.exports = model("user",userSchema)

