import { useEffect, useRef } from "react";

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
