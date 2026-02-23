const News = require('../models/News')



const getAllNews = async (req, res) => {

    try {



        const limit = Number(req.query.limit) || 10;    // limit ==> her sayfada kac veri olacak onu belirler
        const page = Number(req.query.page) || 1;       // page(skip) ==> kullanici hangi sayfada

        const skipValue = (page - 1) * limit;      // Önceki sayfaların toplam veri miktarını hesaplar. Örn: 2. sayfadaysak, 1 sayfa dolusu veriyi (limit kadar) atlamamız gerekir.

        const category = req.query.category;   // ?category=AI gibi bir sorgu gelirse onu alırız

        let query = {};
        if (category && category !== "Hepsi") {

            query.aiCategory = category;    // query.aiCategoy seklinde objeye bir alan ekledik

        }



        const totalNews = await News.countDocuments(query);

        const news = await News.find(query) // ilgili kategori haberleri getir
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


const getNewsById = async (req, res) => {
    try {

        const newItem = await News.findById(req.params.id)
        if (!newItem) {
            return res.status(404).json({ message: 'Haber bulunamadı' })
        }
        res.json(newItem);
    } catch (error) {

        res.status(500).json({ message: error.message })
    }

}


module.exports = { getAllNews, getNewsById }