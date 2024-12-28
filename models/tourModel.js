import mongoose from "mongoose";

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
        if(provess.env.NODE_ENV === 'development')console.log(doc); 
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
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        // max: 5, // can also set min props 
    },
    ratingsQunatity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    discount: {
        type: Number,
        
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
    },
    startDate: {
        type: [Date] , 
    }
    
})

// creating a tourModel with toursSchema
const tourModel = mongoose.model('tourModel', tourSchema);        
        
export default tourModel ; 

