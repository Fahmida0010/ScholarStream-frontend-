import React from "react";
import { ShieldCheck, UserCheck, ClipboardList, 
    AlertCircle, FileText } from "lucide-react";

const TermsConditions = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className=" py-12 px-8 text-center text-green-500">
          <FileText className="mx-auto mb-4 w-16 h-16 opacity-80" />
          <h1 className="text-4xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="mt-2 text-blue-400">Please read our terms carefully before using ScholarStream.</p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          
          {/* Introduction */}
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to <span className="font-bold text-blue-600">ScholarStream</span>. By accessing or using our platform, you acknowledge that you have read, understood, and agreed to be bound by the following terms and conditions. These terms ensure a fair and secure environment for all students and providers.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Grid Layout for Terms */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* User Responsibilities */}
            <div className="flex gap-4">
              <div className="bg-blue-50 p-3 rounded-lg h-fit">
                <UserCheck className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">User Responsibilities</h3>
                <p className="text-gray-600 leading-relaxed">
                  Users are responsible for maintaining the confidentiality of their accounts. You must provide <strong>accurate, current, and complete</strong> information during the application process. Any fraudulent activity will lead to immediate disqualification.
                </p>
              </div>
            </div>

            {/* Application Review */}
            <div className="flex gap-4">
              <div className="bg-green-50 p-3 rounded-lg h-fit">
                <ClipboardList className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Application Review</h3>
                <p className="text-gray-600 leading-relaxed">
                  ScholarStream acts as a bridge between students and providers. We do <strong>not guarantee</strong> scholarship approval. All final decisions are made solely by the respective scholarship committees or providers.
                </p>
              </div>
            </div>

            {/* Privacy & Safety */}
            <div className="flex gap-4">
              <div className="bg-purple-50 p-3 rounded-lg h-fit">
                <ShieldCheck className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Privacy & Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data privacy is our priority. By using this service, you consent to the collection of data necessary for scholarship processing as outlined in our Privacy Policy.
                </p>
              </div>
            </div>

            {/* Account Suspension */}
            <div className="flex gap-4">
              <div className="bg-red-50 p-3 rounded-lg h-fit">
                <AlertCircle className="text-red-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Account Suspension</h3>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate accounts that violate our community guidelines, engage in spamming, or attempt to breach our security protocols without prior notice.
                </p>
              </div>
            </div>

          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Last updated: October 2023. If you have any questions, contact us at 
              <span className="text-blue-600 font-medium"> support@scholarstream.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;