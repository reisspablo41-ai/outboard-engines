"use client"

import { ShoppingCart, Trash2, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { processCheckout } from "@/actions/checkout"
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
    const [isCheckout, setIsCheckout] = useState(false)
    const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null)

    const handleCheckout = async (formData: FormData) => {
        setMessage(null)
        const userDetails = {
            full_name: formData.get("full_name") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            phone: formData.get("phone") as string
        }

        // Optimistic UI updates could go here, but strictly relying on server response for now
        const result = await processCheckout(items, userDetails)

        setMessage({ success: result.success, text: result.message })

        if (result.success) {
            // Clear cart logic would ideally be here if we exposed a clearCart method
            // Since we don't have clearCart exposed in useCart (based on file read), we might need to manually remove all or just refresh.
            // Actually, simpler to just reload or force clear.
            // Let's manually remove all items one by one or reload? 
            // Better: update CartProvider to expose clearCart or just use a loop.
            items.forEach(item => removeItem(item.id))
            setTimeout(() => {
                setIsCheckout(false)
                setMessage(null)
            }, 3000)
        }
    }

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
            <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        {isCheckout ? "Checkout" : `Shopping Cart (${cartCount})`}
                    </SheetTitle>
                </SheetHeader>

                <Separator className="my-4" />

                {!isCheckout ? (
                    <>
                        <div className="flex-1 overflow-y-auto -mx-6 px-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2 py-12">
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
                                <Button
                                    className="w-full bg-accent text-white hover:bg-accent/90"
                                    size="lg"
                                    disabled={items.length === 0}
                                    onClick={() => setIsCheckout(true)}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col">
                        {message && (
                            <div className={`p-4 mb-4 rounded-md text-sm ${message.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                        {!message?.success && (
                            <form action={handleCheckout} className="space-y-4 flex-1">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input id="full_name" name="full_name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Shipping Address</Label>
                                    <Textarea id="address" name="address" required placeholder="123 Main St, City, State, ZIP" />
                                </div>

                                <div className="pt-4 space-y-2">
                                    <SubmitButton />
                                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsCheckout(false)}>
                                        Back to Cart
                                    </Button>
                                </div>
                            </form>
                        )}
                        {message?.success && (
                            <Button type="button" variant="outline" className="w-full mt-4" onClick={() => setIsCheckout(false)}>
                                Close
                            </Button>
                        )}
                    </div>
                )}

            </SheetContent>
        </Sheet>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Processing..." : "Place Order"}
        </Button>
    )
}
