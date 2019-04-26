const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser');

const CONFIG = require('../config/env');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const articlesRoutes = require('./routes/articles.routes');
const {getUser} = require('./middlewares/user');

const port = CONFIG.port;
const dev = CONFIG.node_env !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Common middlewares
    server.use(helmet());
    server.use(compression());
    server.use(cors());
    server.use(express.json());
    server.use(expressValidator());
    server.use(cookieParser());

    // server.use(getUser);

    // Handle Next.js's requests
    server.get("/_next/*", (req, res) => {
        handle(req, res);
    });
    server.get("/static/*", (req, res) => {
        handle(req, res);
    });

    server.get("/profile/:userId", (req, res) => {
        const routeParams = Object.assign({}, req.params, req.query);
        return app.render(req, res, "/profile", routeParams);
    })
    server.get("/article/:articleId", (req, res) => {
        const routeParams = Object.assign({}, req.params, req.query);
        return app.render(req, res, "/article", routeParams);
    })

    // Custom api routes
    server.use('/api/auth', authRoutes);
    server.use('/api/users', usersRoutes);
    server.use('/api/articles', articlesRoutes);

    // Error handler
    server.use((err, req, res, next) => {
        console.log(err);
        const { status = 500, message } = err;
        res.status(status).json(message);
      });

    // Next.js's default routes
    server.get('*', (req, res) => {
        return handle(req, res);
    })

    const mongoseOptions = {
        useNewUrlParser: true,
        useCreateIndex: CONFIG.node_env === 'development'
    }
    mongoose.connect(CONFIG.mongo_db_uri, mongoseOptions)
        .then(() => {
            server.listen(port, error => {
                if (error) throw error;
                console.log(`Server listening on port ${port}`)
            })
        })
        .catch(error => {
            console.log('Connection error')
            console.log(error);
        });
})
