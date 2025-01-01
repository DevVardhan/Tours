import mongoose from "mongoose";
import validator from "validator";

// Test database by creating a model
// currently not calling the function
const createTour = async() => {
    try {
        const testTour = new tourModel({
            name: 'A new day',
            rating: 3,
            price: 12133,
        })

        const doc = await testTour.save();
        if(process.env.NODE_ENV === 'development')console.log(doc); 
    } catch (err) {
        console.log(err);
    }
}



// Creating a tours Schema for our tour Model
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have  a name '], // an array with error string in case the requirement is not met
        unique: true,
        trim : true ,
        maxLength:[40 ,'Name must be less than 40characters'],
        minLength:[5 , 'Too small name'],
        // validate: [validator.isAlpha , 'Tour name must only contain valid characters'] // 3rd party middlewear
    },
    duration: {
        type: Number,
        required: [true, 'duration is required'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'group size is required'],
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is required'],
        enum:{
            values: ['easy','medium','difficult'],
            message:'set difficulty to easy/medium/difficult',
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1 ,'Rating must be gte 1 '],
        max: [5 , 'Ratings must be less then equal to 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    discount: {
        type: Number,
        //Wont work on update
        validate:{
            validator: function(val){
                //this point to document while creating 
            return val < this.price;
        },
        message: `discount value ({VALUE}) exceeds the price`,    
    }
    },
    summary: {
        type: String ,
        trim :true , 
        required : [true , 'Summary is requires'] ,
    },
    description: {
        type: String ,
        trim: true ,
    },
    imageCover : {
        type: String , 
        required: [true , 'Cover Image is required'],
    },
    images : {
        type: [String],
    },
    createdAt:{
        type: Date ,
        default : Date.now(),
        select : false , 
    },
    startDate: {
        type: [Date] , 
    }
},{
    toJSON: {virtuals: true} , 
    toObject:{virtuals: true} ,
})

//virtual properties
//Cannot use this props in query since they are not actually in our databse but calculated each time the request is recived
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7 ;
})

// creating a tourModel with toursSchema
const tourModel = mongoose.model('tourModel', tourSchema);        
        
export default tourModel ; 

