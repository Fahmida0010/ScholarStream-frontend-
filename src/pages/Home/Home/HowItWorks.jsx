import React from "react";
import { FaSearch, FaFileAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={32} />,
    title: "Browse Scholarships",
    description: "Explore thousands of global scholarships based on your academic background, country, and preferences.",
    // daisyUI 5 utility: dynamic background with opacity
    colorClass: "bg-primary/10 text-primary",
  },
  {
    icon: <FaFileAlt size={32} />,
    title: "Apply Online",
    description: "Submit your application easily through our secure online platform with all required documents.",
    colorClass: "bg-warning/10 text-warning",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "Track Application",
    description: "Monitor your application status in real-time and receive notifications for updates.",
    colorClass: "bg-success/10 text-success",
  },
  {
    icon: <FaCheckCircle size={32} />,
    title: "Get Scholarship",
    description: "If selected, receive confirmation and prepare for your academic journey abroad.",
    colorClass: "bg-secondary/10 text-secondary",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-base-200 py-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            How It Works
          </h2>
          <div className="divider divider-primary w-24 mx-auto"></div>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto text-lg">
            ScholarStream makes it simple to discover, apply, and track scholarships — 
            all in one secure platform.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-base-300/50"
            >
              <div className="card-body items-center text-center">
                {/* Icon Container */}
                <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-4 ${step.colorClass}`}>
                  {step.icon}
                </div>

                <h3 className="card-title text-xl font-bold mb-2">
                  {step.title}
                </h3>

                <p className="text-base-content/60 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Step Indicator (v5 Badge) */}
                <div className="card-actions mt-4">
                   <div className="badge badge-outline opacity-30">Step {index + 1}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;