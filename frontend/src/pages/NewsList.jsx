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
import { Info, Brain } from 'lucide-react';
import CategoryFilter from "../components/categoryFilter";
import NewsSkeleton from "../components/NewsSkeleton";

function NewsList() {

    const [news, setNews] = useState([])
    const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı
    const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa
    const [selectedCategory, setSelectedCategory] = useState("Hepsi");
    const [isLoading, setIsLoading] = useState(true);
    const limit = 9; // Sayfa başına gösterilecek haber sayısı

    useEffect(() => {

        const getNews = async () => {
            setIsLoading(true);
            try {

                const response = await axios.get(`http://localhost:3000/api/news?page=${currentPage}&limit=${limit}&category=${selectedCategory}`)
                setNews(response.data.data)
                console.log(response.data.data)

                const total = response.data.total
                const calculatedTotalPages = Math.ceil(total / limit);  // Toplam sayfa sayısını hesapla
                setTotalPages(calculatedTotalPages)
                console.log(calculatedTotalPages)

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }

        }
        getNews();

    }, [currentPage, selectedCategory])     // currentPage değiştiğinde haberleri yeniden çek

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
                <div className="pt-10">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={(item) => {
                            setSelectedCategory(item); // kategoriyi güncelle
                            setCurrentPage(1);        // sayfayi her zaman 1'e cek 
                        }}
                    />
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
                                    <p className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                        📌 {item.aiCategory}
                                    </p>
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
                <div className="text-center py-20 text-muted-foreground">
                    Bu kategoride henüz bir haber bulunmuyor.
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