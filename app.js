import express from 'express';
import Morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js'; // Import default export
import userRouter from './routes/userRoutes.js'; // Import default export

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(Morgan('dev'));  // Logging middleware

// Attach a timestamp to every request
app.use((req, _, next) => {
    const date = new Date();
    req.CreatedAT = date.toDateString(); // Corrected function call
    next();
});

// Routes
app.use('/api/v1/Tours', tourRouter);  // Attach tourRouter to the route
app.use('/api/v1/Users', userRouter);  // Attach userRouter to the route

export default app;
