"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ChevronRight,
    TrendingUp,
} from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#04081a] py-4 sm:py-5 lg:py-8 text-white">
            {/* Background Ambient Lighting & Mesh Glows */}
            <div className="pointer-events-none absolute -left-36 top-1/4 h-[550px] w-[550px] rounded-full bg-indigo-600/30 blur-[150px]" />
            <div className="pointer-events-none absolute right-[-10%] top-10 h-[650px] w-[650px] rounded-full bg-blue-600/25 blur-[160px]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-indigo-950/60 blur-[170px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

                    {/* Left Column: Text & CTA */}
                    <div className="lg:col-span-6 lg:pr-4">

                        {/* Pill Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200 shadow-[0_0_25px_rgba(59,130,246,0.4)] backdrop-blur-md">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span>Your business. One digital profile.</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[56px] xl:text-[62px]">
                            Turn your shop into a{" "}
                            <span className="block bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
                                digital experience.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                            Create a professional digital shop profile, showcase your
                            products, share your business and let customers connect with
                            you from one simple link or QR code.
                        </p>



                        {/* Trust Badges */}
                        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <TrustBadge label="Easy to setup" />
                            <TrustBadge label="Mobile friendly" />
                            <TrustBadge label="Start for free" />
                        </div>
                    </div>

                    {/* Right Column: 3D Phone Mockup on Pedestal & Floating Cards */}
                    <div className="relative flex items-center justify-center lg:col-span-6 lg:justify-end pt-4 pb-12">

                        {/* 3D Cylindrical Pedestal / Stand under phone */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 sm:w-72 pointer-events-none z-0">
                            {/* Pedestal Top Face */}
                            <div className="h-14 w-full rounded-[100%] bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-[0_0_35px_rgba(37,99,235,0.7)] border-t border-cyan-300/60" />
                            {/* Pedestal Body */}
                            <div className="-mt-7 h-16 w-full rounded-b-[45px] bg-gradient-to-b from-blue-700 via-blue-900 to-[#04081a] shadow-[0_25px_50px_rgba(15,23,42,0.9)]" />
                        </div>

                        {/* Left Decorative Purple Doodle Arrow */}
                        <div className="absolute left-0 sm:-left-6 top-1/2 -translate-y-12 z-20 hidden sm:block text-indigo-400 opacity-90 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">
                            <svg width="44" height="44" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 36 C 10 20, 26 12, 38 18" />
                                <path d="M30 14 L 38 18 L 36 26" />
                            </svg>
                        </div>

                        {/* Right Decorative Purple Doodle Arrow */}
                        <div className="absolute right-4 sm:right-6 top-16 z-20 hidden sm:block text-indigo-400 opacity-90 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">
                            <svg width="38" height="38" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M38 14 C 40 28, 24 38, 14 32" />
                                <path d="M22 36 L 14 32 L 16 24" />
                            </svg>
                        </div>

                        {/* Top-Right Floating QR Card */}
                        <div className="absolute -right-2 sm:-right-6 top-4 sm:top-8 z-20 hidden w-36 sm:w-44 overflow-hidden rounded-2xl border border-white/50 bg-white p-2.5 sm:p-3 shadow-[0_15px_35px_rgba(0,0,0,0.4)] shadow-indigo-950/80 transition-transform duration-300 hover:scale-105 sm:block">
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                                <Image
                                    src="/images/image2.png"
                                    alt="Scan and Visit QR Code"
                                    fill
                                    sizes="180px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Bottom-Right Floating Analytics Card */}
                        <div className="absolute -bottom-1 sm:-bottom-3 -right-2 sm:-right-8 z-20 hidden w-44 sm:w-48 rounded-2xl border border-white/50 bg-white p-3.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)] shadow-indigo-950/80 transition-transform duration-300 hover:scale-105 sm:block">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-medium text-slate-500">Profile visits</p>
                                    <p className="mt-0.5 text-2xl font-black text-slate-900">2,480</p>
                                    <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                        <TrendingUp className="h-3 w-3" />
                                        <span>↑ 24%</span>
                                    </div>
                                </div>
                                {/* Bar chart graphic */}
                                <div className="flex h-11 items-end gap-1 pb-1">
                                    <div className="w-1.5 h-3.5 rounded-full bg-blue-200" />
                                    <div className="w-1.5 h-5 rounded-full bg-blue-300" />
                                    <div className="w-1.5 h-7 rounded-full bg-blue-400" />
                                    <div className="w-1.5 h-10 rounded-full bg-indigo-600" />
                                    <div className="w-1.5 h-8 rounded-full bg-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* 3D Phone Mockup Image */}
                        <div className="relative z-10 w-[270px] sm:w-[300px] md:w-[325px] transition-transform duration-300 hover:scale-[1.02]">
                            <Image
                                src="/images/image1.png"
                                alt="ShopProfile Mobile App Preview"
                                width={325}
                                height={650}
                                priority
                                className="h-auto w-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

function TrustBadge({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#00D084] text-slate-950 font-black text-[9px] shadow-[0_0_10px_rgba(0,208,132,0.5)]">
                ✓
            </div>
            <span className="text-sm font-medium text-slate-200">{label}</span>
        </div>
    );
}
