
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Globe2,
    MessageCircle,
    Package,
    QrCode,
    Share2,
    Smartphone,
    Store,
    Zap,
} from "lucide-react";

export const metadata = {
    title: "Services",
    description:
        "Explore ShopProfile services including digital shop profiles, product catalogs, QR codes, customer contact tools and business analytics.",
};

const services = [
    {
        icon: Store,
        title: "Digital Shop Profile",
        description:
            "Create a professional online profile for your shop with your business name, logo, description, contact details and location.",
        features: [
            "Professional business profile",
            "Business information",
            "Contact details",
            "Location and opening information",
        ],
    },
    {
        icon: Package,
        title: "Product Showcase",
        description:
            "Display your products in an easy-to-browse digital catalog so customers can discover what your business offers.",
        features: [
            "Add unlimited product details",
            "Product images",
            "Product descriptions",
            "Organized product catalog",
        ],
    },
    {
        icon: QrCode,
        title: "QR Code Profile",
        description:
            "Generate a QR code for your digital shop profile and let customers open your business page with a simple scan.",
        features: [
            "Dedicated QR code",
            "Easy customer access",
            "Print and display anywhere",
            "Works on mobile devices",
        ],
    },
    {
        icon: MessageCircle,
        title: "Customer Contact",
        description:
            "Make it easier for customers to contact your business directly from your digital profile.",
        features: [
            "Call button",
            "WhatsApp integration",
            "Business contact information",
            "Quick customer interaction",
        ],
    },
    {
        icon: Share2,
        title: "Easy Sharing",
        description:
            "Share your ShopProfile anywhere you communicate with customers, from social media to messaging apps.",
        features: [
            "One shareable profile link",
            "Social media sharing",
            "Messaging app sharing",
            "Easy copy-link option",
        ],
    },
    {
        icon: BarChart3,
        title: "Profile Analytics",
        description:
            "Understand how customers interact with your digital profile and use insights to improve your online presence.",
        features: [
            "Profile visits",
            "Customer interactions",
            "Product activity",
            "Performance insights",
        ],
    },
];

const steps = [
    {
        number: "01",
        title: "Create your profile",
        description:
            "Add your business name, logo, description, contact information and other important details.",
    },
    {
        number: "02",
        title: "Add your products",
        description:
            "Create your digital product catalog with images, names, descriptions and pricing information.",
    },
    {
        number: "03",
        title: "Share your profile",
        description:
            "Share your unique profile link or QR code with your customers online or offline.",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                            <Zap className="h-4 w-4 text-indigo-400" />
                            Everything your business needs
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Simple tools for a
                            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                smarter digital shop.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            ShopProfile gives businesses the tools to create a digital
                            presence, showcase products, connect with customers and share
                            their business everywhere.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
                            >
                                Create Your Profile
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                        Our services
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Everything in one digital platform
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                        Build your digital shop and give customers one convenient place to
                        discover your business and products.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900">
                                    {service.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {service.description}
                                </p>

                                <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                                    {service.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-2.5"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                                            <span className="text-sm text-slate-600">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Digital Experience */}
            <section className="bg-slate-50 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Preview */}
                        <div className="order-2 lg:order-1">
                            <div className="relative mx-auto max-w-md">
                                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-indigo-100 to-blue-100 blur-2xl" />

                                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                                    <div className="bg-slate-950 p-6 text-white">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500">
                                                <Store className="h-7 w-7" />
                                            </div>

                                            <div>
                                                <p className="font-bold">Royal Store</p>
                                                <p className="text-sm text-slate-400">
                                                    Digital Shop Profile
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mt-5 text-sm leading-6 text-slate-300">
                                            Quality products for your everyday needs.
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-bold text-slate-900">
                                                Products
                                            </h3>

                                            <span className="text-xs font-medium text-indigo-600">
                                                View All
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                "Premium Product",
                                                "Daily Essentials",
                                                "New Collection",
                                                "Best Seller",
                                            ].map((product) => (
                                                <div
                                                    key={product}
                                                    className="rounded-xl border border-slate-200 p-3"
                                                >
                                                    <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-100">
                                                        <Package className="h-8 w-8 text-slate-400" />
                                                    </div>

                                                    <p className="mt-3 truncate text-xs font-semibold text-slate-800">
                                                        {product}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <button className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white">
                                                WhatsApp
                                            </button>

                                            <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                                                Contact
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                                Digital experience
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Give customers a better way to discover your business.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Instead of sending customers to different places for your
                                business information and products, bring everything together
                                in one simple digital profile.
                            </p>

                            <div className="mt-8 space-y-5">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Globe2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            One online destination
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Give customers one place to find your business,
                                            products and contact information.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Smartphone className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Designed for mobile
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Customers can browse your profile comfortably from
                                            smartphones and other modern devices.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Share2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Easy to share
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Share your profile through links, QR codes, social
                                            platforms and messaging apps.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600">
                        How it works
                    </p>

                    <h2 className="mt-2 sm:mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Get your digital shop online in three steps
                    </h2>
                </div>

                <div className="mt-6 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
                        >
                            <span className="text-4xl sm:text-5xl font-black text-indigo-100">
                                {step.number}
                            </span>

                            <h3 className="mt-2.5 sm:mt-4 text-lg sm:text-xl font-bold text-slate-900">
                                {step.title}
                            </h3>

                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* QR Section */}
            <section className="bg-slate-950 py-10 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                                <QrCode className="h-6 w-6" />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-white">
                                Turn your shop into a simple scan.
                            </h2>

                            <p className="mt-4 max-w-xl leading-7 text-slate-400">
                                Display your ShopProfile QR code at your counter, packaging,
                                business card, storefront or promotional material. Customers
                                can scan it and instantly access your digital profile.
                            </p>

                            <Link
                                href="/signup"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
                            >
                                Create QR Profile
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="flex justify-center">
                            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-white p-5 shadow-xl">
                                <div className="grid grid-cols-5 gap-1">
                                    {Array.from({ length: 25 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-4 w-4 rounded-[2px] ${[
                                                0, 1, 2, 4, 5, 7, 9, 10, 12, 14, 15, 16, 18, 20,
                                                22, 23, 24,
                                            ].includes(index)
                                                ? "bg-slate-950"
                                                : "bg-transparent"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:py-24">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Start building your digital shop today.
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                        Create your ShopProfile, add your products and start sharing your
                        business with customers.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

