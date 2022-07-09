
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')

//45 reescribimos la accion de controlador sin try catch, utilizando asyncHandler

//@desc  Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async(req, res, next ) =>{

       
        let query
        
        let reqQuery = {...req.query}

        //54 paginacion
        const removeFields = ['select' , 'sort', 'page' , 'limit']

        removeFields.forEach(param => delete reqQuery[param])

        let queryStr = JSON.stringify(reqQuery)

        //crear operadores ($gt , $gte , etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        query = Bootcamp.find(JSON.parse(queryStr))

        //select
        if(req.query.select){
            const fields = req.query.select.split(',').join( ' ')
            query = query.select(fields)
        }

        //sort
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join( ' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }

        //pagination
        const page= parseInt(req.query.page , 10) || 1
        const limit = parseInt(req.query.limit , 10) || 1
        const startIndex = (page - 1) * limit
        const endIndex =  page * limit
        const total = await Bootcamp.countDocuments()

        query = query.skip(startIndex).limit(limit) 

        const bootcamps = await query

        //pagination result
        const pagination = {}

        if(endIndex < total){
            pagination.next = {
                page: page + 1 ,
                limit
            }
        }

        if(startIndex > 0 ){
            pagination.prev = {
                page: page -1,
                limit
            }
        }


        //el codigo para traer todas las rutas es 200
        //ahora el response incluye la paginacion
        res.status(200).json(
            { 
                success : true,
                data: bootcamps,
                pagination,
                count: bootcamps.length
            })
    
    })

   
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






