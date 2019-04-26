const User = require('../models/User.model');
const Article = require('../models/Article.model');

exports.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users.map(user => user.toWebShort()))
}

exports.getUser = async (req, res, next) => {
    const _id = req.params.userId;
    const user = await User.findById(_id);
    if (!user) {
        return res.status(400).json('User not found');
    }
    res.status(200).json(user.toWeb());
}

exports.updateUser = async (req, res, next) => {
    const updatedUser = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {new: true, runValidators: true},
    )
    res.status(202).json(updatedUser);
}

exports.deleteUser = async (req, res, next) => {
    const deletedUser = await User.findOneAndDelete({_id: req.params.userId});
    res.status(204).json(deletedUser)
}

exports.follow = async (req, res, next) => {
    const {followId} = req.body;
    const followedUser = await User.findOneAndUpdate(
        {_id: followId},
        {$addToSet: {followers: req.user._id}},
        {new: true},
    );
    if (!followedUser) {
        return res.status(400).json('User not found');
    }
    const user = await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {following: followId}},
        {new: true},
    )
    res.status(201).json(user.toWeb())
}

exports.unfollow = async (req, res, next) => {
    const {followId} = req.body;
    const followedUser = await User.findOneAndUpdate(
        {_id: followId},
        {$pull: {followers: req.user._id}},
        {new: true},
    );
    if (!followedUser) {
        return res.status(400).json('User not found');
    }
    const user = await User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {following: followId}},
        {new: true},
    )
    res.status(201).json(user.toWeb())
}

exports.addBookmark = async (req, res, next) => {
    const {articleId} = req.body;
    const article = await Article.findById(articleId);
    if (!article) {
        return res.status(400).json('Article not found');
    }
    const user = await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {bookmarks: followId}},
        {new: true},
    )
    res.status(201).json(user.toWeb());
}

exports.removeBookmark = async (req, res, next) => {
    const {articleId} = req.body;
    const user = await User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {bookmarks: followId}},
        {new: true},
    )
    res.status(201).json(user.toWeb());
}

