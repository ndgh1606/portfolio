import React from "react";
import { Mail, ArrowUp } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const NAV_LINKS = [
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#050d1a]">
      {/* Glow accent at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-display font-bold text-xl text-white">
              NDGH<span className="text-gradient">.</span>
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Front-end & Mobile Developer based in Ho Chi Minh City, Vietnam.
              Building clean, performant digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = link.href.slice(1);
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              Connect
            </p>
            <div className="space-y-3">
              <a
                href="mailto:muigiahuy1606@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono"
              >
                <Mail size={14} /> muigiahuy1606@gmail.com
              </a>
              <a
                href="https://github.com/ndgh1606"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono"
              >
                <GithubIcon /> github.com/ndgh1606
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-mono">
            © {year} Nguyen Dang Gia Huy. Built with React & Tailwind CSS.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-mono group"
          >
            Back to top
            <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10 transition-all">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
