import React, { useState } from "react";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";

const HrProgress = () => {
  const axioesInstance = useAxios();
  const [name,setName]=useState('')

  const { data: works = [], isLoading } = useQuery({
    queryKey: ["progress", name ],
    queryFn: async () => {
      const res = await axioesInstance.get(`/progress?name=${name}`);
      return res;
    },
  });
console.log(works)
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Employee Work Progress</h1>

      <div className="flex gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={setName}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">All Employees</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          {/* You can fetch employee names dynamically */}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={''}
          onChange={(e) => setMonth(e.target.value)}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee</th>
            <th className="border px-4 py-2">Task</th>
            <th className="border px-4 py-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work._id}>
              <td className="border px-4 py-2">{work.employeeEmail}</td>
              <td className="border px-4 py-2">{work.task}</td>
              <td className="border px-4 py-2 w-1/3">
                {/* <ProgressBar progress={work.progress} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HrProgress;
