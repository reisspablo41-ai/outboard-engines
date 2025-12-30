import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSubcategories } from "@/lib/api/categories"

export const dynamic = 'force-dynamic'

export default async function SubcategoriesPage() {
    const subcategories = await getSubcategories()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
                    <p className="text-muted-foreground">Manage product subcategories by category.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/subcategories/new">Add Subcategory</Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subcategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                    No subcategories found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            subcategories.map((sub: any) => (
                                <TableRow key={sub.id}>
                                    <TableCell className="text-muted-foreground">
                                        {sub.categories?.name}
                                    </TableCell>
                                    <TableCell className="font-medium">{sub.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{sub.slug}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/subcategories/${sub.id}`}>Edit</Link>
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
