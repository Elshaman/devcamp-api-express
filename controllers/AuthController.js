//77 el controlador de autencticacion

const ErrorResponse =require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')


//78 metodo para crear usuarios
//@desc Register user
//@route GET /api/v1/auth/register
//@access Public

exports.register = asyncHandler(async (req , res, next)=> {
    
    //83 extraemos en variables los datos del body
    const {name,email,password,role} = req.body
    
    // 84create User 
    const user = await User.create({
        name , email, password, role
    })



    res.status(200).json({success: true})
})

