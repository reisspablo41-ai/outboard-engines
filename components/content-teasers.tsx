import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const articles = [
    {
        title: "How to Winterize Your 4-Stroke Outboard",
        excerpt: "Step-by-step guide to protecting your engine during the off-season. Don't let freezing temps crack your block.",
        image: "https://media.istockphoto.com/id/1154563810/photo/mechanic-repairing-outboard-marine-engine.jpg?s=612x612&w=0&k=20&c=P-5gXfKj7qJ8wJ9XX5Z8qJ6Kx_8_X4Z6_X9_X4Z6_X9",
        slug: "/blog/winterizing-guide",
        date: "Oct 15, 2024"
    },
    {
        title: "Prop Pitch Explained: Speed vs. Hole Shot",
        excerpt: "Understanding the physics of your propeller. Are you running the right pitch for your boat's weight?",
        image: "https://media.gettyimages.com/id/157691655/photo/mechanic-fixing-boat-engine.jpg?s=612x612&w=0&k=20&c=X_X9_X4Z6_X9_X4Z6_X9_X4Z6_X9_X4Z6_X9",
        slug: "/blog/prop-pitch-guide",
        date: "Sep 22, 2024"
    },
    {
        title: "Troubleshooting: Why Won't My Outboard Start?",
        excerpt: "The 5 most common reasons for a no-start condition and how to fix them on the water.",
        image: "https://media.istockphoto.com/id/175417255/photo/outboard-engine-repair.jpg?s=612x612&w=0&k=20&c=X_X9_X4Z6_X9_X4Z6_X9_X4Z6_X9_X4Z6_X9_X4Z6_X9",
        slug: "/blog/troubleshooting-start",
        date: "Aug 10, 2024"
    }
]

export function ContentTeasers() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">The Captain's Log</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Expert guides, maintenance tips, and technical advice from our certified mechanics.
                        </p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        View All Guides <ArrowRight className="size-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link href="#" key={article.slug} className="group block h-full">
                            <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-3">
                                        <BookOpen className="size-3" />
                                        <span>GUIDE</span>
                                        <span className="text-muted-foreground font-normal">• {article.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                        {article.excerpt}
                                    </p>
                                    <span className="text-sm font-semibold text-primary group-hover:underline">
                                        Read Article
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
