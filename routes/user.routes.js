const {Router} = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/test', (req, res) => {
    res.json('User router works!')
});

router.post('/register', userController.validateRegister, userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


module.exports = router;