import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpnieer from "../../Pages/spinnerPage/LoadingSpnieer";

const HrProgress = () => {
  const axioesInstance = useAxios();
  const [selectname, setSelectname] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch work records based on filters
  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["workRecords", selectname, selectedMonth],
    queryFn: async () => {
      const res = await axioesInstance.get("/work-progress", {
        params: {
         name: selectname || undefined, // omit if empty
          month: selectedMonth || undefined,
        },
      });
      return res.data;
    },
  });
  // unique name
  const uniqueNames = [...new Set(workRecords.map((emp) => emp.name))];

  if (isLoading) return <LoadingSpnieer></LoadingSpnieer>
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 bg-blue-400 p-5 md:text-4xl">
        Employee Work Records
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={selectname}
          onChange={(e) => setSelectname(e.target.value)}
        >
          <option value="">All Employees</option>
          {uniqueNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          {/* TODO: Dynamically load employee names */}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Work Records Table */}
      {workRecords.length === 0 ? (
        <p>No work records found.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Work Details</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {workRecords.map((record) => (
              <tr key={record._id}>
                <td className="border p-2">{record.name}</td>
                <td className="border p-2">{record.month}</td>
                <td className="border p-2">{record.task}</td>
                <td className="border p-2">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HrProgress;
