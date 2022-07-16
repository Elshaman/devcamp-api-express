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

//74 añadimos el middleware encapsulado en las rutas
const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResults')



const courseRouter = require('./courses')


const router = express.Router()


router.use('/:bootcampId/courses' , courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)


router.route('/').get(advancedResults(Bootcamp, 'courses'),   getBootcamps)
                 .post(createBootcamp)

router.route('/:id').get(getBootcamp)
                 .put(updateBootcamp)
                 .delete(deleteBootcamp)

router.route('/:id/photo').put(bootcampPhotoUpload)
            
                     
module.exports = router

