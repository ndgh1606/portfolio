import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 * Adds .visible class to elements with .reveal / .reveal-left / .reveal-right
 * when they enter the viewport, triggering CSS transitions.
 */
export default function useScrollReveal() {
  const ref = useRef(null);

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
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
