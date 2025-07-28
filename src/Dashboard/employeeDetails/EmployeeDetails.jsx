
import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxios";
import { useParams } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const EmployeeDetails = () => {
  
  const axioesInstance = useAxios();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [payroll, setPayroll] = useState([]);
 


    useEffect(() => {
    axioesInstance.get(`/employee/${id}`)
      .then(res => {
        setUser(res.data.user);
        setPayroll(res.data.payrollHistory);
      })
      .catch(err => console.error(err));
  }, [id]);
  




   const chartData = payroll.map(entry => ({
    month: `${entry.month} ${entry.year}`,
    salary: entry.salary,
  }));


 return (
    <div className="p-6">
      {user && (
        <div className="mb-10">
          <img
            src={user.photo}
            alt={user.name}
            className="w-28 h-28 rounded-full border mb-4"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.Desiganation}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Salary overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#60a5fa" name="Salary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeDetails;
