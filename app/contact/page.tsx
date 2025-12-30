import { Mail, MapPin, Phone, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone (Optional)</label>
                                <Input type="tel" placeholder="(555) 000-0000" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="I need help finding a part for my 2018 Yamaha..." />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Get in Touch</h3>
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-accent" />
                                <span>1-800-OUTBOARD</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-5 text-accent" />
                                <span>sales@outboards.com</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="size-5 text-accent mt-1" />
                                <span>
                                    123 Marine Way<br />
                                    Miami, FL 33100
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
