
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromies = loadStripe('pk_test_Your_Publishable_Key')
const Payment = () => {
    return (
   <Elements>
    
   </Elements>
    );
};

export default Payment;