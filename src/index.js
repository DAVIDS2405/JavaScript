const app = require('./server.js')
const Port = process.env.port || 3000
app.listen(Port,()=>{
    console.log(`Server on port ${Port}`);
})