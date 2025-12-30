import { getBrands, getCategories, getProductBySlug } from "@/lib/api/products"
import { ProductForm } from "../product-form"
import { notFound } from "next/navigation"

interface EditProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params
    const product = await getProductBySlug(id) // Treating ID as slug for now
    const brands = await getBrands()
    const categories = await getCategories()

    if (!product) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                <p className="text-muted-foreground">Update product details.</p>
            </div>

            <ProductForm
                brands={brands}
                categories={categories}
                initialData={product} // Pass existing data
            />
        </div>
    )
}
