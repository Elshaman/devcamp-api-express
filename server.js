const express = require('express')
const dotenv = require('dotenv')


const bootcamps = require('./routes/bootcamps')

dotenv.config({path: './config/config.env'})
const app = express();

//15. crear una funcion middleware
const logger = (req,res,next) => {
    req.hello = 'world';
    console.log('middleware ran')
    //todo middleware tiene un next para avanzar a la ruta propiamente dicha
    next(); 
}

//16. usamos el middleware
app.use(logger)


app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT
app.listen(PORT , console.log(`Ejecutando servidor en ${PORT}`))