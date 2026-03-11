import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axiosSecure(`${import.meta.env.VITE_API_URL}/analytics`).then(res => {
      setStats(res.data);
      setChartData(res.data.chartData);
    });
  }, []);

  return (
    <div className="text-base-content transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-5">Platform Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* bg-yellow-200 বদলে ডাইনামিক কার্ড স্টাইল */}
        <div className="p-5 bg-base-100 border border-base-300 shadow-lg rounded-xl">
          <h2 className="text-lg text-amber-500 font-bold">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers || 0}</p>
        </div>

        <div className="p-5 bg-base-100 border border-base-300 shadow-lg rounded-xl">
          <h2 className="text-lg text-indigo-500 font-bold">Total Scholarships</h2>
          <p className="text-3xl font-bold">{stats.totalScholarships || 0}</p>
        </div>

        <div className="p-5 bg-base-100 border border-base-300 shadow-lg rounded-xl">
          <h2 className="text-lg text-emerald-500 font-bold">Total Fees Collected</h2>
          <p className="text-3xl font-bold">${stats.totalFees || 0}</p>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="bg-base-100 border border-base-300 p-6 shadow-lg rounded-xl transition-colors duration-300">
        <h2 className="text-xl font-bold mb-6">Applications Per University</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis 
              dataKey="university" 
              stroke="currentColor" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="currentColor" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--fallback-b1, #1d232a)", 
                borderColor: "var(--fallback-b3, #384150)",
                borderRadius: "8px",
                color: "inherit"
              }}
            />
            <Bar 
              dataKey="applications" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;