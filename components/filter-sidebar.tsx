"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"

/* I am missing Checkbox and Slider and ScrollArea. I should probably implement Checkbox at least. */
/* I will implement a basic version of these inputs using standard HTML for now to keep momentum, styled with Tailwind. */

interface FilterSidebarProps {
    categories?: { id: string, name: string }[]
}

export function FilterSidebar({ categories = [] }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState([0, 50000])

    return (
        <div className="flex flex-col gap-6 w-full max-w-xs">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground">Clear All</Button>
            </div>

            <Separator />

            {/* Search Filter */}
            <div className="space-y-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="text" placeholder="Search keywords..." className="pl-9" />
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
                    {['Yamaha', 'Mercury', 'Suzuki', 'Honda', 'Boston Whaler'].map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                            <input type="checkbox" id={brand} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label
                                htmlFor={brand}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Condition Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-sm">Condition</h4>
                <div className="space-y-2">
                    {['New', 'Used', 'Certified Pre-Owned'].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                            <input type="checkbox" id={item} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label
                                htmlFor={item}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {item}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-semibold text-sm">Price Range</h4>
                <div className="flex items-center gap-4">
                    <Input type="number" placeholder="Min" className="w-24" />
                    <span className="text-muted-foreground">-</span>
                    <Input type="number" placeholder="Max" className="w-24" />
                </div>
                <Button variant="outline" className="w-full">Apply Price</Button>
            </div>

        </div>
    )
}
