import { Button } from "@/components/ui/button"

const categories = ["Hepsi", "Ekonomi", "Teknoloji", "Spor", "Sağlık", "Dünya", "Magazin"];



function CategoryFilter({ selectedCategory, onCategoryChange }) {
    console.log(selectedCategory)
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((item) => (
                <Button
                    key={item}
                    variant={selectedCategory === item ? "default" : "outline"}
                    onClick={() => onCategoryChange(item)}
                    className="rounded-full"
                >
                    {item}
                </Button>
            ))}
        </div>
    );
}

export default CategoryFilter;