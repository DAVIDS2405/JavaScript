const passport = require('passport')
const User = require('../models/User')

const LocalStrategy = require('passport-local').Strategy



passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    const userBDD = await User.findOne({email})
    if(!userBDD) return res.send("Lo sentimos, el email no se encuentra registrado",false,)
    const passwordUser = await userBDD.matchPassword(password)
    if(!passwordUser) return res.send("Lo sentimos, los passwords no coinciden",false)
    if(userBDD.confirmEmail===false) return res.send("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    return done(null,userBDD)
}))



passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});