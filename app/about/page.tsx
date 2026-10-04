
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    QrCode,
    Store,
    Users,
    Zap,
    ShieldCheck,
    Smartphone,
    Globe2,
} from "lucide-react";

export const metadata = {
    title: "About ShopProfile",
    description:
        "Learn how ShopProfile helps businesses create digital shop profiles, showcase products, share QR codes and connect with customers online.",
};

const features = [
    {
        icon: Store,
        title: "Your Digital Shop",
        description:
            "Create a professional digital profile for your shop and keep your business information available online.",
    },
    {
        icon: Smartphone,
        title: "Mobile Friendly",
        description:
            "Give your customers a smooth experience on phones, tablets and desktops.",
    },
    {
        icon: QrCode,
        title: "Share with QR",
        description:
            "Generate a simple QR code that customers can scan to instantly open your digital shop.",
    },
    {
        icon: Users,
        title: "Connect with Customers",
        description:
            "Make it easier for customers to discover your products and contact your business.",
    },
];

const benefits = [
    "Create a professional digital shop profile",
    "Showcase your products in one place",
    "Share your profile using a QR code",
    "Add phone, WhatsApp and business details",
    "Give customers a mobile-friendly experience",
    "Share one simple link anywhere",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.15),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur">
                            <Zap className="h-4 w-4 text-indigo-400" />
                            Built for modern businesses
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Your business deserves
                            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                a digital presence.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                            ShopProfile helps shops and businesses create a professional
                            digital profile, showcase products and connect with customers
                            through one simple link and QR code.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
                            >
                                Create Your Profile
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                            >
                                Explore ShopProfile
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                            About ShopProfile
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            A simpler way to take your shop online.
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Many local businesses have great products but do not have a
                            simple and professional way to present them online. ShopProfile
                            is designed to make that process easier.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            With ShopProfile, businesses can create a digital profile,
                            display their products, add important business information and
                            share their profile with customers using a link or QR code.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Our goal is to make digital presence simple, accessible and
                            useful for businesses of different sizes.
                        </p>
                    </div>

                    {/* Visual Card */}
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-100 to-blue-100 blur-2xl" />

                        <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
                            <div className="rounded-2xl bg-slate-950 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500">
                                            <Store className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="font-bold">Your Shop</p>
                                            <p className="text-sm text-slate-400">
                                                Digital Business Profile
                                            </p>
                                        </div>
                                    </div>

                                    <QrCode className="h-8 w-8 text-indigo-400" />
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-white/10 p-4">
                                        <p className="text-2xl font-bold">24+</p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Products
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-white/10 p-4">
                                        <p className="text-2xl font-bold">24/7</p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Online Presence
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl bg-white/10 p-4">
                                    <div className="flex items-center gap-3">
                                        <Globe2 className="h-5 w-5 text-indigo-400" />
                                        <div>
                                            <p className="text-sm font-medium">
                                                One simple profile
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Products • Contact • Location
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-slate-50 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                            What we provide
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Everything you need for your digital shop
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Keep your business information, products and customer contact
                            options together in one professional profile.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 sm:p-12 lg:p-16">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                                <Globe2 className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                                Our mission
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-indigo-100">
                                We want to make it easier for every business to build a
                                professional digital presence without needing a complicated
                                website or technical knowledge.
                            </p>

                            <p className="mt-4 leading-7 text-indigo-100">
                                From a small local shop to a growing business, ShopProfile
                                gives businesses a simple digital home that they can share
                                with customers anywhere.
                            </p>
                        </div>

                        <div className="flex items-center bg-black/10 p-8 sm:p-12 lg:p-16">
                            <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
                                    The idea
                                </p>

                                <p className="mt-4 text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                                    “One profile. One link. One QR code. Your entire business
                                    online.”
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="bg-slate-950 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-indigo-400">
                                Why ShopProfile
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                Make your business easier to discover.
                            </h2>

                            <p className="mt-5 max-w-xl leading-7 text-slate-400">
                                Give customers a convenient place to learn about your
                                business, explore your products and find the right way to
                                contact you.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                                >
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                                    <span className="text-sm leading-6 text-slate-300">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / Security */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 p-6">
                        <ShieldCheck className="h-7 w-7 text-indigo-600" />

                        <h3 className="mt-4 font-bold text-slate-900">
                            Business focused
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Designed around the everyday needs of shops and businesses.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-6">
                        <Smartphone className="h-7 w-7 text-indigo-600" />

                        <h3 className="mt-4 font-bold text-slate-900">
                            Built for mobile
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Customers can access your business profile from virtually any
                            modern device.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-6">
                        <QrCode className="h-7 w-7 text-indigo-600" />

                        <h3 className="mt-4 font-bold text-slate-900">
                            Easy to share
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Share your profile through a QR code, link, social media or
                            messaging apps.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:py-24">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Ready to create your digital shop?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        Create your ShopProfile and give your customers one simple place
                        to discover your business and products.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

