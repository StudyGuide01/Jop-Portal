import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//routes
import UserRouter from './routes/user.router.js';
import CompanyRouter from './routes/company.router.js';
import JobRouter from './routes/job.router.js';
import ApplicationRouter from './routes/application.router.js';
//middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOptions));

//api endpints
app.use('/api/v1/user',UserRouter);
app.use('/api/v1/company',CompanyRouter)
app.use('/api/v1/job',JobRouter);
app.use('/api/v1/application',ApplicationRouter);
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port:${PORT}`);
})