const {Router} = require('express');
const articlesController = require('../controllers/articles.controller')
const {isAuth} = require('../middlewares/auth');
const {isArticleAuthor, isCommentAuthor, uploadArticleImage, resizeArticleImage} = require('../middlewares/article');

const router = Router();

router.route('/')
        .get(articlesController.getArticles)
        .post(isAuth, uploadArticleImage, resizeArticleImage, articlesController.postArticle);

router.route('/claps')
        .put(isAuth, articlesController.clapToArticle);

router.route('/comment/')
        .put(isAuth, articlesController.addComment);

router.route('/comment/:commentId')
        .put(isAuth, isCommentAuthor, articlesController.removeComment);

router.route('/:articleId')
        .get(articlesController.getArticle)
        .put(isAuth, isArticleAuthor, uploadArticleImage, resizeArticleImage, articlesController.updateArticle)
        .delete(isAuth, isArticleAuthor, articlesController.deleteArticle)

module.exports = router;