"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
    Check,
    X,
    Sparkles,
    Zap,
    Building2,
    HelpCircle,
    ArrowRight,
    Crown,
    Clock,
    ShoppingBag,
    User,
    Phone,
    Mail,
    Loader2,
    CheckCircle2,
    Send,
} from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    );
}

const plans = [
    {
        name: "14-Day Free Trial",
        badge: "Free Trial",
        description: "Test drive all features with zero commitment.",
        price: 0,
        period: "for 14 days",
        duration: "14 Days",
        productLimit: "50 Products",
        icon: Clock,
        popular: false,
        bestValue: false,
        button: "Start Free Trial",
        href: "/signup",
        features: [
            "14 Days full trial access",
            "Up to 50 products",
            "Digital shop profile & custom URL",
            "QR code menu scanner",
            "Product categories & images",
            "WhatsApp & call buttons",
            "Opening hours & location",
            "No credit card required",
        ],
    },
    {
        name: "1 Month",
        badge: "Starter",
        description: "Ideal for local shops and kiosks getting started online.",
        price: 99,
        period: "per month",
        duration: "1 Month",
        productLimit: "100 Products",
        icon: Zap,
        popular: false,
        bestValue: false,
        button: "Choose 1 Month",
        href: "/signup?plan=1month",
        features: [
            "1 Month active access",
            "Up to 100 products",
            "Digital shop profile & custom URL",
            "QR code menu scanner",
            "Product categories & images",
            "WhatsApp & call buttons",
            "Opening hours & location",
            "Social media handles",
        ],
    },
    {
        name: "6 Months",
        badge: "MOST POPULAR",
        description: "Best for growing businesses looking for sustained presence.",
        price: 555,
        period: "for 6 months",
        duration: "6 Months",
        effectiveMonthly: "₹92.5/mo",
        productLimit: "300 Products",
        icon: Building2,
        popular: true,
        bestValue: false,
        button: "Choose 6 Months",
        href: "/signup?plan=6months",
        features: [
            "6 Months active access",
            "Up to 300 products",
            "Everything in 1 Month plan",
            "Priority QR scanner access",
            "Save ₹39 vs monthly",
            "Product categories & multiple images",
            "WhatsApp & direct call buttons",
            "Priority email & WhatsApp support",
        ],
    },
    {
        name: "1 Year",
        badge: "BEST VALUE",
        description: "Maximum scale with unlimited products and maximum savings.",
        price: 999,
        period: "per year",
        duration: "1 Year",
        effectiveMonthly: "₹83.25/mo",
        productLimit: "Unlimited Products",
        icon: Crown,
        popular: false,
        bestValue: true,
        button: "Choose 1 Year",
        href: "/signup?plan=1year",
        features: [
            "1 Full Year active access",
            "Unlimited products",
            "Everything in 6 Months plan",
            "Uninterrupted QR scanner active",
            "Save ₹189 vs monthly",
            "Pro verified profile badge",
            "Unlimited categories & images",
            "24/7 Priority VIP support",
        ],
    },
];

const comparison = [
    {
        feature: "Price",
        trial: "Free",
        monthly: "₹99",
        semiAnnual: "₹555",
        annual: "₹999",
    },
    {
        feature: "Product listings limit",
        trial: "50 Products",
        monthly: "100 Products",
        semiAnnual: "300 Products",
        annual: "Unlimited",
    },
    {
        feature: "Plan Validity",
        trial: "14 Days",
        monthly: "1 Month",
        semiAnnual: "6 Months",
        annual: "1 Year",
    },
    {
        feature: "Digital shop profile",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Custom profile URL",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "QR code menu scanner",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Product categories",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Product images upload",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "WhatsApp & Call buttons",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Business hours & address",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Social media links",
        trial: true,
        monthly: true,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Priority support",
        trial: false,
        monthly: false,
        semiAnnual: true,
        annual: true,
    },
    {
        feature: "Pro verified badge",
        trial: false,
        monthly: false,
        semiAnnual: false,
        annual: true,
    },
];

