import { Instagram, Github, Heart, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import ParticlesBackground from "./ParticlesBackground";
import XIcon from '@/components/ui/XIcon';

import Logo from "@/components/ui/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 overflow-hidden pt-12 pb-6 bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200">
      
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute -bottom-[20%] -left-[10%] w-[40rem] h-[40rem] bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-[10%] -right-[10%] w-96 h-96 bg-gradient-to-bl from-amber-200/20 to-orange-300/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Particles with reduced quantity for Footer */}
      <ParticlesBackground id="footer-particles" quantity={4} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="liquid-glass-container rounded-3xl p-8 sm:p-12 border border-white/50 shadow-xl bg-white/70 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center gap-3 group">
                <Logo />
                <span className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-gray-900 tracking-tight">
                  cuantoaumento.com.ar
                </span>
              </div>
              <p className="text-gray-600 text-center md:text-left max-w-sm">
                Monitoreando la inflación con transparencia y datos reales. Tu guía de precios en Argentina.
              </p>
            </div>

            {/* Social & Links */}
            <div className="flex flex-col items-center md:items-end space-y-6">
              <h3 className="font-semibold text-gray-900 text-lg">Conectemos</h3>
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/FrancoJuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/50 hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-gray-600"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://x.com/francojuri_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/50 hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-gray-600"
                >
                  <XIcon className="w-5 h-5" />
                </Link> 
                <Link
                  href="https://www.instagram.com/francojuri.web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/50 hover:bg-white hover:text-pink-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-gray-600"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/francojuri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/50 hover:bg-white hover:text-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-gray-600"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-1">
              <span>Desarrollado con</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" />
              <span>por</span>
              <Link
                href="https://francojuri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-primary-dark hover:underline transition-colors font-semibold"
              >
                Franco Juri
              </Link>
            </div>
            <p>
              © {currentYear} cuantoaumento. <Link href="https://github.com/FrancoJuri/cuanto-aumento-next" target="_blank" rel="noopener noreferrer">Open Source</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
