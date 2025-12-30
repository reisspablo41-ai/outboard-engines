import { Star, Quote } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// --- Data Generation ---
const firstNames = ["Mike", "John", "Sarah", "Emily", "David", "Chris", "Jessica", "Amanda", "Robert", "James", "William", "Tom", "Ashley", "Brian", "Mark"]
const lastNames = ["S.", "T.", "R.", "M.", "W.", "H.", "B.", "C.", "D.", "F.", "K.", "L.", "P."]
const locations = ["Miami, FL", "Seattle, WA", "Charleston, SC", "San Diego, CA", "Austin, TX", "New Orleans, LA", "Tampa, FL", "Portland, ME", "Annapolis, MD", "Key West, FL", "Boston, MA", "Mobile, AL", "Savannah, GA"]
const productTypes = ["Yamaha Outboard", "Order", "Propeller", "Water Pump Kit", "Lower Unit", "Fuel Filter", "Steering Cable", "Bimini Top", "Boat Cover", "Spark Plugs"]

const phrases = [
    "Fast shipping and great price!",
    "Saved my weekend on the water.",
    "Exactly what I needed.",
    "Customer service was incredibly helpful.",
    "Will definitely buy from here again.",
    "Genuine OEM parts, not cheap knockoffs.",
    "The part finder tool made it so easy.",
    "Arrived sooner than expected.",
    "Highly professional dealership.",
    "Best prices on the internet.",
    "Restoring an old Whaler and this place has everything.",
    "My mechanic recommended you guys.",
    "Easy return process when I ordered the wrong thing.",
    "Packaged very well, no damage.",
    "A+ service all around."
]

// Deterministic generator to create stable data
function generateTestimonials(count: number) {
    const data = []
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[i % firstNames.length]
        const lastName = lastNames[i % lastNames.length]
        const location = locations[i % locations.length]
        const product = productTypes[i % productTypes.length]
        const phrase = phrases[i % phrases.length]
        // Add some random variation to dates
        const date = new Date(2024, Math.floor(i / 3) % 12, (i % 28) + 1).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

        data.push({
            id: i,
            name: `${firstName} ${lastName}`,
            location,
            product,
            text: `${phrase} I ordered a ${product.toLowerCase()} and it was perfect. Thanks Outboards.com!`,
            rating: 5,
            date,
            verified: true
        })
    }
    return data
}

const testimonials = generateTestimonials(50)

export default function TestimonialsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h1 className="text-4xl font-bold text-primary">Customer Reviews</h1>
                <p className="text-xl text-muted-foreground">
                    See what over 50,000 happy boaters have to say about our service, selection, and shipping.
                </p>
                <div className="flex justify-center items-center gap-2 text-yellow-500 font-bold text-lg">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="fill-current w-6 h-6" />)}
                    </div>
                    <span className="text-foreground">4.9/5 Average Rating</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                    <Card key={t.id} className="bg-card border-secondary/20 hover:border-primary/20 transition-colors">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="size-4 fill-current" />
                                ))}
                            </div>
                            {t.verified && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                                    Verified
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Quote className="size-8 text-primary/20 mb-2" />
                                <p className="text-muted-foreground leading-relaxed">
                                    "{t.text}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">{t.date}</p>
                                    <p className="text-xs font-medium text-primary mt-0.5">{t.product}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
