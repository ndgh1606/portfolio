import React, { useState } from "react";
import {
  Home,
  CreditCard,
  BarChart2,
  Bell,
  User,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";

const MODULES = [
  { name: "eKYC Verification", icon: "🪪", color: "from-blue-500 to-cyan-500", status: "Active" },
  { name: "Digital Wallet", icon: "💳", color: "from-emerald-500 to-teal-500", status: "Active" },
  { name: "Fund Transfer", icon: "↔️", color: "from-purple-500 to-pink-500", status: "Active" },
  { name: "Investment", icon: "📈", color: "from-amber-500 to-orange-500", status: "Active" },
  { name: "Loan Services", icon: "🏦", color: "from-red-500 to-rose-500", status: "Active" },
  { name: "Insurance", icon: "🛡️", color: "from-indigo-500 to-violet-500", status: "Active" },
];

export default function FisAppMockup() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex justify-center">
      <div className="phone-mockup w-[240px] h-[480px] relative overflow-hidden flex flex-col select-none">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 text-white text-[9px]">
          <span className="font-mono">9:41</span>
          <div className="flex items-center gap-1">
            <Signal size={9} />
            <Wifi size={9} />
            <Battery size={9} />
          </div>
        </div>

        {/* App header */}
        <div className="bg-gradient-to-r from-[#0a3d8f] to-[#1565c0] px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[8px] text-blue-200 font-mono uppercase tracking-wider">
              FPT IS Company
            </p>
            <p className="text-white font-bold text-sm font-display">FIS Mobile</p>
          </div>
          <div className="relative">
            <Bell size={16} className="text-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] text-white flex items-center justify-center font-bold">
              3
            </span>
          </div>
        </div>

        {/* Balance card */}
        <div className="mx-3 mt-3 bg-gradient-to-br from-[#1565c0] to-[#0d47a1] rounded-xl p-3 shadow-lg">
          <p className="text-blue-200 text-[8px] font-mono uppercase tracking-wide">
            Total Balance
          </p>
          <p className="text-white font-bold text-base font-display mt-0.5">
            ₫ 12,450,000
          </p>
          <div className="flex gap-2 mt-2">
            {["Send", "Receive", "Top Up"].map((a) => (
              <button
                key={a}
                className="flex-1 bg-white/15 text-white text-[7px] font-mono py-1 rounded-md hover:bg-white/25 transition-colors"
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Modules grid */}
        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-1">
          <p className="text-slate-400 font-mono text-[8px] uppercase tracking-widest mb-2">
            Services
          </p>
          <div className="space-y-1.5">
            {MODULES.map((mod) => (
              <div
                key={mod.name}
                className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-lg px-2.5 py-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center text-sm`}
                >
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[9px] font-medium truncate">
                    {mod.name}
                  </p>
                  <p className="text-emerald-400 text-[7px] font-mono">
                    {mod.status}
                  </p>
                </div>
                <ChevronRight size={10} className="text-slate-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-around bg-[#0a1628] border-t border-white/10 py-2 px-1">
          {[
            { id: "home", icon: <Home size={14} />, label: "Home" },
            { id: "cards", icon: <CreditCard size={14} />, label: "Cards" },
            { id: "stats", icon: <BarChart2 size={14} />, label: "Stats" },
            { id: "profile", icon: <User size={14} />, label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 transition-colors ${
                activeTab === tab.id ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              {tab.icon}
              <span className="text-[7px] font-mono">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
