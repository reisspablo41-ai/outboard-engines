import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outboards E-Commerce | Boats, Motors, & Parts",
  description: "The premier destination for marine engines, boats, and parts. Authorized dealer for major brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light" /* Defaulting to light for clean marine look */
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
