"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
    id: string
    title: string
    price: number
    image: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    cartCount: number
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === newItem.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...newItem, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return removeItem(id)
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, cartCount, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
