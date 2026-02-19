require('dotenv').config();
const app = require('./app')
const connectDB = require('./config/db');
const { fetchAndSaveNews } = require('./services/newService')
require('./services/schedular');        // Scheduler'ı burada çağırıyoruz


const startServer = async () => {

    try {

        await connectDB();
        await fetchAndSaveNews();       // Uygulama her başladığında bir kez güncel haberleri çeksin

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Sunucu ${PORT} portunda yayında ve veritabanı hazır.`);
            console.log(`Zamanlayıcı aktif edildi.`)
        });
    } catch (error) {

        console.error("❌ Sunucu başlatılamadı:", error.message);
        process.exit(1);
    }


}


startServer();