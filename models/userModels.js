import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    //name
    name: {
        type: String , 
        required:[true ,'Name is required'],
    },
    //email
    email: {
        type: String , 
        validate: [validator.isEmail, 'Enter a Valid Email Address'],
        lowercase:true ,
        unique: true ,
        required:[true ,'Name is required'],
    },
    //photo
    photo: {
        type: String , 
    },
    //password
    password: {
        type: String , 
        select: false ,
        required:[true ,'Password is required'],
        minLength:[8,'Password length not enough (min:8characters)'], 
    },
    //confirmPassword
    confirmPassword: {
        type: String , 
        select: false , 
        required:[true ,'Password is required'],
        //Works ony on SAVE and CREATE  
        validate:[function(pass){
            return pass === this.password ;
        },`Password Dosen't match` ],
    }
});

const userModel = mongoose.model('userModel',userSchema);

export default userModel ; 