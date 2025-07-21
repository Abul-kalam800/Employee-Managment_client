import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";


const Paymodal = ({ isModalOpen, setIsModalOpen, emp }) => {
  const { name, salary, email,_id } = emp;

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const stripePromies = loadStripe(import.meta.env.VITE_STRIPE_SK_KEY);

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 bg-blue-400">{name}</h2>
            <p className="mb-2 font-bold">Salary: {salary} USD</p>

            <input
              type="text"
              placeholder="Month (e.g., July)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Year (e.g., 2025)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />
            <Elements stripe={stripePromies}>
              <CheckoutForm
                salary={salary}
                setIsModalOpen={setIsModalOpen}
                setMonth={setMonth}
                setYear={setYear}
                month={month}
                year={year}
                email={email}
                name={name}
                id={_id}
                
              ></CheckoutForm>
            </Elements>
            <div className="flex justify-between space-x-4">
              {/* <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements> */}
              {/* <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Paysubmit
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paymodal;
