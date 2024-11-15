const  express = require('express');
const { CreateFarm } = require('../Middleware/AiMiddleware');

const AiRoutes = express.Router();

AiRoutes.post('/createfarm',CreateFarm);  



module.exports = (AiRoutes)