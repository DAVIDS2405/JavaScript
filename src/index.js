const app = require("./server.js")
const connection = require("./database.js")


connection()


app.listen(app.get("port"), ()=>{
    console.log(`Servidor en puerto ${app.get("port")}`)
})