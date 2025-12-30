import { ArrowLeft, Check, Package, ShoppingCart, Truck } from "lucide-react" /* Changed icons for part focus */
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ImageGallery } from "@/components/image-gallery"
import { SpecsTable } from "@/components/specs-table"
import { getProductBySlug } from "@/lib/api/products"

export default async function MotorPDP({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const product = await getProductBySlug(resolvedParams.slug)

    if (!product) {
        notFound()
    }

    // Adapt product data for UI
    const images = product.images && product.images.length > 0
        ? product.images
        : (product.image ? [product.image] : [])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb / Back Navigation */}
            <div className="mb-6">
                <Link href="/motors" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Motors
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Media */}
                <div>
                    <ImageGallery images={images} />
                    <div className="mt-8 space-y-6">
                        <h2 className="text-2xl font-bold">Product Overview</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description || "No description available."}
                        </p>
                        {/* Features placeholder / if we had FEATURES column */}
                    </div>
                </div>

                {/* Right Column: Details & Actions */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-primary-foreground hover:bg-primary/80">
                                {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
                            <span className="text-sm font-mono text-muted-foreground ml-auto">SKU: {product.sku}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary">{product.title}</h1>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">${product.price.toLocaleString()}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-4">
                        <Button size="lg" className="w-full text-lg h-12 gap-2" asChild>
                            <Link href={`/quote?product=${encodeURIComponent(product.title)}&sku=${product.sku || ''}`}>
                                <Truck className="size-5" />
                                Request Quote
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center text-center gap-2 border border-border/50">
                            <Truck className="size-6 text-primary" />
                            <span className="text-xs font-semibold">Freight Shipping</span>
                            <span className="text-[10px] text-muted-foreground">Calculate at checkout</span>
                        </div>
                        <div className="bg-secondary/30 rounded-lg p-4 flex flex-col items-center text-center gap-2 border border-border/50">
                            <Package className="size-6 text-primary" />
                            <span className="text-xs font-semibold">In Stock</span>
                            <span className="text-[10px] text-muted-foreground">Ready to ship</span>
                        </div>
                    </div>

                    <SpecsTable specs={product.specs || []} />
                </div>
            </div>
        </div>
    )
}
