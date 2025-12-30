"use client"

import { useState, useRef, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { submitQuoteRequest } from "@/actions/quote"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Send } from "lucide-react"

interface QuoteDialogProps {
    title: string
    quantity?: number
    sku?: string
}

interface QuoteState {
    success: boolean;
    message: string | null;
}

const initialState: QuoteState = {
    success: false,
    message: null,
}

export function QuoteDialog({ title, quantity = 1, sku }: QuoteDialogProps) {
    const [open, setOpen] = useState(false)
    const [state, formAction] = useFormState(submitQuoteRequest, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success && open) {
            formRef.current?.reset()
            // Optional: Auto close on success after delay? 
            // setOpen(false) 
        }
    }, [state, open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-accent hover:bg-accent/90">
                    <FileText className="size-4" />
                    Request Quote
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Request a Quote</DialogTitle>
                    <DialogDescription>
                        Interested in the {title}? Fill out the form below and we'll get back to you with pricing and shipping details.
                    </DialogDescription>
                </DialogHeader>

                {state.message && (
                    <div className={`p-4 rounded-md text-sm ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {state.message}
                    </div>
                )}

                {!state.success && (
                    <form ref={formRef} action={formAction} className="space-y-4">
                        <input type="hidden" name="product_name" value={title} />
                        {sku && <input type="hidden" name="sku" value={sku} />}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input id="full_name" name="full_name" required placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input id="quantity" name="quantity" type="number" min="1" defaultValue={quantity} required />
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
                                className="resize-none"
                            />
                        </div>

                        <SubmitButton />
                    </form>
                )}
                {state.success && (
                    <Button onClick={() => setOpen(false)} variant="outline" className="w-full">
                        Close
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Sending Request..." : "Submit Request"} <Send className="ml-2 size-3" />
        </Button>
    )
}
