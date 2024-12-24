import fs from 'fs/promises';

const accessFile = async () => {
    try {
        // console.log(process.cwd()); In case u dont know the current working directory 
        // Read the file and parse its content
        const data = await fs.readFile('./devData/data/tours-simple.json', "utf-8"); // file path according to current working directory
        if (!data ) {
            throw new Error("File is empty or contains invalid data");
        }
        return JSON.parse(data); // Return parsed JSON directly
    } catch (err) {
        console.error("Error reading tours file:", err.message); // Log the error
    }
};

//Checks if the request is valid , acts as a middlewear
const checkId = async(req , res , next , val) =>{
    try {
        const id = req.params.id * 1; // converting from type string to int by multplying by an int 
        const tours = await accessFile();
        if (id > tours.length - 1) throw new Error("id limit exceeded");
    } catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: 'Id not valid',
            error: `${err}`,
        });
    }
    next();
}

//Validates the request's body , acts as a middlewear btw router and createTour
const validateCreateReq = async(req , res , next ) => {
    if (!req.body.name || !req.body.duration) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing required fields: name or duration',
        });
    }
    next();
}


const getAllTour = async (req, res) => {
    try {
        const data = await accessFile(); // async call in event loop
        //status ok
        res.status(200).json({
            status: 'success',
            results: data.length,
            requestAt: req.requestTime,
            data: {
                tours: data,
            }
        });
    } catch(err) {
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
        const id = req.params.id * 1; // converting from type string to int by multplying by an int 
        const tours = await accessFile();
        tours.find(ele => ele.id === id); // using find function with its validator function to find matchig ids / elemets 
        res.status(200).json({
            status: 'success',
            message: `Tour with id ${id} found successfully`,
            tour: tours,
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
            error: `${err}`,
        });
    }
}

const createTour = async(req , res) => {
    try {
        const tours = await accessFile();

        const tourId = tours[tours.length - 1]?.id + 1 || 1; // Handle empty tours array
        const newTour = { id: tourId, ...req.body };

        tours.push(newTour);
        await fs.writeFile('./devData/data/tours-simple.json', JSON.stringify(tours)); // Corrected path

        // status code - 201 => data generated / created successfully
        res.status(201).json({
            status: 'success',
            message: `Tour ${tourId} successfully created`,
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).json({
            status: 'fail',
            message: 'Server error',
        });
    }
}

const updateTour = (_ , res) => {
    //to be finished 
    res.status(500).josn({
        status: 'fail',
        message: 'Server error/ Not Created',
    })
}

const deleteTour = (_ , res) => {
    //to be finished
    res.status(500).josn({
        status: 'fail',
        message: 'Server error/ Not Created',
    }) 
}

const tourControllers = {
    accessFile,
    deleteTour,
    getAllTour,
    getTourById,
    updateTour,
    createTour,
    checkId ,
    validateCreateReq,
}

export default tourControllers ; 