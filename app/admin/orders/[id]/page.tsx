import { notFound } from "next/navigation"
import { getOrder, updateOrderStatus } from "@/lib/api/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { revalidatePath } from "next/cache"

interface OrderPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function OrderDetailsPage({ params }: OrderPageProps) {
    const { id } = await params
    const order = await getOrder(id)

    if (!order) notFound()

    // Server Action for Status Update
    async function updateStatus(formData: FormData) {
        "use server"
        const newStatus = formData.get('status') as string
        if (newStatus) {
            await updateOrderStatus(id, newStatus)
            revalidatePath(`/admin/orders/${id}`)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <form action={updateStatus} className="flex gap-2 items-center">
                        <Select name="status" defaultValue={order.status}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit" size="sm">Update Status</Button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Customer Info */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Customer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="font-medium">{order.full_name}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                        <p className="text-sm">{order.shipping_address || "No shipping address provided."}</p>
                        <p className="text-sm">{order.phone}</p>
                    </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* In a real app, map order items here. Schema supported it. */}
                            {/* Since getOrder joins them, we can display them. */}
                            {order.items && order.items.length > 0 ? (
                                order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
                                        <div className="flex items-center gap-4">
                                            {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />}
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">${item.price}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No items (Inquiry or custom order).</p>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-end">
                            <div className="text-xl font-bold">Total: ${order.total?.toLocaleString() || "0.00"}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
