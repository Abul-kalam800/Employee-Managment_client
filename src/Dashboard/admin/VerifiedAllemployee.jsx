import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { IoGrid } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";
import LoadingSpnieer from "../../Pages/spinnerPage/LoadingSpnieer";

// const fetchUsers = async () => {
//   const res = await fetch('/api/users/verified');
//   return res.json();
// };

const VerifiedAllemployee = () => {
  const [isTableView, setIsTableView] = useState(true);
  const [salary, setSalary] = useState({});
  const queryClient = useQueryClient();
  const axioesInstance = useAxios();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["verifiedUsers"],
    queryFn: async () => {
      const res = await axioesInstance.get("/verifiedemployee");
      return res.data;
    },
  });

  const fireUserMutation = useMutation({
    mutationFn: async (id) => {
      await axioesInstance(`/user/fire/${id}`, { method: "PATCH" });
    },
    onSuccess: () => queryClient.invalidateQueries(["verifiedUsers"]),
  });

  const makeHRMutation = useMutation({
    mutationFn: async (id) => {
      await axioesInstance(`/user/make-hr/${id}`, { method: "PATCH" });
    },
    onSuccess: () => queryClient.invalidateQueries(["verifiedUsers"]),
  });

  const updateSalaryMutation = useMutation({
    mutationFn: async ({ id, newSalary }) => {
      await axioesInstance.patch(
        `/user/salary/${id}`,
        { newSalary },
        { method: "PATCH" }
      );
    },
    onSuccess: () => queryClient.invalidateQueries(["verifiedUsers"]),
  });

  // toggol btn
  const handleToggleView = () => setIsTableView(!isTableView);

  if (isLoading) return <LoadingSpnieer></LoadingSpnieer>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center pb-5 border-dotted border-b-4 border-blue-500 md:w-6/12 mx-auto p-2">
          All Verified Employees & HR
        </h2>
        <p className="text-center mx-auto">
          Here you can fire any employee and hr also can adjuest salry and make hr from employee as you
          want 
        </p>
      </div>
      <button
        onClick={handleToggleView}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        {isTableView ? <IoGrid /> : <FaTableList />}
      </button>

      {isTableView ? (
        <>
          <div className="p-4 max-w-6xl mx-auto overflow-x-auto mt-5">
            <table className="w-full border">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Salary</th>
                  <th className="border p-2">Make HR</th>
                  <th className="border p-2">Fire</th>
                  <th className="border p-2">Adjust Salary</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2 capitalize">{user.role}</td>
                    <td className="border p-2">${user.salary}</td>

                    {/* Make HR */}
                    <td className="border p-2 text-center">
                      {user.role == "Employee" ? (
                        <button
                          onClick={() => makeHRMutation.mutate(user._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Make HR
                        </button>
                      ) : (
                        <button className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
                          {" "}
                          HR
                        </button>
                      )}
                    </td>

                    {/* Fire User */}
                    <td className="border p-2 text-center cursor-pointer">
                      {user.status === "fired" ? (
                        <span className="text-red-500 font-bold">Fired</span>
                      ) : (
                        <button
                          onClick={() => {
                            if (confirm(`Fire ${user.name}?`)) {
                              fireUserMutation.mutate(user._id);
                            }
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                        >
                          Fire
                        </button>
                      )}
                    </td>

                    {/* Adjust Salary */}
                    <td className="border p-2">
                      <input
                        type="number"
                        className="border p-1 rounded w-24"
                        defaultValue={user.salary}
                        onChange={(e) => setSalary(parseInt(e.target.value))}
                        onBlur={() => {
                          if (salary > user.salary) {
                            updateSalaryMutation.mutate({
                              id: user._id,
                              newSalary: salary,
                            });
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className=" max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user._id} className="bg-indigo-200 p-5 rounded-2xl ">
                <p className="">
                  <span className="font-bold ">Name :</span>
                  {user.name}
                </p>
                <p className=" capitalize">
                  <span className="font-bold ">Role :</span>
                  {user.role}
                </p>
                <p className="">
                  {" "}
                  <span className="font-bold ">Salary:</span>${user.salary}
                </p>

                {/* Make HR */}
                <p className="flex  justify-between  text-center py-5">
                  <span className="font-bold">Make HR</span>
                  {user.role == "Employee" ? (
                    <button
                      onClick={() => makeHRMutation.mutate(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                    >
                      Make HR
                    </button>
                  ) : (
                    <button className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer flex">
                      {" "}
                      HR
                    </button>
                  )}
                </p>

                {/* Fire User */}
                <p className=" flex justify-between text-center cursor-pointer mb-3">
                  <span className="font-bold ">Fire</span>
                  {user.status === "fired" ? (
                    <span className="text-red-500 font-bold">Fired</span>
                  ) : (
                    <button
                      onClick={() => {
                        if (confirm(`Fire ${user.name}?`)) {
                          fireUserMutation.mutate(user._id);
                        }
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer flex "
                    >
                      Fire
                    </button>
                  )}
                </p>

                {/* Adjust Salary */}
                <p className=" flex  justify-between p-2">
                  <span className="font-bold">Salary Adjuest</span>
                  <input
                    type="number"
                    className="border p-1 rounded w-24"
                    defaultValue={user.salary}
                    min={user.salary + 1}
                    onChange={(e) => setSalary(parseInt(e.target.value))}
                    onBlur={() => {
                      if (salary > user.salary) {
                        updateSalaryMutation.mutate({
                          id: user._id,
                          newSalary: salary,
                        });
                      }
                    }}
                  />
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VerifiedAllemployee;
