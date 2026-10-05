
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

export const metadata = {
    title: "Contact Us",
    description:
        "Contact ShopProfile for support, business enquiries, questions and help with your digital shop profile.",
};

const contactOptions = [
    {
        icon: Mail,
        title: "Email Support",
        description:
            "Send us your questions and our team will get back to you.",
        value: "support@shopprofile.in",
        href: "mailto:support@shopprofile.in",
    },
    {
        icon: MessageCircle,
        title: "General Enquiries",
        description:
            "Have a question about ShopProfile or how it works?",
        value: "hello@shopprofile.in",
        href: "mailto:hello@shopprofile.in",
    },
    {
        icon: Phone,
        title: "Business Support",
        description:
            "Contact us for business-related questions and assistance.",
        value: "+91 00000 00000",
        href: "tel:+910000000000",
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
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_35%)]" />

                <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                            <MessageCircle className="h-4 w-4 text-indigo-400" />
                            We&apos;re here to help
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Let&apos;s talk about
                            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                your business.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Have a question about ShopProfile, need help with your account,
                            or want to discuss a business enquiry? Send us a message.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Options */}
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-5 md:grid-cols-3">
                    {contactOptions.map((option) => {
                        const Icon = option.icon;

                        return (
                            <a
                                key={option.title}
                                href={option.href}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h2 className="mt-5 text-lg font-bold text-slate-900">
                                    {option.title}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {option.description}
                                </p>

                                <p className="mt-4 text-sm font-semibold text-indigo-600">
                                    {option.value}
                                </p>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* Main Contact Area */}
            <section className="bg-slate-50 py-6 sm:py-8">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                        {/* Left Content */}
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                                Get in touch
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                How can we help?
                            </h2>

                            <p className="mt-5 leading-7 text-slate-600">
                                Whether you are creating your first digital shop or already
                                using ShopProfile, we&apos;re here to help you get the most out of
                                your profile.
                            </p>

                            <div className="mt-8 space-y-4">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                                        <span className="text-sm leading-6 text-slate-700">
                                            {reason}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Response Time */}
                            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Clock3 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Support response
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            We aim to respond to customer enquiries as soon as
                                            possible during our support hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            ShopProfile
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Online digital business platform serving businesses
                                            across India.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-7">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Send us a message
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Fill out the form below and tell us how we can help.
                                </p>
                            </div>

                            <form className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Business */}
                                <div>
                                    <label
                                        htmlFor="business"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Business / Shop Name
                                    </label>

                                    <input
                                        id="business"
                                        name="business"
                                        type="text"
                                        placeholder="Enter your business name"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Subject
                                    </label>

                                    <select
                                        id="subject"
                                        name="subject"
                                        defaultValue=""
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
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
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us how we can help..."
                                        required
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Send Message
                                    <Send className="h-4 w-4" />
                                </button>

                                <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                                    <ShieldCheck className="h-4 w-4" />
                                    Your information is handled responsibly.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-center sm:p-12 lg:p-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Looking for answers?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-100">
                        You can also explore ShopProfile to learn more about our
                        features, services and digital business solutions.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
                        >
                            Explore Services
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
