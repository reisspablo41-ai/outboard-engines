import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion" /* Need to create Accordion component */

/* Inline Accordion for now since I don't have the shadcn one created yet. Actually, good opportunity to create it. I'll make the component file next. 
   For now, I'll use details/summary for zero-dep simplicity or just wait. 
   I will implement the page assuming the component exists, then creating the component is my next step. 
*/

/* Wait, I should create the Accordion component first or mock it here with details/summary styled nicely. */

import { ChevronDown } from "lucide-react"

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h1>

            <div className="space-y-6">

                {/* Ordering & Payments */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-accent">Ordering & Payments</h2>
                    <div className="space-y-4">
                        <details className="group border rounded-lg bg-card open:bg-secondary/10 transition-colors">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-primary">
                                Which payment methods do you accept?
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 text-muted-foreground">
                                We accept Visa, MasterCard, American Express, Discover, and PayPal. For large boat or motor purchases, we also accept Wire Transfers and Certified Cashier's Checks. Financing is available through our partner lenders.
                            </div>
                        </details>
                        <details className="group border rounded-lg bg-card open:bg-secondary/10 transition-colors">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-primary">
                                Do you offer financing?
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 text-muted-foreground">
                                Yes! We offer financing on all new boats and repower outboards over $3,000. You can apply directly on the product financing calculator or contact our sales team.
                            </div>
                        </details>
                    </div>
                </div>

                {/* Shipping */}
                <div className="space-y-4 pt-8">
                    <h2 className="text-2xl font-bold text-accent">Shipping</h2>
                    <div className="space-y-4">
                        <details className="group border rounded-lg bg-card open:bg-secondary/10 transition-colors">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-primary">
                                How much is shipping?
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 text-muted-foreground">
                                Standard Ground shipping is FREE for orders over $99 within the contiguous United States. For orders under $99, shipping is calculated based on weight and destination. Freight shipping for large items is quoted at checkout.
                            </div>
                        </details>
                        <details className="group border rounded-lg bg-card open:bg-secondary/10 transition-colors">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-primary">
                                Do you ship internationally?
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 text-muted-foreground">
                                Yes, we ship worldwide. Please note that international customers are responsible for all import duties, VAT, and customs fees associated with their order.
                            </div>
                        </details>
                    </div>
                </div>

                {/* Technical */}
                <div className="space-y-4 pt-8">
                    <h2 className="text-2xl font-bold text-accent">Technical Support</h2>
                    <div className="space-y-4">
                        <details className="group border rounded-lg bg-card open:bg-secondary/10 transition-colors">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-primary">
                                How do I know if a part will fit my engine?
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 text-muted-foreground">
                                The best way is to use our Part Finder widget on the homepage with your Year, Make, and Model. You can also check your engine's serial number plate and contact our expert support team for verification.
                            </div>
                        </details>
                        <details className="group border rounded-lg bg-card open:bg-secondary/10 transition-colors">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-primary">
                                Can I install an outboard motor myself?
                                <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 text-muted-foreground">
                                Small portable outboards (under 25HP) can be installed by the owner. However, larger outboards typically require professional installation to validate the factory warranty and ensure safe rigging.
                            </div>
                        </details>
                    </div>
                </div>

            </div>
        </div>
    )
}
