const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')



dotenv.config({path : './config/config.env'})

//56 ahora involucramos en el seeder el modelo de cursos
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')

//conectar a db
mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
})

//leer archivos json 
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json` , 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json` , 'utf-8'))

//realizar la importacion a la db
const importData = async() => {
    try {
        await Bootcamp.create(bootcamps)
        //await Course.create(courses)
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

//borrar datos
const deleteData = async() => {
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

//eleccion segun el tipo de proceso ingresado por consola
if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}


   
