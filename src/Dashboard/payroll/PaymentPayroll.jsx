import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";

// const fetchPayrolls = async () => {
//   const res = await fetch("/api/payroll");
//   return res.json();
// };

const PaymentPayroll = () => {
  const queryClient = useQueryClient();

  const axioesInstance = useAxios();
  const { data: payrolls = [] } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const res = await axioesInstance.get("/payrolls");
      return res.data;
    },
  });

  const payMutation = useMutation({
    mutationFn: async (id) => {
      await axioesInstance(`/payroll/pay/${id}`, { method: "PATCH" });
    },
    onSuccess: () => queryClient.invalidateQueries(["payrolls"]),
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payroll Payment </h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-blue-400">
            <tr>
              <th className="border px-2 py-1">Employee</th>
              <th className="border px-2 py-1">Salary</th>
              <th className="border px-2 py-1">Month</th>
              <th className="border px-2 py-1">Year</th>
              <th className="border px-2 py-1">Payment Date</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((row) => (
              <tr key={row._id}>
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">${row.salary}</td>
                <td className="border px-2 py-1">{row.month}</td>
                <td className="border px-2 py-1">{row.year}</td>
                <td className="border px-2 py-1">
                  {row.paymentDate
                    ? new Date(row.paymentDate).toLocaleDateString()
                    : "---"}
                </td>
                <td className="border px-2 py-1 text-center">
                  {row.status === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <button
                      onClick={() => payMutation.mutate(row._id)}
                      disabled={payMutation.isLoading}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      {payMutation.isLoading ? "Processing..." : "Pay"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPayroll;
