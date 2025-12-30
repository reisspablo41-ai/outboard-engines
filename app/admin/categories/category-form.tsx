"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createCategory, updateCategory, deleteCategory } from "@/lib/api/categories"

interface CategoryFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
    }
}

export function CategoryForm({ initialData }: CategoryFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Auto-generate slug from name if slug is empty
    const handleNameBlur = () => {
        if (!formData.slug && formData.name) {
            setFormData(prev => ({
                ...prev,
                slug: prev.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (initialData) {
                await updateCategory(initialData.id, formData)
            } else {
                await createCategory(formData)
            }
            router.push("/admin/categories")
            router.refresh()
        } catch (error: any) {
            alert("Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!initialData || !confirm("Are you sure? This will delete the category and may affect subcategories.")) return
        setLoading(true)
        try {
            await deleteCategory(initialData.id)
            router.push("/admin/categories")
            router.refresh()
        } catch (error: any) {
            alert("Error: " + error.message)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{initialData ? "Edit Category" : "New Category"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleNameBlur}
                            required
                            placeholder="e.g. Electrical"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            placeholder="e.g. electrical"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-between">
                <div>
                    {initialData && (
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                            Delete
                        </Button>
                    )}
                </div>
                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Category"}</Button>
                </div>
            </div>
        </form>
    )
}
