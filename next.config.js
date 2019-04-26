const {client} = require('./config');

module.exports = {
    env: {
        JWT_SECRET_KEY: client.JWT_SECRET_KEY,
        BASE_URI: client.BASE_URI,
    }
}