
const ErrorResponse =require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')


//@desc Register user
//@route POST /api/v1/auth/register
//@access Public

exports.register = asyncHandler(async (req , res, next)=> {
    

    const {name,email,password,role} = req.body
    

    const user = await User.create({
        name , email, password, role
    })

       //98 utilizamos el metodo sendTokenResponse
       sendTokenResponse(user, 200, res )   
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


    //98 utilizamos el metodo sendTokenResponse
    sendTokenResponse(user, 200, res )
    
    
})

//97 metodo para crear JWToken del modelo, crear cookie y enviarla como respuesta
const sendTokenResponse = (user , statusCode , res) => {
        
    const token= user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24* 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token' , token, options).json({
            success:true,
            token
        })
}



