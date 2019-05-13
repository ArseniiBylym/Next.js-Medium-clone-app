const jwt = require('jsonwebtoken');
import {JWT_SECRET_KEY} from '../config';

export default function getUserFromToken(req) {
    if (!req.cookies) return null;
    const token = req.cookies.token ? req.cookies.token.split(' ')[1] : null;
    if (!token) {
        return null;
    }
    try {
        const {exp, iat, ...user} = jwt.verify(token, JWT_SECRET_KEY);
        return {...user};
    } catch (error) {
        return null;
    }
}