import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"


function NewsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 9 adet boş kart oluşturuyoruz (limitin 9 olduğu için) */}
            {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="h-full flex flex-col overflow-hidden">
                    {/* Görsel Alanı */}
                    <Skeleton className="h-48 w-full rounded-none" />

                    <CardHeader className="gap-2">
                        {/* Başlık Alanı */}
                        <Skeleton className="h-6 w-3/4" />
                        {/* Alt Başlık Alanı */}
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardHeader>

                    <CardContent className="px-4 pt-2">
                        {/* Kategori Alanı */}
                        <Skeleton className="h-4 w-24" />
                    </CardContent>

                    <CardFooter className="px-4 pb-4 mt-auto flex justify-between items-center">
                        {/* Tarih ve Buton Alanı */}
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default NewsSkeleton