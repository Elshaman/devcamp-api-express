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
    res.json( { 'message' : 'Hello from express' })
})

//4. ejecutar servidor
app.listen(PORT , console.log(`Ejecutando servidor en ${PORT}`))