// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const Groq = require('groq-sdk');

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const summarizeNews = async (title, content) => {

    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Aşağıdaki haberin başlığını ve içeriğini analiz et:,
                    Başlık: ${title},
                    İçerik: ${content}
                    
                    Senden şunları istiyorum:
                    1. Haberi maksimum 35 kelimeyle Türkçe özetle.
                    2. Haberin kategorisini (Siyaset, Spor, Magazin, Teknoloji, Ekonomi, Sağlık, Dünya, Genel) seçeneklerinden biri olarak belirle.
                    3. Haberin duygu durumunu (aiSentiment) SADECE şu üç kelimeden biri olarak yaz, başka hiçbir şey yazma: "Olumlu", "Olumsuz", "Nötr".

                    Yanıtı MUTLAKA şu JSON formatında ver:
                    { 
                      "aiSummary": "özet buraya", 
                      "aiCategory": "kategori buraya", 
                      "aiSentiment": "Olumlu/Olumsuz/Nötr" 
                    }`
                }],
            model: 'llama-3.3-70b-versatile',
        });

        const text = chatCompletion.choices[0].message.content;
        const cleanJson = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleanJson);

        const sentimentMap = {

            "olumlu": "Olumlu",
            "pozitif": "Olumlu",
            "Pozitif": "Olumlu",


            "olumsuz": "Olumsuz",
            "negatif": "Olumsuz",
            "Üzüntü": "Olumsuz",
            "üzüntü": "Olumsuz",
            "uzuntu": "Olumsuz",
            "endişe": "Olumsuz",
            "endise": "Olumsuz",
            "Üzüntü": "Olumsuz",
            "Endişe": "Olumsuz",
            "negative": "Olumsuz",
            "Negative": "Olumsuz",
            "NEGATİVE": "Olumsuz",
            "üzücü": "Olumsuz",
            "Üzücü": "Olumsuz",
            "ÜZÜCÜ": "Olumsuz",


            "nötr": "Nötr",
            "notr": "Nötr",
            "tarafsız": "Nötr",
            "tarafsiz": "Nötr",
            "neutral": "Nötr",
            "Tarafsiz": "Nötr",
            "TARAFSIZ": "Nötr",
            "Tarafsız": "Nötr",
            "NÖTR": "Nötr",
            "NOTR": "Nötr"

        };

        const rawSentiment = (data.aiSentiment || "").toLowerCase().trim()
        data.aiSentiment = sentimentMap[rawSentiment] || "Nötr"

        return data;

    } catch (error) {
        console.log("AI Hatası:", error.message);
        // Hata durumunda projenin çökmemesi için yedek veri
        return {
            aiSummary: "Özet şu an oluşturulamıyor (Servis hatası).",
            aiCategory: "Genel",
            aiSentiment: "Nötr"
        };
    }


}



// For GEMINI
// const summarizeNews = async (title, content) => {

//     try {

//         const aiModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" })
//         const prompt = `
//         Aşağıdaki haberin başlığını ve içeriğini analiz et:
//             Başlık: ${title}
//             İçerik: ${content}

//             Senden şunları istiyorum:
//             1. Haberi maksimum 25 kelimeyle Türkçe özetle.
//             2. Haberin kategorisini (Siyaset, Spor, Magazin, Teknoloji, Ekonomi, Genel) seçeneklerinden biri olarak belirle.

//            Yanıtı MUTLAKA şu JSON formatında ver:
//         { 
//           "aiSummary": "özet buraya", 
//           "aiCategory": "kategori buraya", 
//           "aiSentiment": "duygu durumu buraya" 
//         }`;

//         const response = await aiModel.generateContent(prompt);
//         //console.dir(response, { depth: null, colors: false })
//         const text = response.response.candidates[0].content.parts[0].text;
//         const cleanJson = text.replace(/```json|```/g, "").trim();
//         const data = JSON.parse(cleanJson);
//         return data;

//     } catch (error) {

//         console.log(error.message)
//         // hata olmasi durumunda islem durmadan devam etsin diye catch tarafinda return kullandik
//         return {
//             aiSummary: "Özet şu an oluşturulamıyor (Kota aşımı).",
//             aiCategory: "Genel",
//             aiSentiment: "Nötr"
//         }
//     }


// }


module.exports = {
    summarizeNews
}