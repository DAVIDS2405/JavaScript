const app = require('./server.js')
const connection = require('./database/database.js')

connection()

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})
