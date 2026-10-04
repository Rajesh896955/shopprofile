"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    Menu,
    X,
    ChevronDown,
    LayoutDashboard,
    Sparkles,
    CreditCard,
    Info,
    Mail,
    LogIn,
    UserPlus,
} from "lucide-react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setProductsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="group flex items-center gap-2.5"
                >
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-105">
                        <Image
                            src="/favicon.ico"
                            alt="ShopProfile"
                            fill
                            priority
                            sizes="40px"
                            className="object-cover"
                        />
                    </div>

                    <div className="leading-none">
                        <span className="block text-xl font-black tracking-tight text-slate-950">
                            Shop<span className="text-indigo-600">Profile</span>
                        </span>

                        <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
                            Your Digital Shop
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 lg:flex">
                    <Link
                        href="/"
                        className="rounded-lg px-3.5 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50 hover:text-indigo-600"
                    >
                        Home
                    </Link>

                    {/* Features Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setProductsOpen(!productsOpen)}
                            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50 hover:text-indigo-600"
                            aria-expanded={productsOpen}
                        >
                            <span>Features</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? "rotate-180 text-indigo-600" : "text-slate-400"
                                    }`}
                            />
                        </button>

                        {productsOpen && (
                            <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                                <Link
                                    href="/services"
                                    onClick={() => setProductsOpen(false)}
                                    className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                                        <Sparkles className="h-4 w-4 text-indigo-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            Digital Shop
                                        </p>
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                                            Create your online shop profile
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/dashboard/products"
                                    onClick={() => setProductsOpen(false)}
                                    className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                        <LayoutDashboard className="h-4 w-4 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            Product Showcase
                                        </p>
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                                            Add and manage your products
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/pricing"
                                    onClick={() => setProductsOpen(false)}
                                    className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                        <CreditCard className="h-4 w-4 text-emerald-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            Plans & Pricing
                                        </p>
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                                            Choose a plan for your business
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/pricing"
                        className="rounded-lg px-3.5 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50 hover:text-indigo-600"
                    >
                        Pricing
                    </Link>

                    <Link
                        href="/about"
                        className="rounded-lg px-3.5 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50 hover:text-indigo-600"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="rounded-lg px-3.5 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50 hover:text-indigo-600"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                        <LogIn className="h-4 w-4 text-slate-600" />
                        Login
                    </Link>

                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-600"
                    >
                        <UserPlus className="h-4 w-4" />
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:bg-slate-50 lg:hidden"
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="border-t border-slate-100 bg-white lg:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                        <nav className="space-y-1">
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className="block rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
                            >
                                Home
                            </Link>

                            {/* Mobile Features */}
                            <button
                                type="button"
                                onClick={() => setProductsOpen(!productsOpen)}
                                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-800 hover:bg-slate-50"
                            >
                                <span>Features</span>

                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {productsOpen && (
                                <div className="ml-3 space-y-1 border-l border-slate-200 pl-3">
                                    <Link
                                        href="/services"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                                    >
                                        <Sparkles className="h-4 w-4 text-indigo-600" />
                                        Digital Shop
                                    </Link>

                                    <Link
                                        href="/dashboard/products"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                                    >
                                        <LayoutDashboard className="h-4 w-4 text-blue-600" />
                                        Product Showcase
                                    </Link>

                                    <Link
                                        href="/pricing"
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                                    >
                                        <CreditCard className="h-4 w-4 text-emerald-600" />
                                        Plans & Pricing
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/pricing"
                                onClick={closeMobileMenu}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
                            >
                                <CreditCard className="h-4 w-4 text-slate-500" />
                                Pricing
                            </Link>

                            <Link
                                href="/about"
                                onClick={closeMobileMenu}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
                            >
                                <Info className="h-4 w-4 text-slate-500" />
                                About
                            </Link>

                            <Link
                                href="/contact"
                                onClick={closeMobileMenu}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
                            >
                                <Mail className="h-4 w-4 text-slate-500" />
                                Contact
                            </Link>
                        </nav>

                        {/* Mobile Actions */}
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                            >
                                <LogIn className="h-4 w-4" />
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                onClick={closeMobileMenu}
                                className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                            >
                                <UserPlus className="h-4 w-4" />
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
