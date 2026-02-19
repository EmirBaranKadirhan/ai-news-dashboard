const mongoose = require("mongoose")

const connectDB = async () => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Baglantisi Basarili")

    } catch (error) {

        console.log("Hata", error)
        process.exit(1)     // Bağlantı olmazsa uygulamayı durdur
    }

}


module.exports = connectDB