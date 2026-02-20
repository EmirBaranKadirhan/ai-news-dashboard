const Parser = require('rss-parser');
const parser = new Parser();
const News = require('../models/News')
const { summarizeNews } = require('./aiService')


const fetchAndSaveNews = async () => {

    try {
        const feed = await parser.parseURL("https://rss.haberler.com/rss.asp");

        const items = feed.items.slice(0, 9)
        console.log(items)
        // console.log(Object.keys(feed))       ==> bir cok veri gormek yerine icindeki keys gormek icin bu sekilde kullanabiliriz


        for (const item of items) {

            const finalImageUrl =
                item.enclosure?.url ||
                item.imageUrl ||
                item['media:content']?.['$']?.url ||
                (item.content || item.contentSnippet || '').match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ||
                null;

            const aiData = await summarizeNews(item.summary, item.contentSnippet || item.content)

            await News.findOneAndUpdate(
                { link: item.link },                // Linke göre kontrol edilecek
                {
                    title: item.title,
                    link: item.link,
                    content: item.contentSnippet,
                    publishDate: new Date(item.isoDate),
                    imageUrl: finalImageUrl,
                    aiSummary: aiData.aiSummary,
                    aiCategory: aiData.aiCategory,
                    aiSentiment: aiData.aiSentiment,


                },
                { upsert: true, returnDocument: "after" }     //Upsert" stratejisi: Haber varsa güncelle, yoksa yeni oluştur
            )

        }
        console.log(`${items.length} haber basariyla islendi`)
    } catch (error) {

        console.log("Haber cekme servisi hatasi", error)
    }

}


module.exports = { fetchAndSaveNews }

