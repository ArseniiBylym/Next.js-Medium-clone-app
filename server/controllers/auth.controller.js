const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const CONFIG = require('../../config');

exports.session = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) throw Error('User not found');
        res.status(200).json(user.toWebShort());
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
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
        const token = jwt.sign({email: user.email, _id: user._id, name: user.name, avatar: user.avatar}, CONFIG.server.JWT_SECRET_KEY, {expiresIn: CONFIG.server.JWT_EXPIRATION_TIME});

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
        const token = jwt.sign({email: user.email, _id: user._id.toString()}, CONFIG.server.JWT_SECRET_KEY, {expiresIn: CONFIG.server.JWT_EXPIRATION_TIME});

        res.cookie('token', `Bearer ${token}`, {httpOnly: true});
        res.status(201).json(user.toWebShort());
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json('You successfully loged out');
};

exports.validatorHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0].msg);
    }
    next();
};
