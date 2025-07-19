import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../Hook/useAxios';
import useAuth from '../../Hook/useAuth';
const PaymentHistory = () => {
  const [page, setPage] = useState(1);
   const {user}=useAuth()
   console.log(user.email)
   const axioesInstance = useAxios()
  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentHistory', user.email, page],
    queryFn: async()=> {
        const res = await axioesInstance.get(`/paymentHistory?.email=user.email`)
        return res.data;
    }
    
  });
  console.log(data)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      <table className="w-full border text-left">
        <thead>
          <tr>
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
              <td className="border px-2 py-1">${payment.amount}</td>
              <td className="border px-2 py-1">{payment.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>

        <p>Page {page} of {data.totalPages}</p>

        <button
          onClick={() => setPage((old) => (old < data.totalPages ? old + 1 : old))}
          disabled={page >= data.totalPages}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};
;

export default PaymentHistory;