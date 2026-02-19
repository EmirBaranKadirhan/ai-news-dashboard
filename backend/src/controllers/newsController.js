const News = require('../models/News')



const getAllNews = async (req, res) => {

    try {



        const limit = Number(req.query.limit) || 10;    // limit ==> her sayfada kac veri olacak onu belirler
        const page = Number(req.query.skip) || 1;       // page(skip) ==> kullanici hangi sayfada



        const skipValue = (page - 1) * limit;      // Önceki sayfaların toplam veri miktarını hesaplar. Örn: 2. sayfadaysak, 1 sayfa dolusu veriyi (limit kadar) atlamamız gerekir.

        const totalNews = await News.countDocuments();

        const news = await News.find()
            .sort({ publishDate: -1 }) // En yeni haberi en üstte gör
            .skip(skipValue)
            .limit(limit);
        res.status(200).json({
            total: totalNews,        // frontend buradan kac haber oldugunu gorecek
            currentPage: page,      // "Ben şu an 2. sayfadayım" diyecek
            totalPages: Math.ceil(totalNews / limit), // Toplam kaç sayfa olduğunu backend hesaplasın ve front tarafinda toplam sayfa sayisini gonderir
            data: news
        })



    } catch (error) {
        res.status(500).json({ message: "Haberler getirilirken bir hata oluştu", error: error.message });
    }

}


module.exports = { getAllNews }