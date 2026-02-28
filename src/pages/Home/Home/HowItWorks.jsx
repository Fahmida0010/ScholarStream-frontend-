import React from "react";
import { FaSearch, FaFileAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={40} />,
      title: "Browse Scholarships",
      description:
        "Explore thousands of global scholarships based on your academic background, country, and preferences.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaFileAlt size={40} />,
      title: "Apply Online",
      description:
        "Submit your application easily through our secure online platform with all required documents.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Track Application",
      description:
        "Monitor your application status in real-time and receive notifications for updates.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaCheckCircle size={40} />,
      title: "Get Scholarship",
      description:
        "If selected, receive confirmation and prepare for your academic journey abroad.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            ScholarStream makes it simple to discover, apply, and track scholarships — 
            all in one secure platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
            >
              <div
                className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-5 ${step.color}`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;