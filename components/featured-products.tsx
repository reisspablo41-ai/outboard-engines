import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/api/products"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function FeaturedProducts() {
    const products = await getFeaturedProducts()

    if (products.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-primary">Featured Inventory</h2>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Highlighting our top Nitro fishing boats and premium outboards.
                        </p>
                    </div>
                    <Link href="/boats">
                        <Button variant="outline">View All Inventory</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
