const express = require('express')
const {
    getCourses
} = require('../controllers/CourseController')


const router = express.Router()
//57 creamos la ruta para la accion creada
router.route('/').get(getCourses)

module.exports = router