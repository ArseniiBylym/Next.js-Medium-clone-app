const {client} = require('./config');

module.exports = {
    env: {
        JWT_SECRET_KEY: client.JWT_SECRET_KEY,
        BASE_URI: client.BASE_URI,
    },
    exportPathMap: async function(defaultPathMap) {
        return {
            '/': {page: '/index'},
            '/article': {page: '/article'},
            '/article/:articleId': {page: '/article'},
            '/articles': {page: '/articles'},
            '/authors': {page: '/authors'},
            '/login': {page: '/login'},
            '/new-article': {page: '/new-article'},
            '/register': {page: '/register'},
            '/profile': {page: '/profile'},
            '/profile/:userId': {page: '/profile'},
        };
    },
};
