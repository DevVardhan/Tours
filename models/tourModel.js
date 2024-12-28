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
    },
    rating: {
        type: Number,
        default: 4.5,
        max: 5, // can also set min props 
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    }
})

// creating a tourModel with toursSchema
const tourModel = mongoose.model('tourModel', tourSchema);        
        
export default tourModel ; 

