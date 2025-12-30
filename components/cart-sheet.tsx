"use client"

import { ShoppingCart, Trash2, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"

export function CartSheet() {
    const { items, removeItem, updateQuantity, cartCount, cartTotal } = useCart()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-accent text-[8px] font-bold flex items-center justify-center text-white">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col">
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
                </SheetHeader>

                <Separator className="my-4" />

                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2">
                            <ShoppingCart className="size-12 opacity-20" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-sm">${item.price.toLocaleString()}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 rounded-full border flex items-center justify-center text-xs hover:bg-secondary"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs w-2 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 rounded-full border flex items-center justify-center text-xs hover:bg-secondary"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-muted-foreground hover:text-destructive self-start"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-4 mt-auto">
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                        <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total</span>
                            <span>${cartTotal.toLocaleString()}</span>
                        </div>
                        <Button className="w-full bg-accent text-white hover:bg-accent/90" size="lg" disabled={items.length === 0}>
                            Checkout
                        </Button>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}
