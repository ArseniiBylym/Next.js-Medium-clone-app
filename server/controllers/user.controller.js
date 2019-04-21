const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const CONFIG = require('../../config/env');

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json('Wrong email');
        }
        const isPasswordMatches = await bcrypt.compare(password, user.password);
        if (!isPasswordMatches) {
            res.status(400).json('Wrong password');
        }
        const token = jwt.sign({email: user.email, _id: user._id}, CONFIG.jwt_secret, {expiresIn: CONFIG.jwt_expiration_time});

        res.cookie('token', `Bearer ${token}`, {httpOnly: true});
        res.status(201).json(user.toWebShort());
    } catch (error) {
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await new User({name, email, password: encryptedPassword}).save();
        const token = jwt.sign({email: user.email, _id: user._id.toString()}, CONFIG.jwt_secret, {expiresIn: CONFIG.jwt_expiration_time});

        res.cookie('token', `Bearer ${token}`, {httpOnly: true});
        res.status(201).json(user.toWebShort());
    } catch (error) {
        
        next(error);
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json('You successfully loged out')
};

exports.validatorHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0].msg);
    }
    next();
};

exports.isAuth = async (req, res, next) => {
    console.log('Is user auth');
    next();
};
