import { BarChart3, ClipboardCheck, DollarSignIcon, UserPlus } from "lucide-react";
import React from "react";
 

// Steps for how it works
const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-blue-600" />,
    title: "Add Employees",
    description:
      "Easily onboard employees by adding their profiles, roles, and contact details.",
  },
  {
    icon: <ClipboardCheck className="w-10 h-10 text-blue-600" />,
    title: "Track Attendance",
    description:
      "Monitor employee attendance, leave requests, and approvals in real time.",
  },
  {
    icon: <DollarSignIcon className="w-10 h-10 text-blue-600" />,
    title: "Manage Payroll",
    description:
      "Automate salary processing with error-free calculations and timely payments.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
    title: "Get Insights",
    description:
      "Access performance reports and analytics to make better HR decisions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Our Employee Management System makes HR tasks simple and effective in just a few steps.
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