const faq = [
    {
        question: "How does the 14-day free trial work?",
        answer:
            "You can start immediately with our 14-day free trial without entering any credit card. You can add up to 50 products, generate your QR code, and customize your shop profile. Once the 14 days are complete, you can upgrade to 1 Month, 6 Months, or 1 Year to keep your scanner active.",
    },
    {
        question: "What are the product limits for each plan?",
        answer:
            "The 14-Day Free Trial includes up to 50 products, the 1 Month plan (₹99) includes up to 100 products, the 6 Months plan (₹555) includes up to 300 products, and the 1 Year plan (₹999) includes Unlimited products.",
    },
    {
        question: "Can I upgrade from 1 Month to 6 Months or 1 Year later?",
        answer:
            "Yes! You can upgrade your plan anytime directly from your dashboard or profile settings to increase your product limit and extend your active scanner duration.",
    },
    {
        question: "What happens when my subscription or trial ends?",
        answer:
            "Your store information and product catalog remain safe and preserved in your account. You can renew or upgrade your plan anytime to immediately reactivate customer access and your QR scanner.",
    },
    {
        question: "Are there any hidden fees?",
        answer:
            "No hidden charges. The displayed prices (₹99 for 1 month, ₹555 for 6 months, and ₹999 for 1 year) are transparent and straightforward.",
    },
];

function FeatureValue({
    value,
}: {
    value: boolean | string;
}) {
    if (value === true) {
        return <Check className="mx-auto h-5 w-5 text-emerald-600" />;
    }

    if (value === false) {
        return <X className="mx-auto h-5 w-5 text-slate-300" />;
    }

    return (
        <span className="text-xs sm:text-sm font-bold text-slate-800">
            {value}
        </span>
    );
}

