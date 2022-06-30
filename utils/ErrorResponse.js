//38 se hace la clase de error

class ErrorResponse extends Error{
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}
module.exports = ErrorResponse;