const User = require('../models/User.model');
const Article = require('../models/Article.model');

exports.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users.map(user => user.withoutPassword()))
}

exports.getUser = async (req, res, next) => {
    const _id = req.params.userId;
    const user = await User.findById(_id)
        .populate('articles', '_id title subTitle image createdAt')
        .populate('likes', '_id title subTitle image createdAt')
        .populate('following', '_id name avatar email')
        .populate('followers', '_id name avatar email');
    if (!user) {
        return res.status(400).json('User not found');
    }
    res.status(200).json(user.withoutPassword());
}

exports.updateUser = async (req, res, next) => {
    const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {new: true, runValidators: true},
    )
        .populate('articles', '_id title image createdAt')
        .populate('likes', '_id title image createdAt')
        .populate('following', '_id name avatar')
        .populate('followers', '_id name avatar');
    if (!user) {
        return res.status(400).json('User not found');
    }
    res.status(202).json(user.withoutPassword());
}

exports.deleteUser = async (req, res, next) => {
    const {_id} = await User.findOneAndDelete({_id: req.params.userId});
    res.status(204).json(_id)
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
    res.status(201).json(user.withoutPassword())
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
    res.status(201).json(user.withoutPassword())
}

exports.addBookmark = async (req, res, next) => {
    const {articleId} = req.body;
    const article = await Article.findById(articleId);
    if (!article) {
        return res.status(400).json('Article not found');
    }
    const user = await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {bookmarks: articleId}},
        {new: true},
    )
    res.status(201).json(user.withoutPassword());
}

exports.removeBookmark = async (req, res, next) => {
    const {articleId} = req.body;
    const user = await User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {bookmarks: articleId}},
        {new: true},
    )
    res.status(201).json(user.withoutPassword());
}

