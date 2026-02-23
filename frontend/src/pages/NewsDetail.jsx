import { useState,useEffect, use } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar, Tag } from "lucide-react"


function NewsDetail(){

    const {id} = useParams();       // URL'deki :id parametresini aliriz (örn: /news/123 -> id = 123) 
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        const fetchNewsDetail = async() =>{
             try {

                const response = await axios.get(`http://localhost:3000/api/news/${id}`)
                
                setNews(response.data)
                console.log(response.data)
                setLoading(false) 

        } catch (error) {
            
            console.log("Haber detayı çekilemedi:", error)
            setLoading(false)
        }
    }

    fetchNewsDetail()

    },[id])           // ID değişirse tekrar çek (güvenlik için)
    
    if (loading) return <div className="text-center mt-20">Haber yükleniyor...</div>
    if (!news) return <div className="text-center mt-20">Haber bulunamadı!</div>

    return(

<div className="container mx-auto px-4 py-10 max-w-4xl">
      
      <Link to="/">
        <Button variant="ghost" className="mb-6 gap-2">
          <ChevronLeft size={20} /> Ana Sayfaya Dön
        </Button>
      </Link>

      <article>
        
        <h1 className="text-4xl font-bold tracking-tight mb-6">{news.title}</h1>

      
        <div className="flex flex-wrap gap-4 text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center gap-1">
            <Calendar size={18} />
            {new Date(news.publishDate).toLocaleDateString('tr-TR')}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={18} />
            {news.aiCategory}
          </div>
        </div>

        {/* Logical AND (&&) ==> Varsa ekrana bas, yoksa geç */}
        {news.imageUrl && (
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-[400px] object-cover rounded-xl mb-10 shadow-lg"
          />
        )}

        {/* Haber İçeriği */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed text-gray-800">
            
            {news.content || news.aiSummary} 
          </p>
        </div>
      </article>
    </div>
  


    )

}



export default NewsDetail