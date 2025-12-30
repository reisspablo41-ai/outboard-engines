import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
    return (
        <section className="py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <Mail className="size-12 mx-auto text-accent" />
                    <h2 className="text-3xl font-bold tracking-tight">Join the Captain's Club</h2>
                    <p className="text-primary-foreground/80 text-lg">
                        Get exclusive deals, maintenance tips, and early access to sales delivered to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                        <Input
                            placeholder="Enter your email"
                            className="bg-primary-foreground text-primary border-transparent h-12"
                        />
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-white h-12 px-8">
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-xs text-primary-foreground/60">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    )
}
