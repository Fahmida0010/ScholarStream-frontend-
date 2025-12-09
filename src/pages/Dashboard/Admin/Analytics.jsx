import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const Analytics = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/analytics").then(res => {
      setStats(res.data);
      setChartData(res.data.chartData);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Platform Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5 mb-10">
        <div className="p-5 bg-yellow-200 shadow rounded">
          <h2 className="text-xl text-green-500 font-bold">Total Users</h2>
          <p className="text-3xl">{stats.totalUsers}</p>
        </div>

        <div className="p-5 bg-indigo-200 shadow rounded">
          <h2 className="text-xl text-green-500 font-bold">Total Scholarships</h2>
          <p className="text-3xl">{stats.totalScholarships}</p>
        </div>

        <div className="p-5 bg-red-200 shadow rounded">
          <h2 className="text-xl text-green-500 font-bold">Total Fees Collected</h2>
          <p className="text-3xl">${stats.totalFees}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-pink-200 p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Applications Per University</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="university" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
