import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, Clock, ShieldCheck, Phone } from "lucide-react"

export default function ServicePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-primary">Expert Marine Service & Repair</h1>
                    <p className="text-xl text-muted-foreground">Keep your boat running smoothly with our certified technicians.</p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <Wrench className="h-10 w-10 text-accent mb-2" />
                            <CardTitle>Maintenance</CardTitle>
                            <CardDescription>Routine check-ups and oil changes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>100-Hour Service</li>
                                <li>Winterization</li>
                                <li>Fluid Changes</li>
                                <li>Tune-ups</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Clock className="h-10 w-10 text-accent mb-2" />
                            <CardTitle>Repairs</CardTitle>
                            <CardDescription>Diagnostics and fix for all major brands.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>Engine Rebuilds</li>
                                <li>Electrical Systems</li>
                                <li>Lower Unit Repair</li>
                                <li>Fuel Systems</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <ShieldCheck className="h-10 w-10 text-accent mb-2" />
                            <CardTitle>Warranty Work</CardTitle>
                            <CardDescription>Authorized service center.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>Yamaha Certified</li>
                                <li>Mercury Certified</li>
                                <li>Suzuki Certified</li>
                                <li>OEM Parts</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="bg-muted p-8 rounded-lg text-center space-y-6">
                    <h2 className="text-2xl font-bold">Ready to Schedule Service?</h2>
                    <p className="text-muted-foreground">Contact our service department today to book an appointment.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="gap-2">
                            <Phone className="h-4 w-4" />
                            Call (555) 123-4567
                        </Button>
                        <Button variant="outline" size="lg">
                            Request Appointment
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
