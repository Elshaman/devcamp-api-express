const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const BootcampSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name'],
        unique:true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 chars' ]
    },
    slug: String,
    description:{
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Desc can not be more than 500 chars' ]
    },
    website:{
        type: String,
        match:[
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid url with http or https '
        ]
    },
    phone:{
        type: String,
        maxlength: [20, 'phone can not be more than 20 chars' ]
    },
    email:{
        type: String,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please use a valid email '
        ]
    },
    address:{
        type: String,
        required: [true, 'Please add an address'],
    },
    location:{
        //GEOJSON Point
        type:{
            type: String,
            enum: ['Point'],
            //required: true
        },
        coordinates:{
            type: [Number],
            //required : true,
            index: '2dsphere'
        },
        formattedAddress:String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other']

    },
    averageRating:{
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10 ']
    },
    averageCost:Number,
    photo:{
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance:{
        type: Boolean,
        default: false
    },
    jobGuarantee:{
        type: Boolean,
        default: false
    },
    acceptGi:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {
    //62 utilizacion de virtuales
    toJSON: {
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
})

//46 crear un middleware post accion
//para cuando seregistre nombre del botcamp
//se crea la url - similar a un trigger en bd
//utilizamos slugify

BootcampSchema.pre('save', function(next){
    this.slug = slugify(this.name , { lower : true })
    next()
})

//48 Geocode para el campo localizacion
BootcampSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address)
    this.location={
        type: 'Point',
        coordinates: [loc[0].longitude , loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street :loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].country
    }
    this.address = undefined
    next()
})

//64 cascadedelete courses  when a bootcamp is deleted
BootcampSchema.pre('remove' , async function(next){
    console.log(`Courses being removed from bootcamp ${this._id}`)
    await this.model('Course').deleteMany({ bootcamp: this._id})
    next()
})

//62 reverse populate con virtuals
BootcampSchema.virtual('courses', 
{
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
})

module.exports=mongoose.model('Bootcamp' , BootcampSchema)