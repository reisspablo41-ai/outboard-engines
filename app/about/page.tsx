import { Award, Heart, Shield, Users } from "lucide-react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-24">
            {/* Hero */}
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Reliability Runs Deep</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Since 1995, Outboards.com has been the trusted partner for boaters, mechanics, and marine enthusiasts. We don't just sell parts; we keep you on the water.
                </p>
            </section>

            {/* Stats/Values */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                            <Shield className="size-8" />
                        </div>
                        <h3 className="text-lg font-bold">Authorized Dealer</h3>
                        <p className="text-sm text-muted-foreground">Certified by Yamaha, Mercury, and Suzuki.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-full">
                            <Heart className="size-8" />
                        </div>
                        <h3 className="text-lg font-bold">Family Owned</h3>
                        <p className="text-sm text-muted-foreground">Personal service from people who boat.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-full">
                            <Users className="size-8" />
                        </div>
                        <h3 className="text-lg font-bold">Expert Support</h3>
                        <p className="text-sm text-muted-foreground">Real mechanics answer our phones.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                            <Award className="size-8" />
                        </div>
                        <h3 className="text-lg font-bold">30-Year Legacy</h3>
                        <p className="text-sm text-muted-foreground">Serving the marine community since '95.</p>
                    </CardContent>
                </Card>
            </section>

            {/* Story Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-lg overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1544155184-c8c227bf88b3?q=80&w=2670&auto=format&fit=crop"
                        alt="Our Workshop"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-primary">More Than Just a Store</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            It started in a small garage in Miami. Our founder, Captain James, was tired of waiting weeks for simple parts to arrive from catalog orders. He knew there had to be a better way to get boaters back on the water.
                        </p>
                        <p>
                            Today, we stock over 50,000 SKUs in our state-of-the-art warehouse. But we haven't lost that small-shop feel. Every order is checked for accuracy, and every phone call is answered by someone who knows the difference between a 2-stroke and a 4-stroke.
                        </p>
                        <p>
                            Whether you are repowering a center console for tournament fishing or just fixing the water pump on the family pontoon, we treat your boat like it's our own.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
