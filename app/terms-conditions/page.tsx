import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    FileText,
    Lock,
    ShieldCheck,
    UserCheck,
} from "lucide-react";

export const metadata = {
    title: "Terms & Conditions",
    description:
        "Read the ShopProfile Terms & Conditions covering accounts, digital shop profiles, products, payments, acceptable use, intellectual property and service usage.",
};

export default function TermsConditionsPage() {
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
                        <FileText className="h-7 w-7" />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Terms & Conditions
                    </h1>

                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                        These Terms & Conditions govern your access to and use of
                        ShopProfile and its digital business profile services.
                    </p>

                    <p className="mt-4 text-sm text-slate-400">
                        Last updated: October 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
                {/* Important Notice */}
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
                    <div className="flex gap-4">
                        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-indigo-600" />

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Please read these terms carefully
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                By creating an account, accessing or using ShopProfile, you
                                acknowledge that you have read, understood and agreed to these
                                Terms & Conditions. If you do not agree with these terms,
                                please do not use the service.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-12">
                    {/* 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            1. About ShopProfile
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile is a digital platform designed to help businesses
                            create and manage an online business profile, showcase products,
                            share business information and provide customers with convenient
                            ways to discover and contact the business.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            The platform may include features such as digital shop
                            profiles, product catalogs, QR codes, business links, customer
                            contact options and analytics.
                        </p>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            2. Acceptance of Terms
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            By accessing or using ShopProfile, you agree to comply with
                            these Terms & Conditions and any applicable laws and regulations.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            If you are using ShopProfile on behalf of a business or
                            organization, you confirm that you have the authority to accept
                            these terms on behalf of that business or organization.
                        </p>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            3. Account Registration
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Some ShopProfile features may require you to create an account.
                            You are responsible for providing accurate and current
                            information during registration.
                        </p>

                        <div className="mt-5 space-y-3">
                            {[
                                "You must provide accurate account information.",
                                "You are responsible for maintaining the security of your account credentials.",
                                "You should not share your password or authentication credentials with unauthorized persons.",
                                "You are responsible for activities performed through your account.",
                                "You should notify ShopProfile if you believe your account has been accessed without authorization.",
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

                    {/* 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            4. Digital Shop Profiles
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile allows users to create digital business profiles
                            containing information such as business names, descriptions,
                            logos, images, products, contact information, locations and
                            other business-related content.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            You are responsible for ensuring that all information published
                            through your profile is accurate, lawful and appropriate.
                        </p>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            5. User Content
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            You may upload or publish content including text, images,
                            product information, logos, prices, descriptions and other
                            materials.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            You retain responsibility for the content you submit to
                            ShopProfile and confirm that you have the necessary rights,
                            permissions and licenses to use and publish that content.
                        </p>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            6. Prohibited Activities
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            You must not use ShopProfile for unlawful, fraudulent,
                            deceptive, abusive or harmful activities.
                        </p>

                        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <h3 className="font-bold text-slate-900">
                                Prohibited uses include:
                            </h3>

                            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                                <li>• Fraudulent or deceptive business activities</li>
                                <li>• Impersonating another person or business</li>
                                <li>• Publishing illegal or unlawful content</li>
                                <li>• Uploading content that violates another person&apos;s rights</li>
                                <li>• Attempting to gain unauthorized access to the platform</li>
                                <li>• Distributing malware or malicious software</li>
                                <li>• Abusing or disrupting the platform</li>
                                <li>• Using the service to facilitate illegal activities</li>
                                <li>• Circumventing security or access controls</li>
                            </ul>
                        </div>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            7. Products and Business Information
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile provides tools for businesses to display their
                            products and business information. ShopProfile does not
                            necessarily sell, manufacture, own or fulfill products listed
                            by users.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Any transaction, product purchase, service arrangement or
                            customer relationship between a business and its customers is
                            the responsibility of the relevant parties unless ShopProfile
                            explicitly provides and administers that transaction.
                        </p>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            8. Payments and Subscriptions
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Certain ShopProfile features or plans may require payment.
                            Prices, billing periods and applicable taxes will be presented
                            before a paid service is purchased.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            By purchasing a paid service, you authorize the applicable
                            payment provider to process the payment according to the
                            selected payment method and applicable billing terms.
                        </p>

                        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-sm leading-6 text-slate-600">
                                For cancellation and refund conditions, please review our{" "}
                                <Link
                                    href="/return-refund-policy"
                                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Return & Refund Policy
                                </Link>
                                .
                            </p>
                        </div>
                    </section>

                    {/* 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            9. Intellectual Property
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            The ShopProfile platform, including its software, design,
                            branding, logos, graphics, interface, text and other original
                            materials, may be protected by applicable intellectual property
                            laws.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            You may not copy, reproduce, modify, distribute, reverse
                            engineer, sell or commercially exploit ShopProfile&apos;s proprietary
                            materials without appropriate authorization.
                        </p>
                    </section>

                    {/* 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            10. User-Provided Intellectual Property
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            You retain ownership of content that you independently own and
                            upload to ShopProfile, subject to the rights necessary for
                            ShopProfile to operate and provide the service.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            By submitting content, you grant ShopProfile the permissions
                            reasonably necessary to host, store, display, reproduce and
                            process that content for providing the service to you and your
                            customers.
                        </p>
                    </section>

                    {/* 11 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            11. QR Codes and Profile Links
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile may provide QR codes and shareable links that direct
                            customers to a user&apos;s digital profile.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Users are responsible for the content and information available
                            through their profile links. ShopProfile may disable or
                            restrict links associated with accounts that violate these
                            Terms & Conditions or applicable law.
                        </p>
                    </section>

                    {/* 12 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            12. Service Availability
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            We aim to keep ShopProfile available and reliable, but we do not
                            guarantee that the service will always be uninterrupted,
                            error-free or available at all times.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Service availability may be affected by maintenance, technical
                            issues, third-party services, internet connectivity, security
                            incidents or circumstances outside our reasonable control.
                        </p>
                    </section>

                    {/* 13 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            13. Account Suspension or Termination
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile may suspend, restrict or terminate an account where
                            there is a reasonable basis to believe that the account or its
                            use violates these Terms & Conditions, applicable law, security
                            requirements or the rights of others.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Where appropriate, users may contact support regarding an
                            account restriction or termination.
                        </p>
                    </section>

                    {/* 14 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            14. Third-Party Services
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile may integrate with or rely on third-party services,
                            such as authentication providers, payment processors, hosting
                            providers, analytics services and communication platforms.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Your use of third-party services may also be subject to the
                            terms and privacy policies of those third parties.
                        </p>
                    </section>

                    {/* 15 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            15. Privacy
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Your use of ShopProfile may involve the collection and
                            processing of personal information. Please review our Privacy
                            Policy to understand how information may be collected, used and
                            protected.
                        </p>

                        <Link
                            href="/privacy-policy"
                            className="mt-4 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            View Privacy Policy
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                        </Link>
                    </section>

                    {/* 16 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            16. Disclaimer
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile is provided on an &quot;as available&quot; basis to the extent
                            permitted by applicable law. We do not guarantee that every
                            feature will meet every individual business requirement or that
                            the service will be completely free from errors or interruptions.
                        </p>
                    </section>

                    {/* 17 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            17. Limitation of Liability
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            To the maximum extent permitted by applicable law, ShopProfile
                            and its operators will not be responsible for indirect,
                            incidental, special or consequential losses arising from the use
                            of the platform, except where liability cannot lawfully be
                            excluded.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            Nothing in these Terms & Conditions is intended to exclude or
                            limit any liability that cannot legally be excluded or limited
                            under applicable law.
                        </p>
                    </section>

                    {/* 18 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            18. Indemnification
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            To the extent permitted by applicable law, users are responsible
                            for claims, losses or expenses arising from their unlawful use
                            of ShopProfile, violation of these terms, or infringement of
                            another person&apos;s rights through content or activities associated
                            with their account.
                        </p>
                    </section>

                    {/* 19 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            19. Changes to These Terms
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            ShopProfile may update these Terms & Conditions from time to
                            time to reflect changes to the service, legal requirements,
                            security practices or business operations.
                        </p>

                        <p className="mt-4 leading-7 text-slate-600">
                            The updated terms will be published on this page with a revised
                            update date. Continued use of the service after an update may
                            constitute acceptance of the updated terms to the extent
                            permitted by applicable law.
                        </p>
                    </section>

                    {/* 20 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            20. Governing Law
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            These Terms & Conditions shall be interpreted and applied in
                            accordance with applicable laws and regulations. Any dispute
                            arising in connection with the service will be subject to the
                            jurisdiction and dispute-resolution requirements applicable to
                            ShopProfile and its users.
                        </p>
                    </section>

                    {/* 21 */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900">
                            21. Contact Us
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            If you have questions about these Terms & Conditions, please
                            contact ShopProfile.
                        </p>

                        <a
                            href="mailto:support@shopprofile.in"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Contact Support
                        </a>
                    </section>
                </div>

                {/* Agreement Box */}
                <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <UserCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-900">
                                Your use of ShopProfile
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                By using ShopProfile, you acknowledge that you have reviewed
                                these Terms & Conditions and agree to comply with them and
                                applicable laws.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-10 flex flex-col justify-center gap-3 text-center sm:flex-row">
                    <Link
                        href="/privacy-policy"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <Lock className="h-4 w-4" />
                        Privacy Policy
                    </Link>

                    <Link
                        href="/return-refund-policy"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Refund Policy
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}
