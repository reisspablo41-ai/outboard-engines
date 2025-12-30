import Link from "next/link"
import { Anchor } from "lucide-react"

export function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-accent p-1.5 rounded-md">
                <Anchor className="size-5 text-white" />
            </div>
            <span className="text-primary dark:text-white">OUTBOARDS<span className="text-accent">.COM</span></span>
        </Link>
    )
}
