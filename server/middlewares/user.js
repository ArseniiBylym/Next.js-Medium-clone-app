const multer = require('multer');
const jimp = require('jimp');
const jwt = require('jsonwebtoken');

exports.uploadAvatar = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 1024 * 1024 * 1},
    fileFilter: (req, file, next) => {
        if (file.mimetype.startWith('image/')) {
            return next(null, true);
        } else {
            return next(null, false);
        }
    }
}).single('avatar');

exports.resizeAvatar = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const fileExt = req.file.mimetype.split('/')[1];
    req.body.avatar = `./static/uploads/avatars/${req.user._id}-${Date.now()}.${fileExt}`;
    const image = await jimp.read(req.file.buffer);
    await image.resize(250, jimp.AUTO);
    await image.write(`./${req.body.avatar}`);
    next();
};

exports.getUser = async (req, res, next) => {
    console.log('inside getUser')
    console.log(req.cookies)
    const token = req.cookies.token ? req.cookies.token.split(' ')[1] : null;
    if (!token) {
        return next();
    }
    try {
        const decodedToken = jwt.verify(token, CONFIG.jwt_secret);
        req.user = decodedToken;
        next();
    } catch (error) {
        next();
    }
}
