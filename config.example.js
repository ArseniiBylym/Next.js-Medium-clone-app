// Rename this file to config.js and change values if needed;
const dev = process.env.NODE_ENV !== 'production';
let CONFIG;
if (dev) {
    CONFIG = {
        PORT: process.env.PORT || '3000',
        BASE_URI: process.env.BASE_URI || 'http://localhost:3000',
        MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/medium-app',
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
        JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1d',
    }
} else {
    CONFIG = {
        PORT: process.env.PORT || '3000',
        BASE_URI: process.env.BASE_URI || 'https://medium-next-app.herokuapp.com',
        MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb+srv://<USER_NAME>:<PASSWOR>@cluster1-4efxb.mongodb.net/<DB_NAME>?retryWrites=true',
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
        JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1h',

    }
}

module.exports = CONFIG;

