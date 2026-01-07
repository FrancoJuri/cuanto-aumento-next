import { ShoppingCart, Twitter, Instagram, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo & Domain */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="font-semibold text-lg text-gray-900">
              cuantoaumento.com.ar
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span className="text-sm">Twitter</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm">Instagram</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Desarrollado por{" "}
            <Link
              href="https://francojuri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              Franco Juri
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            © {currentYear} cuantoaumento. Ningún derecho reservado.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
