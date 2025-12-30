import { RefreshCw, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-6 mb-12">
                <h1 className="text-4xl font-bold text-primary">Returns & Exchanges</h1>
                <p className="text-xl text-muted-foreground">
                    Ordered the wrong part? No problem. We offer a 30-day hassle-free return policy for most items.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900">
                    <CardContent className="pt-6 text-center space-y-2">
                        <CheckCircle2 className="size-8 text-green-600 mx-auto" />
                        <h3 className="font-semibold text-green-900 dark:text-green-400">30-Day Returns</h3>
                        <p className="text-sm text-green-700 dark:text-green-500">For new, unused items in original packaging.</p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
                    <CardContent className="pt-6 text-center space-y-2">
                        <RefreshCw className="size-8 text-blue-600 mx-auto" />
                        <h3 className="font-semibold text-blue-900 dark:text-blue-400">Easy Exchanges</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-500">Swap for the right part quickly.</p>
                    </CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900">
                    <CardContent className="pt-6 text-center space-y-2">
                        <AlertTriangle className="size-8 text-orange-600 mx-auto" />
                        <h3 className="font-semibold text-orange-900 dark:text-orange-400">No Electrical Returns</h3>
                        <p className="text-sm text-orange-700 dark:text-orange-500">Once installed, electrical parts cannot be returned.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">How to Start a Return</h2>
                    <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
                        <li className="pl-2"><strong>Log in to your account:</strong> Go to your Order History and select the order containing the item you wish to return.</li>
                        <li className="pl-2"><strong>Get your RMA:</strong> Click "Return Item" to generate a Return Merchandise Authorization (RMA) number. Write this number clearly on the outside of your box.</li>
                        <li className="pl-2"><strong>Ship it back:</strong> Use the provided prepaid label (deducted from refund) or your own carrier. Keep your tracking number!</li>
                    </ol>
                    <div className="pt-4">
                        <Button size="lg">Start a Return</Button>
                    </div>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Return Eligibility</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg text-green-600 mb-2">Returnable Items</h3>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>New, uninstalled parts in original packaging.</li>
                                <li>Unworn apparel with tags attached.</li>
                                <li>Defective items (under warranty).</li>
                                <li>Incorrectly shipped items.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-red-600 mb-2">Non-Returnable Items</h3>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Electrical components (CDI, Stators, ECUs) if opened/installed.</li>
                                <li>Tools and manuals.</li>
                                <li>Cut-to-length hoses or cables.</li>
                                <li>Hazardous materials (paint, oil, chemicals).</li>
                                <li>Clearance or "Final Sale" items.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Core Charges & Deposits</h2>
                    <div className="text-muted-foreground space-y-4">
                        <p>Some remanufactured parts (like lower units, powerheads, or props) have a "Core Charge." This deposit is refunded when you send back your old, broken part.</p>
                        <p><strong>To get your Core Refund:</strong></p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Drain all fluids from the old part.</li>
                            <li>Place the old part in the box the new one came in.</li>
                            <li>Use the provided Core Return Label included in the box.</li>
                            <li>Once inspected by our tech team (usually 3-5 days), the deposit is refunded to your original payment method.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}
