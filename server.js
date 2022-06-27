const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')


dotenv.config({path: './config/config.env'})
//22. nos conectamos a la base de datos

connectDB();

const bootcamps = require('./routes/bootcamps')
const app = express();

//28 añadir middleware body-parser para que pueda recibir body
app.use(express.json())


app.use(logger)
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT

//23. reformateamos el listen
const server = app.listen(PORT , 
                          console.log(`Ejecutando servidor en ${PORT}`.bgYellow)
                         )

                         //24. funcion para controlar excepciones de servidor
process.on('unhandledRejection' , (err , promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>process.exit(1))
})