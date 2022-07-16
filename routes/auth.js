//79 el archivo de rutas de autenticacion
const express = require('express')
const {register} = require('../controllers/AuthController')

const router = express.Router()

//80 la primera ruta de autenticacion
router.post('/register', register)

module.exports = router