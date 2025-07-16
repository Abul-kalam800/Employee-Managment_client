
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromies = loadStripe('pk_test_Your_Publishable_Key')
const Payment = () => {
    return (
   <Elements stripe={stripePromies}>
    <CheckoutForm></CheckoutForm>
   </Elements>
    );
};

export default Payment;