import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 px-6 lg:px-20 bg-base-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-4xl font-bold mb-5 text-primary">Our Mission</h2>
              <p className="text-lg text-base-content/80 leading-relaxed">
                To simplify the scholarship discovery and application process by centralizing
                verified global opportunities in one secure, student-friendly platform.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
                <span className="text-3xl">🌍</span>
              </div>
              <h2 className="text-4xl font-bold mb-5 text-secondary">Our Vision</h2>
              <p className="text-lg text-base-content/80 leading-relaxed">
                A world where no deserving student misses out on education due to lack of
                information, access, or financial barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6 lg:px-20 bg-base-200">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-base-content">
          Why Thousands Trust ScholarStream
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: "✅", title: "100% Verified Listings", text: "Every scholarship is manually reviewed and updated regularly." },
            { icon: "🔒", title: "Bank-grade Security", text: "Stripe-powered secure payments & data encrypted end-to-end." },
            { icon: "📊", title: "Smart Student Dashboard", text: "Track applications, deadlines, documents — all in one place." },
          ].map((item, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-xl border border-base-300/50 hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body items-center text-center p-10">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-primary">{item.title}</h3>
                <p className="text-base-content/75 text-lg">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="py-20 px-6 lg:px-20 bg-base-100">
        <h2 className="text-4xl font-bold text-center mb-16 text-base-content">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: "✨", color: "primary", title: "Transparency", desc: "Clear eligibility, real deadlines, no hidden fees." },
            { icon: "🤝", color: "secondary", title: "Inclusivity", desc: "Opportunities for students from every background." },
            { icon: "🚀", color: "accent", title: "Empowerment", desc: "Tools and guidance to help you succeed." },
          ].map((v, i) => (
            <div key={i} className="text-center space-y-5">
              <div className={`w-20 h-20 mx-auto rounded-full bg-${v.color}/10 flex items-center justify-center text-4xl shadow-md`}>
                {v.icon}
              </div>
              <h3 className={`text-2xl font-bold text-${v.color}`}>{v.title}</h3>
              <p className="text-base-content/75 text-lg px-4">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR JOURNEY (simple) ================= */}
      <section className="py-20 px-6 lg:px-20 bg-gradient-to-b from-base-200 to-base-100">
        <h2 className="text-4xl font-bold text-center mb-16 text-base-content">
          Our Journey So Far
        </h2>

        <div className="max-w-5xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold shrink-0">
              2024
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-primary/20 flex-1">
              <h3 className="text-2xl font-bold mb-3 text-primary">The Beginning</h3>
              <p className="text-lg text-base-content/80">
                Started with a simple goal: help Bangladeshi students discover international scholarships easily.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-secondary text-white flex items-center justify-center text-3xl font-bold shrink-0">
              2025
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-secondary/20 flex-1">
              <h3 className="text-2xl font-bold mb-3 text-secondary">Growth Phase</h3>
              <p className="text-lg text-base-content/80">
                Expanded to cover 50+ countries, added verified listings, dashboard, and application tracking.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center text-3xl font-bold shrink-0">
              2026
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-accent/20 flex-1">
              <h3 className="text-2xl font-bold mb-3 text-accent">Today</h3>
              <p className="text-lg text-base-content/80">
                Helping thousands of students every month — and we’re just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

     <section className="py-20 px-6 text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-5xl font-bold mb-6">Ready to Find Your Scholarship?</h2>
    <p className="text-2xl mb-10 text-green-500">
      Join thousands of students already using ScholarStream.
    </p>
    <Link to="/all-scholarships" className="btn bg-blue-400 btn-lg text-xl px-12">
      Get Started — It's Free
    </Link>
  </div>
</section>

    </div>
  );
};

export default About;