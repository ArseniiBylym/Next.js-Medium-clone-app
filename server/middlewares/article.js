const multer = require('multer');
const jimp = require('jimp');
const Article = require('../models/Article.model');

exports.isCommentAuthor = async (req, res, next) => {
    const {commentId} = req.params;
    const {articleId} = req.body;
    const article = await Article.findOne({_id: articleId, 'comments._id': commentId, 'comments.author': req.user._id});
    if (!article) {
        return res.status(400).json('You have no access to edit this comment');
    }
    next();
}

exports.isArticleAuthor = async (req, res, next) => {
    const {articleId} = req.params;
    const article = await Article.findOne({_id: articleId, author: req.user._id});
    if (!article) {
        return res.status(400).json('Article is absent or you do not have permissions to edit this article');
    }
    next();
}

exports.uploadArticleImage = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 1024 * 1024 * 2},
    fileFilter: (req, file, next) => {
        if (file.mimetype.startsWith('image/')) {
            return next(null, true);
        } else {
            return next(null, false);
        }
    }
}).single('image');

exports.resizeArticleImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const fileExt = req.file.mimetype.split('/')[1];
    req.body.image = `./static/images/articles/${req.file.filename}-${Date.now()}.${fileExt}`;
    const image = await jimp.read(req.file.buffer);
    await image.resize(1024, jimp.AUTO);
    await image.write(`./${req.body.image}`);
    next();
};
