import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PartFinder } from "@/components/part-finder"

export function Hero() {
    return (
        <section className="relative w-full min-h-[600px] flex items-center bg-primary overflow-hidden">
            {/* Background Image Placeholder or Gradient */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544155184-c8c227bf88b3?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>

            <div className="container relative mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Text Content */}
                <div className="flex-1 space-y-6 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Boats. Motors. Parts. <br />
                        <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Done Right.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                        The most reliable source for OEM parts, new outboards, and certified pre-owned boats.
                        Get back on the water faster with our fitment guarantee.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold">
                            <Link href="/boats">Shop Boats</Link>
                        </Button>
                        <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold border-none">
                            <Link href="/motors">
                                Shop Motors
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Part Finder Widget */}
                <div className="w-full max-w-md lg:mr-8 relative z-10">
                    <PartFinder />
                </div>
            </div>
        </section>
    )
}
