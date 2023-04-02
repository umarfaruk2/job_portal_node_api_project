import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';


const user_schema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, 'Please provide a user name'],
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                })
            },
            message: '{VALUE} must be more then 6 character'
        }
    },

    confirmPassword: {
        type: String,
        trim: true,
        required: [true, 'Please provide confirm password'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "password does't match"
        }
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'manager', 'candidate'],
            message: '{VALUE} is not right role'
        }
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, 'Please provide a valid mobile number']
    }
}, {
    timestamps: true
});

user_schema.pre('save', function(next) {
    const password = this.password;
    const hashPass = bcrypt.hashSync(password, 10);

    this.password = hashPass;
    this.confirmPassword = undefined;
    next();
})

const userModel = mongoose.model('User', user_schema);

export default userModel;