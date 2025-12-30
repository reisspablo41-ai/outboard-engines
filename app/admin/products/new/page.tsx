import { getBrands, getCategories } from "@/lib/api/products"
import { ProductForm } from "../product-form"

// This is a Server Component that fetches data for the Client Form
export default async function NewProductPage() {
    const brands = await getBrands()
    const categories = await getCategories()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground">Create a new boat, motor, or part listing.</p>
            </div>

            <ProductForm brands={brands} categories={categories} />
        </div>
    )
}
