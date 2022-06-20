const express = require('express')
const dotenv = require('dotenv')

//10. dependencia al archivo de rutas
const bootcamps = require('./routes/bootcamps')

dotenv.config({path: './config/config.env'})
const app = express();

//11. montar las rutas
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT
app.listen(PORT , console.log(`Ejecutando servidor en ${PORT}`))