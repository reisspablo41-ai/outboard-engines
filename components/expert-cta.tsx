import Link from "next/link"
import { Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExpertCTA() {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Abstract Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Not Sure What You Need?</h2>
                <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                    Our certified marine technicians are standing by to help you find the exact part or motor for your vessel.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 w-full sm:w-auto text-lg px-8 py-6 h-auto">
                        <Link href="/contact">
                            <Phone className="mr-2 size-5" />
                            Talk to an Expert
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
