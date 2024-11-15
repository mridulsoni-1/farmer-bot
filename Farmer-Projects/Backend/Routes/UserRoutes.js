const express = require('express');
const { createUser, LoginUser } = require('../Middleware/UserMiddleware');


const UserRoutes = express.Router();

UserRoutes.post('/signup',createUser);
UserRoutes.post('/signin',LoginUser);

module.exports = (UserRoutes)