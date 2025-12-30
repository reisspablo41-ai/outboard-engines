"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface ImageGalleryProps {
    images: string[]
    className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    if (!images || images.length === 0) {
        return <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">No Images</div>
    }

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-secondary">
                <Image
                    src={images[selectedIndex]}
                    alt={`Product image ${selectedIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
                            selectedIndex === index
                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
