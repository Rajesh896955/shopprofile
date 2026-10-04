import Link from "next/link";
import {
    ArrowRight,
    Check,
} from "lucide-react";

export default function DigitalProfileSection() {
    return (
        <section className="bg-slate-50 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">

                <div>
                    <img src="/images/image3.png" alt="" />
                </div>

                {/* Content */}
                <div>
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                        Your digital storefront
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        One profile.
                        <span className="block text-indigo-600">
                            Your entire business.
                        </span>
                    </h2>

                    <p className="mt-6 text-base leading-8 text-slate-600">
                        Instead of sending customers multiple links, give them one
                        professional destination where they can discover your business,
                        products and contact information.
                    </p>

                    <div className="mt-8 space-y-4">
                        <Benefit
                            title="Professional online presence"
                            description="Give your business a clean and modern digital identity."
                        />

                        <Benefit
                            title="Easy product discovery"
                            description="Let customers browse your products from any device."
                        />

                        <Benefit
                            title="Simple customer connection"
                            description="Make contacting your business quick and convenient."
                        />

                        <Benefit
                            title="Share anywhere"
                            description="Use your profile link or QR code across your business."
                        />
                    </div>

                    <Link
                        href="/signup"
                        className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        Create Your Profile
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

function MiniStat({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-sm font-bold text-slate-900">
                {value}
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
                {label}
            </p>
        </div>
    );
}

function ProfileRow({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <div className="h-4 w-4">
                    {icon}
                </div>
            </div>

            <span className="truncate text-xs font-medium text-slate-600">
                {text}
            </span>
        </div>
    );
}

function Benefit({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4">

            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
            </div>

            <div>
                <h3 className="font-semibold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                </p>
            </div>

        </div>
    );
}
