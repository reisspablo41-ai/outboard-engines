import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
    {
        name: "Capt. Mark S.",
        location: "Miami, FL",
        text: "I needed a lower unit for my Yamaha 250 ASAP before the tournament. Outboards.com had it in stock and overnighted it. Saved my charter season.",
        rating: 5,
    },
    {
        name: "Sarah Jenkins",
        location: "Seattle, WA",
        text: "The part finder is a lifesaver. I used to guess which impeller kit I needed, but this site makes it idiot-proof. Fast shipping too.",
        rating: 5,
    },
    {
        name: "Mike T.",
        location: "Charleston, SC",
        text: "Great prices on OEM parts. I don't trust aftermarket junk on my boat, and it's nice to find a dealer that stocks the real deal.",
        rating: 5,
    },
]

export function Testimonials() {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Trusted by Captains & DIYers</h2>
                    <p className="text-muted-foreground text-lg">
                        See why thousands of boaters rely on us to stay on the water.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <Card key={index} className="bg-card border-none shadow-sm">
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex gap-1 text-orange-500">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="size-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                                <div className="pt-2">
                                    <div className="font-semibold">{t.name}</div>
                                    <div className="text-xs text-muted-foreground">{t.location}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
