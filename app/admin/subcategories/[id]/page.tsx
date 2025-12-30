import { notFound } from "next/navigation"
import { getCategories, getSubcategory } from "@/lib/api/categories"
import { SubcategoryForm } from "../subcategory-form"

interface EditSubcategoryPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditSubcategoryPage({ params }: EditSubcategoryPageProps) {
    const { id } = await params
    const [subcategory, categories] = await Promise.all([
        getSubcategory(id),
        getCategories()
    ])

    if (!subcategory) notFound()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Subcategory</h1>
            </div>
            <SubcategoryForm categories={categories} initialData={subcategory} />
        </div>
    )
}
