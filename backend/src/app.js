const express = require('express')
const cors = require('cors');
const app = express();
const newsRoutes = require('./routes/newsRoutes')


app.use(cors());    // middlewares yapilari route'lardan once gelir !
app.use(express.json())     // Json okuma destegi

// Route'lar gelecek


app.use('/api/news', newsRoutes)

module.exports = app;