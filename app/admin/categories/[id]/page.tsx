import { notFound } from "next/navigation"
import { getCategory } from "@/lib/api/categories"
import { CategoryForm } from "../category-form"

interface EditCategoryPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
    const { id } = await params
    const category = await getCategory(id)

    if (!category) notFound()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
            </div>
            <CategoryForm initialData={category} />
        </div>
    )
}
