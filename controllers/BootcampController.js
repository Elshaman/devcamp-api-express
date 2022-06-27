//26 dependencia al modelo
const Bootcamp = require('../models/Bootcamp')


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
exports.createBootcamp = async(req, res, next ) =>{ 
   //29 crear el bootcamp utilizando el modelo, el codigo http es 201
    const newBootcamp = await Bootcamp.create(req.body)
    res.status(201).json(
        { 
            success : true,
            data : newBootcamp })
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




