const {Router} = require('express');
const usersController = require('../controllers/users.controller');
const validator = require('../middlewares/validator')
const {isAuth, isOwner} = require('../middlewares/auth');
const {uploadAvatar, resizeAvatar} = require('../middlewares/user');

const router = Router();

router.get('/test', (req, res) => {
    res.json('Users router works!')
});

router.get('/', usersController.getUsers);
router.put('/follow', isAuth, usersController.follow);
router.put('/unfollow', isAuth, usersController.unfollow);
router.put('/add-bookmark', isAuth, usersController.addBookmark);
router.put('/remove-bookmark', isAuth, usersController.removeBookmark);
router
    .route('/:userId')
        .get(usersController.getUser)
        .put(isAuth, isOwner, uploadAvatar, resizeAvatar, usersController.updateUser)
        .delete(isAuth, isOwner, usersController.deleteUser);


module.exports = router;