import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../Hook/useAxios";
import Payment from "./payment/Payment";
import Paymodal from "./payment/Paymodal";
import { Link } from "react-router";

const EmployeeList = () => {
  const axioesInstance = useAxios();
  const queryClient = useQueryClient();
 

  // Fetch employees
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["allemployee"],
    queryFn: async () => {
      const res = await axioesInstance.get("/allemployee");
      return res.data;
    },
  });

  // Toggle verification status
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axioesInstance.patch(`/verifiyed/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allemployee"] });
    },
  });

  const handlePay =  (employee) => {
    if (!employee.isVerified) return;
    
 

    Swal.fire({
      title: `Pay ${employee.name}`,
      html: `
        <input type="month" id="month" class="swal2-input" max=12 min= 1  required />
        <input type="number" id="year" class="swal2-input" min=1 placeholder="Year (e.g. 2025)" required/>
        <input type="number" id="salary" class="swal2-input"  value="${employee.salary}" readonly />
      `,
      preConfirm: () => {
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        
        
        return { id: employee._id, salary: employee.salary, month,year };
      },

      showCancelButton: true,
      confirmButtonText: 'Send Request',
    }).then((result) => {
      if (result.isConfirmed) {
        const { id, salary, month, year } = result.value;
        const paymetRequest = {
          id,salary,month,year,email:employee.email,name:employee.name,
        }
        axioesInstance.post('/payroll',paymetRequest)
       .then(res=>{
         console.log(res.data)
        if(res.data.insertedId){

        }
        
      })
      Swal.fire('Requested!', 'Payment request sent.', 'success',);
      
        // console.log('Payment request:', { id, salary, month, year });

      }
    });
  
  };
  

  if (isLoading) return <p>Loading employees...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-4xl font-bold mb-10 text-center pb-5 border-dotted border-b-4 border-blue-500 w-5/12 mx-auto ">Employee List</h1>
      <table className="min-w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-sm">Name</th>
            <th className="p-2 border text-sm">Email</th>
            <th className="p-2 border text-sm">Verified</th>
            <th className="p-2 border text-sm">Bank Account</th>
            <th className="p-2 border text-sm">Salary</th>
            <th className="p-2 border text-sm">Pay</th>
            <th className="p-2 border text-sm">Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-gray-50">
              <td className="p-2 border text-sm">{emp.name}</td>
              <td className="p-2 border text-sm">{emp.email}</td>
              <td className="p-2 border text-sm text-center">
                <button
                  onClick={() => verifyMutation.mutate(emp._id)}
                  className={`text-xl cursor-pointer ${
                    emp?.isVarified ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {emp?.isVerified ? "✅" : "❌"}
                </button>
              </td>
              <td className="p-2 border text-sm">{emp.bank_account || "-"}</td>
              <td className="p-2 border text-sm">{emp.salary}</td>
              <td className="p-2 border text-sm text-center">
                <button
                  onClick={() => handlePay(emp)}
                  disabled={!emp.isVerified}
                  className={`px-3 py-1 rounded text-white cursor-pointer ${
                    emp.isVerified
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Pay
                </button>
                
             
              </td>
              <td className="p-2 border text-sm text-center">
                <Link to={`/dashboard/employeedetails/${emp._id}`} className="text-blue-600 hover:underline cursor-pointer">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
