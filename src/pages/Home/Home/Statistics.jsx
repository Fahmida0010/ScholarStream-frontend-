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
      color: "bg-blue-500", // Original color kept
      icon: <FaUsers size={36} className="text-white" />,
      iconColor: "text-blue-100",
    },
    {
      name: "Scholarships",
      count: stats.scholarships,
      color: "bg-yellow-500", // Original color kept
      icon: <FaGraduationCap size={36} className="text-white" />,
      iconColor: "text-yellow-100",
    },
    {
      name: "Reviews",
      count: stats.reviews,
      color: "bg-green-500", // Original color kept
      icon: <FaStar size={36} className="text-white" />,
      iconColor: "text-green-100",
    },
    {
      name: "Applications",
      count: stats.applications,
      color: "bg-purple-500", // Original color kept
      icon: <FaClipboardList size={36} className="text-white" />,
      iconColor: "text-purple-100",
    },
  ];

  return (
    /* Changed bg-gray-50 to bg-base-200 for Dark Mode */
    <section className="bg-base-200 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Changed text-gray-800 to text-base-content */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-base-content">
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