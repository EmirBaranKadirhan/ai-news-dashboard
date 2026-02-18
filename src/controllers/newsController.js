const News = require('../models/News')



const getAllNews = async (req, res) => {

    try {

        const news = await News.find().sort({ publishDate: -1 })
        res.status(200).json(news)

    } catch (error) {
        res.status(500).json({ message: "Haberler getirilirken bir hata oluştu", error: error.message });
    }

}


module.exports = { getAllNews }