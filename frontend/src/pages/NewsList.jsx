import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
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
import { Info, Brain, Newspaper } from 'lucide-react';
import CategoryFilter from "../components/CategoryFilter";
import NewsSkeleton from "../components/NewsSkeleton";
import SearchBar from "../components/SearchBar"
import SentimentBadge from "@/components/SentimentBadge"

function NewsList() {

    const [news, setNews] = useState([])
    const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
    const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa
    const [selectedCategory, setSelectedCategory] = useState("Hepsi");
    const [isLoading, setIsLoading] = useState(true);
    const limit = 9; // Sayfa başına gösterilecek haber sayısı
    const [keywords, setKeywords] = useState("")

    useEffect(() => {

        const getNews = async () => {
            setIsLoading(true);
            try {

                if (!keywords) {
                    const response = await axios.get(`http://localhost:3000/api/news?page=${currentPage}&limit=${limit}&category=${selectedCategory}`)
                    setNews(response.data.data)
                    console.log(response.data.data)

                    const total = response.data.total
                    const calculatedTotalPages = Math.ceil(total / limit);  // Toplam sayfa sayısını hesapla
                    setTotalPages(calculatedTotalPages)
                    console.log(calculatedTotalPages)
                } else {
                    const keywordsResponse = await axios.get(`http://localhost:3000/api/news/search?search=${keywords}`)
                    console.log(keywordsResponse)
                    setNews(keywordsResponse.data.data)


                }




            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }

        }
        getNews();

    }, [currentPage, selectedCategory, keywords])     // currentPage değiştiğinde haberleri yeniden çek

    return (

        <div className="container mx-auto px-4 max-w-7xl">
            <header className="border-b bg-background/60 backdrop-blur pb-8 pt-6">

                <div className="flex items-center gap-4">
                    <Brain className="text-primary/80" size={40} strokeWidth={2.2} />

                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
                            Akıllı Haber Özeti
                        </h1>


                        <p className="text-muted-foreground text-sm font-medium">
                            Güncel haberlerin yapay zeka tarafından özetlenmiş hali
                        </p>
                    </div>
                </div>
                <div className="mt-8    ">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={(item) => {
                            setSelectedCategory(item); // kategoriyi güncelle
                            setCurrentPage(1);        // sayfayi her zaman 1'e cek 
                        }}
                    />
                </div>

                <div className="mt-5 mb-3 flex justify-center">
                    <SearchBar onSearch={(value) => {
                        setKeywords(value)
                        setSelectedCategory("Hepsi")
                        setCurrentPage(1)
                    }} />
                </div>

            </header>

            {isLoading ? (

                <NewsSkeleton />
            ) : news.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <div key={item._id} className="h-full" >
                            <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <Info size={36} color="#a8a8a8" />
                                    )}
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold line-clamp-2">{item.title}</CardTitle>
                                    <CardDescription className="text-sm text-gray-600 mt-2 line-clamp-3">
                                        {item.aiSummary}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="px-4 pt-2 flex-1">
                                    <div className="flex items-center justify-between w-full">
                                        <p className="flex items-center gap-1 text-sm text-gray-700 font-medium">
                                            📌 {item.aiCategory}
                                        </p>

                                        <SentimentBadge sentiment={item.aiSentiment} />
                                    </div>
                                </CardContent>

                                <CardFooter className="px-4 pb-4 mt-auto flex items-center justify-between gap-4 border-t pt-4">
                                    <p className="text-xs text-gray-500">
                                        📅 {new Date(item.publishDate).toLocaleDateString('tr-TR')}
                                    </p>
                                    <Link to={`/news/${item._id}`}>
                                        <Button size="sm" variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                                            Devamını Oku
                                        </Button>
                                    </Link>
                                </CardFooter >
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                // en son durum veri yüklendi ama hiç haber bulunamadı
                <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                    <div className="p-6 bg-background rounded-full shadow-sm">
                        <Newspaper size={64} className="text-muted-foreground/40" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-foreground">Şu an buralar biraz ıssız...</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Seçtiğin {selectedCategory} kategorisinde henüz bir haber özeti hazırlamadık. Diğer kategorilere göz atmaya ne dersin?
                        </p>
                    </div>
                </div>
            )}

            {/* Pagination Kısmı */}
            <div className="flex justify-center mt-12 mb-10">
                <div className="flex items-center gap-4 bg-background border rounded-full px-6 py-2 shadow-sm">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="rounded-full hover:bg-primary/10"
                    >
                        ← Geri
                    </Button>

                    <div className="flex items-center gap-2 text-sm font-medium border-x px-4">
                        <span className="text-primary">{currentPage}</span>
                        <span className="text-muted-foreground">/</span>
                        <span>{totalPages}</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="rounded-full hover:bg-primary/10"
                    >
                        İleri →
                    </Button>
                </div>
            </div>


        </div>


    )
}

export default NewsList