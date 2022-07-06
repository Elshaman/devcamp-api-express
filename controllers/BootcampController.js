
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')

//45 reescribimos la accion de controlador sin try catch, utilizando asyncHandler

//@desc  Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async(req, res, next ) =>{


        //51 captura de parametro de querystring y utilizarlos para filtro
        console.log(req.query)

        const bootcamps = await Bootcamp.find(req.query)
        //el codigo para traer todas las rutas es 200
        res.status(200).json(
            { 
                success : true,
                data: bootcamps,
                count: bootcamps.length
            })
    
    })

    //50 crear la ruta para seleccionar bootcamps cercanos por zipcode y distancia
 //@desc Get botocamps in a radius
 //@route GET /api/v1/bootcamps/radius/:zipcode/:distance
 //@access private
 exports.getBootcampsInRadius = asyncHandler(async(req,res,next) => { 
    const {zipcode, distance} = req.params

    //obtener longitud y latitud
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    //calculo del radio utilizando radianes
    //dividir la distancia  por el radio terrestre
    // radio de la tierra =  3,963 millas / 6,378 km 
    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin:{ $centerSphere:[[lng, lat] , radius]}}
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
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






