import { BadgeCheck, ShieldCheck, Truck, Wrench } from "lucide-react"

const features = [
    {
        title: "Authorized Dealer",
        description: "Official retailer for top marine brands.",
        icon: BadgeCheck,
    },
    {
        title: "Certified Technicians",
        description: "Expert support from real marine mechanics.",
        icon: Wrench,
    },
    {
        title: "Fitment Guarantee",
        description: "We verify every part fits your engine.",
        icon: ShieldCheck,
    },
    {
        title: "Nationwide Shipping",
        description: "Fast delivery to your dock or door.",
        icon: Truck,
    },
]

export function TrustSection() {
    return (
        <section className="py-16 bg-white dark:bg-card border-y">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-default">
                            <div className="p-3 bg-primary/5 rounded-full text-primary shrink-0">
                                <feature.icon className="size-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
