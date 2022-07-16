//73 encapsulamos lo de paginacion y obtencion de datos en un middleware

const advancedResults = (model, populate) => async(req , res, next )=>{
     let query
        
        let reqQuery = {...req.query}

        const removeFields = ['select' , 'sort', 'page' , 'limit']

        removeFields.forEach(param => delete reqQuery[param])

        let queryStr = JSON.stringify(reqQuery)

        //crear operadores ($gt , $gte , etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        //63 agregamos poplate a los bootcamps ´para que traiga el campo virtual de curso
        query = model.find(JSON.parse(queryStr))

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
        const total = await model.countDocuments()

        query = query.skip(startIndex).limit(limit) 

        if(populate){
            query = query.populate(populate)
        }


        const results = await query

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


        //el objeto respose
        res.advancedResults={
            success:true,
            count: results.length,
            pagination, 
            data:results
        }

        next()
}

module.exports = advancedResults    