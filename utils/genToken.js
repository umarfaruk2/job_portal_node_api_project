import jwt from 'jsonwebtoken';

export const gen_access_token = (user) => {
    const payload = {
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '1m'
    });

    return token;
}

export const gen_refresh_token = (user) => {
    const payload = {
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '1d'
    });

    return token;
}