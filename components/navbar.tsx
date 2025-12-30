"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
/* Import Cart Sheet instead of generic icon */
import { CartSheet } from "@/components/cart-sheet"

const navItems = [
    { name: "Boats", href: "/boats" },
    { name: "Motors", href: "/motors" },
    { name: "Parts", href: "/parts" },
    { name: "Propellers", href: "/propellers" },
    { name: "Service", href: "/service" },
]

export function Navbar() {
    const router = useRouter()
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const [isSheetOpen, setIsSheetOpen] = React.useState(false)

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all",
                isScrolled ? "shadow-sm" : ""
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 py-4">
                                <div onClick={() => setIsSheetOpen(false)}>
                                    <Logo />
                                </div>
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsSheetOpen(false)}
                                            className="text-lg font-medium hover:text-accent transition-colors block py-2 border-b border-border/50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsSheetOpen(false)}
                                        className="text-lg font-medium hover:text-accent transition-colors block py-2 border-b border-border/50"
                                    >
                                        Contact Us
                                    </Link>
                                </nav>
                                <div className="mt-4 flex flex-col gap-2">
                                    <Link href="/login" className="w-full" onClick={() => setIsSheetOpen(false)}><Button className="w-full">Sign In</Button></Link>
                                    <Button variant="outline" className="w-full">Part Finder</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <Logo />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
                            if (query) {
                                router.push(`/search?make=${encodeURIComponent(query)}`);
                            }
                        }}>
                            <Input
                                type="search"
                                name="search"
                                placeholder="Search parts, boats..."
                                className="pl-9 h-9 bg-secondary/50 border-transparent focus:bg-background transition-all rounded-full"
                            />
                        </form>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link href="/login">
                        <Button variant="ghost" size="icon" aria-label="Account">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Cart Removed as per request */}
                    {/* <CartSheet /> */}
                </div>
            </div>
        </header>
    )
}
