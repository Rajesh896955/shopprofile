"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Check,
    X,
    Sparkles,
    Zap,
    Building2,
    HelpCircle,
    ArrowRight,
} from "lucide-react";

type Billing = "monthly" | "yearly";

const plans = [
    {
        name: "Free",
        description: "Start your digital shop profile for free.",
        monthly: 0,
        yearly: 0,
        icon: Sparkles,
        popular: false,
        button: "Get Started",
        features: [
            "1 digital shop profile",
            "Up to 10 products",
            "Custom profile URL",
            "Mobile-friendly profile",
            "QR code",
            "Basic contact details",
            "Product images",
            "Basic sharing",
        ],
    },
    {
        name: "Pro",
        description: "Everything you need to grow your digital presence.",
        monthly: 299,
        yearly: 2990,
        icon: Zap,
        popular: true,
        button: "Start Pro",
        features: [
            "Everything in Free",
            "Up to 100 products",
            "Custom profile branding",
            "Remove ShopProfile branding",
            "Advanced QR code",
            "WhatsApp & call buttons",
            "Product categories",
            "Priority support",
            "Basic profile analytics",
        ],
    },
    {
        name: "Business",
        description: "Powerful tools for growing businesses and teams.",
        monthly: 799,
        yearly: 7990,
        icon: Building2,
        popular: false,
        button: "Choose Business",
        features: [
            "Everything in Pro",
            "Unlimited products",
            "Multiple business profiles",
            "Advanced analytics",
            "Custom business branding",
            "Team access",
            "Priority business support",
            "Advanced sharing tools",
            "Early access to new features",
        ],
    },
];

const comparison = [
    {
        feature: "Digital shop profile",
        free: true,
        pro: true,
        business: true,
    },
    {
        feature: "Custom profile URL",
        free: true,
        pro: true,
        business: true,
    },
    {
        feature: "Product listings",
        free: "10",
        pro: "100",
        business: "Unlimited",
    },
    {
        feature: "Product categories",
        free: false,
        pro: true,
        business: true,
    },
    {
        feature: "QR code",
        free: true,
        pro: true,
        business: true,
    },
    {
        feature: "WhatsApp & Call buttons",
        free: false,
        pro: true,
        business: true,
    },
    {
        feature: "Custom branding",
        free: false,
        pro: true,
        business: true,
    },
    {
        feature: "Remove ShopProfile branding",
        free: false,
        pro: true,
        business: true,
    },
    {
        feature: "Analytics",
        free: false,
        pro: "Basic",
        business: "Advanced",
    },
    {
        feature: "Multiple profiles",
        free: false,
        pro: false,
        business: true,
    },
    {
        feature: "Team access",
        free: false,
        pro: false,
        business: true,
    },
    {
        feature: "Priority support",
        free: false,
        pro: true,
        business: true,
    },
];

const faq = [
    {
        question: "Can I start with the Free plan?",
        answer:
            "Yes. You can create a digital shop profile using the Free plan and upgrade later when you need additional features.",
    },
    {
        question: "Can I change my plan later?",
        answer:
            "Yes. You can upgrade your plan when your business needs more products, branding, analytics or other features.",
    },
    {
        question: "Is there a yearly billing option?",
        answer:
            "Yes. Pro and Business plans can be offered with yearly billing. The exact amount charged will be shown before you complete your payment.",
    },
    {
        question: "Can I cancel my subscription?",
        answer:
            "Subscription cancellation depends on the plan and billing terms applicable to your account. Please review the Terms & Conditions and Return & Refund Policy before purchasing.",
    },
    {
        question: "Are payments refundable?",
        answer:
            "Refund eligibility is governed by the ShopProfile Return & Refund Policy and applicable law. Please review that policy before making a payment.",
    },
    {
        question: "Is GST included in the displayed price?",
        answer:
            "The final amount, including any applicable taxes or charges, should be shown at checkout before payment is completed.",
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
        <span className="text-sm font-medium text-slate-700">
            {value}
        </span>
    );
}

