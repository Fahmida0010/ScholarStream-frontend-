import React from "react";
import {
  FaUserGraduate,
  FaClipboardList,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

const steps = [
  {
    title: "Receive Applications",
    icon: <FaClipboardList size={30} className="text-primary" />,
    description: "All student applications are collected and listed.",
  },
  {
    title: "Review Eligibility",
    icon: <FaCheckCircle size={30} className="text-success" />,
    description: "Check qualifications, grades, and prerequisites.",
  },
  {
    title: "Assess Achievements",
    icon: <FaStar size={30} className="text-warning" />,
    description: "Prioritize students with research, awards, or projects.",
  },
  {
    title: "Interview & Feedback",
    icon: <FaUserGraduate size={30} className="text-secondary" />,
    description: "Conduct interviews and record professor feedback.",
  },
  {
    title: "Final Selection",
    icon: <FaCheckCircle size={30} className="text-error" />,
    description: "Select top candidates based on combined scores.",
  },
];

const ApplicationSelect = () => {
  return (
    <section className="py-16 bg-base-200 text-base-content transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight">
          Application Selection Process
        </h2>

        {/* DaisyUI Steps */}
        <ul className="steps steps-vertical lg:steps-horizontal w-full text-center items-center">
          {steps.map((step, index) => (
            <li
              key={index}
              data-content={index + 1}
              className="step step-primary justify-items-center"
            >
              <div className="flex flex-col items-center mt-4 px-2 text-center w-full">
                <div className="p-4 rounded-2xl bg-base-100 shadow-xl mb-4 ring-1 ring-base-300/50">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-center">{step.title}</h3>

                <p className="text-sm opacity-70 max-w-[200px] mt-2 mx-auto">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ApplicationSelect;