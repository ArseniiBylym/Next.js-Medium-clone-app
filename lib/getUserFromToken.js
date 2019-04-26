const jwt = require('jsonwebtoken');
const CONFIG = require('../config/env');


export default function getUserFromToken(req) {
    if (!req.cookies) return null;
    const token = req.cookies.token ? req.cookies.token.split(' ')[1] : null;
    if (!token) {
        return null;
    }
    try {
        const {exp, iat, ...user} = jwt.verify(token, CONFIG.jwt_secret);
        return {...user};
    } catch (error) {
        return null;
    }
}