const express = require('express')
//13. dependencia a controladores
const {getBootcamp , 
       getBootcamps , 
       updateBootcamp , 
       createBootcamp , 
       deleteBootcamp} = require('../controllers/BootcampController')

const router = express.Router()

//14. establecer rutas de controlador 
router.route('/').get(getBootcamps)
                 .post(createBootcamp)

router.route('/:id').get(getBootcamp)
                 .put(updateBootcamp)
                 .delete(deleteBootcamp)
            
                     
module.exports = router

