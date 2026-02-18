const express = require('express')
const app = express();
const newsRoutes = require('./routes/newsRoutes')

app.use(express.json())     // Json okuma destegi

// Route'lar gelecek

app.use('/api/news', newsRoutes)

module.exports = app;