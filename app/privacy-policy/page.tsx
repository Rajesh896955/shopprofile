export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly to us when you create an account, build your shop profile, upload product details, or communicate with us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use collected information to provide, maintain, and improve our services, facilitate communications between you and your customers, and generate your public digital storefront.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">3. Data Security & Storage</h2>
            <p className="mt-2">
              We implement industry-standard security measures to safeguard your personal data and store credentials securely.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">4. Contact Us</h2>
            <p className="mt-2">
              If you have questions regarding this privacy policy, please contact us at <a href="mailto:support@shopprofile.in" className="text-indigo-600 font-medium hover:underline">support@shopprofile.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
