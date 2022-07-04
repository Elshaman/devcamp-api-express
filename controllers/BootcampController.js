
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')

//45 reescribimos la accion de controlador sin try catch, utilizando asyncHandler

//@desc  Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async(req, res, next ) =>{
    
        const bootcamps = await Bootcamp.find()
        //el codigo para traer todas las rutas es 200
        res.status(200).json(
            { 
                success : true,
                data: bootcamps,
                count: bootcamps.length
            })
    
    })


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
        //res.status(400).json({success: false})
       
        next(error)
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
         //40  error con el error por defecto
         next(error)
   }
    
}


//@desc  update  bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access private
exports.updateBootcamp = async  (req, res, next ) =>{ 
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id , req.body, {
            new:true,
            runValidators: true
        })
        if(!bootcamp){
            res.status(400).json({success: false})
        }
        res.status(200).json(
            { 
                success : true,
                data: bootcamp
            })
    } catch (error) {
       
              //40  error con el error por defecto
        next(error)
        
    }
    
  
}


//@desc  delete  bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = async(req, res, next ) =>{ 
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!bootcamp){
            res.status(400).json({success: false})
        }
        res.status(200).json(
            { 
                success : true,
                data: {}
            })
    } catch (error) {
         //40  error con el error por defecto
         next(error)
    }
}






