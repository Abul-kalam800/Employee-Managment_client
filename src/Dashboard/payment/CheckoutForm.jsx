import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit =async (e)=>{
        e.preventDefault();
        if(!stripe||!elements){
            return;

        }
        const card  = elements.getElement(CardElement)
        if(!card){
            return
        }
        const {error,paymentMetheod} = await stripe.createPaymentMethod({
            type:'cart',
            card,
        })
        if(error){
            console.log('error',error)
        }else{
            console.log('paymentMethed',paymentMetheod)
        }
        
    }
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <CardElement></CardElement>
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
