import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import appError from "../utils/appError.js";
import catchAsync from "../utils/asyncCatch.js";

dotenv.config();

const getToken = async id =>{
    return jwt.sign({id} , process.env.JWT_SECRET ,{
        expiresIn: process.env.JWT_EXPIRES ,
    })
}
const userSignup = async(req , res) =>{
    try{
        // now doing await userModel.create(req.body) sicnce anyone can temper with user roles as admin
        const newUser = await userModel.create({
            name : req.body.name , 
            email : req.body.email , 
            password : req.body.password, 
            confirmPassword : req.body.confirmPassword , 
        });

        const token = await getToken(_id); 

        res.status(201).json({
            status: 'Success/Created',
            message: 'New User successfully created',
            token , 
            newUser ,
        })
    }catch(err){
        res.status(400).json({
            status: 'Bad request',
            err: `${err.message}`,
        })
    }
};

const userSignin = catchAsync(async(req , res , next) =>{
    
        const {password , email} = req.body;
        // check email and password exists
        if(!password || !email){
            return next(new appError('Password/Email missing ' , 404));
        }
        // select+pass since select for password is false 
        const user = await userModel.findOne({email: email}).select('+password');
        // console.log(user); // debug
        if(!user || !(await user.validateUserPass(password , user.password))) {
            return next(new appError('Invalid Email/Password ' , 401));
        }
        //send the valid user a jwt token
        const token = await getToken(user._id); 
        res.status(200).json({
            token , 
            message: 'sigin successfully',  
        })
});

const isLogged = catchAsync(async (req, _, next) => {
    // is there a token 
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // splitting into an array and accessing at the same time  
        token = req.headers.authorization.split(' ')[1];
    }
    // verify the token
    // console.log(token); // debug
    if (!token) {
        next(new appError('Not logged in ', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    // Check if user still exists 
    const currentUser = await userModel.findOne({ _id: decoded.id });
    if (!decoded.id || !currentUser) {
        return next(new appError('User not found', 401));
    }
    // Did users changed password ? 
    // Using an instance in models ( FAT model , THIN controller)
    if (await currentUser.changedPassword(decoded.iat)) {
        return next(new appError('User password has been recently changed , please login again', 401));
    }
    req.user = currentUser; // Useful for future puropose 
    next();
});

const authControllers = {
    userSignup,
    userSignin,
    isLogged,
};

export default authControllers ;