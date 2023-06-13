const express = require('express')
const path = require('path')

// Inicializaciones
const app = express()

// Configuraciones
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))

// Variables globales

// Rutas
app.get('/', (req, res) => {
  res.render('index')
})

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
