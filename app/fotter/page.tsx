"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">

                    {/* Brand */}
                    <div className="lg:col-span-4">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white shadow-sm">
                                <Image
                                    src="/favicon.ico"
                                    alt="ShopProfile"
                                    fill
                                    sizes="44px"
                                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                                />
                            </div>

                            <div>
                                <div className="text-xl font-bold tracking-tight text-white">
                                    Shop<span className="text-indigo-400">Profile</span>
                                </div>

                                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                    Your Digital Shop
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            Create a professional digital shop profile, showcase your
                            products, share your business and connect with customers through
                            one simple link or QR code.
                        </p>

                        {/* Email */}
                        <a
                            href="mailto:support@shopprofile.in"
                            className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                        >
                            <Mail className="h-4 w-4" />
                            support@shopprofile.in
                        </a>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-2">
                            <SocialLink
                                href="#"
                                label="Instagram"
                                text="IG"
                            />

                            <SocialLink
                                href="#"
                                label="Facebook"
                                text="f"
                            />

                            <SocialLink
                                href="#"
                                label="LinkedIn"
                                text="in"
                            />

                            <SocialLink
                                href="#"
                                label="X"
                                text="𝕏"
                            />
                        </div>
                    </div>

                    {/* Product */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <FooterTitle>Product</FooterTitle>

                        <ul className="space-y-3">
                            <FooterLink href="/services">
                                Features
                            </FooterLink>

                            <FooterLink href="/pricing">
                                Pricing
                            </FooterLink>

                            <FooterLink href="/signup">
                                Get Started
                            </FooterLink>

                            <FooterLink href="/login">
                                Login
                            </FooterLink>

                            <FooterLink href="/dashboard">
                                Dashboard
                            </FooterLink>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <FooterTitle>Company</FooterTitle>

                        <ul className="space-y-3">
                            <FooterLink href="/about">
                                About Us
                            </FooterLink>

                            <FooterLink href="/contact">
                                Contact
                            </FooterLink>

                            <FooterLink href="/faq">
                                FAQ
                            </FooterLink>

                            <FooterLink href="/services">
                                Services
                            </FooterLink>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-3">
                        <FooterTitle>Legal</FooterTitle>

                        <ul className="space-y-3">
                            <FooterLink href="/privacy-policy">
                                Privacy Policy
                            </FooterLink>

                            <FooterLink href="/terms-conditions">
                                Terms & Conditions
                            </FooterLink>

                            <FooterLink href="/return-refund-policy">
                                Return & Refund Policy
                            </FooterLink>
                        </ul>

                        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                            <p className="text-xs leading-5 text-slate-500">
                                Please review our policies before using paid services or
                                publishing business information on ShopProfile.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

                    <p className="text-xs text-slate-500">
                        © {year} ShopProfile. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-white"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms-conditions"
                            className="transition hover:text-white"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/return-refund-policy"
                            className="transition hover:text-white"
                        >
                            Refunds
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1 transition hover:text-white"
                        >
                            Support
                            <ArrowUpRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* -------------------------------------------------------
   Helper Components
------------------------------------------------------- */

function FooterTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
            {children}
        </h3>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm text-slate-400 transition hover:text-white"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialLink({
    href,
    label,
    text,
}: {
    href: string;
    label: string;
    text: string;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-xs font-bold text-slate-400 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
            {text}
        </a>
    );
}
