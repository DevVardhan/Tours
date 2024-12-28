import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import tourModel from '../models/tourModel.js';
import readline from 'readline';

dotenv.config();

const connectDb = async () => {
    try {
        // Connect to the database
        await mongoose.connect(proces.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Server connected to database");

        // Delete current data
        await tourModel.deleteMany();
        console.log("All tours deleted");

        // Load new data
        const toursData = await fs.readFile('./data/tours-simple.json', 'utf-8');
        const tours = JSON.parse(toursData); // Parse JSON data

        // Create new tours
        await tourModel.create(tours);
        console.log("Tours loaded successfully!");

    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        // Close the database connection
        mongoose.connection.close().then(() => {
            console.log("Database connection closed");
        });
    }
};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("DO YOU WANT TO OVERRIDE DATABASE (Y/N)? ", (valid) => {
  if (valid.toUpperCase() === 'Y') {
    connectDb();
  } else {
    console.log("Operation canceled.");
  }
  rl.close(); // Close the input stream
});
