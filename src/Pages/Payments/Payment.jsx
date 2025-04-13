import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
// import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center  bg-gray-50">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-green-600">Secure Payment Portal</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Complete your payment quickly and securely using Stripe.
          </p>
        </div>
        <div className="md:w-1/2 w-full mx-auto p-4 md:p-10 rounded-lg bg-green-100 shadow-lg">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Payment;