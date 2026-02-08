import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: assets.facebook_icon, alt: "Facebook" },
    { icon: assets.twitter_icon, alt: "Twitter" },
    { icon: assets.instagram_icon, alt: "Instagram" },
  ];

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Image 
                className="w-28" 
                src={assets.logo} 
                alt="Logo" 
                width={112}
                height={32}
              />
            </div>
            <div className="hidden md:block h-6 w-px bg-slate-300"></div>
            <p className="text-sm text-slate-600 text-center md:text-left">
              © {currentYear} TechWave. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 flex items-center justify-center transition-colors duration-300"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.alt}
                    className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
            
            {/* Quick Links */}
            <div className="hidden md:flex items-center gap-6 ml-6">
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
                Contact
              </Link>
            </div>
          </div>

        </div>

        {/* Mobile Quick Links */}
        <div className="mt-6 pt-6 border-t border-slate-200 md:hidden">
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-700 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;