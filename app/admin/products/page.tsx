import Link from "next/link"
import { getProducts } from "@/lib/api/products"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
    // Fetch all types for admin list - brute force combining for now as MVP
    const boats = await getProducts('boat')
    const motors = await getProducts('motor')
    const parts = await getProducts('part')
    const props = await getProducts('prop')

    const products = [...boats, ...motors, ...parts, ...props]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products {products.length > 0 && `(${products.length})`}</h1>
                    <p className="text-muted-foreground">Manage your inventory.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 size-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No products found. Add your first product to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {/* Extract type from href /boats/id -> boat */}
                                        <Badge variant="outline" className="capitalize">
                                            {product.href.split('/')[1]?.slice(0, -1) || 'Item'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>{product.sku || '-'}</TableCell>
                                    <TableCell>${product.price.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">{product.stock ?? '-'}</TableCell>
                                    <TableCell className="text-right">
                                        {/* Link to Edit Page (to be implemented next) */}
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/products/${product.id}`}>Edit</Link>
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
