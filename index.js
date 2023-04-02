import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './config/dbConnection.js';
import userRoute from './routes/user.route.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// db
dbConnection();

// routes
app.use('/api/v1/user', userRoute);

// 404 error handle
app.use((req, res, next) => {
    next('url is not correct please check it');
});

// global error handle
app.use((err, req, res, next) => {
    if(!res.headersSend) {
        if(err.message) {
            res.status(500).json({
                status: 'fail',
                message: err.message
            })
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'something is wrong or url is not correct'
            })
        }
    } else {
        next('something is wrong');
    }
});

app.listen(port, () => console.log('app is runing....'));