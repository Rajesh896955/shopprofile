"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
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
    LogOut,
    Store,
    User as UserIcon,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setProductsOpen(false);
    };

    const isCurrentPage = (href: string) => {
        if (!pathname) return false;
        if (href === "/") {
            return pathname === "/";
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    // Close user dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get the first letter of email or display name
    const emailInitial = user?.email
        ? user.email.trim().charAt(0).toUpperCase()
        : user?.displayName
            ? user.displayName.trim().charAt(0).toUpperCase()
            : "U";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left Side: Mobile Menu Button (Sabse Left Side) + Logo */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Mobile Menu Button - Sabse Left Side */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:bg-slate-50 lg:hidden cursor-pointer shrink-0"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className="group flex items-center gap-2 sm:gap-2.5"
                    >
                        <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-105">
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
                            <span className="block text-lg sm:text-xl font-black tracking-tight text-slate-950">
                                Shop<span className="text-indigo-600">Profile</span>
                            </span>

                            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
                                Your Digital Shop
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1.5 lg:flex">
                    {navLinks.map((link) => {
                        const active = isCurrentPage(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                                    active
                                        ? "bg-indigo-50 text-indigo-600 shadow-2xs font-black"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Header Actions */}
                <div className="flex items-center gap-2">
                    {loading ? (
                        <div className="h-9 w-20 sm:h-10 sm:w-24 animate-pulse rounded-xl bg-slate-100 shrink-0" />
                    ) : user ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-1.5 sm:gap-2 rounded-full p-1 pl-1.5 pr-2 sm:pr-2.5 hover:bg-slate-100/90 transition-all border border-slate-200/90 shadow-2xs group cursor-pointer active:scale-95"
                                title={user.email || "My Account"}
                            >
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-xs">
                                    {emailInitial}
                                </div>

                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180 text-indigo-600" : ""}`} />
                            </button>

                            {/* User Profile Dropdown */}
                            {userMenuOpen && (
                                <div className="absolute right-0 top-full mt-1.5 w-44 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                                    <div className="space-y-0.5">
                                        <Link
                                            href="/myProfile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 rounded-xl transition"
                                        >
                                            <Store className="w-4 h-4 text-indigo-600 shrink-0" />
                                            <span className="whitespace-nowrap">My Shop Profile</span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                setUserMenuOpen(false);
                                                await signOut(auth);
                                            }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition text-left cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4 shrink-0" />
                                            <span className="whitespace-nowrap">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-flex w-18 sm:w-20 h-9 sm:h-10 items-center justify-center rounded-xl bg-slate-950 text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-indigo-600 active:scale-95 shrink-0"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile Menu Button */}

                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="border-t border-slate-100 bg-white lg:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                        <nav className="space-y-1.5">
                            {navLinks.map((link) => {
                                const active = isCurrentPage(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-150 ${
                                            active
                                                ? "bg-indigo-50 text-indigo-600 font-black shadow-2xs"
                                                : "text-slate-800 hover:bg-slate-50"
                                        }`}
                                    >
                                        <span>{link.name}</span>
                                        {active && (
                                            <span className="h-2 w-2 rounded-full bg-indigo-600 shadow-xs" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Actions - only shown when logged in, no login button below */}
                        {user && (
                            <div className="mt-4 border-t border-slate-100 pt-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-black text-base flex items-center justify-center shadow-xs shrink-0">
                                            {emailInitial}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Signed in</p>
                                            <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/myProfile"
                                        onClick={closeMobileMenu}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                                    >
                                        <Store className="w-4 h-4" />
                                        My Shop Profile
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            closeMobileMenu();
                                            await signOut(auth);
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 text-rose-600 px-4 py-2.5 text-sm font-bold transition hover:bg-rose-50 cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
