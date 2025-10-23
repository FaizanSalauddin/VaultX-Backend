import express from 'express'
import mongoose from "mongoose";
import bodyParser from 'express';
import { config } from "dotenv";
import { connectDB, isConnected } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import passwordRoutes from './routes/passwordRoutes.js'
import { isAuthenticated } from './middleware/Auth.js';
import cors from 'cors'
let app = express();

app.use(bodyParser.json());
// .env setup
config({ path: '.env' })

app.use((req, res, next) => {
    if (!isConnected) {
        connectDB();
    }
    next();
})

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// app.listen(process.env.PORT, () =>
//     console.log(`Server is running on http://localhost:${process.env.PORT}/`)
// );

//Routes

app.use('/api/auth', userRoutes)
app.use('/api/pass', isAuthenticated, passwordRoutes)

export default app;