const routes = require("express").Router();


const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth');

const { User } = require('./app/models');

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    id:
 *     type: string
 *     description: id of the user
 *     example: '333'
 *    name:
 *     type: string
 *     description: name of the user
 *     example: 'Marty Mcfly'
 *    email:
 *     type: string
 *     description: email of the employee
 *     example: 'tiago.santana@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '1234'
 *  UserCreateSession:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of the employee
 *     example: 'tiago.santana@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '1234'
 */


 /**
  * @swagger
  * /sessions:
  *  post:
  *   summary: create user session
  *   description: create user session
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/UserCreateSession'
  *   responses:
  *    200:
  *     description: user authenticated
  *    401:
  *     description: invalide credentials
  *    500:
  *     description: failure in creating session
  */
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

routes.get('/info', (req, res) => {
    return res.json({ version: "1.0.0"});
});

module.exports = routes;