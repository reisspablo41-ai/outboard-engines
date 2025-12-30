"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface FilterSidebarProps {
    categories?: { id: string, name: string }[]
}

export function FilterSidebar({ categories = [] }: FilterSidebarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [priceRange, setPriceRange] = useState({
        min: searchParams.get("minPrice") || "",
        max: searchParams.get("maxPrice") || ""
    })

    // Helper to update URL
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(name, value)
            } else {
                params.delete(name)
            }
            return params.toString()
        },
        [searchParams]
    )

    const handleFilterChange = (name: string, value: string) => {
        router.push(pathname + "?" + createQueryString(name, value), { scroll: false })
    }

    const handlePriceApply = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (priceRange.min) params.set("minPrice", priceRange.min)
        else params.delete("minPrice")

        if (priceRange.max) params.set("maxPrice", priceRange.max)
        else params.delete("maxPrice")

        router.push(pathname + "?" + params.toString(), { scroll: false })
    }

    const clearAll = () => {
        router.push(pathname)
        setPriceRange({ min: "", max: "" })
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-xs">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clearAll}>Clear All</Button>
            </div>

            <Separator />

            {/* Search Filter */}
            <div className="space-y-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search keywords..."
                        className="pl-9"
                        defaultValue={searchParams.get("make") || ""}
                        onChange={(e) => {
                            // Debouncing could be added here
                            handleFilterChange("make", e.target.value)
                        }}
                    />
                </div>
            </div>

            <Separator />

            {/* Categories Filter */}
            {categories.length > 0 && (
                <>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Categories</h4>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center space-x-2">
                                    <input type="checkbox" id={category.id} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <label
                                        htmlFor={category.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator />
                </>
            )}

            {/* Brands Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-sm">Brands</h4>
                <div className="space-y-2">
                    {['Yamaha', 'Mercury', 'Suzuki', 'Honda', 'Boston Whaler'].map((brand) => {
                        const isChecked = searchParams.get("make")?.toLowerCase().includes(brand.toLowerCase())
                        return (
                            <div key={brand} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={brand}
                                    checked={!!isChecked}
                                    onChange={(e) => handleFilterChange("make", e.target.checked ? brand : "")}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                    htmlFor={brand}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {brand}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-semibold text-sm">Price Range</h4>
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        placeholder="Min"
                        className="w-24"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        className="w-24"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                </div>
                <Button variant="outline" className="w-full" onClick={handlePriceApply}>Apply Price</Button>
            </div>

        </div>
    )
}
