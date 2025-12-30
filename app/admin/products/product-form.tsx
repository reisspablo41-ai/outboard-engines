"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client" // Client-side auth
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Props passed from Server Component
interface ProductFormProps {
    brands: any[] // We can still pass brands for autocomplete if we want, but user asked for text input.
    categories: any[]
    initialData?: any // For edit mode
}

export function ProductForm({ brands, categories, initialData }: ProductFormProps) {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [subcategories, setSubcategories] = useState<any[]>([])

    const [formData, setFormData] = useState({
        name: initialData?.title || initialData?.name || "",
        type: initialData?.type || "part",
        brand_name: initialData?.brand_name || brands.find(b => b.id === initialData?.brand_id)?.name || "", // Text input now
        category_id: initialData?.category_id || "",
        subcategory_id: initialData?.subcategory_id || "",
        sku: initialData?.sku || "",
        price: initialData?.price || "",
        stock: initialData?.stock || "",
        description: initialData?.description || "",
        images: initialData?.images || (initialData?.image ? [initialData.image] : []) || [],
    })

    const [specs, setSpecs] = useState<{ key: string, value: string }[]>([])

    // Load subcategories when category changes
    useEffect(() => {
        if (formData.category_id) {
            const fetchSubs = async () => {
                const { data } = await supabase
                    .from('subcategories')
                    .select('*')
                    .eq('category_id', formData.category_id)
                    .order('name')
                setSubcategories(data || [])
            }
            fetchSubs()
        } else {
            setSubcategories([])
        }
    }, [formData.category_id])

    // Load initial specs if provided in different structure
    useEffect(() => {
        if (initialData?.specs && specs.length === 0) {
            if (Array.isArray(initialData.specs)) {
                setSpecs(initialData.specs.map((s: any) => ({ key: s.label, value: s.value })))
            } else {
                setSpecs(Object.entries(initialData.specs).map(([key, value]) => ({ key, value: String(value) })))
            }
        }
    }, [initialData])


    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const addSpec = () => {
        setSpecs([...specs, { key: "", value: "" }])
    }

    const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
        const newSpecs = [...specs]
        newSpecs[index][field] = val
        setSpecs(newSpecs)
    }

    const getOrCreateBrandId = async (name: string) => {
        // Check if exists locally in props first to save a call, or just call DB
        // Let's call DB via client or Server Action. 
        // Since we don't have server action set up, we do client-side check.
        if (!name) return null

        // 1. Check
        const { data: existing } = await supabase.from('brands').select('id').ilike('name', name).single()
        if (existing) return existing.id

        // 2. Create
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const { data: newBrand, error } = await supabase.from('brands').insert({ name, slug }).select().single()
        if (error) {
            console.error("Error creating brand", error)
            // fallback to existing? or throw
            throw error
        }
        return newBrand.id
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Resolve Brand
            const brandId = await getOrCreateBrandId(formData.brand_name)

            // Convert specs array to object
            const specsObj = specs.reduce((acc, curr) => {
                if (curr.key) acc[curr.key] = curr.value
                return acc
            }, {} as Record<string, any>)

            // Separate images from product payload
            const { images, ...productPayload } = {
                name: formData.name,
                type: formData.type.toLowerCase(),
                brand_id: brandId,
                category_id: formData.category_id || null,
                subcategory_id: formData.subcategory_id || null, // New field
                sku: formData.sku || null,
                price: parseFloat(formData.price as string) || 0,
                stock: parseInt(formData.stock as string) || 0,
                description: formData.description,
                images: formData.images,
                specs: specsObj,
            }

            let error;
            let productId;

            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from('products')
                    .update(productPayload)
                    .eq('id', initialData.id)
                error = updateError
                productId = initialData.id
            } else {
                const { data: newProduct, error: insertError } = await supabase
                    .from('products')
                    .insert(productPayload)
                    .select()
                    .single()
                error = insertError
                productId = newProduct?.id
            }

            if (error) throw error

            // Handle Images
            if (images && productId) {
                // 1. Delete existing images
                await supabase
                    .from('product_images')
                    .delete()
                    .eq('product_id', productId)

                // 2. Insert new images
                if (images.length > 0) {
                    const imageInserts = images.map((url: string) => ({
                        product_id: productId,
                        image_url: url
                    }))

                    const { error: imageError } = await supabase
                        .from('product_images')
                        .insert(imageInserts)

                    if (imageError) console.error("Error inserting images:", imageError)
                }
            }

            router.push("/admin/products")
            router.refresh()
        } catch (error: any) {
            console.error("Error creating/updating product:", error)
            alert("Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Product Name</Label>
                            <Input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Yamaha F300" />
                        </div>
                        <div className="space-y-2">
                            <Label>SKU</Label>
                            <Input name="sku" value={formData.sku} onChange={handleChange} placeholder="Optional" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select value={formData.type} onValueChange={(val) => handleSelectChange('type', val)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="boat">Boat</SelectItem>
                                    <SelectItem value="motor">Motor</SelectItem>
                                    <SelectItem value="part">Part</SelectItem>
                                    <SelectItem value="prop">Propeller</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Brand (Text)</Label>
                            <Input
                                name="brand_name"
                                value={formData.brand_name}
                                onChange={handleChange}
                                placeholder="Enter Brand Name (e.g. Yamaha)"
                                required
                            />
                            <p className="text-xs text-muted-foreground">Will be created if it doesn't exist.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={formData.category_id} onValueChange={(val) => handleSelectChange('category_id', val)}>
                                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Subcategory</Label>
                            <Select value={formData.subcategory_id} onValueChange={(val) => handleSelectChange('subcategory_id', val)} disabled={!formData.category_id}>
                                <SelectTrigger><SelectValue placeholder={formData.category_id ? "Select Subcategory" : "Select Category First"} /></SelectTrigger>
                                <SelectContent>
                                    {subcategories.map(sc => (
                                        <SelectItem key={sc.id} value={sc.id}>{sc.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Detailed product description..."
                            className="min-h-[100px]"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Price ($)</Label>
                            <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <Label>Stock Quantity</Label>
                            <Input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Product Images</Label>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {formData.images.map((url: string, index: number) => (
                                <div key={index} className="relative group aspect-square rounded-md border overflow-hidden">
                                    <img
                                        src={url}
                                        alt={`Product ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newImages = [...formData.images]
                                            newImages.splice(index, 1)
                                            setFormData({ ...formData, images: newImages })
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}

                            {/* Upload Button */}
                            <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer transition-colors bg-secondary/50">
                                <div className="text-center p-2">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {uploading ? "Uploading..." : "+ Add Image"}
                                    </span>
                                </div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    disabled={uploading}
                                    onChange={async (e) => {
                                        const files = e.target.files
                                        if (!files || files.length === 0) return

                                        try {
                                            setUploading(true)
                                            const newUrls: string[] = []

                                            for (let i = 0; i < files.length; i++) {
                                                const file = files[i]
                                                const fileExt = file.name.split('.').pop()
                                                const fileName = `${Math.random()}.${fileExt}`
                                                const filePath = `${fileName}`

                                                const { error: uploadError } = await supabase.storage
                                                    .from('outbard_storage')
                                                    .upload(filePath, file)

                                                if (uploadError) throw uploadError

                                                const { data: { publicUrl } } = supabase.storage
                                                    .from('outbard_storage')
                                                    .getPublicUrl(filePath)

                                                newUrls.push(publicUrl)
                                            }

                                            setFormData(prev => ({
                                                ...prev,
                                                images: [...prev.images, ...newUrls]
                                            }))
                                        } catch (error: any) {
                                            alert('Error uploading image: ' + error.message)
                                        } finally {
                                            setUploading(false)
                                            // Reset input value to allow same file selection again if needed
                                            e.target.value = ''
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        Specifications
                        <Button type="button" size="sm" onClick={addSpec} variant="outline">Add Spec</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {specs.map((spec, idx) => (
                        <div key={idx} className="flex gap-2">
                            <Input placeholder="Key (e.g. Horsepower)" value={spec.key} onChange={(e) => updateSpec(idx, 'key', e.target.value)} />
                            <Input placeholder="Value (e.g. 300)" value={spec.value} onChange={(e) => updateSpec(idx, 'value', e.target.value)} />
                        </div>
                    ))}
                    {specs.length === 0 && <p className="text-sm text-muted-foreground italic">No specs added.</p>}
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Product"}</Button>
            </div>
        </form>
    )
}
