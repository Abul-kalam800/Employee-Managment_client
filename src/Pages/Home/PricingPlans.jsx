import React from "react";

const plans = [
  {
    name: "Basic",
    price: "$19/mo",
    features: [
      "Employee Data Management",
      "Basic Attendance Tracking",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: [
      "Everything in Basic",
      "Payroll Automation",
      "Leave & Performance Tracking",
      "Priority Support",
    ],
  
  },
  {
    name: "Enterprise",
    price: "$99/mo",
    features: [
      "Everything in Pro",
      "Custom Integrations",
      "Dedicated HR Dashboard",
      "24/7 Premium Support",
    ],
  },
];

const PricingPlans = () => {
  return (
    <section className="py-16 bg-gray-100 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"><span className="text-[#6600CC]"> Pricing</span> Plans</h2>
        <p className="text-gray-600 mb-12">
          Choose the plan that fits your team's needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl shadow-md transition duration-300 
               bg-white text-gray-800 hover:bg-indigo-400 hover:-translate-y-3 hover:transition-transform 
              `}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center">
                   {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 rounded-lg font-semibold transition mt-auto 
                 bg-[#6600CC] text-white hover:bg-[#00CC33] duration-300
                `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
