const express = require('express')
const dotenv = require('dotenv')
//20. incluimos el middleware logger
const logger = require('./middleware/logger')


const bootcamps = require('./routes/bootcamps')

dotenv.config({path: './config/config.env'})
const app = express();



app.use(logger)
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT
app.listen(PORT , console.log(`Ejecutando servidor en ${PORT}`))