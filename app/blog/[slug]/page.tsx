import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/blog-data"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const post = articles.find(a => a.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="min-h-screen pb-16">
            {/* Hero Image */}
            <div className="relative w-full h-[400px] bg-muted">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
                    <Button asChild variant="outline" className="w-fit text-white border-white hover:bg-white/20 mb-6">
                        <Link href="/">
                            <ArrowLeft className="mr-2 size-4" /> Back to Home
                        </Link>
                    </Button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="size-4" />
                            Chief Mechanic
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-blue max-w-none">
                        <p className="lead text-xl text-muted-foreground mb-8">
                            {post.excerpt}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </div>
            </div>
        </article>
    )
}
