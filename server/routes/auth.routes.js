const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const {userRegister} = require('../middlewares/validator')
const {isAuth} = require('../middlewares/auth');

const router = Router();

router.get('/test', (req, res) => {
    res.json('Auth router works!')
});

router.get('/session', isAuth, authController.session);
router.post('/register', userRegister, authController.validatorHandler, authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;