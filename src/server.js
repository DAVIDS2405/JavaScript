import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterinarios from './routers/veterinario_routes.js'
import routerPacientes from './routers/paciente_routes.js'
import {loginRouter} from './routers/passport_routes.js';
import SwaggerV1 from "./swagger.js";
import passport from 'passport';
import "./middlewares/passport.js"
// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())
app.use(passport.initialize())

// Variables globales


// Rutas 
app.get('/',(req,res)=>{
    res.redirect("/api/apis-docs");
})
app.use('/api',routerVeterinarios, routerPacientes)
app.use("/auth",loginRouter)
SwaggerV1(app);
// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

export default app;

