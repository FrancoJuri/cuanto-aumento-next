import { HeroSection, Footer } from "@/components";
import { ProductsClient } from "@/components/home/ProductsClient";
import { getProducts } from "@/lib/api";

export default async function Home() {
  // SSR: Fetch initial products on the server
  const initialData = await getProducts({ page: 1, limit: 15 });

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
