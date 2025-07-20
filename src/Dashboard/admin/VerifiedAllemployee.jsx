import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";

// const fetchUsers = async () => {
//   const res = await fetch('/api/users/verified');
//   return res.json();
// };

const VerifiedAllemployee = () => {
  const queryClient = useQueryClient();
  const axioesInstance = useAxios();
  const { data: users = [] } = useQuery({
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
      await axioesInstance(`/user/salary/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newSalary }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["verifiedUsers"]),
  });
 
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Verified Employees & HRs</h2>
      <table className="w-full border">
        <thead>
          <tr>
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
                  defaultValue={user.salary}
                  min={user.salary + 1}
                  onBlur={(e) => {
                    const enteredSalary = parseInt(e.target.value);
                    if (enteredSalary > user.salary) {
                      updateSalaryMutation.mutate({
                        id: user._id,
                        newSalary: enteredSalary,
                      });
                    }
                  }}
                  className="border p-1 rounded w-24 cursor-pointer bg-blue-200"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifiedAllemployee;
