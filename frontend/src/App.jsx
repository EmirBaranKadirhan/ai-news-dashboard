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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react';
import { Brain } from 'lucide-react';

function App() {

  const [news, setNews] = useState([])
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa

  const limit = 9; // Sayfa başına gösterilecek haber sayısı

  useEffect(() => {

    const getNews = async () => {

      try {

        const response = await axios.get(`http://localhost:3000/api/news?page=${currentPage}&limit=${limit}`)
        setNews(response.data.data)
        console.log(response.data.data)

        const total = response.data.total
        const calculatedTotalPages = Math.ceil(total / limit);  // Toplam sayfa sayısını hesapla
        setTotalPages(calculatedTotalPages)     
        console.log(calculatedTotalPages)

      } catch (error) {
        console.log(error)
      }

    }
    getNews();

  }, [currentPage])     // currentPage değiştiğinde haberleri yeniden çek

  return (

    <div>
      <header className="border-b bg-background/60 backdrop-blur mb-10 pb-6">

      <div className="flex items-center gap-3">
        <Brain className="text-primary/80" size={32} strokeWidth={2.2} />

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Akıllı Haber Özeti
          </h1>

          <p className="text-muted-foreground/80 text-sm mt-1 max-w-xl">
            Güncel haberlerin yapay zeka tarafından özetlenmiş hali
          </p>
        </div>
      </div>

</header>

      {news.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {news.map((item) => (
            <div key={item._id} className="h-full" >

              <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  {item.imageUrl? (
                    <img src={item.imageUrl} alt="" width={400}className="w-full h-48 object-cover" />
                  ): (
                    <Info size={36} color="#a8a8a8" />
                  )}
                  
                </div>

                <CardHeader>
                  <CardTitle  className="text-lg font-semibold line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-2 line-clamp-3">{item.aiSummary}</CardDescription>
                  
                </CardHeader>
                <CardContent className="px-4 pt-2 flex-1">
                  <p className="flex items-center gap-2 text-sm text-gray-700">📌 {item.aiCategory}</p>
                </CardContent>
                <CardFooter className="px-4 pb-4 mt-auto flex items-center justify-between gap-4">
                  <p className="mt-4 text-sm text-gray-500">📅 {new Date(item.publishDate).toLocaleDateString('tr-TR')}</p>
                
                  <Button size="sm" variant="default" aria-label="Haberin devamı">Devamını Oku</Button>
                </CardFooter >
              </Card>

            </div>
          ))}

        </div>

      ) : (<p style={{ textAlign: 'center' }}>Haberler yükleniyor...</p>)}

<Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>                                      {/* Math.max => İçine yazılan sayılardan hangisi büyükse onu seçer */}
          <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}   
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />   
        </PaginationItem>
       
        {/* Sayfa Numaralarını Dinamik Oluşturma */}
    {[...Array(totalPages)].map((_, index) => {
  
      const pageNumber = index + 1;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            onClick={() => setCurrentPage(pageNumber)}
            isActive={currentPage === pageNumber}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    })}
       
        <PaginationItem>                                      {/* Math.min ==> Bu sayılardan en küçüğünü seçer */}           
          <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev +1, totalPages))}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          
          />  
        </PaginationItem>
      </PaginationContent>
    </Pagination>
 


    </div>

    
  )
}

export default App