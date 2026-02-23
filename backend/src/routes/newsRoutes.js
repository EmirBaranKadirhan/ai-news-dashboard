const express = require('express');
const router = express.Router();
const { getAllNews, getNewsById } = require('../controllers/newsController')
const News = require('../models/News')



router.get('/', getAllNews)

router.get('/:id', getNewsById)


module.exports = router