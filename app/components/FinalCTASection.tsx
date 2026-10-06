import Link from "next/link";
import {
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function FinalCTASection() {
    return (
        <section className="bg-white px-4 pt-4 pb-12 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8 lg:pt-10 lg:pb-28">
            <div className="mx-auto max-w-5xl">

                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 px-6 py-16 text-center shadow-2xl sm:px-10">

                    <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-purple-300/10 blur-3xl" />

                    <div className="relative">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>

                        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Give your business a digital home.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                            Create your ShopProfile today and give your customers one
                            simple place to discover your business.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}
