import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "¿Cuánto Aumento? - Comparador de precios de supermercado",
  description:
    "Descubre cuánto subieron los precios de cada producto cada día. Comparador histórico de precios de supermercados en Argentina.",
  keywords: [
    "precios",
    "supermercado",
    "Argentina",
    "inflación",
    "comparador",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
