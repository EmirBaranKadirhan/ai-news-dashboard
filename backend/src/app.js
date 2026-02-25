const express = require('express')
const cors = require('cors');
const app = express();
const newsRoutes = require('./routes/newsRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')


app.use(cors());    // middlewares yapilari route'lardan once gelir !
app.use(express.json())     // Json okuma destegi

// Route'lar gelecek


app.use('/api/news', newsRoutes)


app.use(errorMiddleware)

module.exports = app;