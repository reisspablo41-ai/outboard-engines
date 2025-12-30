import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // refresh session if expired
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Admin Protection Logic
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // 1. Check if user is logged in
        if (!user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // 2. Check if user is the specific admin
        // In a real app, you might check a 'role' column in a 'profiles' table.
        // As per instructions, we are hardcoding the Admin ID checkout.
        const ADMIN_ID = "e6ff25ba-afb4-4db8-b868-c20f344e0412";

        if (user.id !== ADMIN_ID) {
            // Redirect unauthorized users to home
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
