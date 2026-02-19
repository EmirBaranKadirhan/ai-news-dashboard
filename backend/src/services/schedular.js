const cron = require('node-cron');
const { fetchAndSaveNews } = require('./newService');



cron.schedule("*/30 * * * *", async () => {

    try {
        console.log("Haber kontrolü başlatıldı: " + new Date().toLocaleString());
        await fetchAndSaveNews();
        console.log("İşlem başarıyla tamamlandı.");
    } catch (error) {
        console.log("Scheduler Hatası:", error);
    }



});