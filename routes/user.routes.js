const {Router} = require('express');

const router = Router();

router.get('/test', (req, res) => {
    res.json('User router works!')
});

module.exports = router;