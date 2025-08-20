import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image */}
        <div>
          <img
            src="https://img.freepik.com/free-vector/office-concept-illustration_114360-1247.jpg"
            alt="About Employee Management"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-gray-600 mb-4">
            Our Employee Management System is designed to simplify HR tasks,
            payroll, attendance, and performance tracking in one seamless
            platform. We help companies stay organized and focus on what matters
            most — growing their business.
          </p>
          <p className="text-gray-600 mb-6">
            With an intuitive dashboard and real-time insights, our platform
            ensures employees and managers collaborate efficiently. Whether you
            are a small startup or a large enterprise, we provide tools that
            scale with your team.
          </p>

          {/* Values / Mission */}
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="mr-2 text-blue-600">✅</span> Streamlined HR Management
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-600">✅</span> Automated Payroll & Attendance
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-600">✅</span> Real-Time Performance Insights
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
