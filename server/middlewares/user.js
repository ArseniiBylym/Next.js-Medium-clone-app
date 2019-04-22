const multer = require('multer');
const jimp = require('jimp');

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
