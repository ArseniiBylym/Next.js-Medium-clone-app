const {Router} = require('express');

const router = Router();

router.get('/test', (req, res, next) => {
    res.json('Article router wors!')
});
// router.get('/', () => {});

module.exports = router;