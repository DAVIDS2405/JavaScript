//Modules
const express = require('express')
const path = require("path")
const methodOverride = require('method-override');
const {engine} = require("express-handlebars")


//Initialitation
const app = express()

//Configurations
app.set("port", process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')
//Middelwares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
//Global variables

//routes
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
//Static Files
app.use(express.static(path.join(__dirname,"public")))

module.exports = app