//METODO PARA CARGAR LAS VARIALBES DEL ARCHIVO .ENV
require('dotenv').config() //ESTO SIEMPRE VA PRIMERO

const app = require('./server.js')
const connection= require("./database.js")

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


connection()
