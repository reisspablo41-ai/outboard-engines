import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut, ArrowLeft, Layers, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const NavLinks = () => (
        <>
            <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/50 transition-colors text-foreground"
            >
                <LayoutDashboard className="size-4" />
                Dashboard
            </Link>
            <Link
                href="/admin/products"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
                <Package className="size-4" />
                Products
            </Link>
            <Link
                href="/admin/orders"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
                <ShoppingCart className="size-4" />
                Orders
            </Link>
            <Link
                href="/admin/categories"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
                <Layers className="size-4" />
                Categories
            </Link>
            <Link
                href="/admin/subcategories"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
                <Tags className="size-4" />
                Subcategories
            </Link>
        </>
    );

    const SidebarFooter = () => (
        <>
            <Link href="/">
                <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Site
                </Button>
            </Link>
            <Button variant="outline" size="sm" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="mr-2 size-4" />
                Sign Out
            </Button>
        </>
    );

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-muted/20">
            {/* Mobile Header */}
            <MobileNav />

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-card border-r flex-col fixed h-full inset-y-0 z-50">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/admin" className="font-bold text-xl text-primary">
                        Admin Panel
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavLinks />
                </nav>

                <div className="p-4 border-t space-y-2">
                    <SidebarFooter />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
