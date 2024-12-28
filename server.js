import app from './app.js'
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();


// mongoose connect with promises
// mongoose.connect(process.env.MONGOURL)
//     .then(() => {
//         console.log("Database Connected Successfully");
//         // console.log("Connections:", con.connections); // Optional
//     })
//     .catch(err => {
//         console.error("Database connection error:", err);
//     });

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Server Connected to database");
    } catch (e) {
        console.log(e);
    }
}


app.listen(process.env.PORT, () => {
    connectDb();
    console.log(`server started `);
})

