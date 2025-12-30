import { createClient } from "@/lib/supabase/server"

// Type definition matching the UI needs (mapped from DB)
export interface Product {
    id: string
    title: string
    price: number
    image: string
    images: string[]
    category: string
    tags?: string[]
    href: string
    description?: string
    specs?: { label: string; value: string | number }[]
    stock?: number
    sku?: string
    fitment?: string[]
}

export async function getProducts(type: 'boat' | 'motor' | 'part' | 'prop'): Promise<Product[]> {
    const supabase = await createClient()

    // Fetch products of specific type
    // We join with categories to get the category name, and product_images for the main image
    const { data, error } = await supabase
        .from('products')
        .select(`
            id, 
            name, 
            price, 
            stock, 
            type,
            sku,
            specs,
            categories ( name, slug ),
            product_images ( image_url )
        `)
        .eq('type', type)
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching products:", error)
        return []
    }

    // Map DB result to UI Product interface
    return data.map((item: any) => ({
        id: item.id,
        title: item.name,
        // For 'boat' or 'motor' which might use 'inquiry' status instead of price, handle nulls? 
        // Schema says price is numeric, nullable? Line 52: numeric. 
        price: item.price || 0,
        // Use first image or placeholder for list view
        image: item.product_images?.[0]?.image_url || "/placeholder-image.jpg",
        images: item.product_images?.map((i: any) => i.image_url) || [],
        category: item.categories?.name,
        tags: item.stock > 0 ? ["In Stock"] : ["Out of Stock"], // Simple logic for now
        // Construct href - assuming slug column exists OR using ID/SKU if slug missing.
        // For improved SEO, we should ideally have a slug column. 
        // Fallback to ID for now if no slug column in DB, but let's assume valid design pattern of type/id 
        // or we can generate one. Let's use /type/id for robustness if slug missing.
        href: `/${type}s/${item.id}`,
        specs: Object.entries(item.specs || {}).map(([key, value]) => ({
            label: key,
            value: String(value)
        })),
        stock: item.stock,
        sku: item.sku
    }))
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const supabase = await createClient()

    // 1. Fetch Nitro Boats
    const { data: nitroBoats } = await supabase
        .from('products')
        .select(`
            *,
            categories ( name, slug ),
            product_images ( image_url )
        `)
        .eq('type', 'boat')
        .ilike('name', '%Nitro%')
        .limit(4)
        .order('created_at', { ascending: false })

    // 2. Fetch Motors
    const { data: motors } = await supabase
        .from('products')
        .select(`
            *,
            categories ( name, slug ),
            product_images ( image_url )
        `)
        .eq('type', 'motor')
        .limit(4)
        .order('created_at', { ascending: false })

    // Combine and map
    const rawItems = [...(nitroBoats || []), ...(motors || [])]

    return rawItems.map((item: any) => ({
        id: item.id,
        title: item.name,
        price: item.price || 0,
        image: item.product_images?.[0]?.image_url || "/placeholder-image.jpg",
        images: item.product_images?.map((i: any) => i.image_url) || [],
        category: item.categories?.name,
        tags: ["Featured"],
        href: `/${item.type}s/${item.id}`,
        description: item.description,
        specs: [],
        stock: item.stock,
        sku: item.sku
    }))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const supabase = await createClient()

    // Assuming layout calls this with an ID because we changed href above to use ID.
    // If the URL is /boats/[id], slug is actually the ID.

    const { data: item, error } = await supabase
        .from('products')
        .select(`
            *,
            categories ( name, slug ),
            product_images ( image_url )
        `)
        .eq('id', slug) // Treating slug as ID for now since schema has no slug
        .single()

    if (error || !item) {
        return null
    }

    return {
        id: item.id,
        title: item.name,
        price: item.price || 0,
        image: item.product_images?.[0]?.image_url || "/placeholder-image.jpg",
        images: item.product_images?.map((i: any) => i.image_url) || [],
        category: item.categories?.name,
        tags: [],
        href: `/${item.type}s/${item.id}`,
        description: item.description || `Authentic ${item.name} from ${item.categories?.name}.`,
        specs: Object.entries(item.specs || {}).map(([key, value]) => ({
            label: key,
            value: String(value)
        })),
        stock: item.stock,
        sku: item.sku,
        fitment: item.compatibility?.map((c: any) => `${c.year ? c.year + ' ' : ''}${c.make} ${c.model}`) || []
    }
}

// Helpers for Admin Form
export async function getBrands() {
    const supabase = await createClient()
    const { data } = await supabase.from('brands').select('*').order('name')
    return data || []
    return data || []
}

export async function getOrCreateBrand(name: string) {
    const supabase = await createClient()

    // Check if exists
    const { data: existing } = await supabase
        .from('brands')
        .select('id')
        .eq('name', name)
        .single()

    if (existing) return existing.id

    // Create if not
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    const { data: newBrand, error } = await supabase
        .from('brands')
        .insert({ name, slug })
        .select()
        .single()

    if (error) throw new Error(error.message)
    return newBrand.id
}

