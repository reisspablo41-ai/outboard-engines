"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, LogOut, ArrowLeft, Layers, Tags, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
        { href: "/admin/categories", label: "Categories", icon: Layers },
        { href: "/admin/subcategories", label: "Subcategories", icon: Tags },
    ]

    return (
        <header className="md:hidden flex items-center p-4 border-b bg-card sticky top-0 z-40">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <div className="flex flex-col h-full">
                        <div className="h-16 flex items-center px-6 border-b">
                            <Link href="/admin" className="font-bold text-xl text-primary" onClick={() => setOpen(false)}>
                                Admin Panel
                            </Link>
                        </div>
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        pathname === item.href
                                            ? "bg-secondary text-foreground"
                                            : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="size-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-4 border-t space-y-2">
                            <Link href="/" onClick={() => setOpen(false)}>
                                <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                                    <ArrowLeft className="mr-2 size-4" />
                                    Back to Site
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                                <LogOut className="mr-2 size-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="ml-4 font-bold text-lg">Admin Panel</div>
        </header>
    )
}
