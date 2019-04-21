const {Router} = require('express');
const userController = require('../controllers/user.controller');
const validator = require('../midlewares/validator')
const isAuth = require('../midlewares/isAuth');

const router = Router();

router.get('/test', (req, res) => {
    res.json('User router works!')
});

router.get('/session', isAuth, userController.session);
router.post('/register', validator.userRegister, userController.validatorHandler, userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


module.exports = router;