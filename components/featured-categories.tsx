import Link from "next/link"
import { Anchor, Cog, Ship, Settings } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const categories = [
    {
        title: "Boats",
        icon: Ship,
        href: "/boats",
        description: "New & Certified Pre-Owned hulls ready for the water.",
        color: "bg-blue-500",
    },
    {
        title: "Outboard Motors",
        icon: Anchor,
        href: "/motors",
        description: "High-performance engines from Yamaha, Mercury, & more.",
        color: "bg-orange-500",
    },
    {
        title: "Marine Parts",
        icon: Cog,
        href: "/parts",
        description: "OEM replacement parts for maintenance and repairs.",
        color: "bg-green-500",
    },
    {
        title: "Propellers",
        icon: Settings,
        href: "/propellers",
        description: "Find the perfect pitch for speed and efficiency.",
        color: "bg-purple-500",
    },
]

export function FeaturedCategories() {
    return (
        <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Explore Our Categories</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need for your vessel, categorized for easy browsing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link key={category.title} href={category.href} className="group block h-full">
                            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-border">
                                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                    <div className={`p-4 rounded-full ${category.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                                        <category.icon className={`size-8 ${category.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary">{category.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {category.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
