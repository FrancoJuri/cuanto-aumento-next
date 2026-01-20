import { Suspense } from "react";
import { HeroSection, Footer, ProductsSection, LoadingSpinner } from "@/components";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const currentPage = typeof page === "string" ? parseInt(page) : 1;
  const pageNumber = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section with Suspense for loading state */}
      <Suspense fallback={<LoadingSpinner />} key={pageNumber}>
        <ProductsSection page={pageNumber} />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
