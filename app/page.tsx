import { HeroSection, Footer } from "@/components";
import { ProductsClient } from "@/components/home/ProductsClient";
import { getProducts } from "@/lib/api";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const currentPage = typeof page === "string" ? parseInt(page) : 1;
  const pageNumber = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  // SSR: Fetch initial products on the server
  const initialData = await getProducts({ page: pageNumber, limit: 15 });

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section (Client Component for interactivity) */}
      <ProductsClient initialData={initialData} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
