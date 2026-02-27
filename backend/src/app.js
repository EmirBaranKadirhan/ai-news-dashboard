const express = require('express')
const cors = require('cors');
const app = express();
const newsRoutes = require('./routes/newsRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const RateLimit = require('express-rate-limit')

const limiter = RateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: { error: "Çok fazla istek gönderdiniz, lütfen bekleyin." }

})


app.use(cors());    // middlewares yapilari route'lardan once gelir !
app.use(express.json())     // Json okuma destegi
app.use(limiter);

// Route'lar gelecek


app.use('/api/news', newsRoutes)


app.use(errorMiddleware)

module.exports = app;