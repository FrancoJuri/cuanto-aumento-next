import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FavoritesSidebar } from "@/components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cuantoaumento.com.ar"),
  title: "¿Cuánto Aumentó? - Comparador de precios de supermercado",
  description:
    "Descubre cuánto subieron los precios de cada producto cada día. Comparador histórico de precios de supermercados en Argentina.",
  keywords: [
    "precios",
    "supermercado",
    "Argentina",
    "inflación",
    "comparador",
    "ahorro",
    "ofertas",
  ],
  authors: [{ name: "Cuánto Aumento" }],
  openGraph: {
    title: "¿Cuánto Aumentó? - Comparador de Precios Argentina",
    description: "Compará precios históricos de supermercados y detectá aumentos reales.",
    url: "https://cuantoaumento.com.ar",
    siteName: "¿Cuánto Aumentó?",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/cuantoaumento.com.ar.png",
        width: 1200,
        height: 630,
        alt: "¿Cuánto Aumento? Logo y Hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Cuánto Aumentó? - Comparador de Precios",
    description: "El único comparador con historial real de precios en Argentina.",
    images: ["/cuantoaumento.com.ar.png"],
  },
  alternates: {
    canonical: "./",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  icons: {
    icon: "/cuanto-aumento-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <FavoritesProvider>
          {children}
          <FavoritesSidebar />
        </FavoritesProvider>
      </body>
    </html>
  );
}
