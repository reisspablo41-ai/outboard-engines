import { cn } from "@/lib/utils"

interface SEOContentBlockProps {
    title: string
    content: string
    className?: string
}

export function SEOContentBlock({ title, content, className }: SEOContentBlockProps) {
    return (
        <section className={cn("py-12 bg-muted/20 border-t", className)}>
            <div className="container mx-auto px-4 prose prose-blue dark:prose-invert max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </section>
    )
}
