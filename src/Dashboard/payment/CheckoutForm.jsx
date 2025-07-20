import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./stripCss.css";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
const CheckoutForm = ({
  salary,
month,setYear,year,
  setIsModalOpen,
  email,name,id,setMonth

}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(salary);
  const axioesInstance = useAxios();
  const handleSubmitform = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrormsg(error.message);
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErrormsg("");
    }
    const res = await axioesInstance.post("/create-payment-intent", {
      amount: salary,
    });
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    const transactionId = result.paymentIntent.id;

    setLoading(false);

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log('payment successfully')
      }
    }
    console.log("res from intent ", res);
    if (!month || !year)
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill the month and year",
        showConfirmButton: false,
        timer: 1500,
      });


    const paymentData = {
      employeeId: id,
      name,
      email,
      salary,
      month,
      year,
      transactionId,
    
    };

     axioesInstance.post("/payroll", paymentData).then((res) => {
      if (res.data.result.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment request is done",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    console.log('successfully all')

    setIsModalOpen(false);
    setMonth("");
    setYear("");
  };



  //   const handlePayment = async () => {
  //   // Simulate payment completion after API call
  //   const transtionId= transactionId   // Replace with actual ID after payment

  //   // After payment success
  //   onPaymentSuccess(transtionId);
  // };

  return (
    <form onSubmit={handleSubmitform}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {errormsg && <p className="text-red-500 my-5 ">{errormsg}</p>}
      <div className="flex justify-between mx-5">
        <button
          // onClick={handlePayment}
          type="submit"
          disabled={!stripe}
          className="bg-blue-500 text-white py-2 px-5 text-center rounded-2xl w-6/12 cursor-pointer"
        >
          Pay {salary}
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
