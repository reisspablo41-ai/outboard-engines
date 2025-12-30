import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { searchProducts } from "@/lib/api/products"
import Link from "next/link"
import { Search } from "lucide-react"

interface SearchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const type = typeof searchParams.type === 'string' ? searchParams.type : undefined
    const year = typeof searchParams.year === 'string' ? searchParams.year : undefined
    const make = typeof searchParams.make === 'string' ? searchParams.make : undefined
    const model = typeof searchParams.model === 'string' ? searchParams.model : undefined

    const results = await searchProducts({ type, year, make, model })

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <span>Search Results</span>
                </div>

                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Search className="size-8 text-primary" />
                    Found {results.length} results
                </h1>

                <div className="flex gap-2 text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border">
                    <span className="font-semibold text-primary">Filters:</span>
                    {type && <span className="px-2 py-0.5 bg-background rounded border">Type: {type}</span>}
                    {year && <span className="px-2 py-0.5 bg-background rounded border">Year: {year}</span>}
                    {make && <span className="px-2 py-0.5 bg-background rounded border">Make: {make}</span>}
                </div>
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-xl border-dashed border-2">
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                        We couldn't find matches for your specific criteria. Try adjusting the filters.
                    </p>
                    <Link href="/">
                        <Button>Return Home</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
