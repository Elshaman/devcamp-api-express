const express = require('express')
//13. dependencia a controladores
const {getBootcamp , 
       getBootcamps , 
       updateBootcamp , 
       createBootcamp , 
       deleteBootcamp,
       getBootcampsInRadius,
       bootcampPhotoUpload
} = require('../controllers/BootcampController')


//60 incluimos otros router
const courseRouter = require('./courses')


const router = express.Router()

//61 redirigimos al router de curso
router.use('/:bootcampId/courses' , courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)


router.route('/').get(getBootcamps)
                 .post(createBootcamp)

router.route('/:id').get(getBootcamp)
                 .put(updateBootcamp)
                 .delete(deleteBootcamp)

                 //68 ruta de la accion de cargar photo
router.route('/:id/photo').put(bootcampPhotoUpload)
            
                     
module.exports = router

