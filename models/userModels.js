import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    },
    passwordChangedAt: Date , 
});

// pre middlewear for password encryption -> works when new user is created 
userSchema.pre('save', async function (next) {
    // If the password field is not modified, skip hashing
    if (!this.isModified('password')) return next();

    // Hash the password with a cost factor of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Remove the confirmPassword field
    this.confirmPassword = undefined;

    next();
});

//instance method for user verification
// returns @promise of the comparision 
userSchema.methods.validateUserPass =  function(candidatePass , userPass){
    //using userPass since cannot select this.password
    return  bcrypt.compare(candidatePass , userPass);
}

//instance method for authorization 
userSchema.methods.changedPassword = function(JWTtimestamp){
    if(this.passwordChangedAt){
        // Equalizing both in ms 
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() /1000 , 10);
        return changedTimeStamp > JWTtimestamp ? true : false ;
    }
    return false;
}

const userModel = mongoose.model('userModel',userSchema);

export default userModel ; 