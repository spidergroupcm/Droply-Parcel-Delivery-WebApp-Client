import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const singleParcel = useLoaderData()

  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { _id, name, email, phoneNumber, price, deliveryManId } = singleParcel


  // const { data: classDetails = {} } = useQuery({
  //   queryKey: ["class-details", user?.email],
  //   enabled: !!user?.email && !!id,
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(`class-details/${id}`);
  //     return data;
  //   },
  // });

  const priceNumb = Number(price) || 0;

  // console.log(typeof priceNumb);

  const mutation = useMutation({
    mutationFn: async (data) => {
      return axiosSecure.post("/create-payment-intent", data);
    },
  });

  // const paymentMutation = useMutation({
  //   mutationFn: async (payment) => {
  //     return axiosSecure.post("/payments", payment);
  //   },
  // });

  useEffect(() => {
    if (price > 0) {
      const createPaymentIntent = async () => {
        try {
          const { data } = await mutation.mutateAsync({ price });
          setClientSecret(data.clientSecret);
        } catch (err) {
          console.error("Error creating payment intent:", err);
        }
      };
      createPaymentIntent();
    }
  }, [price]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      setErr(error.message);
    } else {
      // console.log("payment Method", paymentMethod);
      setErr("");
    }

    // server setUp
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (confirmError) {
      // console.log(confirmError);
    } else {
      // console.log("payment Intent", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        setInvoiceId(paymentIntent.id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "parcel charge payment success!",
          showConfirmButton: false,
          timer: 1500,
        });


        const paymentInfo = { parcelId: _id, name, email, price, deliveryManId, PaymentDate: new Date().toISOString() }

        axiosSecure.post('/paymentDetails', paymentInfo)
          .then(res => {
            navigate("/dashboard/payment-success");
          }).catch(err => {
            // console.log('stripe Wrong', err)
          })
          
      }
    }
  };

  return (
    <>
      <div className="my-6">
        <h2 className=" font-bold text-2xl">Payable amount: ${price}</h2>
      </div>
      <form onSubmit={handelSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#000000",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-green-500 my-3"
          type="submit"
          disabled={!stripe || !elements || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{err}</p>
        {invoiceId && (
          <p className="text-xl font-bold">Your Invoice Id: {invoiceId}</p>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
