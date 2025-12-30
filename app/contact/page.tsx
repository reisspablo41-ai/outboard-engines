"use client"

import { Mail, MapPin, Phone, Clock, Send } from "lucide-react"
import { useFormStatus } from "react-dom"
import { useEffect, useRef, useActionState } from "react"
import { submitContactForm } from "@/actions/contact"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ContactState {
    success: boolean;
    message: string | null;
}

const initialState: ContactState = {
    success: false,
    message: null,
}

export default function ContactPage() {
    const [state, formAction] = useActionState(submitContactForm, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset()
        }
    }, [state])

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                {state.message && (
                    <div className={`p-4 rounded-md ${state.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {state.message}
                    </div>
                )}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Contact Us</h1>
                    <p className="text-xl text-muted-foreground">
                        Questions about fitment? Need a quote for a repower? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form ref={formRef} action={formAction} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input name="first_name" placeholder="John" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input name="last_name" placeholder="Doe" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input name="email" type="email" placeholder="john@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone (Optional)</label>
                                    <Input name="phone" type="tel" placeholder="(555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message</label>
                                    <textarea
                                        name="message"
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="I need help finding a part for my 2018 Yamaha..."
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Send Message <Send className="ml-2 size-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Get in Touch</h3>
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-accent" />
                                <span>+1 (773) 349-6758</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-5 text-accent" />
                                <span>support@boatsoutboardmotorsandpartsforsale.com</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="size-5 text-accent mt-1" />
                                <span>
                                    333 Kennedy St<br />
                                    Oakland, CA 94606
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Store Hours</h3>
                            <div className="flex items-start gap-3">
                                <Clock className="size-5 text-accent mt-1" />
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between w-40">
                                        <span>Mon - Fri:</span>
                                        <span>8am - 6pm EST</span>
                                    </div>
                                    <div className="flex justify-between w-40">
                                        <span>Saturday:</span>
                                        <span>9am - 4pm EST</span>
                                    </div>
                                    <div className="flex justify-between w-40">
                                        <span>Sunday:</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

