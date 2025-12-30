import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table" /* Need to implement Table */
import { cn } from "@/lib/utils"

interface SpecItem {
    label: string
    value: string | number
}

interface SpecsTableProps {
    specs: SpecItem[]
    className?: string
    title?: string
}

/* Implementing a simple Table here since I don't have the shadcn one yet */
/* Actually, I should probably make the shadcn table component first, but for speed I will build a nice table manually or inline */

export function SpecsTable({ specs, className, title = "Specifications" }: SpecsTableProps) {
    return (
        <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
            <div className="flex flex-col space-y-1.5 p-6 border-b">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
            </div>
            <div className="p-0">
                <table className="w-full text-sm text-left">
                    <tbody className="divide-y">
                        {specs.map((spec, index) => (
                            <tr key={spec.label} className={index % 2 === 0 ? "bg-muted/30" : "bg-transparent"}>
                                <td className="p-4 font-medium text-muted-foreground w-1/3">{spec.label}</td>
                                <td className="p-4 font-semibold text-foreground">{spec.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
