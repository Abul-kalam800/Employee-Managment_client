import React from "react";
import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxios from "../../Hook/useAxios";
import axios from "axios";

const Overview=()=>{ 
  const [data, setData] = useState(null);
  const axioesInstance= useAxios();

  useEffect(() => {
        axios.get("http://localhost:5000/overview")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  console.log(data)

  if (!data) return <p className="text-center">Loading...</p>;

  const chartData = [
    { name: "Users", value: data.totalUsers },
    { name: "Employees", value: data.totalEmployees },
    { name: "Payrolls", value: data.totalPayrolls },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      
      {/* Total Users */}
      <div className="shadow-lg rounded-2xl bg-blue-300">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{data.totalUsers}</p>
        </div>
      </div>

      {/* Total Employees */}
      <div className="shadow-lg rounded-2xl bg-blue-300">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-2xl font-bold text-green-600">{data.totalEmployees}</p>
        </div>
      </div>

      {/* Total Payrolls */}
      <div className="shadow-lg rounded-2xl bg-blue-300">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Total Payrolls</h2>
          <p className="text-2xl font-bold text-yellow-600">{data.totalPayrolls}</p>
        </div>
      </div>

      {/* Salary Paid */}
      <div className="shadow-lg rounded-2xl bg-blue-300">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Salary Paid</h2>
          <p className="text-2xl font-bold text-purple-600">
            ${data.totalSalaryPaid.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-green-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Overview Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
export default Overview;
