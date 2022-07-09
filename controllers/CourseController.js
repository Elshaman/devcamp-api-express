const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')

//56 creamos las acciones de curso


//@desc Get courses 
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampId/courses

exports.getCourses = asyncHandler(async(req, res, next) => {
    let query
    if(req.params.bootcampId){
        query = Course.find({bootcamp:req.params.bootcampId})
    }else{
        query = Course.find()
    }
    const courses = await query

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})