const CONFIG = {
    server: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || '3000',
        MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/medium-app',
        JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1d',
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
        // BASE_URI: process.env.BASE_URI  || 'http://localhost:3000',
        BASE_URI: process.env.BASE_URI,
    },
    client: {
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
        // BASE_URI: process.env.BASE_URI  || 'http://localhost:3000',
        BASE_URI: process.env.BASE_URI,
    }
}

module.exports = CONFIG;
