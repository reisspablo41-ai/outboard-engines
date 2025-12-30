import { ArrowLeft, Check, CircleAlert, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ImageGallery } from "@/components/image-gallery"
import { SpecsTable } from "@/components/specs-table"
import { getProductBySlug } from "@/lib/api/products"

export default async function PartPDP({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const product = await getProductBySlug(resolvedParams.slug)

    if (!product) {
        notFound()
    }

    // Adapt product data for UI
    // Adapt product data for UI
    const images = product.images && product.images.length > 0
        ? product.images
        : (product.image ? [product.image] : [])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb / Back Navigation */}
            <div className="mb-6">
                <Link href="/parts" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Parts
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Media */}
                <div>
                    <ImageGallery images={images} />
                </div>

                {/* Right Column: Details & Actions */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-primary-foreground hover:bg-primary/80">
                                {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">{product.title}</h1>
                        <div className="mt-2 text-sm font-mono text-muted-foreground">Part #: {product.sku}</div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary">${product.price.toLocaleString()}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-4">
                        <Button size="lg" className="w-full text-lg h-12 gap-2" disabled={!product.stock || product.stock <= 0}>
                            <ShoppingCart className="size-5" />
                            Add to Cart
                        </Button>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.description || "No description available."}
                        </p>
                    </div>

                    <SpecsTable specs={product.specs || []} title="Technical Details" />

                    {product.fitment && product.fitment.length > 0 && (
                        <div className="space-y-4 pt-4">
                            <h3 className="font-semibold text-lg">Compatible Models</h3>
                            <ul className="grid grid-cols-1 gap-2">
                                {product.fitment.map((model, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Check className="size-3 text-green-500" /> {model}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
