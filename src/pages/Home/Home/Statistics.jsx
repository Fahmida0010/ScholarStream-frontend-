import React, { useEffect, useState } from "react";
import { FaUsers, FaGraduationCap, FaStar, FaClipboardList } from "react-icons/fa";

const Statistics = () => {
  const [stats, setStats] = useState({
    users: 0,
    scholarships: 0,
    reviews: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/statistics`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  const data = [
    {
      name: "Users",
      count: stats.users,
      color: "bg-blue-500",
      icon: <FaUsers size={36} className="text-white" />,
      iconColor: "text-blue-200",
    },
    {
      name: "Scholarships",
      count: stats.scholarships,
      color: "bg-yellow-500",
      icon: <FaGraduationCap size={36} className="text-white" />,
      iconColor: "text-yellow-200",
    },
    {
      name: "Reviews",
      count: stats.reviews,
      color: "bg-green-500",
      icon: <FaStar size={36} className="text-white" />,
      iconColor: "text-green-200",
    },
    {
      name: "Applications",
      count: stats.applications,
      color: "bg-purple-500",
      icon: <FaClipboardList size={36} className="text-white" />,
      iconColor: "text-purple-200",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl shadow-md text-white flex flex-col items-center justify-center ${item.color} hover:scale-105 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`mb-3 ${item.iconColor}`}>
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {item.count}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Statistics;