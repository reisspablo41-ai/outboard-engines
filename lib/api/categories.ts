import { createClient } from "@/lib/supabase/client"

export type Category = {
    id: string
    name: string
    slug: string
    created_at: string
}

export type Subcategory = {
    id: string
    category_id: string
    name: string
    slug: string
    description?: string
    created_at: string
}

// Categories
export async function getCategories() {
    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*').order('name')
    if (error) throw new Error(error.message)
    return data as Category[]
}

export async function getCategory(id: string) {
    const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*').eq('id', id).single()
    if (error) return null
    return data as Category
}

export async function createCategory(category: { name: string, slug: string }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('categories').insert(category).select().single()
    if (error) throw new Error(error.message)
    return data
}

export async function updateCategory(id: string, category: { name: string, slug: string }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('categories').update(category).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    return data
}

export async function deleteCategory(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) throw new Error(error.message)
}

// Subcategories
export async function getSubcategories(categoryId?: string) {
    const supabase = createClient()
    let query = supabase.from('subcategories').select('*, categories(name)')

    if (categoryId) {
        query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query.order('name')
    if (error) throw new Error(error.message)
    return data
}

export async function getSubcategory(id: string) {
    const supabase = createClient()
    const { data, error } = await supabase.from('subcategories').select('*').eq('id', id).single()
    if (error) return null
    return data as Subcategory
}

export async function createSubcategory(subcategory: { category_id: string, name: string, slug: string, description?: string }) {
    const supabase = createClient()
    const { data, error } = await supabase.from('subcategories').insert(subcategory).select().single()
    if (error) throw new Error(error.message)
    return data
}

export async function updateSubcategory(id: string, subcategory: Partial<Subcategory>) {
    const supabase = createClient()
    const { data, error } = await supabase.from('subcategories').update(subcategory).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    return data
}

export async function deleteSubcategory(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('subcategories').delete().eq('id', id)
    if (error) throw new Error(error.message)
}
