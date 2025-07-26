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
      <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center pb-5 border-dotted border-b-4 border-blue-500 md:w-6/12 mx-auto p-2">
        Employee Work Records
      </h2>
      <p className="text-center mx-auto md:w-8/12 mb-10">Here hr can see all employee work data recorded. who are worked to much who implack to much company hr can justify from hre. also can employee name select and can also month select can see data </p>

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
          className="border p-2 rounded text-xs md:text-lg"
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
       <div className="overflow-x-auto my-4">
         <table className="w-full border text-left">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border p-2 text-xs md:text-lg ">Employee</th>
              <th className="border p-2 text-xs md:text-lg ">Month</th>
              <th className="border p-2 text-xs md:text-lg ">Work Details</th>
              <th className="border p-2 text-xs md:text-lg ">Date</th>
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
       </div>
      )}
    </div>
  );
};

export default HrProgress;
