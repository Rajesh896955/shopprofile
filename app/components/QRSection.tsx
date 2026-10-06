import {
    Check,
    QrCode,
} from "lucide-react";

export default function QRSection() {
    return (
        <section className="px-4 pb-4 sm:px-6 sm:pb-8 lg:px-8 lg:pb-12">
            <div className="mx-auto max-w-7xl">

                <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-5 sm:px-10 lg:px-16 lg:py-6">

                    <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

                    <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

                    <div className="relative grid items-center gap-12 lg:grid-cols-2">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                                <QrCode className="h-4 w-4 text-indigo-400" />
                                Smart QR sharing
                            </div>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Your shop can be
                                <span className="block text-indigo-400">
                                    one scan away.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                                Put your ShopProfile QR code on your counter, packaging,
                                visiting card, posters or anywhere your customers can scan.
                            </p>

                            <div className="mt-8 space-y-3">
                                <CheckItem text="Instant access to your digital profile" />
                                <CheckItem text="Works on mobile devices" />
                                <CheckItem text="Easy to print and share" />
                                <CheckItem text="No app installation required" />
                            </div>

                        </div>

                        {/* QR Image Visual */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative max-w-sm sm:max-w-md">
                                <div className="absolute -inset-8 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

                                <img
                                    src="/images/image2.png"
                                    alt="Scan to visit"
                                    className="relative w-full rounded-2xl shadow-2xl object-contain"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-slate-300">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                <Check className="h-3 w-3 text-emerald-400" />
            </div>

            {text}
        </div>
    );
}
