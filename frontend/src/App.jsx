import { useState, useEffect } from "react"
import axios from 'axios'


function App() {

  const [news, setNews] = useState([])
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa

  useEffect(() => {

    const getNews = async () => {

      try {

        const response = await axios.get('http://localhost:3000/api/news?page=1&limit=5')
        setNews(response.data.data)
        console.log(response.data.data)


      } catch (error) {
        console.log(error)
      }

    }
    getNews();

  }, [])

  return (

    <div>
      <h1>Haber Uygulaması Başladı</h1>

      {news.length > 0 ? (


        news.map((item) => (
          <div key={item._id}>

            <h3>{item.title}</h3>
            <p>{item.aiSummary}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ backgroundColor: '#eef', padding: '2px 8px', borderRadius: '4px' }}>
                📌 {item.aiCategory}
              </span>
              <span>📅 {new Date(item.publishDate).toLocaleDateString('tr-TR')}</span>
              <div>
                <img src={item.imageUrl} alt="" width={400} />
              </div>
            </div>
          </div>
        ))


      ) : (<p style={{ textAlign: 'center' }}>Haberler yükleniyor...</p>)}

    </div>
  )
}

export default App