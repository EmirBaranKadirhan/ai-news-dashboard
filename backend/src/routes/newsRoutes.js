const express = require('express');
const router = express.Router();
const { getAllNews, getNewsById, searchNews } = require('../controllers/newsController')
const News = require('../models/News')


router.get('/search', searchNews)

router.get('/:id', getNewsById)

router.get('/', getAllNews)




module.exports = router