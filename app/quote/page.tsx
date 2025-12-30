"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useRef, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { submitQuoteRequest } from "@/actions/quote"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface QuoteState {
    success: boolean;
    message: string | null;
}

const initialState: QuoteState = {
    success: false,
    message: null,
}

function QuoteForm() {
    const searchParams = useSearchParams()
    const product = searchParams.get("product") || ""
    const sku = searchParams.get("sku") || ""

    // Quantity Limits
    const limit = searchParams.get("limit")
    const maxQuantity = limit ? parseInt(limit) : undefined
    const isLimited = !!limit



    const [state, formAction] = useFormState(submitQuoteRequest, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset()
        }
    }, [state])

    if (state.success) {
        return (
            <div className="max-w-md mx-auto text-center space-y-6 py-12">
                <div className="bg-green-50 text-green-700 p-8 rounded-lg border border-green-200">
                    <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
                    <p>{state.message}</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        )
    }

    return (
        <form ref={formRef} action={formAction} className="space-y-6 max-w-xl mx-auto bg-card p-8 rounded-lg border shadow-sm">
            <div className="space-y-2 text-center pb-4">
                <h1 className="text-3xl font-bold">Request a Quote</h1>
                <p className="text-muted-foreground">
                    Complete the form below for <strong>{product}</strong>.
                </p>
            </div>

            {state.message && (
                <div className={`p-4 rounded-md text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            <input type="hidden" name="product_name" value={product} />
            <input type="hidden" name="sku" value={sku} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input id="full_name" name="full_name" required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        max={maxQuantity}
                        defaultValue="1"
                        readOnly={isLimited}
                        className={isLimited ? "bg-secondary opacity-80" : ""}
                        required
                    />
                    {isLimited && <span className="text-[10px] text-muted-foreground">Limited to {limit} per request.</span>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location (City, State, Zip)</Label>
                <Input id="location" name="location" required placeholder="Miami, FL 33100" />
                <p className="text-[10px] text-muted-foreground">Required for accurate shipping calculation.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="I need installation services..."
                    className="resize-none min-h-[100px]"
                />
            </div>

            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full h-12 text-lg" disabled={pending}>
            {pending ? "Sending..." : "Submit Quote Request"} <Send className="ml-2 size-4" />
        </Button>
    )
}

export default function QuotePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
                <ArrowLeft className="mr-2 size-4" />
                Back to Store
            </Link>
            <Suspense fallback={<div className="text-center py-12">Loading form...</div>}>
                <QuoteForm />
            </Suspense>
        </div>
    )
}
