const express = require('express')
const dotenv = require('dotenv')

//1.load env vars
dotenv.config({path: './config/config.env'})

//2.inicializar express
const app = express();

//3. configurar puerto de escucha
const PORT = process.env.PORT
//console.log(PORT)

//5. primera ruta:
app.get('/', (req, res) => {
    //6. enviando respuesta json con codigo http/rest de exito
    res.status(200).json(
         { 
             'success' : true,
             'id' : 1,
             'data' : 'representative' })
})

//4. ejecutar servidor
app.listen(PORT , console.log(`Ejecutando servidor en ${PORT}`))