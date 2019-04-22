const jwt = require('jsonwebtoken');
const CONFIG = require('../../config/env');

exports.isAuth = (req, res, next) => {
    const token = req.cookies.token ? req.cookies.token.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json('User not authorized');
    }
    try {
        const decodedToken = jwt.verify(token, CONFIG.jwt_secret);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(`Invalid token, authorization denied`);
    }
};

exports.isOwner = (req, res, next) => {
    if (req.params.userId !== req.user._id) {
        res.status(401).json('Sorry, tyu have no permission for this route')
    }
    next()
}