export default function PricingPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form fields
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChoosePlan = (plan: typeof plans[0]) => {
        setSelectedPlan(plan);
        setIsSuccess(false);
        setIsModalOpen(true);
    };

    const handleWhatsAppUpgrade = () => {
        if (!selectedPlan) return;
        const phoneNum = "8920504484";
        const textMsg = `Hi, I want to upgrade to the ${selectedPlan.name} (₹${selectedPlan.price} / ${selectedPlan.duration}) on ShopProfile.\nProduct Limit: ${selectedPlan.productLimit}${userName.trim() ? `\nName: ${userName.trim()}` : ""}${userPhone.trim() ? `\nPhone: ${userPhone.trim()}` : ""}${userEmail.trim() ? `\nEmail: ${userEmail.trim()}` : ""}`;
        const url = `https://wa.me/91${phoneNum}?text=${encodeURIComponent(textMsg)}`;
        window.open(url, "_blank");
    };

    const handleSubmitBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userName.trim()) {
            toast.error("Please enter your name");
            return;
        }
        if (!userPhone.trim()) {
            toast.error("Please enter your phone number");
            return;
        }
        if (!userEmail.trim()) {
            toast.error("Please enter your email ID");
            return;
        }
        if (!selectedPlan) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "shop-booking"), {
                name: userName.trim(),
                phone: userPhone.trim(),
                email: userEmail.trim(),
                planName: selectedPlan.name,
                planPrice: selectedPlan.price,
                planPeriod: selectedPlan.period,
                planDuration: selectedPlan.duration,
                productLimit: selectedPlan.productLimit,
                status: "pending",
                createdAt: serverTimestamp(),
            });

            setIsSuccess(true);
            toast.success("Booking submitted successfully!");
        } catch (error: any) {
            console.error("Error submitting shop booking:", error);
            toast.error("Failed to submit booking: " + (error?.message || "Please try again"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950 px-6 pb-12 pt-6 text-white">
                <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-300">
                        <Sparkles className="h-4 w-4 text-amber-300" />
                        Simple, transparent &amp; flexible pricing
                    </div>

                    <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                        Choose the right plan for
                        <span className="block text-indigo-400 mt-1">
                            your digital shop.
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        Start with our 14-day free trial with 50 products. Upgrade to 1 month, 6 months, or 1 year as your business and product catalog expand.
                    </p>

                    {/* Quick Highlights Pill */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-300">
                        <button
                            type="button"
                            onClick={() => handleChoosePlan(plans[0])}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-all"
                        >
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            14 Days Free Trial (50 Products)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChoosePlan(plans[1])}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-all"
                        >
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            1 Month ₹99 (100 Products)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChoosePlan(plans[2])}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-all"
                        >
                            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                            6 Months ₹555 (300 Products)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChoosePlan(plans[3])}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-all"
                        >
                            <Crown className="w-3.5 h-3.5 text-emerald-400" />
                            1 Year ₹999 (Unlimited)
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards (4-Column Grid) */}
            <section className="-mt-12 px-4 sm:px-6 pb-4 sm:pb-8 relative z-10">
                <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {plans.map((plan) => {
                        const Icon = plan.icon;

                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-3xl border bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${plan.popular
                                    ? "border-indigo-500 ring-2 ring-indigo-500/25 shadow-indigo-500/10"
                                    : plan.bestValue
                                        ? "border-emerald-500 ring-2 ring-emerald-500/25 shadow-emerald-500/10"
                                        : "border-slate-200"
                                    }`}
                            >
                                {/* Floating Badges */}
                                {plan.popular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="rounded-full bg-indigo-600 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {plan.bestValue && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="rounded-full bg-emerald-600 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                                            BEST VALUE
                                        </span>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${plan.popular
                                                ? "bg-indigo-50 text-indigo-600"
                                                : plan.bestValue
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-700"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${plan.popular
                                                ? "bg-indigo-100 text-indigo-800"
                                                : plan.bestValue
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {plan.duration}
                                        </span>
                                    </div>

                                    <h2 className="mt-4 text-xl font-black text-slate-900">
                                        {plan.name}
                                    </h2>

                                    <p className="mt-1.5 min-h-[40px] text-xs leading-5 text-slate-500 font-medium">
                                        {plan.description}
                                    </p>

                                    {/* Product Limit Highlight Pill */}
                                    <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                                            <ShoppingBag className="w-3.5 h-3.5 text-[#0052FF]" />
                                            Product Capacity:
                                        </span>
                                        <span className="text-xs font-black text-[#0A2540]">
                                            {plan.productLimit}
                                        </span>
                                    </div>

                                    {/* Price Box */}
                                    <div className="mt-5 flex items-baseline gap-1.5">
                                        <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                                            ₹{plan.price.toLocaleString("en-IN")}
                                        </span>

                                        <span className="text-xs font-semibold text-slate-500">
                                            /{plan.period}
                                        </span>
                                    </div>

                                    {plan.effectiveMonthly && (
                                        <p className="mt-1 text-[11px] font-bold text-indigo-600">
                                            Effective {plan.effectiveMonthly}
                                        </p>
                                    )}

                                    {plan.price === 0 && (
                                        <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                                            100% Free · No credit card
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleChoosePlan(plan)}
                                        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-black transition-all shadow-sm active:scale-95 cursor-pointer ${plan.popular
                                            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/25"
                                            : plan.bestValue
                                                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/25"
                                                : "bg-slate-900 text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <span>{plan.button}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </button>

                                    <div className="my-5 border-t border-slate-100" />

                                    <p className="mb-3 text-xs font-black text-slate-900 uppercase tracking-wider">
                                        What&apos;s included
                                    </p>

                                    <ul className="space-y-2.5">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-2.5 text-xs text-slate-600 font-medium"
                                            >
                                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                    <Check className="h-3 w-3 stroke-[3]" />
                                                </span>

                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="bg-white px-4 sm:px-6 py-5 sm:py-8 border-t border-slate-200">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                            Compare All Plans
                        </p>

                        <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                            Feature by feature breakdown
                        </h2>

                        <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-slate-500 font-medium">
                            Review and compare product allowances and capabilities across all 4 plans.
                        </p>
                    </div>

                    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] border-collapse">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="px-5 py-4 text-left text-xs sm:text-sm font-black text-slate-900">
                                            Feature
                                        </th>

                                        <th className="px-4 py-4 text-center text-xs sm:text-sm font-black text-slate-900">
                                            14-Day Trial
                                            <span className="block text-[11px] font-bold text-slate-500">₹0</span>
                                        </th>

                                        <th className="px-4 py-4 text-center text-xs sm:text-sm font-black text-slate-900">
                                            1 Month
                                            <span className="block text-[11px] font-bold text-slate-500">₹99</span>
                                        </th>

                                        <th className="bg-indigo-50/70 px-4 py-4 text-center text-xs sm:text-sm font-black text-indigo-900">
                                            6 Months
                                            <span className="block text-[11px] font-bold text-indigo-600">₹555</span>
                                        </th>

                                        <th className="bg-emerald-50/70 px-4 py-4 text-center text-xs sm:text-sm font-black text-emerald-900">
                                            1 Year
                                            <span className="block text-[11px] font-bold text-emerald-600">₹999</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {comparison.map((row, index) => (
                                        <tr
                                            key={row.feature}
                                            className={
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-slate-50/40"
                                            }
                                        >
                                            <td className="border-t border-slate-100 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-700">
                                                {row.feature}
                                            </td>

                                            <td className="border-t border-slate-100 px-4 py-3.5 text-center">
                                                <FeatureValue value={row.trial} />
                                            </td>

                                            <td className="border-t border-slate-100 px-4 py-3.5 text-center">
                                                <FeatureValue value={row.monthly} />
                                            </td>

                                            <td className="border-t border-slate-100 bg-indigo-50/30 px-4 py-3.5 text-center">
                                                <FeatureValue value={row.semiAnnual} />
                                            </td>

                                            <td className="border-t border-slate-100 bg-emerald-50/30 px-4 py-3.5 text-center">
                                                <FeatureValue value={row.annual} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-slate-50 px-4 sm:px-6 py-6 sm:py-8">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center">
                        <HelpCircle className="mx-auto h-8 w-8 text-indigo-600" />

                        <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">
                            Pricing FAQs
                        </h2>

                        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
                            Everything you need to know about our plans, product limits, and durations.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3.5">
                        {faq.map((item) => (
                            <details
                                key={item.question}
                                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-sm text-slate-900">
                                    {item.question}

                                    <span className="text-lg text-slate-400 transition-transform group-open:rotate-45">
                                        +
                                    </span>
                                </summary>

                                <p className="mt-3.5 border-t border-slate-100 pt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-slate-950 px-6 py-6 sm:py-8 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                        Ready to launch your digital store?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-300 font-medium">
                        Start with your 14-day free trial (50 products) or choose a plan to get up to unlimited products today.
                    </p>

                    <button
                        type="button"
                        onClick={() => handleChoosePlan(plans[0])}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs sm:text-sm font-black text-slate-900 transition hover:bg-slate-100 shadow-lg active:scale-95 cursor-pointer"
                    >
                        <span>Start 14-Day Free Trial</span>
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </section>

            {/* ── BOOKING / UPGRADE DIALOG MODAL ── */}
            {mounted && isModalOpen && selectedPlan &&
                createPortal(
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-0 transition-opacity"
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                        />

                        {/* Modal Box */}
                        <div className="relative bg-white border border-slate-200 rounded-3xl max-w-md w-full shadow-2xl z-10 text-slate-900 overflow-hidden my-auto flex flex-col max-h-[92vh]">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white relative shrink-0">
                                <button
                                    type="button"
                                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                                    className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                                    title="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[11px] font-black uppercase tracking-wider text-amber-300 mb-2 border border-white/10">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>{selectedPlan.name} · {selectedPlan.duration}</span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                                    Book / Upgrade Plan
                                </h3>

                                <div className="mt-2 flex items-center gap-2.5 text-xs">
                                    <span className="text-lg sm:text-xl font-black text-white">
                                        ₹{selectedPlan.price.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-slate-300">/{selectedPlan.period}</span>
                                    <span className="px-2 py-0.5 rounded-md bg-white/15 text-white font-bold text-[11px]">
                                        {selectedPlan.productLimit}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                                {isSuccess ? (
                                    <div className="py-6 px-2 text-center space-y-4">
                                        <div className="w-16 h-16 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                                            <CheckCircle2 className="w-9 h-9" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <h4 className="text-xl font-black text-[#0A2540]">
                                                Booking Received! 🎉
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                                                Thank you, <strong className="text-slate-900">{userName}</strong>! Your booking for <strong className="text-[#0052FF]">{selectedPlan.name} (₹{selectedPlan.price})</strong> has been saved.
                                            </p>
                                        </div>

                                        <div className="pt-2 space-y-2.5">
                                            {/* WhatsApp Upgrade Button */}
                                            <button
                                                type="button"
                                                onClick={handleWhatsAppUpgrade}
                                                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <WhatsAppIcon className="w-4 h-4 fill-white" />
                                                <span>Upgrade</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                                            >
                                                Done / Close
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitBooking} className="space-y-3.5">
                                        <div className="space-y-3">
                                            {/* Name */}
                                            <div className="space-y-1">
                                                <label className="block text-xs font-bold text-slate-700">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. Rahul Sharma"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="space-y-1">
                                                <label className="block text-xs font-bold text-slate-700">
                                                    Phone / WhatsApp Number *
                                                </label>
                                                <div className="relative">
                                                    <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    <input
                                                        type="tel"
                                                        required
                                                        placeholder="e.g. 8920504484"
                                                        value={userPhone}
                                                        onChange={(e) => setUserPhone(e.target.value)}
                                                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1">
                                                <label className="block text-xs font-bold text-slate-700">
                                                    Email ID *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="e.g. rahul@example.com"
                                                        value={userEmail}
                                                        onChange={(e) => setUserEmail(e.target.value)}
                                                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0052FF] focus:bg-white transition-all shadow-2xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="pt-2 space-y-2">
                                            {/* Submit Booking Button */}
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-3 px-4 rounded-xl bg-[#0052FF] hover:bg-blue-600 active:scale-98 disabled:opacity-60 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>Saving to database...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>Submit</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </main>
    );
}
