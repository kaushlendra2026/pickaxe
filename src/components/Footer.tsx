import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Twitter, Instagram, Github, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/pickaxe.labs?igsh=bjZwcGx2bWtjYjFo', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:contact@printforge.com', label: 'Email' },
];

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card relative mt-20">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[30rem] relative p-6 py-10">
        <div className="flex flex-col mb-12 md:mb-0 w-full">
          <div className="w-full flex flex-col items-center">
            <div className="space-y-2 flex flex-col items-center flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-bold text-gradient">
                  PICKAXE.LAB
                </span>
              </div>
              <p className="text-muted-foreground font-medium text-center w-full max-w-sm px-4">
                Premium 3D printed collectibles and functional art pieces for enthusiasts worldwide.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex mb-8 mt-6 gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-6 h-6 hover:scale-110 duration-300" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="hover:text-primary duration-300 hover:font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 flex flex-col gap-2 items-center justify-center md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} PrintForge. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion for collectors
          </p>
        </div>
      </div>

      {/* Large Background Text */}
      <div
        className="bg-gradient-to-b from-foreground/10 via-foreground/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-32 font-display font-extrabold tracking-tighter pointer-events-none select-none text-center"
        style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', maxWidth: '95vw' }}
      >
        PICKAXE.LAB
      </div>

      {/* Bottom Logo */}
      {/* <div className="absolute bottom-20 backdrop-blur-sm rounded-2xl bg-card/60 left-1/2 border-2 border-border hover:border-primary duration-400 flex ]">
  <div className="w-12 h-12 md:w-16 md:h-16  rounded-xl flex items-center justify-center shadow-lg"> }
    
    <img
      src="/logo.png"
      alt="Brand Logo"
      className="w-100 h-10 md:w-10 md:h-10 object-contain "
    />

  { </div>
</div> */}


      {/* Bottom Line */}
      <div className="absolute bottom-28 backdrop-blur-sm h-px bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2" />

      {/* Bottom Gradient */}
      <div className="bg-gradient-to-t from-background via-background/80 to-transparent absolute bottom-24 w-full h-16 blur-sm" />
    </footer>
  );
}
