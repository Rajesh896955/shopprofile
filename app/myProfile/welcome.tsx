
"use client"

import React from "react"
import { Sparkles, Store, ChevronRight } from "lucide-react"
import { TEXTS } from "./types"

export interface WelcomeScreenProps {
    t?: typeof TEXTS
    onStart: () => void
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ t = TEXTS, onStart }) => {
    return (
        <div className="max-w-4xl mx-auto pt-1 sm:pt-3 pb-6 sm:pb-10">
            <div className="bg-gradient-to-br from-[#0A2540] via-[#0D3054] to-[#0052FF] text-white rounded-3xl px-6 sm:px-12 pt-5 sm:pt-7 pb-8 sm:pb-12 shadow-2xl relative overflow-hidden text-center space-y-6 sm:space-y-7">
                {/* Decorative blur elements */}
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-black uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>{t.tagTitle}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                        {t.welcomeTitle}
                    </h1>

                    <p className="text-blue-100 text-xs sm:text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
                        {t.welcomeSub}
                    </p>
                </div>

                {/* Prominent CTA Button to open the Store Profile Page */}
                <div className="relative z-10 pt-2 flex flex-col items-center gap-3">
                    <button
                        type="button"
                        onClick={onStart}
                        className="py-4 px-8 sm:px-10 bg-white hover:bg-slate-100 text-[#0A2540] font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 cursor-pointer active:scale-95 group"
                    >
                        <Store className="w-5 h-5 text-[#0052FF] group-hover:scale-110 transition-transform" />
                        <span>{t.createProfileBtn}</span>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    )
}