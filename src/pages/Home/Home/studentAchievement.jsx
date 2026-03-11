import React from 'react';
import { FaMicroscope, FaRocket, FaBriefcase, FaLightbulb, FaQuoteLeft } from "react-icons/fa6";

const achievements = [
  {
    id: 1,
    studentName: "Dr. Fahim Ahmed",
    university: "University of Tokyo",
    currentPosition: "Senior Robotics Researcher at Toyota AI",
    impact: "Invented a low-cost autonomous navigation system for surgical robots during her PhD research, reducing surgery risks by 30%.",
    image: "https://i.pravatar.cc/150?u=fahmida"
  },
  {
    id: 2,
    studentName: "Shahadat Islam",
    university: "National University of Singapore",
    currentPosition: "Lead AI Engineer at Google DeepMind",
    impact: "Developed an AI-driven energy-saving algorithm for smart cities that is now being used across South East Asia to reduce carbon footprint.",
    image: "https://i.pravatar.cc/150?u=arif"
  },
  {
    id: 3,
    studentName: "Sadiya Rahman",
    university: "Technical University of Munich",
    currentPosition: "Founder of GreenTech Solutions",
    impact: "Patented a biodegradable solar cell technology after her Master's graduation, securing over $5M in global green energy grants.",
    image: "https://i.pravatar.cc/150?u=sadiya"
  }
];

const StudentAchievement = () => {
  return (
    <div className="bg-base-200 min-h-screen py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight">
            Beyond the <span className="text-primary">Scholarship</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto italic">
            "We don't just fund education; we empower innovators who are changing the world from their research labs and corner offices."
          </p>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => (
            <div 
              key={item.id} 
              className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <div className="avatar mb-6">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={item.image} alt={item.studentName} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-base-content mb-1">
                  {item.studentName}
                </h3>
                
                {/* Current Position Badge */}
                <div className="flex items-center gap-2 text-primary text-xs font-bold mb-4 uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                  <FaBriefcase />
                  {item.currentPosition}
                </div>

                <div className="divider opacity-20"></div>

                <div className="flex flex-col items-center gap-3">
                   {/* <FaLightbul className="text-warning animate-pulse" size={24} /> */}
                   <p className="text-base-content/80 leading-relaxed text-sm font-medium">
                    <span className="text-secondary font-bold underline decoration-dotted">Major Impact:</span> {item.impact}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section (নিচে রাখা হলো) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-base-100 p-8 rounded-2xl text-center border border-base-300 shadow-sm group hover:border-primary transition-colors">
             <div className="text-4xl font-black text-primary mb-2">50+</div>
             <div className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Patents Filed</div>
          </div>
          <div className="bg-base-100 p-8 rounded-2xl text-center border border-base-300 shadow-sm group hover:border-secondary transition-colors">
             <div className="text-4xl font-black text-secondary mb-2">120+</div>
             <div className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Fortune 500 Alums</div>
          </div>
          <div className="bg-base-100 p-8 rounded-2xl text-center border border-base-300 shadow-sm group hover:border-accent transition-colors">
             <div className="text-4xl font-black text-accent mb-2">15+</div>
             <div className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Tech Startups</div>
          </div>
          <div className="bg-base-100 p-8 rounded-2xl text-center border border-base-300 shadow-sm group hover:border-info transition-colors">
             <div className="text-4xl font-black text-info mb-2">$10M+</div>
             <div className="text-xs font-bold text-base-content/50 uppercase tracking-widest">Research Funding</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentAchievement;