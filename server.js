const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/errors')
const fileupload = require('express-fileupload')
//95 dependencia a cookie parser
const cookieParser = require('cookie-parser')


dotenv.config({path: './config/config.env'})


connectDB();

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const auth = require('./routes/auth')




const app = express();




app.use(express.json())
//96 cookie parser
app.use(cookieParser())


app.use(fileupload())


app.use(express.static(path.join(__dirname , 'public')))

app.use(logger)

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

