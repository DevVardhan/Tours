import express from 'express';
import Morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js'; // Import default export
import userRouter from './routes/userRoutes.js'; // Import default export
import * as dotenv from 'dotenv';
import globalErrorHandler from './controllers/errorController.js';


const app = express();
dotenv.config(); 

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('./public')); // show static pages via server
//Env set to dev 
if(process.env.NODE_ENV === 'development'){
    app.use(Morgan('dev'));  // Logging middleware
}

// Attach a timestamp to every request
app.use((req, _, next) => {
    const date = new Date();
    req.CreatedAT = date.toDateString(); // Corrected function call
    next();
});

// Routes
app.use('/api/v1/Tours', tourRouter);  // Attach tourRouter to the route
app.use('/api/v1/Users', userRouter);  // Attach userRouter to the route

// Error handeler for invalid routes
app.all('*', (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);

export default app;
