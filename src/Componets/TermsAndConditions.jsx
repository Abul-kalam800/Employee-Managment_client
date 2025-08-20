import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms & Conditions
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Please read our terms and conditions carefully before using our Employee Management System.
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700">
          <p>
            By accessing and using this platform, you agree to abide by the
            following terms and conditions. If you do not agree with any part of
            these terms, you may not use the system.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">
            1. Use of the Platform
          </h3>
          <p>
            Our system is designed for businesses to manage employees,
            attendance, payroll, and performance. You agree not to misuse the
            platform for unauthorized purposes.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">
            2. Data Privacy
          </h3>
          <p>
            We respect your privacy. All employee and company data will be
            handled securely and will not be shared with third parties without
            consent, except as required by law.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">
            3. Payment & Subscription
          </h3>
          <p>
            Subscriptions are billed on a monthly or yearly basis depending on
            the chosen plan. Failure to make payments may result in account
            suspension.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">
            4. Limitation of Liability
          </h3>
          <p>
            We are not responsible for any direct or indirect damages caused by
            misuse of the platform. Users are responsible for maintaining the
            security of their login credentials.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6">
            5. Changes to Terms
          </h3>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the system after changes implies acceptance of the new terms.
          </p>
        </div>

        {/* Accept Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            I Agree
          </button>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
