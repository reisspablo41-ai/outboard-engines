import { createClient } from "@/lib/supabase/server"

export interface Order {
    id: string
    created_at: string
    status: string
    total: number
    customer: {
        full_name: string
        email: string
    }
}

export async function getOrders(): Promise<Order[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('orders')
        .select(`
            id,
            created_at,
            status,
            total,
            full_name,
            email
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
        return []
    }

    return data.map((o: any) => ({
        id: o.id,
        created_at: new Date(o.created_at).toLocaleDateString(),
        status: o.status,
        total: o.total,
        customer: {
            full_name: o.full_name,
            email: o.email
        }
    }))
}

export async function getOrder(id: string) {
    const supabase = await createClient()

    // join with order_items -> products to see what they bought
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                quantity,
                unit_price,
                products ( name, sku, product_images ( image_url ) )
            )
        `)
        .eq('id', id)
        .single()

    if (error || !data) return null

    return {
        ...data,
        items: data.order_items.map((item: any) => ({
            name: item.products?.name,
            sku: item.products?.sku,
            image: item.products?.product_images?.[0]?.image_url,
            quantity: item.quantity,
            price: item.unit_price
        }))
    }
}

export async function updateOrderStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)

    if (error) throw new Error(error.message)
}
