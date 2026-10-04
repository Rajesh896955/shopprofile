import {
    Globe,
    ShieldCheck,
    Smartphone,
    Zap,
} from "lucide-react";

export default function BenefitsSection() {
    return (
        <section className="bg-slate-50 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                        Built for modern businesses
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        Simple tools. Real business value.
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600">
                        ShopProfile is designed to make your digital presence easier to
                        create, share and manage.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <BenefitCard
                        icon={<Zap />}
                        title="Fast"
                        description="Create your digital profile without complicated setup."
                    />

                    <BenefitCard
                        icon={<Smartphone />}
                        title="Mobile First"
                        description="Your profile looks great on phones, tablets and desktops."
                    />

                    <BenefitCard
                        icon={<ShieldCheck />}
                        title="Professional"
                        description="Present your business with a clean and trustworthy profile."
                    />

                    <BenefitCard
                        icon={<Globe />}
                        title="Share Anywhere"
                        description="One link and QR code can be shared across your channels."
                    />

                </div>
            </div>
        </section>
    );
}

function BenefitCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <div className="h-5 w-5">
                    {icon}
                </div>
            </div>

            <h3 className="mt-5 font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>

        </div>
    );
}
