const express = require('express')
//13. dependencia a controladores
const {getBootcamp , 
       getBootcamps , 
       updateBootcamp , 
       createBootcamp , 
       deleteBootcamp,
       getBootcampsInRadius} = require('../controllers/BootcampController')

const router = express.Router()

//50. crear la ruta para seleccion de bootcamps en un radio
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)


router.route('/').get(getBootcamps)
                 .post(createBootcamp)

router.route('/:id').get(getBootcamp)
                 .put(updateBootcamp)
                 .delete(deleteBootcamp)
            
                     
module.exports = router

