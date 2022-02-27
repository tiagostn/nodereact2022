require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


class AppController {
    constructor() {
        this.express = express();

        this.security();
        this.middlewares();
        this.openApi();
        this.routes();
    }

    security() {
        this.express.use(cors());
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require('./routes'));
    }

    openApi() {
        const openApiOptions = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'NodeReact2022 api',
                    version: '1.0.0',
                    description: 'Study api for Node express and React JS 2022',
                    contact: {
                        name: 'Tiago Sant\'Ana',
                        email: 'tiago.santana@gmail.com'
                    }
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'local'
                    }
                ],
            },

            apis: ['./src/routes.js']
        };
        const specs = swaggerJSDoc(openApiOptions);
        this.express.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    }
}

module.exports = new AppController().express;