import Link from "next/link"
import { Anchor, Facebook, Instagram, Twitter } from "lucide-react"

import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Logo className="text-white" />
                        <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
                            The premier destination for marine engines, boats, and parts.
                            Authorized dealer for major brands. Quality you can trust on the water.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" aria-label="Facebook" className="hover:text-accent transition-colors">
                                <Facebook className="size-5" />
                            </Link>
                            <Link href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
                                <Instagram className="size-5" />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="hover:text-accent transition-colors">
                                <Twitter className="size-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg tracking-tight">Shop</h3>
                        <ul className="space-y-2 text-sm text-primary-foreground/70">
                            <li><Link href="/boats" className="hover:text-white transition-colors">Boats</Link></li>
                            <li><Link href="/motors" className="hover:text-white transition-colors">Outboard Motors</Link></li>
                            <li><Link href="/parts" className="hover:text-white transition-colors">Marine Parts</Link></li>
                            <li><Link href="/propellers" className="hover:text-white transition-colors">Propellers</Link></li>
                            <li><Link href="/sale" className="hover:text-accent transition-colors font-medium">Clearance</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg tracking-tight">Support</h3>
                        <ul className="space-y-2 text-sm text-primary-foreground/70">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/warranty" className="hover:text-white transition-colors">Warranty Info</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg tracking-tight">Contact</h3>
                        <ul className="space-y-2 text-sm text-primary-foreground/70">
                            <li>1-800-OUTBOARD</li>
                            <li>sales@outboards.com</li>
                            <li>123 Marine Way, Miami FL 33100</li>
                            <li className="pt-2">
                                <span className="block text-xs uppercase tracking-wider text-primary-foreground/50 mb-1">Hours</span>
                                Mon - Fri: 8am - 6pm EST<br />
                                Sat: 9am - 4pm EST
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-primary-foreground/10" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
                    <p>&copy; {new Date().getFullYear()} Outboards E-Commerce. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
