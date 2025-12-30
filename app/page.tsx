import { Hero } from "@/components/hero"
import { TrustSection } from "@/components/trust-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandsSection } from "@/components/brands-section"
import { ExpertCTA } from "@/components/expert-cta"
import { ContentTeasers } from "@/components/content-teasers"
import { Testimonials } from "@/components/testimonials"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { PromoSection } from "@/components/promo-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoSection />
      <BrandsSection />
      <TrustSection />
      <Testimonials />
      <ContentTeasers />
      <ExpertCTA />
      <NewsletterSignup />
    </div>
  )
}
