import { Suspense } from "react";
import { HeroSection, Footer, ProductsSection, LoadingSpinner } from "@/components";

export const revalidate = 57600; // 16 hours ISR

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section with Suspense for loading state */}
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsSection page={1} />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
