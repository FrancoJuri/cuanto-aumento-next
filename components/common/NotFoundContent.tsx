"use client";

import { Header, Footer } from "@/components";

interface NotFoundContentProps {
  title: string;
  message: string;
  backUrl?: string;
  backLabel?: string;
}

export default function NotFoundContent({
  title,
  message,
  backUrl = "/",
  backLabel = "Volver al inicio",
}: NotFoundContentProps) {
  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <a
          href={backUrl}
          className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl font-medium hover:bg-brand-primary-dark transition-colors"
        >
          {backLabel}
        </a>
      </main>
      <Footer />
    </div>
  );
}
