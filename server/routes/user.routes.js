const {Router} = require('express');
const userController = require('../controllers/user.controller');
const validator = require('../midlewares/validator')

const router = Router();

router.get('/test', (req, res) => {
    res.json('User router works!')
});

router.post('/register', validator.userRegister, userController.validatorHandler, userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


module.exports = router;