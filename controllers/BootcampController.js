//26 dependencia al modelo
const BootcampModel = require('../models/BootcampModel')


//@desc  Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = (req, res, next ) =>{ 
    res.status(200).json(
        { 
            'success' : true,
            'msg' : `mostrar todos los bootcamps`,
            'hello': req.hello
        })
}

//@desc  Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access public
exports.getBootcamp = (req, res, next ) =>{ 
    res.status(200).json(
        { 
            'success' : true,
            'msg' : `mostrar el  bootcamp con id: ${req.params.id}`  })
}


//@desc  create new bootcamp
//@route POST /api/v1/bootcamps
//@access private
exports.createBootcamp = (req, res, next ) =>{ 
    //27 realizar pruebas del body de request
    // se debe, en postman, en "Headers" crear el preset "Content-Type" de tipo "application/json"
    // y hacer un body "raw" en postman, seguir xomo guia el bootcamp que hay el _data
    console.log(req.body)
    res.status(200).json(
        { 
            'success' : true,
            'msg' : 'crear bootcamp' })
}


//@desc  update  bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access private
exports.updateBootcamp = (req, res, next ) =>{ 
    res.status(200).json(
        { 
            'success' : true,
            'msg' : `actualizar bootcamp con id: ${req.params.id} ` })
}


//@desc  delete  bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = (req, res, next ) =>{ 
    res.status(200).json(
        { 
            'success' : true,
            'msg' : `eliminar bootcamp con id: ${req.params.id} ` })
}




