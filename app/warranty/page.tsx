import { ShieldCheck, FileText, CheckCircle } from "lucide-react"

export default function WarrantyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <ShieldCheck className="size-16 text-primary mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-primary mb-4">Warranty Information</h1>
                <p className="text-xl text-muted-foreground">
                    We stand behind what we sell. All products come with manufacturer warranties, and our certified boats include additional dealership protection.
                </p>
            </div>

            <div className="space-y-16">
                {/* OEM Parts */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <CheckCircle className="size-6" />
                        </div>
                        <h2 className="text-2xl font-bold">OEM Parts Warranty</h2>
                    </div>
                    <div className="bg-card border rounded-xl p-8 shadow-sm space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Genuine OEM parts (Yamaha, Mercury, Suzuki, Honda) are covered by their respective manufacturer's limited warranty. This typically covers defects in material or workmanship for <strong>1 year</strong> from the date of purchase.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-secondary/30 rounded-lg">
                                <h4 className="font-semibold mb-2">Yamaha</h4>
                                <p className="text-sm text-muted-foreground">1-Year Limited Warranty on Parts & Accessories.</p>
                            </div>
                            <div className="p-4 bg-secondary/30 rounded-lg">
                                <h4 className="font-semibold mb-2">Mercury Marine</h4>
                                <p className="text-sm text-muted-foreground">1-Year Limited Warranty P&A (Parts & Accessories).</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Outboards */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <FileText className="size-6" />
                        </div>
                        <h2 className="text-2xl font-bold">New Outboard Motors</h2>
                    </div>
                    <div className="bg-card border rounded-xl p-8 shadow-sm space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            New outboard motors must be registered by an authorized dealer (us) to activate the warranty.
                        </p>
                        <ul className="space-y-3 pt-2">
                            <li className="flex gap-3 text-muted-foreground">
                                <span className="font-bold text-primary min-w-[120px]">Standard:</span>
                                3-Year Factory Limited Warranty (Recreational Use).
                            </li>
                            <li className="flex gap-3 text-muted-foreground">
                                <span className="font-bold text-primary min-w-[120px]">Commercial:</span>
                                1-Year or Hour-Limit Warranty (varies by brand).
                            </li>
                            <li className="flex gap-3 text-muted-foreground">
                                <span className="font-bold text-primary min-w-[120px]">Extended:</span>
                                Optional YES (Yamaha Extended Service) or MPP (Mercury Product Protection) plans available for purchase.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Claim Process */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">How to File a Claim</h2>
                    <div className="prose prose-gray max-w-none text-muted-foreground">
                        <p>If you believe you have a defective part that is covered under warranty, please follow these steps:</p>
                        <ol>
                            <li>Contact our support team at <strong className="text-primary">1-800-OUTBOARD</strong> or warranty@outboards.com.</li>
                            <li>Provide your original Order Number and a description of the failure. Photos are highly recommended.</li>
                            <li>We will issue a Warranty RGA (Return Goods Authorization).</li>
                            <li>Ship the part back to us for inspection by our certified technicians.</li>
                            <li>Once the defect is verified as a warrantable failure, we will ship a replacement part free of charge or issue a refund.</li>
                        </ol>
                    </div>
                </section>
            </div>
        </div>
    )
}
