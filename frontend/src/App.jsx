import { useState, useEffect } from "react"
import axios from 'axios'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function App() {

  const [news, setNews] = useState([])
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa

  useEffect(() => {

    const getNews = async () => {

      try {

        const response = await axios.get('http://localhost:3000/api/news?page=1&limit=9')
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {news.map((item) => (
            <div key={item._id}>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center items-center">
                  <img src={item.imageUrl} alt="" width={400} className=" h-48 object-cover" />
                </div>

                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.aiSummary}</CardDescription>
                  <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                  <p>📌 {item.aiCategory}</p>
                </CardContent>
                <CardFooter>
                  <p>📅 {new Date(item.publishDate).toLocaleDateString('tr-TR')}</p>
                </CardFooter>
              </Card>


            </div>
          ))}

        </div>

      ) : (<p style={{ textAlign: 'center' }}>Haberler yükleniyor...</p>)}

      <h1 className="text-4xl font-extrabold text-blue-600 uppercase">Tailwind Hazır!</h1>

    </div>
  )
}

export default App