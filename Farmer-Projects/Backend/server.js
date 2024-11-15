const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UserRoutes = require('./Routes/UserRoutes');
const DashboardRoutes = require('./Routes/DashboardRoutes');
require("./Connection/conn")
const cookieParser = require('cookie-parser');
const AiRoutes = require('./Routes/AiRoutes');
const cors = require('cors');

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.use(UserRoutes)
app.use(DashboardRoutes)
app.use(AiRoutes)




app.listen(process.env.PORT, () => {
  console.log('Server started');
});



