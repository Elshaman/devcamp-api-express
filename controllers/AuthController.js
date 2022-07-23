//77 el controlador de autencticacion

const ErrorResponse =require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')


//78 metodo para crear usuarios
//@desc Register user
//@route POST /api/v1/auth/register
//@access Public

exports.register = asyncHandler(async (req , res, next)=> {
    
    //83 extraemos en variables los datos del body
    const {name,email,password,role} = req.body
    
    // 84create User 
    const user = await User.create({
        name , email, password, role
    })

    //87 crear token en el usuario
    const token= user.getSignedJwtToken() 


    //88 añadimos el token a la respuesta
    res.status(200).json({success: true , token})
})



//89 metodo para logear usuarios
//@desc Loigin user user
//@route POST /api/v1/auth/login
//@access Public

exports.login = asyncHandler(async (req , res, next)=> {
    
    //90 extraemos en variables los datos del body
    //para login solo email y password
    const {email,password} = req.body
    
    //91 validamos email y password
    if(!email || !password){
        return next(new ErrorResponse('Please provide email & password' , 400))
    }

    //92 check for user
    const user = await User.findOne({email: email}).select('+password')

    //93 verificamos que exista el usuario con ese password
    if(!user){
        return next(new ErrorResponse('Invalid credentials' , 401))
    }

    //94verificar si el password conceurda con 
    const isMatch = await user.matchPassword(password) 
    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials' , 401))
    }


    const token= user.getSignedJwtToken() 
    res.status(200).json({success: true , token})
})


