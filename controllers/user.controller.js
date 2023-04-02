import { create_user_service, find_user_service } from "../services/user.services.js";
import bcrypt from 'bcrypt';
import { gen_access_token, gen_refresh_token } from "../utils/genToken.js";

export const create_user_controller = async (req, res, next) => {
    try {
       const user = await create_user_service(req.body);
       
       if(!user) {
            res.status(403).json({
                status: 'fail',
                message: 'User already have an account'
            })
       }
       res.status(200).json({
            status: 'success',
            message: "Create new user successfully"
       })
    } catch (error) {
       next(error);
    }
}

export const login_controller = async (req, res, next) => {
    try {
       const { email, password } = req.body; 

       if(!email && !password) {
            res.status(401).json({
                status: 'fail',
                message: 'Please provide your credentials'
            })
       } else {
            const user = await find_user_service(email);
            if(!user) {
                res.status(401).json({
                    status: 'fail',
                    message: 'You have no account please sign up first and try again'
                })
            } else {
                const comPass = bcrypt.compareSync(password, user.password);
                if(!comPass) {
                    res.status(401).json({
                        status: 'fail',
                        message: 'Please provide valid password or email'
                    })
                } else {
                    const accessToken = gen_access_token(user);
                    const refreshToken = gen_refresh_token(user);
                    
                    const { password: pwd, ...others } = user.toObject();
                    res.status(200).json({
                        status: 'success',
                        data: others,
                        accessToken,
                        refreshToken
                    })
                }
            }
       }
    } catch (error) {
       next(error); 
    }
} 