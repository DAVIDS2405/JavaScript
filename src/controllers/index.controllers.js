const renderIndex = (req,res)=>{
    res.render('index')
}

const renderAbout = (req,res)=>{
    res.render('login')
}

const renderAllPortafolios = (req,res)=>{
    res.send('Listar todos los portafolios')
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.send('Formulario para crear un portafolio')
}
const createNewPortafolio = (req,res)=>{
    res.send('Crear un nuevo portafolio')
}
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}
const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
}



module.exports ={
    renderIndex, 
    renderAbout,
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}