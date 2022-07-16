const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/errors')
const fileupload = require('express-fileupload')


dotenv.config({path: './config/config.env'})


connectDB();

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
//81 montamos las rutas de autenticacion
const auth = require('./routes/auth')




const app = express();


app.use(express.json())

//66 montamos fileupload
app.use(fileupload())

//72 set static folder
app.use(express.static(path.join(__dirname , 'public')))

app.use(logger)
//82 montamos las rutas de auth
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT , 
                          console.log(`Ejecutando servidor en ${PORT}`.bgYellow)
                         )

                      
process.on('unhandledRejection' , (err , promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>process.exit(1))
})

