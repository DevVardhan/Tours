import userModel from "../models/userModels.js";
import apiFeature from "../utils/apiFeatures.js";
import catchAsync from "../utils/asyncCatch.js";

const getAllUsers = catchAsync(async(req, res) => {

    const features = new apiFeature(userModel.find(), req.query)
            .filter()
            .sort()
            .paginate()
            .limitFileds(); 
        
        const Users = await features.query ;

        res.status(200).json({
            status: 'success',
            results: `${Users.length}`,
            Users,
        })
});

const getUserById = (req, res) => {
    // to be finished
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const createUser = (req, res) => {
    // to be finished
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const updateUser = (req, res) => {
    // to be finished
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const deleteUser = (req, res) => {
    // to be finished
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const userControllers = {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    createUser 
}

export default userControllers ;