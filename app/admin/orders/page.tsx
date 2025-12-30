import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getOrders } from "@/lib/api/orders"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
    const orders = await getOrders()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">Manage customer orders.</p>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                                    <TableCell>{order.created_at}</TableCell>
                                    <TableCell>
                                        <div>{order.customer.full_name}</div>
                                        <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="capitalize">{order.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {order.total ? `$${order.total.toLocaleString()}` : 'Inquiry'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="ghost" asChild>
                                            <Link href={`/admin/orders/${order.id}`}>View</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
