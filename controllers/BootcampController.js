//26 dependencia al modelo
const Bootcamp = require('../models/Bootcamp')

//31 endpoint para traer todos los bootcamps
//@desc  Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = async(req, res, next ) =>{
    try {
        const bootcamps = await Bootcamp.find()
        //el codigo para traer todas las rutas es 200
        res.status(200).json(
            { 
                success : true,
                data: bootcamps
            })
    } catch (error) {
        res.status(400).json({success: false})
    } 
   
}

//@desc  Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access public
exports.getBootcamp = async(req, res, next ) =>{ 
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        //el codigo para traer todas las rutas es 200
        res.status(200).json(
            { 
                success : true,
                data: bootcamp
            })
    } catch (error) {
        res.status(400).json({success: false})
    } 
}


//@desc  create new bootcamp
//@route POST /api/v1/bootcamps
//@access private
exports.createBootcamp = async(req, res, next ) =>{ 
   //30 crear el bootcamp utilizando try catch
   try {
        const newBootcamp = await Bootcamp.create(req.body)
        res.status(201).json(
        { 
            success : true,
            data : newBootcamp
         })
   } catch (error) {
        //400: bad request
        res.status(400).json({success: false})
   }
    
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




