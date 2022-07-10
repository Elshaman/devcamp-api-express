const express = require('express')
const {
    getCourses
} = require('../controllers/CourseController')


const router = express.Router({mergeParams:true})
//57 creamos la ruta para la accion creada
router.route('/').get(getCourses)

module.exports = router