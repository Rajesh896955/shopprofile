import {
    ArrowRight,
    BarChart3,
    MessageCircle,
    Package,
    QrCode,
    Share2,
    Store,
} from "lucide-react";

export default function FeaturesSection() {
    return (
        <section className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            <div className="mx-auto max-w-7xl">

                <SectionHeading
                    eyebrow="Everything in one place"
                    title="Everything your business needs to go digital."
                    description="ShopProfile gives you simple tools to create, manage and share your digital business presence."
                />

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <FeatureCard
                        icon={<Store />}
                        title="Digital Shop Profile"
                        description="Create a professional profile with your business name, logo, description, contact details and more."
                    />

                    <FeatureCard
                        icon={<Package />}
                        title="Product Showcase"
                        description="Add products with images, descriptions, prices and categories so customers can explore your offerings."
                    />

                    <FeatureCard
                        icon={<QrCode />}
                        title="Smart QR Code"
                        description="Generate a QR code for your digital shop and let customers open your profile instantly."
                    />

                    <FeatureCard
                        icon={<Share2 />}
                        title="Easy Sharing"
                        description="Share your profile through WhatsApp, social media, messages or a simple link."
                    />

                    <FeatureCard
                        icon={<MessageCircle />}
                        title="Customer Contact"
                        description="Make it easy for customers to contact your business through available contact options."
                    />

                    <FeatureCard
                        icon={<BarChart3 />}
                        title="Profile Analytics"
                        description="Understand profile activity and discover how customers interact with your digital presence."
                    />

                </div>
            </div>
        </section>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                {eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {title}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
                {description}
            </p>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <div className="h-5 w-5">
                    {icon}
                </div>
            </div>

            <h3 className="mt-6 text-lg font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
                {description}
            </p>

            <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-indigo-600 opacity-0 transition group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-4 w-4" />
            </div>

        </div>
    );
}
