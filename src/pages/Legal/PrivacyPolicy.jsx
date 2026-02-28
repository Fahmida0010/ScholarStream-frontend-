import React from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  UserIcon,
  DocumentTextIcon,
  ShareIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
// npm install @heroicons/react   (if not already installed)

const PrivacyPolicy = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
            <ShieldCheckIcon className="w-8 h-8" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Privacy Policy
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            At ScholarStream, protecting your personal information is our top priority.
          </p>

          <p className="text-gray-500 text-sm">
            Last updated: February 28, 2026
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-14 prose prose-indigo max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-10">
              This Privacy Policy explains how ScholarStream collects, uses, discloses, 
              stores, and protects your personal information when you use our website, 
              mobile application, or services (collectively, the "Services"). 
              By using ScholarStream, you agree to the practices described in this policy.
            </p>

            {/* 1. Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <UserIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  1. Information We Collect
                </h2>
              </div>

              <p className="text-gray-700 mb-6">
                We collect information that helps us provide, improve, and personalize 
                our scholarship services. This includes:
              </p>

              <ul className="space-y-4 text-gray-700 list-disc pl-6">
                <li>
                  <strong>Personal Information</strong> you provide directly — full name, 
                  email address, phone number, date of birth, nationality, address.
                </li>
                <li>
                  <strong>Academic & Application Data</strong> — educational background, 
                  transcripts, essays, recommendation letters, CV/resume, test scores, 
                  financial information (for need-based scholarships).
                </li>
                <li>
                  <strong>Technical & Usage Data</strong> — IP address, browser type, 
                  device information, pages visited, time spent, referring URLs.
                </li>
                <li>
                  <strong>Cookies & Similar Technologies</strong> — We use cookies 
                  and similar tools for analytics, personalization, and essential 
                  functionality (you can manage preferences in your browser).
                </li>
              </ul>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <ArrowPathIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  2. How We Use Your Information
                </h2>
              </div>

              <p className="text-gray-700 mb-6">
                We use your information only for legitimate purposes related to our scholarship services:
              </p>

              <ul className="space-y-4 text-gray-700 list-disc pl-6">
                <li>Process, review, and manage scholarship applications</li>
                <li>Communicate with you (application status, interview invites, award notifications)</li>
                <li>Verify eligibility and authenticity of submitted documents</li>
                <li>Improve our platform, services, and user experience</li>
                <li>Prevent fraud, abuse, and ensure platform security</li>
                <li>Comply with legal obligations and respond to lawful requests</li>
              </ul>
            </div>

            {/* 3. Sharing Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <ShareIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  3. Sharing Your Information
                </h2>
              </div>

              <p className="text-gray-700 mb-6">
                We do <strong>not</strong> sell your personal information. We may share it only in these limited cases:
              </p>

              <ul className="space-y-4 text-gray-700 list-disc pl-6">
                <li>With scholarship providers / selection committees (only necessary data for evaluation)</li>
                <li>With service providers (cloud storage, email delivery, analytics — all under strict contracts)</li>
                <li>For legal reasons (court orders, fraud prevention, protecting rights/safety)</li>
                <li>In case of merger, acquisition, or asset sale (with notice where required)</li>
              </ul>
            </div>

            {/* 4. Data Security */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <LockClosedIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  4. Data Security
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures including encryption (TLS/SSL), 
                access controls, regular security audits, and secure data storage. 
                However, no method of transmission over the internet or electronic storage 
                is 100% secure — we cannot guarantee absolute security.
              </p>
            </div>

            {/* 5. Data Retention */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <DocumentTextIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  5. Data Retention
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed">
                We keep your personal information only as long as necessary to fulfill 
                the purposes outlined in this policy, or as required by law. 
                Application data is typically retained for 5–7 years after the scholarship cycle ends.
              </p>
            </div>

            {/* 6. Your Rights */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                  <TrashIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  6. Your Rights & Choices
                </h2>
              </div>

              <p className="text-gray-700 mb-6">
                Depending on your location, you may have rights including:
              </p>

              <ul className="space-y-4 text-gray-700 list-disc pl-6">
                <li>Access, correct, or delete your personal data</li>
                <li>Withdraw consent (where processing is consent-based)</li>
                <li>Object to or restrict certain processing</li>
                <li>Request data portability</li>
              </ul>

              <p className="text-gray-700 mt-6">
                To exercise these rights, contact us at <strong>privacy@scholarstream.com</strong>.
              </p>
            </div>

            {/* 7. Changes to Policy */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                7. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this policy from time to time. Changes will be posted here 
                with the updated "Last updated" date. We encourage you to review this page 
                periodically. Significant changes will be notified via email or prominent 
                notice on the platform.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-700 text-lg">
                Questions about this Privacy Policy? Reach out to us at:
              </p>
              <a
                href="mailto:privacy@scholarstream.com"
                className="mt-3 inline-block text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition"
              >
                privacy@scholarstream.com
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-10 text-lg">
          Thank you for trusting ScholarStream with your information ♥
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;