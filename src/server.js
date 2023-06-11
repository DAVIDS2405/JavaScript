const express = require("express")
const path = require("path")
const {engine} = require("express-handlebars")


//la app se ejecuta con la siguient elínea
const app = express()

//configuraciones
app.set("port", process.env.port || 3000);
app.set("views", path.join(__dirname,"views"));
app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"),"layouts"),
    partialsDir: path.join(app.get("views"),"partials"),
    extname: ".hbs"
}))
app.set("view engine",".hbs")


//middlewares
app.use(express.urlencoded({extended : false}))
app.use(require("./routes/index.routes"))

//variables globales


//rutas
app.get("/", (request, response)=>{
    response.render("index")
})


app.get("/login", (request, response)=>{
    response.render("login")
})


/*
PUEDO CREAR OTRA RUTA CON GET
Y EN EL RESPONSE.RENDER(OTRO HBS)
*/


//archivos estáticos
app.use(express.static(path.join(__dirname,"public")))


module.exports = app