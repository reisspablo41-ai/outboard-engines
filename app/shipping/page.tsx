import { Truck, Globe, Clock, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-6 mb-12">
                <h1 className="text-4xl font-bold text-primary">Shipping & Freight Policy</h1>
                <p className="text-xl text-muted-foreground">
                    We know you need your parts fast to get back on the water. Here is everything you need to know about how we deliver your order.
                </p>
            </div>

            <div className="grid gap-8">
                {/* Key Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Clock className="size-6 text-accent" />
                            <CardTitle className="text-lg">Same Day Shipping</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Orders placed before 2:00 PM EST (Mon-Fri) ship the same day.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Truck className="size-6 text-accent" />
                            <CardTitle className="text-lg">Free Shipping Over $99</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Applies to standard ground shipping within the contiguous USA for eligible items.</p>
                        </CardContent>
                    </Card>
                </div>

                <Separator />

                {/* Detailed Sections */}
                <div className="prose prose-blue max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">1. Carrier Options</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>We utilize UPS, FedEx, and USPS for small parcel shipments. The carrier is automatically selected based on the size of your order and your delivery address to ensure the fastest delivery time.</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Standard Ground:</strong> 3-5 business days.</li>
                                <li><strong>Expedited 2-Day:</strong> Guaranteed 2-day delivery (business days).</li>
                                <li><strong>Next Day Air:</strong> For when you absolutely need it tomorrow.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">2. Freight Shipping (Outboards & Large Boats)</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>Large items such as outboard motors (over 25HP), boat hulls, and lower units must ship via LTL (Less Than Truckload) Freight.</p>
                            <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
                                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                    <Package className="size-4" /> Important Freight Requirements:
                                </h4>
                                <ul className="list-disc pl-6 space-y-2 text-sm">
                                    <li>Someone must be present to sign for the delivery.</li>
                                    <li>The truck driver will lower the pallet to the ground (liftgate service included).</li>
                                    <li>Inspect the package for damage <strong>before</strong> signing the delivery receipt. If damage is visible, refuse the shipment or note it clearly on the receipt.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">3. International Shipping</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>We ship globally to over 150 countries. International shipping rates are calculated at checkout based on real-time carrier data.</p>
                            <p className="text-sm italic">Note: International customers are responsible for any applicable customs duties, taxes, or import fees levied by their country.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">4. Hazardous Materials</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>Certain items like paints, solvents, oils, and batteries are classified as hazardous materials (HAZMAT). These items:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Can only ship via Ground services.</li>
                                <li>Cannot be shipped to PO Boxes or internationally.</li>
                                <li>May incur an additional handling surcharge.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
