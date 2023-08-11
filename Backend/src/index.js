import app from './server.js'
import connection from './database.js';


//database
connection();

//Listen Port
app.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})



