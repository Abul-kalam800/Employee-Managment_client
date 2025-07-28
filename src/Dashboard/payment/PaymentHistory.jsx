import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import LoadingSpnieer from "../../Pages/spinnerPage/LoadingSpnieer";

const PaymentHistory = () => {
  const { user } = useAuth();
  const email = user?.email;

  
  const axioesInstance = useAxios();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["paymentHistoty", email, page],
    queryFn: async () => {
      const res = await axioesInstance.get(
        `/paymentHistory?email=${email}&&page=${page}`
      );
      return res.data;
    },
  });
 

  if (isLoading) return <LoadingSpnieer></LoadingSpnieer>;

  return (
    <>
    <title>Payment-history</title>
      <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center pb-5 border-dotted border-b-4 border-blue-500 md:w-6/12 mx-auto p-2">
        Payment History
      </h2>
      <p className="text-center mx-auto md:w-8/12 mb-10">
        All successfull payment is here.Your payment is here if your hr are paid
        you can see your all payment history whice monte and how mauch pay your
        hr
      </p>

        <div className="mt-6 px-10 ">
          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border px-2 py-1">Month</th>
                  <th className="border px-2 py-1">Year</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {data.payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="border px-2 py-1">{payment.month}</td>
                    <td className="border px-2 py-1">{payment.year}</td>
                    <td className="border px-2 py-1">${payment.salary}</td>
                    <td className="border px-2 py-1">
                      {payment.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>

            <p>
              Page {page} of {data.totalPages}
            </p>

            <button
              onClick={() =>
                setPage((old) => (old < data.totalPages ? old + 1 : old))
              }
              disabled={page >= data.totalPages}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
     
    </>
  );
};
export default PaymentHistory;
