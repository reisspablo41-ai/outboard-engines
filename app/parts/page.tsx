import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/api/products"

export default async function PartsPage() {
    const parts = await getProducts('part')

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Marine Parts & Accessories</h1>
                    <p className="text-muted-foreground mt-1">Showing {parts.length} results</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Sort by: Featured</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-1">
                    <FilterSidebar />
                </aside>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parts.map(part => (
                            <ProductCard key={part.id} {...part} />
                        ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <Button variant="outline" size="lg">Load More Parts</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
