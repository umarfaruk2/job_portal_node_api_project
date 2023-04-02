import express from 'express';
import { create_user_controller, login_controller } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.post('/sign-up', create_user_controller)
userRoute.post('/login', login_controller)


export default userRoute;