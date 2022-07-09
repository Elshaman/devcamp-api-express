const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/errors')


dotenv.config({path: './config/config.env'})


connectDB();

const bootcamps = require('./routes/bootcamps')
//58 añadimos las rutas de cursos
const courses = require('./routes/courses')




const app = express();


app.use(express.json())


app.use(logger)
//59 montamos las rutas de curso
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT , 
                          console.log(`Ejecutando servidor en ${PORT}`.bgYellow)
                         )

                      
process.on('unhandledRejection' , (err , promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>process.exit(1))
})