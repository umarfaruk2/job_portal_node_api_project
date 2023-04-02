import userModel from "../models/user.schema.js";

export const create_user_service = async (data) => {
    const result = await userModel.create(data);
    return result;
}

export const find_user_service = async (email) => {
    const result = await userModel.findOne({email: email});
    return result;
}