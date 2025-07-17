import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hook/useAxios";
import { useParams } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EmployeeDetails = () => {
    const queryClient = useQueryClient();
  const axioesInstance = useAxios();
  const { id } = useParams();
  console.log(id);
  const { data: singleEmployee, isLoading } = useQuery({
    queryKey: ["employeedetails"],
    queryFn: async () => {
      const res = await axioesInstance(`/employeedetails/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    <span>loading............</span>;
  }
  console.log(singleEmployee);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <img
          src={singleEmployee?.photo}
          alt={singleEmployee?.name}
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <h1 className="text-2xl font-bold">{singleEmployee?.name}</h1>
          <p className="text-gray-600">{singleEmployee?.Desiganation}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Salary History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: "Month", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{ value: "Salary", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Bar dataKey="salary" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeDetails;