export default function PricingPage() {
    const [billing, setBilling] = useState<Billing>("monthly");

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950 px-6 pb-20 pt-24 text-white">
                <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                        <Sparkles className="h-4 w-4" />
                        Simple & transparent pricing
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Choose the plan that fits
                        <span className="block text-indigo-400">
                            your business.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                        Start for free and upgrade whenever you need more products,
                        branding, analytics and business tools.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/10 p-1">
                        <button
                            type="button"
                            onClick={() => setBilling("monthly")}
                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${billing === "monthly"
                                ? "bg-white text-slate-900 shadow"
                                : "text-slate-300 hover:text-white"
                                }`}
                        >
                            Monthly
                        </button>

                        <button
                            type="button"
                            onClick={() => setBilling("yearly")}
                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${billing === "yearly"
                                ? "bg-white text-slate-900 shadow"
                                : "text-slate-300 hover:text-white"
                                }`}
                        >
                            Yearly
                            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                Save
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="-mt-10 px-6 pb-20">
                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        const price =
                            billing === "monthly" ? plan.monthly : plan.yearly;

                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-3xl border bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-1 ${plan.popular
                                    ? "border-indigo-500 ring-2 ring-indigo-500/20"
                                    : "border-slate-200"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                                        <Icon className="h-6 w-6 text-slate-900" />
                                    </div>

                                    {plan.name === "Pro" && (
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                            For growing shops
                                        </span>
                                    )}
                                </div>

                                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                                    {plan.name}
                                </h2>

                                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                                    {plan.description}
                                </p>

                                <div className="mt-6 flex items-end gap-1">
                                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                                        ₹{price.toLocaleString("en-IN")}
                                    </span>

                                    {plan.monthly > 0 && (
                                        <span className="mb-1 text-sm text-slate-500">
                                            /{billing === "monthly" ? "month" : "year"}
                                        </span>
                                    )}
                                </div>

                                {billing === "yearly" && plan.monthly > 0 && (
                                    <p className="mt-2 text-xs text-emerald-600">
                                        Billed annually
                                    </p>
                                )}

                                {plan.monthly === 0 && (
                                    <p className="mt-2 text-xs text-slate-500">
                                        No credit card required
                                    </p>
                                )}

                                <Link
                                    href={
                                        plan.name === "Free"
                                            ? "/signup"
                                            : `/signup?plan=${plan.name.toLowerCase()}`
                                    }
                                    className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${plan.popular
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                        : "bg-slate-900 text-white hover:bg-slate-800"
                                        }`}
                                >
                                    {plan.button}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <div className="my-7 border-t border-slate-100" />

                                <p className="mb-4 text-sm font-semibold text-slate-900">
                                    What&apos;s included
                                </p>

                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-slate-600"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                            </span>

                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Comparison */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            Compare plans
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                            Everything you need to choose confidently
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                            Compare the features available in each ShopProfile plan.
                        </p>
                    </div>

                    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] border-collapse">
                                <thead>
                                    <tr className="bg-slate-50">
                                        <th className="px-6 py-5 text-left text-sm font-semibold text-slate-900">
                                            Feature
                                        </th>

                                        <th className="px-6 py-5 text-center text-sm font-semibold text-slate-900">
                                            Free
                                        </th>

                                        <th className="bg-indigo-50 px-6 py-5 text-center text-sm font-semibold text-indigo-700">
                                            Pro
                                        </th>

                                        <th className="px-6 py-5 text-center text-sm font-semibold text-slate-900">
                                            Business
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
                                                    : "bg-slate-50/50"
                                            }
                                        >
                                            <td className="border-t border-slate-100 px-6 py-4 text-sm font-medium text-slate-700">
                                                {row.feature}
                                            </td>

                                            <td className="border-t border-slate-100 px-6 py-4 text-center">
                                                <FeatureValue value={row.free} />
                                            </td>

                                            <td className="border-t border-slate-100 bg-indigo-50/40 px-6 py-4 text-center">
                                                <FeatureValue value={row.pro} />
                                            </td>

                                            <td className="border-t border-slate-100 px-6 py-4 text-center">
                                                <FeatureValue value={row.business} />
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
            <section className="bg-slate-50 px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center">
                        <HelpCircle className="mx-auto h-8 w-8 text-indigo-600" />

                        <h2 className="mt-4 text-3xl font-bold text-slate-900">
                            Pricing FAQs
                        </h2>

                        <p className="mt-3 text-slate-500">
                            A few things you may want to know before choosing a plan.
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        {faq.map((item) => (
                            <details
                                key={item.question}
                                className="group rounded-2xl border border-slate-200 bg-white p-5"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                                    {item.question}

                                    <span className="text-xl text-slate-400 transition-transform group-open:rotate-45">
                                        +
                                    </span>
                                </summary>

                                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Ready to create your digital shop?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                        Start with a free ShopProfile and give your customers one simple
                        place to discover your business.
                    </p>

                    <Link
                        href="/signup"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Create Your Free Profile
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
