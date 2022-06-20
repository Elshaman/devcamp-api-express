const express = require('express')
const dotenv = require('dotenv')

//1.load env vars
dotenv.config({path: './config/config.env'})

//2.inicializar express
const app = express();

//3. configurar puerto de escucha
const PORT = process.env.PORT
//console.log(PORT)

//7. crear rutas rest para los bootcamps:
app.get('/api/v1/bootcamps', (req, res) => {
        res.status(200).json(
         { 
             'success' : true,
             'msg' : `mostrar todos los bootcamps` })
})

app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json(
     { 
         'success' : true,
         'msg' : `mostrar el  bootcamp con id: ${req.params.id}`  })
})

app.post('/api/v1/bootcamps', (req, res)=> {
    res.status(200).json(
        { 
            'success' : true,
            'msg' : 'crear bootcamp' })
})

app.put('/api/v1/bootcamps/:id', (req, res)=> {
    res.status(200).json(
        { 
            'success' : true,
            'msg' : `actualizar bootcamp con id: ${req.params.id} ` })
})

app.delete('/api/v1/bootcamps/:id', (req, res)=> {
    res.status(200).json(
        { 
            'success' : true,
            'msg' : `eliminar bootcamp con id: ${req.params.id} ` })
})


//4. ejecutar servidor
app.listen(PORT , console.log(`Ejecutando servidor en ${PORT}`))