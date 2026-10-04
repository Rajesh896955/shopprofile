import {
    QrCode,
    Smartphone,
    Store,
    Package,
} from "lucide-react";

export default function StatsSection() {
    return (
        <section className="border-b border-slate-100 bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">

                <Stat
                    icon={<Store className="h-5 w-5" />}
                    value="1 Profile"
                    label="For your business"
                />

                <Stat
                    icon={<Package className="h-5 w-5" />}
                    value="Unlimited"
                    label="Possibilities to showcase"
                />

                <Stat
                    icon={<QrCode className="h-5 w-5" />}
                    value="1 QR Code"
                    label="Share everywhere"
                />

                <Stat
                    icon={<Smartphone className="h-5 w-5" />}
                    value="100%"
                    label="Mobile friendly"
                />

            </div>
        </section>
    );
}

function Stat({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string;
    label: string;
}) {
    return (
        <div className="flex items-center gap-3 px-4 py-7 sm:px-6 lg:px-8">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
                {icon}
            </div>

            <div>
                <p className="text-base font-bold text-slate-900">
                    {value}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                    {label}
                </p>
            </div>
        </div>
    );
}
