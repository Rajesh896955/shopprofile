import {
    Package,
    Share2,
    Users,
} from "lucide-react";

export default function HowItWorksSection() {
    return (
        <section className="px-4 pt-3 pb-2 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                        How it works
                    </p>

                    <h2 className="mt-2 sm:mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        Go digital in three simple steps.
                    </h2>

                    <p className="mt-2 sm:mt-5 text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-600">
                        No complicated setup. Create your profile, add your products and
                        start sharing.
                    </p>
                </div>

                <div className="relative mt-3 sm:mt-6 lg:mt-10 grid gap-5 sm:gap-8 md:grid-cols-3">

                    <div className="absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-slate-200 md:block" />

                    <Step
                        number="01"
                        icon={<Users />}
                        title="Create your profile"
                        description="Sign up and add your business name, logo, description and contact information."
                    />

                    <Step
                        number="02"
                        icon={<Package />}
                        title="Add your products"
                        description="Showcase your products with images, descriptions, prices and categories."
                    />

                    <Step
                        number="03"
                        icon={<Share2 />}
                        title="Share & grow"
                        description="Share your profile link or QR code with customers and grow your digital presence."
                    />

                </div>
            </div>
        </section>
    );
}

function Step({
    number,
    icon,
    title,
    description,
}: {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="relative text-center">

            <div className="relative z-10 mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white bg-slate-950 text-white shadow-lg sm:shadow-xl">
                <div className="h-5 w-5 sm:h-6 sm:w-6">
                    {icon}
                </div>
            </div>

            <span className="mt-2.5 sm:mt-5 block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600">
                Step {number}
            </span>

            <h3 className="mt-1 sm:mt-2 text-base sm:text-lg font-bold text-slate-900">
                {title}
            </h3>

            <p className="mx-auto mt-1.5 sm:mt-3 max-w-sm text-xs sm:text-sm leading-5 sm:leading-7 text-slate-500">
                {description}
            </p>

        </div>
    );
}
