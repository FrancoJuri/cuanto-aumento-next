import { ImageResponse } from "next/og";

export const revalidate = 86400; // 24 hours

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const product = await fetch(`${API_BASE_URL}/products/${slug}`, {
    next: { revalidate: 86400 },
  })
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
          }}
        >
          Producto no encontrado
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Calculate simple trend for visualization
  // Since we can't use full Inflation/Recharts logic in Edge, we make a simplified visualization
  // For the purpose of the OG image, we just show the current state clearly.
  // In a future iteration we could pre-calculate points via API if needed.

  // `min_price` is null when every offer is currently unavailable; fall back to
  // the lowest known price across supermarkets so the OG image never shows $0.
  const supermarketPrices: number[] = (product.supermarkets || [])
    .map((s: { price: number }) => s.price)
    .filter((p: number) => p > 0);
  const effectiveMinPrice =
    product.min_price && product.min_price > 0
      ? product.min_price
      : supermarketPrices.length > 0
      ? Math.min(...supermarketPrices)
      : 0;

  const priceFormatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(effectiveMinPrice);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
          backgroundImage: "radial-gradient(circle at 25px 25px, #f1f5f9 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f1f5f9 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Left Side: Product Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            borderRight: "1px solid #e2e8f0",
            backgroundColor: "#fff",
          }}
        >
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                fontSize: 60,
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                border: "4px dashed #e2e8f0",
                borderRadius: "20px",
              }}
            >
              Sin Imagen
            </div>
          )}
        </div>

        {/* Right Side: Info & Price */}
        <div
          style={{
            flex: 1.2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                fontSize: 24,
                color: "#64748b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {product.brand}
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.1,
                // Clamp text roughly
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.name}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 900,
                  color: "#2563eb", // brand-primary color roughly
                  letterSpacing: "-0.02em",
                }}
              >
               {priceFormatted}
              </div>
            </div>
            
            <div
               style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 24px",
                backgroundColor: "#eff6ff",
                borderRadius: "12px",
                color: "#1e40af",
                fontSize: 24,
                fontWeight: 600,
               }}
            >
               <span>📈 Historial de precios disponible</span>
            </div>
          </div>

          {/* Branding Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "auto",
              paddingTop: "40px",
              borderTop: "2px solid #f1f5f9",
            }}
          >
             {/* Using a text logo/emoji for simplicity in Edge without loading local fonts/assets if possible avoiding fetch */}
             <div style={{ fontSize: 28 }}>📊</div>
             <div style={{ fontSize: 24, color: "#475569", fontWeight: 600 }}>¿Cuánto Aumento?</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
