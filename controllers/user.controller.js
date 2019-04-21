
exports.login = async (req, res) => {

}

exports.register = async (req, res) => {

}

exports.logout = async (req, res) => {

}

exports.validateRegister = async (req, res, next) => {
    console.log('user validation');

    next();
}

exports.isAuth = async (req, res, next) => {
    console.log('Is user auth');
    next();
}