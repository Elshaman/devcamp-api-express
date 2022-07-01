const ErrorResponse = require("../utils/ErrorResponse");


const errorHandler  = (err , req , res , next) => {

    let error = {...err}
    error.message = err.message

    console.log(err);
    
    //41 creamos el objeto error: el id se extrae en el parametrovalue
    //caso de id erroneo
    if(err.name === 'CastError'){
        const message = `Bootcamp not found with id ${err.value}`
        error = new ErrorResponse(message,404)
    }

    //42 caso en que tenemos duplicados establecidos a partir del modelo
    if(err.code === 11000){
        const message  = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400)
    }

    //43 errores de validacion del modelo(pj unicos, requeridos, etc)
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports =errorHandler
