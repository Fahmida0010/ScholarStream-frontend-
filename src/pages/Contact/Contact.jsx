import React, { useState } from "react";
import { 
  EnvelopeIcon, 
  UserIcon, 
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";
// npm install @heroicons/react (if not already installed)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccess("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrors({ form: data.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ form: "Server error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header & Contact Info */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
            <EnvelopeIcon className="w-8 h-8" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Have questions about scholarships, applications, or anything else? 
            We're here to help — just drop us a message!
          </p>

          {/* Website & Email Display */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white px-8 py-4 rounded-2xl shadow-md border border-gray-100">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">Official Website</p>
              <a 
                href="https://scholarstream.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                scholarstream.com
              </a>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-200" />

            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">Email Address</p>
              <a 
                href="mailto:support@scholarstream.com"
                className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-2 justify-center sm:justify-start"
              >
                <EnvelopeIcon className="w-5 h-5" />
                support@scholarstream.com
              </a>
            </div>
          </div>
        </div>

        {/* Main Contact Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Messages */}
            {success && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl mb-8">
                <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="font-medium">{success}</p>
              </div>
            )}

            {errors.form && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl mb-8">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
                <p className="font-medium">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm resize-none`}
                  placeholder="How can we help you today? Feel free to ask anything..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 bg-blue-600 text-white font-medium text-lg rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <PaperAirplaneIcon className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="bg-gray-50 px-8 py-5 text-center text-gray-600 border-t border-gray-100">
            We usually respond within 24–48 hours. Thank you for reaching out!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;