const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const CONFIG = require('../config/env');
const userRoutes = require('../routes/user.routes');
const articleRoutes = require('../routes/article.routes');

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
    server.use(express.json())

    // Handle Next.js's requests
    server.get("/_next/*", (req, res) => {
        handle(req, res);
    });
    server.get("/static/*", (req, res) => {
        handle(req, res);
    });

    // Custom api routes
    server.use('/api/user', userRoutes)
    server.use('/api/article', articleRoutes)

    // Error handler
    server.use((err, req, res, next) => {
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
