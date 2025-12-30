"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createSubcategory, updateSubcategory, deleteSubcategory } from "@/lib/api/categories"

interface SubcategoryFormProps {
    categories: any[]
    initialData?: {
        id: string
        category_id: string
        name: string
        slug: string
        description?: string
    }
}

export function SubcategoryForm({ categories, initialData }: SubcategoryFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        category_id: initialData?.category_id || "",
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (val: string) => {
        setFormData({ ...formData, category_id: val })
    }

    // Auto-generate slug
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
                await updateSubcategory(initialData.id, formData)
            } else {
                await createSubcategory(formData)
            }
            router.push("/admin/subcategories")
            router.refresh()
        } catch (error: any) {
            alert("Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!initialData || !confirm("Are you sure?")) return
        setLoading(true)
        try {
            await deleteSubcategory(initialData.id)
            router.push("/admin/subcategories")
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
                    <CardTitle>{initialData ? "Edit Subcategory" : "New Subcategory"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={formData.category_id} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Parent Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleNameBlur}
                            required
                            placeholder="e.g. GPS Units"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            placeholder="e.g. gps-units"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Optional description"
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
                    <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Subcategory"}</Button>
                </div>
            </div>
        </form>
    )
}
