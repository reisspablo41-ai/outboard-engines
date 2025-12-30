import { CategoryForm } from "../category-form"

export default function NewCategoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Category</h1>
            </div>
            <CategoryForm />
        </div>
    )
}
