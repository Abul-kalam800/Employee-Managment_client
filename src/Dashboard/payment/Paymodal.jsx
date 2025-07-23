import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const Paymodal = ({ isModalOpen, setIsModalOpen, emp }) => {
  const { name, salary, email, _id } = emp;

  const [month, setMonth] = useState("");
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const stripePromies = loadStripe(import.meta.env.VITE_STRIPE_SK_KEY);
  //  for year
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 bg-blue-400">{name}</h2>
            <p className="mb-2 font-bold">Salary: {salary} USD</p>
            <select
              className="border p-2 rounded text-xs md:text-lg"
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
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- Select Year --</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <Elements stripe={stripePromies}>
              <CheckoutForm
                salary={salary}
                setIsModalOpen={setIsModalOpen}
                setMonth={setMonth}
                month={month}
                year={selectedYear}
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
