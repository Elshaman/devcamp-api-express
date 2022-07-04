//44 manera elegante de escribir try catch en controladores

const asyncHandler = fn => (req, res , next)=>
    Promise.resolve(fn(req,res,next)).catch(next)

module.exports = asyncHandler

