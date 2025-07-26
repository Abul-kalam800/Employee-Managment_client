import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../Hook/useAxios";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import LoadingSpnieer from "../Pages/spinnerPage/LoadingSpnieer";
export const queryClient = new QueryClient();

const WorkSheet = () => {
  const [date, setDate] = useState(new Date());
  const [hoursWorked, setHoursWorked] = useState("");
  const [task, setTask] = useState("Sales");
  const axioesInstance = useAxios();
  const { user, loading } = useAuth();
  const [editingWork, setEditingWork] = useState(null);
  const [month, setMonth] = useState("January");

  //   get data
  const {
    data: works = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employee", user?.email], // ✅ Use email as key
    enabled: !!user?.email && !loading, // ✅ Fetch only after user is loaded
    queryFn: async () => {
      const res = await axioesInstance.get(`/employee?email=${user.email}`);
      return res.data;
    },
  });
 
  // add data

  const addWorkMutation = useMutation({
    mutationFn: async (newWork) => {
      return await axioesInstance.post("/employee", newWork);
    },
    onSuccess: (res, variables) => {
      queryClient.setQueryData(["employee", user?.email], (old) => [
        { _id: res.data.insertedId, ...variables },
        ...(old || []),
      ]);
      setHoursWorked("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  // add data handle
  const handleSubmit = () => {
    const newWork = {
      task,
      hoursWorked: parseFloat(hoursWorked),
      date: date.toISOString(),
      employeeEmail: user?.email,
      name: user?.displayName,
      month,
    };
    addWorkMutation.mutate(newWork);
  };
  // handle delet
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axioesInstance.delete(`/emplyee/${id}`);
    },
    onSuccess: (_, id) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the work entry.",
      });
      queryClient.setQueryData(["emplyee", user.email], (old) =>
        old.filter((work) => work._id !== id)
      );
    },
    onError: (_, id) => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Employee work entry has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    },
  });

  // Update Work Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedWork }) => {
      return await axioesInstance.patch(`/emplyee/${id}`, updatedWork);
    },
    onSuccess: () => {
      // ✅ Show SweetAlert on Success
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Employee work entry updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();

      // ✅ Refetch or update your table data
      queryClient.invalidateQueries({ queryKey: ["emplyee"] });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong during update.",
      });
    },
  });

  if (loading || !user) return <LoadingSpnieer></LoadingSpnieer>

  if (isLoading) return <LoadingSpnieer></LoadingSpnieer>
 

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold mb-10 text-center pb-5 border-dotted border-b-4 border-blue-500 md:w-6/12 mx-auto p-2">
        Employee work-sheet
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-green-300 p-5">
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
          <option>Document-managed</option>
          <option>Programming</option>
          <option>Designe</option>
        </select>
        <input
          type="number"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          className="border px-5 py-1 rounded w-30"
          required
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="border px-2 py-1 rounded"
          required
        />
       
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
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

         <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
        >
          {addWorkMutation.isPending ? "Adding..." : "Add / Submit"}
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2 border">Task</th>
              <th className="p-2 border">Hours Worked</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {works?.map?.((work) => (
              <tr key={work._id}>
                <td className="p-2 border">{work.task}</td>
                <td className="p-2 border">{work.hoursWorked}</td>
                <td className="p-2 border">
                  {new Date(work.date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{work.month}</td>
                <td className="p-2 border flex items-center justify-center gap-2">
                  <button
                    onClick={() => setEditingWork(work)}
                    className="text-black bg-green-500 p-2 rounded-full cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(work._id)}
                    className="text-black bg-red-500 p-2 rounded-full cursor-pointer"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit Modal */}
        {editingWork && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded w-80">
              <h2 className="text-xl font-semibold mb-2">Edit Work</h2>
              <select
                value={editingWork.task}
                onChange={(e) =>
                  setEditingWork({ ...editingWork, task: e.target.value })
                }
                className="border px-2 py-1 rounded w-full mb-2"
              >
                <option>Sales</option>
                <option>Support</option>
                <option>Content</option>
                <option>Paper-work</option>
              </select>
              <input
                type="number"
                value={editingWork.hoursWorked}
                onChange={(e) =>
                  setEditingWork({
                    ...editingWork,
                    hoursWorked: e.target.value,
                  })
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <DatePicker
                selected={new Date(editingWork.date)}
                onChange={(date) => setEditingWork({ ...editingWork, date })}
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <div className="flex justify-between">
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      id: editingWork._id,
                      updatedWork: {
                        task: editingWork.task,
                        hoursWorked: parseFloat(editingWork.hoursWorked),
                        date: new Date(editingWork.date).toISOString(),
                      },
                    })
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  {updateMutation.isPending ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setEditingWork(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSheet;
