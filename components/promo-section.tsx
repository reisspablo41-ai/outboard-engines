import Link from "next/link"
import { ArrowRight, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PromoSection() {
    return (
        <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-semibold text-white border border-white/20">
                            <Tag className="size-4" />
                            <span>Seasonal Sale</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Repower Your Fall Season
                        </h2>
                        <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                            Get up to $500 off select Yamaha and Mercury portable outboards. Plus, free shipping on all maintenance kits this week only.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
                                Shop Sale Outboards
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white text-white hover:bg-white hover:text-accent bg-transparent">
                                View Maintenance Kits <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Image/Visual Side */}
                    <div className="hidden lg:block relative h-[400px] w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden p-8 flex items-center justify-center">
                        {/* Placeholder for a high-impact product image */}
                        <div className="text-center space-y-4">
                            <div className="text-6xl font-black text-white/20 uppercase tracking-widest">
                                Save<br />Big
                            </div>
                            <p className="text-white/60">Limited Time Offer. Ends Oct 31st.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
