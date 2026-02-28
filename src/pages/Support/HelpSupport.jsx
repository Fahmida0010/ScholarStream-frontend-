import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  EnvelopeIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields!", {
        duration: 4000,
        style: { borderRadius: "10px", background: "#fef2f2", color: "#991b1b" },
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call (replace with real fetch/axios later)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast.success("Message sent successfully!", {
      icon: "🎉",
      duration: 5000,
      style: {
        borderRadius: "12px",
        background: "#ecfdf5",
        color: "#065f46",
        border: "1px solid #6ee7b7",
      },
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" richColors />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Help & Support Center
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to make your scholarship journey smooth and stress-free.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Left - FAQ & Contact Info */}
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    How do I apply for a scholarship?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Browse scholarships → filter by your criteria → click Apply Now → fill details
                    → upload documents → submit. Instant confirmation email sent!
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    How to track my application?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Login → Dashboard → My Applications tab. Real-time status + email updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href="mailto:support@scholarstream.com"
                className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <EnvelopeIcon className="w-10 h-10 text-indigo-600 mb-3" />
                <h4 className="font-semibold text-gray-800">Email Support</h4>
                <p className="text-indigo-600 font-medium">support@scholarstream.com</p>
              </a>

              <a
                href="tel:+8801234567890"
                className="flex flex-col items-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <PhoneIcon className="w-10 h-10 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-gray-800">Call Us</h4>
                <p className="text-emerald-600 font-medium">+880 1234 567890</p>
              </a>
            </div>
          </div>

          {/* Right - Message Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full flex flex-col">
              <div className="p-8 md:p-10 flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <PaperAirplaneIcon className="w-7 h-7 text-indigo-600" />
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Our team usually responds within 4–12 hours during working days.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="Fahmida Akter"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                      placeholder="Write your question or issue here..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 text-white font-medium rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed ${
                      isSubmitting ? "animate-pulse" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <PaperAirplaneIcon className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="bg-indigo-50 px-8 py-4 text-center text-sm text-indigo-700 border-t border-indigo-100">
                We value your feedback — thank you for reaching out!
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-12 text-lg flex items-center justify-center gap-2">
          <ArrowPathIcon className="w-6 h-6 text-indigo-500 animate-spin-slow" />
          Always improving to serve you better
        </p>
      </div>
    </section>
  );
};

export default HelpSupport;