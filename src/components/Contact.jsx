import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import {
  Send, CheckCircle, AlertCircle, Mail, User,
  MessageSquare, Loader, ShieldCheck, RefreshCw
} from "lucide-react";

const EMAILJS_SERVICE_ID  = "service_jh8dizv";
const EMAILJS_TEMPLATE_ID = "template_p5jf5h3";
const EMAILJS_PUBLIC_KEY  = "BVHEvhdEeYz7jQTJH";
const OTP_TEMPLATE_ID = "template_97reee6";


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
export default function Contact() {
  const formRef = useRef(null);

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [formData, setFormData] = useState({
    from_name: "",
    company: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState("");

  // ─── Step 1: Send OTP ───────────────────────────────────────────────────────
  const handleSendOTP = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setOtpLoading(true);

    try {
      const otp = generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      // Save OTP to Firestore
      await setDoc(doc(db, "otps", email), { otp, expiresAt });

      // Send OTP email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        OTP_TEMPLATE_ID,
        { to_email: email, otp_code: otp },
        EMAILJS_PUBLIC_KEY
      );

      setStep("otp");

      // Start 60s resend cooldown
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      setEmailError("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── Step 2: Verify OTP ─────────────────────────────────────────────────────
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otpInput.length !== 6) {
      setOtpError("Please enter the 6-digit code.");
      return;
    }
    setOtpError("");
    setOtpLoading(true);

    try {
      const snap = await getDoc(doc(db, "otps", email));
      if (!snap.exists()) {
        setOtpError("OTP expired or not found. Please resend.");
        setOtpLoading(false);
        return;
      }

      const { otp, expiresAt } = snap.data();

      if (Date.now() > expiresAt) {
        await deleteDoc(doc(db, "otps", email));
        setOtpError("OTP has expired. Please request a new one.");
        setOtpLoading(false);
        return;
      }

      if (otpInput !== otp) {
        setOtpError("Incorrect OTP. Please try again.");
        setOtpLoading(false);
        return;
      }

      // OTP correct — delete it and proceed
      await deleteDoc(doc(db, "otps", email));
      setStep("message");
    } catch (err) {
      console.error(err);
      setOtpError("Verification failed. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── Step 3: Send Message ───────────────────────────────────────────────────
  const validateMessage = () => {
    const errs = {};
    if (!formData.from_name.trim()) errs.from_name = "Name is required.";
    if (!formData.message.trim()) errs.message = "Please write a message.";
    return errs;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const errs = validateMessage();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

    setSendLoading(true);
    setSendError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: email,
          company: formData.company,
          message: formData.message,
          to_email: "muigiahuy1606@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStep("success");
    } catch (err) {
      console.error(err);
      setSendError("Failed to send message. Please try again.");
    } finally {
      setSendLoading(false);
    }
  };

  // ─── Progress indicator ─────────────────────────────────────────────────────
  const STEPS = ["Verify Email", "Enter OTP", "Send Message"];
  const stepIndex = { email: 0, otp: 1, message: 2, success: 3 };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
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
            Verify your email with a one-time code before sending a message — keeping things genuine.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — info */}
          <div className="lg:col-span-2 space-y-6 reveal-left">
            <div className="border-gradient rounded-2xl p-6 space-y-5">
              <h3 className="font-display font-semibold text-white">Contact Details</h3>
              <a href="mailto:muigiahuy1606@gmail.com" className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:bg-cyan-400/20 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-slate-200 text-sm mt-0.5 group-hover:text-cyan-400 transition-colors">
                    muigiahuy1606@gmail.com
                  </p>
                </div>
              </a>
              <div className="border-t border-white/5 pt-4">
                <p className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-3">Also find me on</p>
                <a href="https://github.com/ndgh1606" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-mono">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/ndgh1606
                </a>
              </div>
            </div>

            {/* OTP security notice */}
            <div className="flex items-start gap-3 bg-cyan-400/5 border border-cyan-400/20 rounded-xl px-4 py-3">
              <ShieldCheck size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 text-xs leading-relaxed">
                A 6-digit OTP will be sent to your email. Valid for <span className="text-cyan-400 font-mono">5 minutes</span>. This prevents spam and fake messages.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-emerald-300 text-sm font-mono">Open to internships & full-time roles</p>
            </div>
          </div>

          {/* Right — Multi-step form */}
          <div className="lg:col-span-3 reveal-right">
            <div className="border-gradient rounded-2xl p-8">

              {/* Progress bar */}
              {step !== "success" && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                          i < stepIndex[step]
                            ? "bg-cyan-400 text-[#050d1a]"
                            : i === stepIndex[step]
                            ? "bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400"
                            : "bg-white/5 border border-white/10 text-slate-600"
                        }`}>
                          {i < stepIndex[step] ? "✓" : i + 1}
                        </div>
                        <span className={`text-xs font-mono hidden sm:block ${
                          i === stepIndex[step] ? "text-cyan-400" : "text-slate-600"
                        }`}>{label}</span>
                        {i < STEPS.length - 1 && (
                          <div className={`w-8 sm:w-16 h-px mx-1 transition-all duration-300 ${
                            i < stepIndex[step] ? "bg-cyan-400" : "bg-white/10"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 1: Email input ── */}
              {step === "email" && (
                <form onSubmit={handleSendOTP} className="space-y-5">
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg">Verify your email</h3>
                    <p className="text-slate-400 text-sm mt-1">We'll send a 6-digit code to confirm it's you.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="text-cyan-400"><Mail size={12} /></span> Your Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder="jane@company.com"
                      className={`w-full bg-white/5 border ${emailError ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200`}
                    />
                    {emailError && (
                      <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                        <AlertCircle size={11} /> {emailError}
                      </p>
                    )}
                  </div>
                  <button type="submit" disabled={otpLoading}
                    className="w-full glow-btn flex items-center justify-center gap-2 text-[#050d1a] font-semibold font-display text-sm py-3.5 rounded-xl disabled:opacity-60">
                    {otpLoading ? <><Loader size={16} className="animate-spin" /> Sending OTP…</> : <><Send size={16} /> Send OTP Code</>}
                  </button>
                </form>
              )}

              {/* ── STEP 2: OTP verification ── */}
              {step === "otp" && (
                <form onSubmit={handleVerifyOTP} className="space-y-5">
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg">Enter OTP Code</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      We sent a 6-digit code to <span className="text-cyan-400 font-mono">{email}</span>
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="text-cyan-400"><ShieldCheck size={12} /></span> 6-Digit OTP
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, "")); setOtpError(""); }}
                      placeholder="••••••"
                      className={`w-full bg-white/5 border ${otpError ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm text-center font-mono text-2xl tracking-[0.5em] focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200`}
                    />
                    {otpError && (
                      <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                        <AlertCircle size={11} /> {otpError}
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={otpLoading}
                    className="w-full glow-btn flex items-center justify-center gap-2 text-[#050d1a] font-semibold font-display text-sm py-3.5 rounded-xl disabled:opacity-60">
                    {otpLoading ? <><Loader size={16} className="animate-spin" /> Verifying…</> : <><ShieldCheck size={16} /> Verify OTP</>}
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <button type="button" onClick={() => { setStep("email"); setOtpInput(""); setOtpError(""); }}
                      className="text-slate-500 hover:text-slate-300 text-xs font-mono transition-colors">
                      ← Change email
                    </button>
                    <button type="button" onClick={handleSendOTP} disabled={resendCooldown > 0 || otpLoading}
                      className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors">
                      <RefreshCw size={11} />
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                    </button>
                  </div>
                </form>
              )}

              {/* ── STEP 3: Message form ── */}
              {step === "message" && (
                <form ref={formRef} onSubmit={handleSendMessage} className="space-y-5">
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg">Send your message</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Sending as <span className="text-cyan-400 font-mono">{email}</span>
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="text-cyan-400"><User size={12} /></span> Your Name
                      </label>
                      <input type="text" placeholder="Jane Smith"
                        value={formData.from_name}
                        onChange={(e) => { setFormData(p => ({ ...p, from_name: e.target.value })); setFormErrors(p => ({ ...p, from_name: "" })); }}
                        className={`w-full bg-white/5 border ${formErrors.from_name ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200`}
                      />
                      {formErrors.from_name && <p className="text-red-400 text-xs font-mono flex items-center gap-1"><AlertCircle size={11} />{formErrors.from_name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="text-cyan-400"><MessageSquare size={12} /></span> Company (Optional)
                      </label>
                      <input type="text" placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="text-cyan-400"><MessageSquare size={12} /></span> Message
                    </label>
                    <textarea rows={5} placeholder="Hi Huy, I'd love to discuss a potential opportunity..."
                      value={formData.message}
                      onChange={(e) => { setFormData(p => ({ ...p, message: e.target.value })); setFormErrors(p => ({ ...p, message: "" })); }}
                      className={`w-full bg-white/5 border ${formErrors.message ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-cyan-400/60 focus:bg-cyan-400/5 transition-all duration-200`}
                    />
                    {formErrors.message && <p className="text-red-400 text-xs font-mono flex items-center gap-1"><AlertCircle size={11} />{formErrors.message}</p>}
                  </div>

                  {sendError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                      <AlertCircle size={16} /> {sendError}
                    </div>
                  )}

                  <button type="submit" disabled={sendLoading}
                    className="w-full glow-btn flex items-center justify-center gap-2 text-[#050d1a] font-semibold font-display text-sm py-3.5 rounded-xl disabled:opacity-60">
                    {sendLoading ? <><Loader size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}

              {/* ── STEP 4: Success ── */}
              {step === "success" && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">Message Sent!</h3>
                  <p className="text-slate-400 max-w-xs mx-auto">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setStep("email"); setEmail(""); setOtpInput(""); setFormData({ from_name: "", company: "", message: "" }); }}
                    className="font-mono text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