export async function getCategories() {
    const supabase = await createClient()
    const { data } = await supabase.from('categories').select('*').order('name')
    return data || []
}

export async function createProduct(product: any) {
    const supabase = await createClient()

    // 1. Insert into products
    const { data: newProduct, error } = await supabase
        .from('products')
        .insert({
            name: product.name, // Fixed: was product.title in previous buggy version? Form sends 'name'.
            type: product.type.toLowerCase(),
            brand_id: product.brand_id,
            category_id: product.category_id,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            specs: product.specs
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    // 2. Insert images if provided
    if (product.images && product.images.length > 0) {
        const imageInserts = product.images.map((url: string) => ({
            product_id: newProduct.id,
            image_url: url
        }))

        await supabase
            .from('product_images')
            .insert(imageInserts)
    }

    return newProduct
}

export async function updateProduct(id: string, product: any) {
    const supabase = await createClient()

    // 1. Update product
    const { error } = await supabase
        .from('products')
        .update({
            name: product.name,
            type: product.type.toLowerCase(),
            brand_id: product.brand_id,
            category_id: product.category_id,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            specs: product.specs
        })
        .eq('id', id)

    if (error) throw new Error(error.message)

    // 2. Update Images (Delete all and re-insert)
    if (product.images) {
        // Delete all existing
        await supabase
            .from('product_images')
            .delete()
            .eq('product_id', id)

        // Insert new list
        if (product.images.length > 0) {
            const imageInserts = product.images.map((url: string) => ({
                product_id: id,
                image_url: url
            }))

            await supabase
                .from('product_images')
                .insert(imageInserts)
        }
    }
}
// Search & Filter Logic
export interface ProductFilter {
    type?: string
    year?: string
    make?: string
    model?: string
}

export async function getFilterOptions() {
    const supabase = await createClient()

    // Get unique Years from compatibility
    const { data: years } = await supabase
        .from('compatibility')
        .select('year')
        .order('year', { ascending: false })

    // Get unique Makes from brands (for boats/motors) AND compatibility (for parts)
    const { data: brands } = await supabase
        .from('brands')
        .select('name')
        .order('name')

    // For simplicity in this MVP, we will merge unique values
    const uniqueYears = Array.from(new Set(years?.map(y => y.year))).filter(Boolean)
    const uniqueMakes = Array.from(new Set(brands?.map(b => b.name))).filter(Boolean)

    return {
        years: uniqueYears,
        makes: uniqueMakes
    }
}

export async function searchProducts(filters: ProductFilter): Promise<Product[]> {
    const supabase = await createClient()

    let productIds: string[] | null = null

    // 1. If searching Parts/Props by fitment (Year/Make), filter ID list from compatibility table first
    if (filters.year || (filters.make && (filters.type === 'part' || filters.type === 'prop'))) {
        let query = supabase.from('compatibility').select('product_id')

        if (filters.year) query = query.eq('year', parseInt(filters.year))
        if (filters.make) query = query.ilike('make', filters.make)
        // if (filters.model) query = query.ilike('model', filters.model)

        const { data: compatibilityMatches, error } = await query

        if (!error && compatibilityMatches) {
            productIds = compatibilityMatches.map(c => c.product_id)
        }
    }

    // 2. Main Product Query
    let query = supabase.from('products').select(`
        *,
        categories ( name, slug ),
        brands ( name ),
        product_images ( image_url )
    `)

    // Apply Type Filter
    if (filters.type && filters.type !== 'all') {
        const typeMap: Record<string, string> = {
            'outboard': 'motor',
            'boat': 'boat',
            'part': 'part',
            'prop': 'prop'
        }
        const dbType = typeMap[filters.type.toLowerCase()] || filters.type.toLowerCase()
        query = query.eq('type', dbType)
    }

    // Apply Product ID filter if we have fitment matches
    if (productIds !== null) {
        if (productIds.length === 0) return [] // No matches found in compatibility
        query = query.in('id', productIds)
    }

    // Apply Brand Filter for Boats/Motors (Direct attribute) if NOT searching compatibility
    if (filters.make && !['part', 'prop'].includes(filters.type?.toLowerCase() || '')) {
        // We need to filter by the joined brand name, but Supabase syntax for this is tricky on simple select.
        // Instead, we can search the name or try to filter by brand_id if we fetch it.
        // Simpler: Search name ILIKE '%Make%' as fallback or if possible use !inner join.
        // Let's try to match brand via name search for now as checking brand_id requires another lookup.
        query = query.ilike('name', `%${filters.make}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
        console.error("Error searching products:", error)
        return []
    }

    return data.map((item: any) => ({
        id: item.id,
        title: item.name,
        price: item.price || 0,
        image: item.product_images?.[0]?.image_url || "/placeholder-image.jpg",
        images: item.product_images?.map((i: any) => i.image_url) || [],
        category: item.categories?.name,
        tags: [],
        href: `/${item.type}s/${item.id}`,
        description: item.description,
        specs: [],
        stock: item.stock,
        sku: item.sku
    }))
}
