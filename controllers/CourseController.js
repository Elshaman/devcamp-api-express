const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')

//56 creamos las acciones de curso


//@desc Get courses 
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses

exports.getCourses = asyncHandler(async(req, res, next) => {
    let query
    if(req.params.bootcampId){
        query = Course.find({bootcamp:req.params.bootcampId})
    }else{
        //61  incluir en el response otro recurso
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'

        })
    }
    const courses = await query

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})


//62 ruta del añadir curso
//@desc Add course 
//@route POST /api/v1/bootcamps/:bootcampId/courses 
//@access: Privete 

exports.addCourse = asyncHandler(async(req, res, next) => {
   
    req.body.bootcamp = req.params.bootcampId

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if(!bootcamp){
        return next(new ErrorResponse(`No bootcamp with the id ${req.params.bootcampId}`), 404)
    }

    const course = await Course.create(req.body)

    res.status(200).json({
        success: true,
        data: course
    })
})



//60 ruta del detalle del curso
//@desc Get single course 
//@route GET /api/v1/courses/:id
//@route GET /api/v1/bootcamps/:bootcampId/courses

exports.getCourse = asyncHandler(async(req, res, next) => {
   
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'

    })

    if(!course){
        return next(new ErrorResponse(`No course with the id ${req.params.id}`), 404)
    }

    res.status(200).json({
        success: true,
        data: course
    })
})


//62 ruta del añadir curso
//@desc Add course 
//@route POST /api/v1/bootcamps/:bootcampId/courses 
//@access: Privete 

exports.addCourse = asyncHandler(async(req, res, next) => {
   
    req.body.bootcamp = req.params.bootcampId

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if(!bootcamp){
        return next(new ErrorResponse(`No bootcamp with the id ${req.params.bootcampId}`), 404)
    }

    const course = await Course.create(req.body)

    res.status(200).json({
        success: true,
        data: course
    })
})



//63 ruta del actualizar curso
//@desc Update course
//@route PUT /api/v1/courses/:id
//@access Private
exports.updateCourse = asyncHandler(async(req, res, next) => {
   
   let course = await Course.findById(req.params.id)

   if(!course){
        return next(
            new ErrorResponse(`no course with the id of ${req.params.id}`, 404)
        )
   }

   course = await Course.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
   })

   res.status(200).json(
    {   
        success:true,
        data:course
    }
   )



})




//64 ruta del borrar curso
//@desc Delete course
//@route DELETE /api/v1/courses/:id
//@access Private
exports.deleteCourse = asyncHandler(async(req, res, next) => {
   
    const course = await Course.findById(req.params.id)
 
    if(!course){
         return next(
             new ErrorResponse(`no course with the id of ${req.params.id}`, 404)
         )
    }
 
    await course.remove()
 
    res.status(200).json(
     {   
         success:true,
         data:{}
     }
    )
 
 
 
 })
 









