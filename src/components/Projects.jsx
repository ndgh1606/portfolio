import React, { useState } from "react";
import { ExternalLink, Globe, Smartphone, Gamepad2, Play } from "lucide-react";
import FisAppMockup from "./FisAppMockup";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const PROJECTS = [
  {
    id: "imc",
    tag: "Web App",
    tagColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    title: "IMC",
    subtitle: "Construction Materials Company Website",
    description:
      "A full-featured web platform built for a construction materials company. Designed and developed a responsive, modern UI with smooth navigation and product showcasing. Focused on performance optimization and clean component architecture.",
    tech: ["ReactJS", "JavaScript", "CSS3", "Responsive Design"],
    demo: "https://imc-liard.vercel.app",
    github: "https://github.com/ndgh1606/imc",
    icon: <Globe size={20} />,
    accentFrom: "from-cyan-500",
    accentTo: "to-blue-600",
    preview: "web",
  },
  {
    id: "fis",
    tag: "Mobile App",
    tagColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    title: "FIS APP",
    subtitle: "Android Application — FPT IS Company",
    description:
      "Maintained and upgraded the FIS Android app using React Native, which consists of 16 modular sub-apps. Handled library updates, fixed compatibility issues, improved app performance, and collaborated on cross-platform components using React.js for better code reuse.",
    tech: ["React Native", "React.js", "JavaScript", "Android"],
    demo: null,
    github: "https://github.com/ndgh1606",
    icon: <Smartphone size={20} />,
    accentFrom: "from-indigo-500",
    accentTo: "to-purple-600",
    preview: "phone",
  },
  {
    id: "game",
    tag: "Game Dev",
    tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    title: "GAME",
    subtitle: "2D Indie Platformer — Graduation Project",
    description:
      "A 2D indie platformer game built as a graduation project. Designed and implemented an enemy AI system capable of detecting players, executing melee and ranged attack patterns, collision handling, and dynamic movement. Integrated health, item systems, and polished animations.",
    tech: ["Unity", "C#", "Game AI", "2D Animation"],
    demo: null,
    github: "https://github.com/ndgh1606",
    icon: <Gamepad2 size={20} />,
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    preview: "video",
  },
];

function WebPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a1628]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0f1f35] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 bg-white/5 rounded-md px-3 py-0.5 text-slate-500 text-[10px] font-mono truncate">
          https://imc-liard.vercel.app
        </div>
      </div>
      {/* Preview content */}
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* Simulated website layout */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-4">
          <div className="w-16 h-2.5 bg-cyan-400/40 rounded" />
          <div className="flex gap-3 ml-auto">
            {[1,2,3,4].map(i => <div key={i} className="w-8 h-1.5 bg-white/20 rounded" />)}
          </div>
        </div>
        <div className="absolute top-12 left-6 right-6 space-y-2">
          <div className="w-3/4 h-4 bg-white/20 rounded" />
          <div className="w-1/2 h-3 bg-white/10 rounded" />
          <div className="w-5/6 h-2 bg-white/10 rounded mt-2" />
          <div className="w-4/6 h-2 bg-white/10 rounded" />
          <div className="w-20 h-6 bg-cyan-400/30 rounded-full mt-3" />
        </div>
        <div className="absolute bottom-4 left-6 right-6 grid grid-cols-3 gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="h-12 bg-white/5 border border-white/10 rounded-lg" />
          ))}
        </div>
        {/* Overlay with "View Live" */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <a
            href="https://imc-liard.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-cyan-400 text-[#050d1a] font-semibold text-sm px-4 py-2 rounded-full hover:bg-cyan-300 transition-colors"
          >
            <ExternalLink size={14} /> View Live Site
          </a>
        </div>
      </div>
    </div>
  );
}

function VideoPreview() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black relative">
      {!playing ? (
        <div className="relative h-52 bg-gradient-to-br from-emerald-900/30 to-slate-900 flex items-center justify-center cursor-pointer group"
          onClick={() => setPlaying(true)}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          {/* Pixel-art style background decoration */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-around opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-3 h-8 bg-emerald-400 rounded-sm"
                style={{ height: `${20 + Math.sin(i) * 10}px` }} />
            ))}
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 border-2 border-emerald-400/50 flex items-center justify-center
              group-hover:bg-emerald-400/30 group-hover:scale-110 transition-all duration-300">
              <Play size={24} className="text-emerald-400 ml-1" />
            </div>
            <p className="text-slate-300 text-sm font-mono">Gameplay Preview (~1:30)</p>
          </div>
        </div>
      ) : (
        <div className="h-52 bg-black flex items-center justify-center">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            src="/game-demo.mp4"
          >
            <p className="text-slate-400 text-sm p-4 text-center">
              Video file not found. Please place <code>game-demo.mp4</code> in the <code>public/</code> folder.
            </p>
          </video>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-3">
            — What I've Built —
          </p>
          <h2 className="section-title text-4xl sm:text-5xl text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A selection of work spanning web apps, mobile development, and game engineering.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-16">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`reveal grid lg:grid-cols-2 gap-10 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Preview — alternate sides */}
              <div className={`${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                {project.preview === "web" && <WebPreview />}
                {project.preview === "phone" && <FisAppMockup />}
                {project.preview === "video" && <VideoPreview />}
              </div>

              {/* Info */}
              <div className={`space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                {/* Tag + number */}
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs px-3 py-1 rounded-full border ${project.tagColor}`}>
                    {project.tag}
                  </span>
                  <span className="font-mono text-slate-600 text-xs">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="section-title text-3xl sm:text-4xl text-white">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mt-1 font-mono text-sm">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-1">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 bg-gradient-to-r ${project.accentFrom} ${project.accentTo} text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200`}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-white/20 text-slate-300 font-mono text-sm px-5 py-2.5 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-200"
                  >
                    <GithubIcon /> GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
