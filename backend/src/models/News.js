const mongoose = require('mongoose');
const { type } = require('node:os');


const NewsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true              // Başındaki ve sonundaki boşlukları otomatik temizleme
    },
    link: {
        type: String,
        unique: true            // Aynı haberi tekrar kaydetmemek için 'unique'
    },
    content: {
        type: String,
        default: "Icerik hazirlaniyor..."
    },
    publishDate: {
        type: Date,

    },
    imageUrl: {             // resim verisi
        type: String
    },
    aiSummary: {
        type: String,
        default: "Özet hazırlanıyor..."
    },
    aiCategory: {
        type: String,
        default: "Genel"
    },
    aiSentiment: {                // ai belirleyici duygu analizi
        type: String
    }



}, { timestamps: true })


module.exports = mongoose.model("News", NewsSchema)