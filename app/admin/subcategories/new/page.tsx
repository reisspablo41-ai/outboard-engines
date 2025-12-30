import { getCategories } from "@/lib/api/categories"
import { SubcategoryForm } from "../subcategory-form"

export default async function NewSubcategoryPage() {
    const categories = await getCategories()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Subcategory</h1>
            </div>
            <SubcategoryForm categories={categories} />
        </div>
    )
}
