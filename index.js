const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.send("Landing page - Grupo 4")
})

app.get('/integrantes',(req,res)=>{
    res.json([
        {
            "nombre":"José",
            "apellido":"Pinos",
            "edad":21
        },
        {
            "nombre":"David",
            "apellido":"Basantes",
            "edad":21
        },
        {
            "nombre":"José",
            "apellido":"Panchi",
            "edad":21
        },
        {
            "nombre":"Miguel",
            "apellido":"Carapaz",
            "edad":21
        }
    ])
})

app.get('/products',(req,res)=>{
    res.send(`
            <h1>Catálogo de productos</h1>
                <p>Bienvenidos</p>
    `)
})



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});