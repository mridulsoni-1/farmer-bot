const  express = require('express');
const { weatherReport } = require('../Middleware/DashboardMiddleware');

const DashboardRoutes = express.Router();

DashboardRoutes.post('/dashboard',weatherReport);


module.exports = (DashboardRoutes)