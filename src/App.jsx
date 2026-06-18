import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useScrollReveal from "./hooks/useScrollReveal";

export default function App() {
  useScrollReveal();

  // Re-trigger observer after each render (handles dynamic content)
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050d1a] text-slate-200 font-body">
      <Navbar />

      <main>
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
