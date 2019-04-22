const Article = require('../models/Article.model');
const User = require('../models/User.model');

exports.getArticles = async (req, res, next) => {
    const articles = await Article.find().select('-text -comments').populate('author', '_id name avatar');
    res.status(200).json(articles);
}

exports.postArticle = async (req, res, next) => {
    const article = await new Article({...req.body, author: req.user._id}).save();
    await Article.populate(article, {
        path: 'author',
        select: '_id name avatar'
    })
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {articles: article._id}}
    )
    res.status(201).json(article);
}

exports.getArticle = async (req, res, next) => {
    const {articleId} = req.params;
    const article = await Article.findById(articleId)
    res.status(200).json(article)
}

exports.updateArticle = async (req, res, next) => {
    console.log(req.body)
    const {articleId} = req.params;
    const updatedArticle = await Article.findOneAndUpdate(
        {_id: articleId},
        {$set: req.body},
        {new: true, runValidators: true},
    )
    res.status(200).json(updatedArticle);
}

exports.deleteArticle = async (req, res, next) => {
    const {articleId} = req.params;
    const deletedArticle = await Article.findOneAndDelete({_id: articleId});
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {articles: deletedArticle._id}}
    )
    res.status(200).json(deletedArticle);
}

exports.clapToArticle = async (req, res, next) => {
    const {articleId} = req.body;
    const updatedArticle = await Article.findOneAndUpdate(
        {_id: articleId},
        {$addToSet: {claps: req.user._id}},
        {new: true, runValidators: true},
    )
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$addToSet: {claps: articleId}}
    )
    res.status(200).json(updatedArticle);
}

exports.addComment = async (req, res, next) => {
    const {articleId, text} = req.body;
    const updatedArticle = await Article.findOneAndUpdate(
        {_id: articleId},
        {$push: {comments: {author: req.user._id, text}}},
        {new: true, runValidators: true},
    )
    res.status(200).json(updatedArticle);
}

exports.removeComment = async (req, res, next) => {
    const {commentId} = req.params;
    const {articleId} = req.body;
    const updatedArticle = await Article.findOneAndUpdate(
        {_id: articleId},
        {$pull: {comments: {_id: commentId}}},
        {new: true, runValidators: true},
    )
    res.status(200).json(updatedArticle);
}