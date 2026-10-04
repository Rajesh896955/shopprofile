import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    CreditCard,
    HelpCircle,
    RefreshCcw,
    ShieldCheck,
} from "lucide-react";

export const metadata = {
    title: "Return & Refund Policy",
    description:
        "Read ShopProfile's return and refund policy, including cancellation timelines, refund eligibility and refund processing times.",
};

export default function ReturnRefundPolicyPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Header */}
            <section className="bg-slate-950">
                <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                        <RefreshCcw className="h-7 w-7" />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Return & Refund Policy
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                        This policy explains the cancellation and refund terms applicable
                        to payments made for ShopProfile services.
                    </p>

                    <p className="mt-4 text-sm text-slate-400">
                        Last updated: October 2026
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
                {/* Important Notice */}
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
                    <div className="flex gap-4">
                        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-indigo-600" />

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Important Refund Information
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                If you request cancellation within 12 hours of making a
                                payment, you may receive a refund of 50% of the amount paid,
                                subject to the terms described below. Payments are
                                non-refundable after 24 hours.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Refund Timeline */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Refund Timeline
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Refund eligibility depends on the time elapsed from the successful
                        payment.
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        {/* 0-12 Hours */}
                        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                <Clock3 className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-900">
                                Within 12 Hours
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                If you request cancellation within 12 hours of payment, 50%
                                of the payment amount may be refunded.
                            </p>

                            <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm font-semibold text-green-700">
                                50% Refund
                            </div>
                        </div>

                        {/* 12-24 Hours */}
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                                <Clock3 className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-900">
                                12–24 Hours
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Cancellation requests made after 12 hours are not eligible
                                for the standard 50% refund.
                            </p>

                            <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm font-semibold text-amber-700">
                                No Standard Refund
                            </div>
                        </div>

                        {/* After 24 Hours */}
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                                <CreditCard className="h-5 w-5" />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-900">
                                After 24 Hours
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Cancellation or refund requests made after 24 hours are not
                                eligible for a refund.
                            </p>

                            <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm font-semibold text-red-700">
                                No Refund
                            </div>
                        </div>
                    </div>
                </div>

                {/* Policy Sections */}
                <div className="mt-14 space-y-12">
                    {/* 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            1. Refund Eligibility
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile provides digital services and subscriptions. Once a
                            service has been purchased, cancellation and refund eligibility
                            depends on the time at which the refund request is submitted.
                        </p>

                        <div className="mt-5 space-y-3">
                            {[
                                "Refund requests submitted within 12 hours of payment may qualify for a 50% refund.",
                                "Refund requests submitted after 12 hours and before 24 hours are not eligible for the standard 50% refund.",
                                "Refund requests submitted after 24 hours are not eligible for a refund.",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
                                    <p className="leading-7 text-slate-600">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            2. How to Request a Refund
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            To request a refund, contact ShopProfile support as soon as
                            possible after the payment. Your request should include the
                            information necessary to identify the transaction.
                        </p>

                        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-bold text-slate-900">
                                Please provide:
                            </h3>

                            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                                <li>• Name associated with the account</li>
                                <li>• Registered email address</li>
                                <li>• Payment or transaction reference</li>
                                <li>• Date and approximate time of payment</li>
                                <li>• Reason for the cancellation request</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            3. Refund Processing Time
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Once a refund is approved, ShopProfile will initiate the refund
                            through the applicable payment method.
                        </p>

                        <div className="mt-5 flex gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                            <Clock3 className="mt-1 h-6 w-6 shrink-0 text-blue-600" />

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    1–7 Business Days
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Approved refunds may take approximately 1–7 business days
                                    to appear in your original payment method or bank account,
                                    depending on the payment provider or financial institution.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            4. Non-Refundable Payments
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Payments for ShopProfile services are generally non-refundable
                            after the applicable refund period has expired. After 24 hours
                            from the successful payment, refund requests will not normally
                            be accepted.
                        </p>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            5. Duplicate Payments
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            If you believe you have been charged more than once for the same
                            transaction, please contact support with the relevant payment
                            references. Duplicate-payment cases may be reviewed separately.
                        </p>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            6. Payment Provider Delays
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Once ShopProfile initiates an approved refund, the time required
                            for the amount to reach your account may depend on your bank,
                            card issuer, UPI provider or other payment service provider.
                            ShopProfile does not control processing times imposed by
                            third-party payment providers.
                        </p>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            7. Changes to This Policy
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile may update this Return & Refund Policy from time to
                            time. Any updated version will be published on this page with a
                            revised effective or update date.
                        </p>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            8. Contact Us
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            If you have questions about a payment, cancellation or refund,
                            please contact our support team.
                        </p>

                        <a
                            href="mailto:support@shopprofile.in"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            <HelpCircle className="h-4 w-4" />
                            Contact Support
                        </a>
                    </section>
                </div>

                {/* Bottom Notice */}
                <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm leading-6 text-slate-600">
                        <strong className="text-slate-900">Please note:</strong> Refund
                        eligibility is determined based on the time of the refund request
                        relative to the successful payment time. Please keep your payment
                        confirmation or transaction reference for any refund enquiry.
                    </p>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Have a question about your payment?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                        Our support team can help you with payment and refund-related
                        questions.
                    </p>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href="mailto:support@shopprofile.in"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Contact Support
                        </a>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Back to Home
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
