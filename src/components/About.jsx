import React, { useEffect, useState } from "react";
import { Download, Mail, Phone, MapPin } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ROLES = [
  "Front-end Developer",
  "Mobile Developer",
  "React Native Engineer",
  "UI/UX Enthusiast",
];

const SKILLS = [
  { label: "ReactJS", level: 85 },
  { label: "React Native", level: 82 },
  { label: "JavaScript", level: 88 },
  { label: "AngularJS", level: 65 },
  { label: "Unity / C#", level: 60 },
  { label: "UI / UX", level: 75 },
];

function Typewriter({ texts }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return (
    <span className="text-cyan-400 font-mono typewriter">{displayed}</span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen relative flex items-center grid-bg pt-20 pb-16 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 text-cyan-400 font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              Available for opportunities
            </div>

            {/* Name */}
            <div className="reveal space-y-2">
              <p className="font-mono text-slate-400 text-sm tracking-widest uppercase">
                Hi there, I&apos;m
              </p>
              <h1 className="section-title text-4xl sm:text-5xl xl:text-6xl text-white leading-tight">
                Nguyen Dang
                <br />
                <span className="text-gradient">Gia Huy</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="reveal font-display text-xl sm:text-2xl text-slate-300 h-8">
              <Typewriter texts={ROLES} />
            </div>

            {/* Bio */}
            <p className="reveal text-slate-400 leading-relaxed max-w-lg">
              Aspiring Front-end & Mobile Developer with hands-on experience in
              web and app development. Proficient in{" "}
              <span className="text-slate-200 font-medium">React Native</span>,{" "}
              <span className="text-slate-200 font-medium">React.js</span>, and{" "}
              <span className="text-slate-200 font-medium">JavaScript</span>.
              Completed a 3-month internship at{" "}
              <span className="text-cyan-400 font-medium">FPT-IS Company</span>,
              where I maintained and upgraded the FIS Android app across 16
              modular sub-apps. Passionate about building responsive, performant,
              and user-friendly digital experiences.
            </p>

            {/* Contact pills */}
            <div className="reveal flex flex-wrap gap-3 text-sm">
              {[
                { icon: <Mail size={13} />, text: "muigiahuy1606@gmail.com" },
                { icon: <Phone size={13} />, text: "+84 936.948.762" },
                { icon: <MapPin size={13} />, text: "Ho Chi Minh City, VN" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-1.5 text-slate-400 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                >
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div id="resume" className="reveal flex flex-wrap gap-4 pt-2">
              <a
                href="/NguyenDangGiaHuy_Intern.pdf"
                download="NguyenDangGiaHuy_Resume.pdf"
                target="_blank"
                className="glow-btn flex items-center gap-2 text-navy-950 font-semibold font-display text-sm px-6 py-3 rounded-full text-[#050d1a]"
              >
                <Download size={16} />
                Download Resume
              </a>
              <a
                href="https://github.com/ndgh1606"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-cyan-400/40 text-cyan-400 font-display text-sm px-6 py-3 rounded-full hover:bg-cyan-400/10 transition-colors duration-300"
              >
                <GithubIcon />
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Right — Skill bars card */}
          <div className="reveal-right">
            <div className="border-gradient rounded-2xl p-8 space-y-6 relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-bl-3xl" />

              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                  <span className="text-cyan-400 text-sm font-mono font-bold">
                    {"</>"}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-white">
                  Technical Skills
                </h3>
              </div>

              {SKILLS.map((skill, i) => (
                <div key={skill.label} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-slate-300">
                      {skill.label}
                    </span>
                    <span className="font-mono text-xs text-cyan-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Certifications */}
              <div className="border-t border-white/5 pt-4 space-y-2">
                <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  Certifications
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    "Vstep English Certification",
                    "Front End Development — HTML (Great Learning, 2023)",
                  ].map((cert) => (
                    <div
                      key={cert}
                      className="flex items-start gap-2 text-slate-300 text-sm"
                    >
                      <span className="text-cyan-400 mt-0.5">✦</span>
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center gap-2 text-slate-600 animate-bounce">
            <span className="font-mono text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
