"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PartFinder({ className }: { className?: string }) {
    const router = useRouter()
    const [type, setType] = React.useState<string>("part")
    const [year, setYear] = React.useState<string>("")
    const [make, setMake] = React.useState<string>("")

    // Simple static data for MVP
    const years = Array.from({ length: 30 }, (_, i) => (2025 - i).toString())
    const makes = ["Yamaha", "Mercury", "Suzuki", "Honda", "Tohatsu", "Nitro", "Tracker", "Sun Tracker", "Tahoe"]

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (type) params.set("type", type)
        if (year) params.set("year", year)
        if (make) params.set("make", make)

        router.push(`/search?${params.toString()}`)
    }

    return (
        <Card className={`w-full max-w-md shadow-xl border-0 overflow-hidden ${className}`}>
            <CardHeader className="bg-primary text-primary-foreground py-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="size-5 text-accent" />
                    Quick Finder
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 bg-white dark:bg-card">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">I'm looking for a...</label>
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            variant={type === 'boat' ? 'default' : 'outline'}
                            onClick={() => setType('boat')}
                            className="w-full justify-center"
                        >
                            Boat
                        </Button>
                        <Button
                            variant={type === 'motor' ? 'default' : 'outline'}
                            onClick={() => setType('motor')}
                            className="w-full justify-center"
                        >
                            Motor
                        </Button>
                        <Button
                            variant={type === 'part' ? 'default' : 'outline'}
                            onClick={() => setType('part')}
                            className="w-full justify-center"
                        >
                            Part
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Year</label>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Any Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Make</label>
                        <select
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Any Make</option>
                            {makes.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Model (Optional)</label>
                    <input
                        type="text"
                        placeholder="Enter model keywords..."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <Button
                    className="w-full bg-accent text-white hover:bg-accent/90"
                    size="lg"
                    onClick={handleSearch}
                >
                    Find Results
                </Button>
            </CardContent>
        </Card>
    )
}
