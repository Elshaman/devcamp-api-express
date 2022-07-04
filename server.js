const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/errors')


dotenv.config({path: './config/config.env'})


connectDB();

const bootcamps = require('./routes/bootcamps')




const app = express();


app.use(express.json())


app.use(logger)
app.use('/api/v1/bootcamps', bootcamps)
app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT , 
                          console.log(`Ejecutando servidor en ${PORT}`.bgYellow)
                         )

                      
process.on('unhandledRejection' , (err , promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>process.exit(1))
})