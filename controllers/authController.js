import userModel from "../models/userModels.js";

const userSignup = async(req , res) =>{
    try{
        const newUser = await userModel.create(req.body);
        res.status(201).json({
            status: 'Success/Created',
            message: 'New User successfully created',
            newUser ,
        })
    }catch(err){
        res.status(400).json({
            status: 'Bad request',
            err: `${err.message}`,
        })
    }
};

const authControllers = {
    userSignup,
};

export default authControllers ;