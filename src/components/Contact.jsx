import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, Loader } from "lucide-react";
const EMAILJS_SERVICE_ID  = "service_jh8dizv";   
const EMAILJS_TEMPLATE_ID = "template_p5jf5h3";  
const EMAILJS_PUBLIC_KEY  = "BVHEvhdEeYz7jQTJH";   

const CONTACT_INFO = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "muigiahuy1606@gmail.com",
    href: "mailto:muigiahuy1606@gmail.com",
  },
];

function InputField({ label, id, icon, error, ...props }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
        <span className="text-cyan-400">{icon}</span> {label}
      </label>
      <input
        id={id}
        className={`w-full bg-white/5 border ${
          error ? "border-red-500/60" : "border-white/10"
        } rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 font-body text-sm
        focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200`}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-xs font-mono flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const errs = {};
    if (!formData.from_name.trim()) errs.from_name = "Name is required.";
    if (!formData.from_email.trim()) {
      errs.from_email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      errs.from_email = "Enter a valid email address.";
    }
    if (!formData.message.trim()) errs.message = "Please write a message.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ from_name: "", from_email: "", company: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-3">
            — Let's Work Together —
          </p>
          <h2 className="section-title text-4xl sm:text-5xl text-white">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Have an opportunity or just want to say hello? My inbox is always open.
            I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — info */}
          <div className="lg:col-span-2 space-y-6 reveal-left">
            <div className="border-gradient rounded-2xl p-6 space-y-5">
              <h3 className="font-display font-semibold text-white">
                Contact Details
              </h3>
              {CONTACT_INFO.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-slate-200 text-sm mt-0.5 group-hover:text-cyan-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Divider */}
              <div className="border-t border-white/5 pt-4">
                <p className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-3">
                  Also find me on
                </p>
                <a
                  href="https://github.com/ndgh1606"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-mono"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  github.com/ndgh1606
                </a>
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-emerald-300 text-sm font-mono">
                Open to internships & full-time roles
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 reveal-right">
            <div className="border-gradient rounded-2xl p-8">
              {status === "success" ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 max-w-xs mx-auto">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-mono text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Your Name"
                      id="from_name"
                      icon={<User size={12} />}
                      type="text"
                      name="from_name"
                      placeholder="Jane Smith"
                      value={formData.from_name}
                      onChange={handleChange}
                      error={errors.from_name}
                      autoComplete="name"
                    />
                    <InputField
                      label="Email Address"
                      id="from_email"
                      icon={<Mail size={12} />}
                      type="email"
                      name="from_email"
                      placeholder="jane@company.com"
                      value={formData.from_email}
                      onChange={handleChange}
                      error={errors.from_email}
                      autoComplete="email"
                    />
                  </div>

                  <InputField
                    label="Company (Optional)"
                    id="company"
                    icon={<MessageSquare size={12} />}
                    type="text"
                    name="company"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={handleChange}
                  />

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="text-cyan-400"><MessageSquare size={12} /></span> Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Hi Huy, I'd love to discuss a potential opportunity..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${
                        errors.message ? "border-red-500/60" : "border-white/10"
                      } rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm resize-none
                      focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again or email directly.
                    </div>
                  )}

                  {/* Hidden field so EmailJS sends to the right address */}
                  <input type="hidden" name="to_email" value="muigiahuy1606@gmail.com" />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full glow-btn flex items-center justify-center gap-2 text-[#050d1a] font-semibold font-display text-sm py-3.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-600 text-xs font-mono">
                    Powered by EmailJS · Your info is never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
