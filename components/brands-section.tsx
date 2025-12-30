/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

const brands = [
    "Yamaha",
    "Mercury",
    "Suzuki",
    "Honda",
    "Tohatsu",
    "Evinrude",
]

export function BrandsSection() {
    return (
        <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                    Authorized Dealer For
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder text for brands since I don't have SVGs handy, but styling as logos */}
                    {brands.map((brand) => (
                        <div key={brand} className="text-2xl md:text-3xl font-black text-primary/80 select-none">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
