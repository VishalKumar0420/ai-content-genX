import React, { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSubscriptionApi, savePaymentApi } from "../../apis/apiServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { restoreUserData } from "../../slices/userSlice";

const Billing = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { userInfo, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load the Razorpay script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Mutation for creating a subscription
  const { mutate: createSubscription } = useMutation({
    mutationFn: createSubscriptionApi,
    onSuccess: (subId) => {
      console.log("subId", subId);
      OnPayment(subId);
    },
    onError: (error) => {
      console.error("Error creating subscription:", error);
      toast.error("Failed to create subscription");
      setLoading(false);
    },
  });

  // Mutation for saving payment
  const { mutate: savePayment } = useMutation({
    mutationFn: savePaymentApi,
    onSuccess: (response) => {
      if (response?.success) {
        console.log("Payment success", response.data);
        dispatch(restoreUserData({token,userInfo:response.data}))
        toast.success(response?.message);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error saving payment:", error);
      toast.error("Payment failed");
      setLoading(false);
    },
  });

  // Payment handler
  const OnPayment = (subId) => {
    if (!razorpayLoaded) {
      toast.error("Razorpay is not loaded yet");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI Content",
      description: "AI Content monthly subscriptions",
      handler: async (resp) => {
        console.log(resp);
        
        if (!resp?.razorpay_payment_id) {
          console.log("Payment ID not found in the response!");
          return;
        }
        const paymentId=resp?.razorpay_payment_id
        console.log(paymentId);
        
        savePayment({token,paymentId});
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCreateSubscription = () => {
    setLoading(true);
    createSubscription(token);
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-5 bg-whiten dark:bg-boxdark-2 dark:text-whiten h-screen pt-20">
        <div>
          <h2 className="font-bold text-2xl">Upgrade with Unlimited Plan</h2>
        </div>
        <div className={`flex md:flex-row flex-col gap-10`}>
          <div className={`border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-10 rounded-lg  flex flex-col gap-4 items-center`}>
            <span className=" text-xl">Free</span>
            <h3 className="font-bold text-3xl ">0₹</h3>

            <ul className="flex flex-col gap-2">
              <li className="">10,000 Words/Month</li>
              <li className="">50+ content Templates</li>
              <li className="">Unlimited copied & download </li>
              <li className="">History show</li>
            </ul>
            {!userInfo?.active && (
              <button className="border border-slate-700 bg-slate-800 text-center py-3 px-5 text-white rounded-3xl cursor-not-allowed" disabled={true}>
                Currently Active Plan
              </button>
            )}
          </div>
          <div className={`border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-10 rounded-lg  flex flex-col gap-4 items-center`}>
            <span className="text-xl ">Unlimited</span>
            <h3 className="font-bold text-3xl ">9₹ Only</h3>

            <ul className="flex flex-col gap-2">
              <li className="">Unlimited words generates</li>
              <li className="">50+ content Templates</li>
              <li className="">Unlimited copied & download </li>
              <li className="">History show</li>
            </ul>

            <button
              className={`  border border-blue-700  text-center py-3 px-5 rounded-3xl flex gap-3 ${userInfo.active && "bg-slate-800 text-white border-none cursor-not-allowed"}`}
              onClick={handleCreateSubscription}
            >
              {loading && <Loader2Icon className="animate-spin" />} {!userInfo?.active ? "Get Started" : "Currently Active Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
