import { ArrowLeft, Check, Phone, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ImageGallery } from "@/components/image-gallery"
import { SpecsTable } from "@/components/specs-table"
import { getProductBySlug } from "@/lib/api/products"

export default async function BoatPDP({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const product = await getProductBySlug(resolvedParams.slug)

    if (!product) {
        notFound()
    }

    const images = product.images && product.images.length > 0
        ? product.images
        : (product.image ? [product.image] : [])
    // Process specs/features if needed. For now using specs as is.
    // If features are stored in specs or elsewhere, handle accordingly.
    // Assuming for MVP features might be part of description or specs.

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb / Back Navigation */}
            <div className="mb-6">
                <Link href="/boats" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Boats
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Media */}
                <div>
                    <ImageGallery images={images} />

                    {/* Description for Desktop */}
                    <div className="hidden lg:block mt-12 space-y-6">
                        <h2 className="text-2xl font-bold">Description</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description || "No description available."}
                        </p>

                        {/* Features could be parsed from specs or description? Leaving placeholder for now or checking if we want to store features separately in schema? Schema has no features column, maybe in specs jsonb. */}
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
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary">{product.title}</h1>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">${product.price.toLocaleString()}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-4">
                        <Button size="lg" className="w-full text-lg h-12">
                            Request a Quote
                        </Button>
                        <Button size="lg" variant="outline" className="w-full text-lg h-12">
                            <Phone className="mr-2 size-4" />
                            Call Sales: 1-800-OUTBOARD
                        </Button>
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-4 space-y-3 border border-border/50">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="size-5 text-primary mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-sm">Dealer Certified</h4>
                                <p className="text-xs text-muted-foreground">Inspected by our master technicians. Includes 1-year dealership warranty on top of manufacturer coverage.</p>
                            </div>
                        </div>
                    </div>

                    <SpecsTable specs={product.specs || []} />

                    {/* Description for Mobile (fallback position) */}
                    <div className="lg:hidden space-y-6">
                        <h2 className="text-2xl font-bold">Description</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description || "No description available."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
