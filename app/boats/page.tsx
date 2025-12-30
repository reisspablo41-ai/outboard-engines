import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { searchProducts } from "@/lib/api/products"

export default async function BoatsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedParams = await searchParams

    // Parse filters
    const filters = {
        type: 'boat',
        make: resolvedParams.make as string,
        minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined,
        maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined
    }

    const boats = await searchProducts(filters)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Boats For Sale</h1>
                    <p className="text-muted-foreground mt-1">Showing {boats.length} results</p>
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
                        {boats.map(boat => (
                            <ProductCard key={boat.id} {...boat} />
                        ))}
                    </div>
                    {/* Pagination or Load More could go here */}

                </div>
            </div>
        </div>
    )
}
