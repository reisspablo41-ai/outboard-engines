"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" /* I need to create Badge */

interface ProductCardProps {
    id: string
    title: string
    price: number
    image: string
    category: string
    tags?: string[]
    href: string
}

/* Creating a local Badge since I haven't made one yet, or I can make a file. I'll make a file for Badge later, inline for now to save a step or just use standard div */
/* actually better to just make the component properly if I can. I'll simple style it here. */

export function ProductCard({ id, title, price, image, category, tags, href }: ProductCardProps) {
    return (
        <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-white"
                >
                    <Heart className="size-5" />
                </Button>
                {tags && tags.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-bold text-white bg-accent rounded shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <CardContent className="p-4">
                <div className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {category}
                </div>
                <Link href={href}>
                    <h3 className="text-lg font-bold text-primary line-clamp-2 hover:text-accent transition-colors">
                        {title}
                    </h3>
                </Link>
                <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold rounded text-primary">
                        ${price.toLocaleString()}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2" variant="outline">
                    <ShoppingCart className="size-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
