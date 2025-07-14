import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../Hook/useAxios";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth";

export const queryClient = new QueryClient();
const WorkSheet = () => {
  const [date, setDate] = useState(new Date());
  const [hoursWorked, setHoursWorked] = useState("");
  const [task, setTask] = useState("Sales");
  const axioesInstance = useAxios();
  const { user } = useAuth();

  //   fetch data
  const { data: works = [], isLoading } = useQuery({
    queryKey: ["employee", user.email],
    queryFn: async () => {
      const res = await axioesInstance.get(`/employee?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!user.email,
  });

  // add data

  const addWorkMutation = useMutation({
    mutationFn: async (newWork) => {
      return await axioesInstance.post("/employee", newWork);
    },
    onSuccess: (res, variables) => {
      queryClient.setQueryData(["employeeWork", user.email], (old) => [
        { _id: res.data.insertedId, ...variables },
        ...(old || []),
      ]);
      setHoursWorked("");
    },
  });

  const handleSubmit = () => {
    const newWork = {
      task,
      hoursWorked: parseFloat(hoursWorked),
      date: date.toISOString(),
      employeeEmail: user.email,
    };
    addWorkMutation.mutate(newWork);
  };
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
        </select>
        <input
          type="number"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          className="border px-2 py-1 rounded w-24"
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {addWorkMutation.isPending ? "Adding..." : "Add / Submit"}
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Task</th>
            <th className="p-2 border">Hours Worked</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work._id}>
              <td className="p-2 border">{work.task}</td>
              <td className="p-2 border">{work.hoursWorked}</td>
              <td className="p-2 border">
                {new Date(work.date).toLocaleDateString()}
              </td>
              <td className="p-2 border flex items-center justify-center gap-2">
                <button
                  onClick={() => setEditingWork(work)}
                  className="text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(work._id)}
                  className="text-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheet;
