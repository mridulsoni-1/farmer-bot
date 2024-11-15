const axios = require('axios');
const UserModel = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./JwtVerify');


const getWeatherReport = async (location, key) => {
  try {
    console.log(`Using API key: ${key}`); 
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`);
    const weatherData = weatherResponse.data;
    const tempCelsius = weatherData.main.temp;
    const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
    return `Current weather in ${location}: ${weatherData.weather[0].description} with a temperature of ${tempCelsius}°C (${tempFahrenheit}°F)`;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};


const getUserLocation = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user.Address;
  } catch (error) {
    throw new Error(`Error fetching user location: ${error.message}`);
  }
};

exports.weatherReport = async (req, res) => {
  const token = req.headers.authtoken;
  const key = process.env.Weather_API;

  if (!token) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded.response._id) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const userid = decoded.response._id;
    const location = await getUserLocation(userid);
    const weatherReport = await getWeatherReport(location, key);
    return res.send(`Your Weather Report => ${weatherReport}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `server error: ${error.message}` });
  }
}; 