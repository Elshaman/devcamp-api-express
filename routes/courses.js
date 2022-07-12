const express = require('express')
const {
    getCourses, getCourse, addCourse , updateCourse, deleteCourse
} = require('../controllers/CourseController')


const router = express.Router({mergeParams:true})
//57 creamos la ruta para la accion creada
router.route('/').get(getCourses).post(addCourse)
 
//61 añadir la ruta del detalle del curso
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse)

module.exports = router