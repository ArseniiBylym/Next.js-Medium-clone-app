const CONFIG = {
    node_env: process.env.NODE_ENV || 'production',
    port: process.env.PORT || '3000',
    mongo_db_uri: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/medium-app',
    jwt_secret: process.env.JWT_SECRET_KEY || 'secret',
    jwt_expiration_time: process.env.JWT_EXPIRATION_TIME || '1h',
    base_uri: process.env.BASE_URI || '',
}

module.exports = CONFIG;