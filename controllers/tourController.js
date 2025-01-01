// import fs from 'fs/promises';

import pipe from '../utils/pipeAgg.js';
import tourModel from '../models/tourModel.js';
import apiFeature from '../utils/apiFeatures.js';

// ============================= NOT USING FILES AS DATABASE ======================================
// const accessFile = async () => {
//     try {
//         // console.log(process.cwd()); In case u dont know the current working directory 
//         // Read the file and parse its content
//         const data = await fs.readFile('./devData/data/tours-simple.json', "utf-8"); // file path according to current working directory
//         if (!data ) {
//             throw new Error("File is empty or contains invalid data");
//         }
//         return JSON.parse(data); // Return parsed JSON directly
//     } catch (err) {
//         console.error("Error reading tours file:", err.message); // Log the error
//     }
// };
//

// ============================== VALIDATION LOGIC NOW IN MODELS ITSELF (Business logic) =============================
// //Checks if the request is valid , acts as a middlewear
// const checkId = async(req , res , next , val) =>{
//     try {
//         const id = req.params.id * 1; // converting from type string to int by multplying by an int 
//         const tours = await accessFile();
//         if (id > tours.length - 1) throw new Error("id limit exceeded");
//     } catch (err) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Id not valid',
//             error: `${err}`,
//         });
//     }
//     next();
// }

// ============================== VALIDATION LOGIC NOW IN MODELS ITSELF (Business logic) =============================
//Validates the request's body , acts as a middlewear btw router and createTour
// const validateCreateReq = async(req , res , next ) => {
//     if (!req.body.name || !req.body.duration) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing required fields: name or duration',
//         });
//     }
//     next();
// }

const alaisTopTours = (req , _ , next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

const getAllTour = async (req, res) => {
    try {

        const features = new apiFeature(tourModel.find(), req.query)
            .filter()
            .sort()
            .paginate()
            .limitFileds();

        const data = await features.query;

        res.status(200).json({
            status: 'success',
            results: data.length,
            requestAt: req.requestTime,
            data: {
                tours: data,
            }
        });
    } catch (err) {
        //internal server error 
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: `${err}`,
        });
    }
}

const getTourById = async (req, res) => {
    try {
        const id = req.params.id;
        const tours = await tourModel.findOne({ _id: id });

        res.status(200).json({
            status: 'success',
            message: `Tour ${id} found successfully`,
            tour: tours,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: `${err}`,
        });
    }
}

const createTour = async (req, res) => {
    try {

        const newTour = await tourModel.create(req.body); // Creating Document for new tour 

        // status code - 201 => data generated / created successfully
        res.status(201).json({
            status: 'success',
            message: `Tour successfully created`,
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(400).json({
            status: 'fail',
            message: 'Bad Request',
            error: `${err.message}`
        });
    }
}

const updateTour = async (req, res) => {
    try {
        const id = req.params.id;

        // findOneAndUpdate(filter , Object to update , Addons);
        const tour = await tourModel.findOneAndUpdate({_id : id}, req.body, {
            new: true,
            runValidators: true ,
        })

        res.status(200).json({

            status: 'Success',
            message: 'Tour updated successfully',
            UpdatedTour: {
                tour
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'Bad request',
            error : `${err.message}`,
        })
    }

}

const deleteTour = async (req, res) => {
    try {
        const id = req.params.id;

        await tourModel.deleteOne({ _id: id });

        res.status(200).json({
            status: 'Success',
            messege: 'Tour deleted successfully',
            // Common Practice not to send any data on delete operations
            // data: {
            //     tour,
            // }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Bad Request',
            error: `${err.message}`
        })
    }
}

const getTourStats = async (req, res) => {
    try {
        const field = req.query.field;
        const stats = await pipe(tourModel , field);
        res.status(200).json({
            status: 'Success',
            messege: 'Stats analysed successfully',
            stats
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'Bad Request',
            error: `${err.message}`
        })
    }
}

const tourControllers = {
    // accessFile,
    deleteTour,
    getAllTour,
    getTourById,
    updateTour,
    createTour,
    // checkId ,
    // validateCreateReq,
    alaisTopTours,
    getTourStats,
}

export default tourControllers; 