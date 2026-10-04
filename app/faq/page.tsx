import type { Metadata } from "next";
import {
    ChevronDown,
    HelpCircle,
    ShieldCheck,
    UserCheck,
    CreditCard,
    FileText,
    Lock,
    AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description:
        "Frequently asked questions about ShopProfile, digital shop profiles, user accounts, payments, privacy, content and legal responsibilities in India.",
};

const faqs = [
    {
        category: "About ShopProfile",
        icon: HelpCircle,
        questions: [
            {
                question: "What is ShopProfile?",
                answer:
                    "ShopProfile is a digital platform that allows businesses and shop owners to create an online business profile, showcase products or services, share business information and provide customers with a simple digital link or QR code.",
            },
            {
                question: "Is ShopProfile itself the seller of products listed by users?",
                answer:
                    "Unless specifically stated otherwise, ShopProfile provides the digital platform and profile/catalog tools. Products, services, prices, availability, descriptions and other business information displayed by individual users are provided by those users or businesses. Customers should verify the relevant seller or service provider before making a purchase or transaction.",
            },
            {
                question: "Does ShopProfile guarantee the products or services listed by businesses?",
                answer:
                    "ShopProfile does not independently guarantee the quality, legality, availability, pricing or performance of products or services listed by independent businesses. Users are responsible for ensuring that their listings and business activities comply with applicable Indian laws and regulations.",
            },
        ],
    },

    {
        category: "User Accounts & Business Information",
        icon: UserCheck,
        questions: [
            {
                question: "Who can create a ShopProfile account?",
                answer:
                    "Individuals or businesses who are legally permitted to use the service may create an account, subject to ShopProfile's Terms & Conditions and applicable laws.",
            },
            {
                question: "Is the information provided by a business required to be accurate?",
                answer:
                    "Yes. Users are responsible for providing accurate, current and lawful information about their business, products, services, contact details, prices and other information published on their profile.",
            },
            {
                question: "Can I publish someone else's business information or photographs?",
                answer:
                    "You should only upload or publish content that you have the legal right or permission to use. Users are responsible for copyright, trademark, privacy, publicity and other rights relating to content they upload.",
            },
            {
                question: "Can ShopProfile remove a business profile?",
                answer:
                    "Yes. ShopProfile may restrict, suspend or remove content or accounts where permitted under its Terms & Conditions, including where content appears unlawful, misleading, fraudulent, abusive, infringing or otherwise violates platform rules or applicable law.",
            },
        ],
    },

    {
        category: "Products, Services & Customer Transactions",
        icon: FileText,
        questions: [
            {
                question: "Does ShopProfile process customer orders?",
                answer:
                    "A ShopProfile profile may provide information and contact options, but the exact transaction flow depends on the features enabled on the platform. Unless ShopProfile expressly acts as the seller or payment intermediary for a particular transaction, customers should deal directly with the relevant business for orders, delivery, product quality, service performance and refunds.",
            },
            {
                question: "Who is responsible for product or service information?",
                answer:
                    "The business or user who publishes the listing is responsible for ensuring that the information is accurate and not misleading, subject to the applicable law and the particular role ShopProfile has in the transaction.",
            },
            {
                question: "What should I do if a listing appears misleading or illegal?",
                answer:
                    "You can report the profile or listing to ShopProfile through the available support or reporting channel. Please provide the profile URL, relevant listing details and a clear description of the concern so that it can be reviewed.",
            },
            {
                question: "Can businesses list prohibited or unlawful products or services?",
                answer:
                    "No. Users must not use ShopProfile to advertise, promote, sell or facilitate unlawful goods or services or content prohibited by applicable Indian law or ShopProfile's Terms & Conditions.",
            },
        ],
    },

    {
        category: "Payments & Refunds",
        icon: CreditCard,
        questions: [
            {
                question: "Are payments made to ShopProfile refundable?",
                answer:
                    "Refund eligibility depends on the applicable ShopProfile refund policy and the nature of the payment. Please read the Return & Refund Policy before making a payment.",
            },
            {
                question: "What is ShopProfile's refund policy?",
                answer:
                    "For eligible ShopProfile app or subscription payments, the applicable refund terms are described in the Return & Refund Policy. Any refund is subject to the conditions stated in that policy, applicable payment-provider rules and applicable law.",
            },
            {
                question: "How long can a refund take?",
                answer:
                    "Once a refund is approved, the time taken for the amount to reach the original payment method may depend on the payment provider, bank or card issuer. ShopProfile's stated refund-processing period should be read together with the payment provider's processing timelines.",
            },
            {
                question: "What happens if I make a duplicate payment?",
                answer:
                    "If you believe you have been charged more than once for the same ShopProfile service, contact support with the transaction details. The payment records can then be reviewed and any eligible duplicate-payment refund can be processed according to the applicable policy.",
            },
        ],
    },

    {
        category: "Privacy & Personal Data",
        icon: Lock,
        questions: [
            {
                question: "How does ShopProfile handle personal information?",
                answer:
                    "ShopProfile may collect and process personal information required to provide accounts, digital profiles, customer communication, payments, security and other platform services. The details of such processing are described in the Privacy Policy.",
            },
            {
                question: "Does ShopProfile sell personal information?",
                answer:
                    "ShopProfile should not describe personal information as being sold unless its actual business practices and legal arrangements support such a statement. Personal information should be handled according to the platform's Privacy Policy and applicable Indian data-protection requirements.",
            },
            {
                question: "Can I request information about my personal data?",
                answer:
                    "Subject to applicable law and the platform's Privacy Policy, users may contact ShopProfile regarding questions or requests concerning their personal information.",
            },
            {
                question: "Is my payment information stored by ShopProfile?",
                answer:
                    "Payment information may be processed through third-party payment providers depending on the payment method used. ShopProfile should only state that payment data is stored by ShopProfile if that is actually how the payment system has been implemented.",
            },
        ],
    },

    {
        category: "Safety, Compliance & Legal Use",
        icon: ShieldCheck,
        questions: [
            {
                question: "Does ShopProfile verify every business before publication?",
                answer:
                    "A digital profile or listing should not automatically be treated as a government-certified, licensed or independently verified business unless ShopProfile specifically states that verification has occurred. Users should independently verify licences, registrations, identity and other credentials where required.",
            },
            {
                question: "Are users responsible for complying with Indian laws?",
                answer:
                    "Yes. Businesses and users are responsible for complying with laws applicable to their activities, including requirements relating to consumer protection, taxation, licences, product or service regulations, intellectual property, privacy and advertising, where applicable.",
            },
            {
                question: "Can ShopProfile be used for illegal activities?",
                answer:
                    "No. ShopProfile must not be used to facilitate unlawful activities, fraud, impersonation, harassment, prohibited goods or services, infringement of intellectual-property rights, misleading advertisements or other activities prohibited by law or the platform's Terms & Conditions.",
            },
            {
                question: "What happens if ShopProfile receives a lawful complaint or government notice?",
                answer:
                    "ShopProfile may review the relevant content or account and take action as required by applicable law, valid legal process or its platform policies. Depending on the circumstances, this may include restricting, removing or disabling access to content or an account.",
            },
        ],
    },

    {
        category: "Complaints & Support",
        icon: AlertTriangle,
        questions: [
            {
                question: "How can I report a problem with a profile or listing?",
                answer:
                    "Contact ShopProfile support with the profile or listing URL, relevant screenshots or information and a description of the issue. ShopProfile can review the report and take action where appropriate.",
            },
            {
                question: "How can I contact ShopProfile?",
                answer:
                    "For general support and complaints, contact ShopProfile through the official Contact page or the support email address published on the website.",
            },
            {
                question: "Where can I read the complete legal terms?",
                answer:
                    "The FAQ provides general information only. The complete contractual terms are available in the Terms & Conditions, Privacy Policy and Return & Refund Policy published on ShopProfile.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <HelpCircle className="h-7 w-7" />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Frequently Asked Questions
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                        Find answers about ShopProfile accounts, digital shop profiles,
                        listings, payments, privacy, user responsibilities and platform
                        safety.
                    </p>
                </div>
            </section>

            {/* Important notice */}
            <section className="px-6 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <div className="flex gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                        <div>
                            <h2 className="font-semibold text-amber-900">
                                Important Information
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-amber-800">
                                This FAQ is intended to explain how ShopProfile works and does
                                not replace the Terms & Conditions, Privacy Policy or Return &
                                Refund Policy. Indian laws and regulations may apply depending
                                on the nature of a user&apos;s business, product, service and
                                transaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-6 pb-20">
                <div className="mx-auto max-w-4xl space-y-10">
                    {faqs.map((section) => {
                        const Icon = section.icon;

                        return (
                            <div key={section.category}>
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        {section.category}
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {section.questions.map((item) => (
                                        <details
                                            key={item.question}
                                            className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
                                        >
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-semibold text-slate-900">
                                                <span>{item.question}</span>

                                                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
                                            </summary>

                                            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                                                <p className="text-sm leading-7 text-slate-600">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Legal references */}
            <section className="border-t border-slate-200 bg-white px-6 py-12">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-bold text-slate-900">
                        Applicable Indian Legal Framework
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                        Depending on how ShopProfile operates and what services it offers,
                        relevant legal requirements may include consumer-protection,
                        e-commerce, information-technology and personal-data protection
                        requirements. Users are responsible for complying with laws
                        applicable to their own business activities.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-900">
                                Consumer Protection
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Consumer Protection Act, 2019 and applicable rules.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-900">
                                E-Commerce
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Consumer Protection (E-Commerce) Rules, 2020 and applicable
                                amendments.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-900">
                                Digital & IT
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Applicable information-technology and data-protection
                                requirements.
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 text-xs leading-6 text-slate-500">
                        Legal requirements can vary according to ShopProfile&apos;s actual
                        business model, payment flow, user-generated content, marketplace
                        functionality and the products or services listed by users. This
                        page is general information and is not legal advice. Before
                        launching paid or marketplace features, obtain advice from a
                        qualified lawyer familiar with Indian e-commerce and technology
                        law.
                    </p>
                </div>
            </section>
        </main>
    );
}
