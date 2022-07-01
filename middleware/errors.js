const ErrorResponse = require("../utils/ErrorResponse");


const errorHandler  = (err , req , res , next) => {

    let error = {...err}
    error.message = err.message

    console.log(err.stack.red);
    
    //41 creamos el objeto error: el id se extrae en el parametrovalue
    if(err.name === 'CastError'){
        const message = `Bootcamp not found with id ${err.value}`
        error = new ErrorResponse(message,404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports =errorHandler
