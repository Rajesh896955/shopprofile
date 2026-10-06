"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const contactOptions = [
    {
        icon: Mail,
        title: "Email Support",
        description:
            "Send us your questions and our team will get back to you.",
        value: "shopprofile8969@gmail.com",
        href: "mailto:shopprofile8969@gmail.com",
    },
    {
        icon: MessageCircle,
        title: "General Enquiries",
        description:
            "Have a question about ShopProfile or how it works?",
        value: "shopprofile8969@gmail.com",
        href: "mailto:shopprofile8969@gmail.com",
    },
    {
        icon: Phone,
        title: "Business Support",
        description:
            "Contact us for business-related questions and assistance.",
        value: "+91 89205 04484",
        href: "tel:+918920504484",
    },
];

const reasons = [
    "Account and profile assistance",
    "Product catalog questions",
    "QR code and sharing support",
    "Technical issues",
    "Business enquiries",
    "General questions about ShopProfile",
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        business: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!formData.name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!formData.subject) {
            setError("Please select an enquiry type.");
            return;
        }

        if (!formData.message.trim()) {
            setError("Please enter your message.");
            return;
        }

        setLoading(true);

        try {
            // 1. Try direct Firestore insert into "shop-contact" collection
            try {
                await addDoc(collection(db, "shop-contact"), {
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    business: formData.business.trim() || null,
                    subject: formData.subject,
                    message: formData.message.trim(),
                    status: "unread",
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            } catch (firestoreError) {
                console.warn(
                    "Direct Firestore write failed, trying fallback API:",
                    firestoreError
                );
                // 2. Fallback to /api/contact route
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const resData = await res.json();
                if (!res.ok || !resData.success) {
                    throw new Error(resData.message || "Failed to submit enquiry.");
                }
            }

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                business: "",
                subject: "",
                message: "",
            });
            toast.success("Your message has been sent successfully!");
        } catch (err: unknown) {
            console.error("Error submitting contact form:", err);
            const msg =
                err instanceof Error
                    ? err.message
                    : "Failed to send message. Please try again.";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-3.5 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-200">
                            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" />
                            We&apos;re here to help
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Let&apos;s talk about
                            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                your business.
                            </span>
                        </h1>

                        <p className="mx-auto mt-3 sm:mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-300">
                            Have a question about ShopProfile, need help with your account,
                            or want to discuss a business enquiry? Send us a message.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Options */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid gap-3.5 sm:gap-5 md:grid-cols-3">
                    {contactOptions.map((option) => {
                        const Icon = option.icon;

                        return (
                            <a
                                key={option.title}
                                href={option.href}
                                className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                            >
                                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <h2 className="mt-3 sm:mt-5 text-base sm:text-lg font-bold text-slate-900">
                                    {option.title}
                                </h2>

                                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                                    {option.description}
                                </p>

                                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-indigo-600">
                                    {option.value}
                                </p>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* Main Contact Area */}
            <section className="bg-slate-50 py-8 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                        {/* Left Content */}
                        <div>
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600">
                                Get in touch
                            </p>

                            <h2 className="mt-1.5 sm:mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                How can we help?
                            </h2>

                            <p className="mt-2.5 sm:mt-5 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
                                Whether you are creating your first digital shop or already
                                using ShopProfile, we&apos;re here to help you get the most out of
                                your profile.
                            </p>

                            <div className="mt-5 sm:mt-8 space-y-2.5 sm:space-y-4">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason}
                                        className="flex items-start gap-2.5 sm:gap-3"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 text-indigo-600" />
                                        <span className="text-xs sm:text-sm leading-5 sm:leading-6 text-slate-700">
                                            {reason}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Response Time */}
                            <div className="mt-5 sm:mt-10 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600">
                                        <Clock3 className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                                            Support response
                                        </h3>

                                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                                            We aim to respond to customer enquiries as soon as
                                            possible during our support hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-50 text-indigo-600">
                                        <MapPin className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                                            ShopProfile
                                        </h3>

                                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                                            Online digital business platform serving businesses
                                            across India.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm">
                            <div className="mb-4 sm:mb-7">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Send us a message
                                </h2>

                                <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                                    Fill out the form below and tell us how we can help.
                                </p>
                            </div>

                            {success && (
                                <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs sm:text-sm text-emerald-800">
                                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />
                                    <div>
                                        <p className="font-semibold">Message sent successfully!</p>
                                        <p className="mt-0.5 text-emerald-700">
                                            Thank you for reaching out. Your request has been stored and we will contact you shortly.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs sm:text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1 sm:mb-2 block text-xs sm:text-sm font-semibold text-slate-700"
                                    >
                                        Full Name *
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        className="w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1 sm:mb-2 block text-xs sm:text-sm font-semibold text-slate-700"
                                    >
                                        Email Address *
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Business */}
                                <div>
                                    <label
                                        htmlFor="business"
                                        className="mb-1 sm:mb-2 block text-xs sm:text-sm font-semibold text-slate-700"
                                    >
                                        Business / Shop Name
                                    </label>

                                    <input
                                        id="business"
                                        name="business"
                                        type="text"
                                        value={formData.business}
                                        onChange={handleChange}
                                        placeholder="Enter your business name (optional)"
                                        className="w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-1 sm:mb-2 block text-xs sm:text-sm font-semibold text-slate-700"
                                    >
                                        Subject *
                                    </label>

                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    >
                                        <option value="" disabled>
                                            Select an enquiry type
                                        </option>
                                        <option value="account">Account Support</option>
                                        <option value="profile">Profile Help</option>
                                        <option value="products">Product Catalog</option>
                                        <option value="qr">QR Code</option>
                                        <option value="technical">Technical Issue</option>
                                        <option value="business">Business Enquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-1 sm:mb-2 block text-xs sm:text-sm font-semibold text-slate-700"
                                    >
                                        Message *
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help..."
                                        required
                                        className="w-full resize-none rounded-lg sm:rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-slate-950 px-5 py-2.5 sm:py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="h-4 w-4" />
                                        </>
                                    )}
                                </button>

                                <p className="flex items-center justify-center gap-1.5 sm:gap-2 text-center text-[11px] sm:text-xs text-slate-500 pt-1">
                                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                                    Your information is handled responsibly.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-6 sm:p-12 lg:p-16 text-center">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white">
                        Looking for answers?
                    </h2>

                    <p className="mx-auto mt-2.5 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed sm:leading-7 text-indigo-100">
                        You can also explore ShopProfile to learn more about our
                        features, services and digital business solutions.
                    </p>

                    <div className="mt-5 sm:mt-8 flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-3">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-white px-5 py-2.5 sm:px-6 sm:py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                        >
                            Explore Services
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 sm:px-6 sm:py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
