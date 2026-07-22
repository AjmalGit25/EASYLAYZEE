import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext.jsx";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import { FiShield } from "react-icons/fi";

export default function Payment() {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const checkoutItems = location.state?.checkoutItems ?? [];
  const subtotal = location.state?.subtotal ?? 0;

  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Load Razorpay Checkout Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    if (!checkoutItems.length) {
      toast.error("No items to pay for!");
      return;
    }

    setPaying(true);

    try {
      // 1. Create Razorpay order on backend
      const { data } = await api.post("/payment/create-order", { amount: subtotal });
      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "EasyLayzee",
        description: "Snacks & Wafers Order",
        order_id: order.id,
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
          contact: user?.phone,
        },

        theme: { color: "#6366f1" },
        handler: async (response) => {
          try {
            // 2. Verify payment on backend
            const productIds = checkoutItems.map((item) => item.productId?._id ?? item.productId);

            await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productIds,
            });

            toast.success("Payment successful! 🎉");
            // navigate("/orders", { state: { justOrdered: true } });
            navigate("/payment-success", { state: { checkoutItems, subtotal } });
          } catch {
            toast.error("Payment verification failed!");
          }
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
            toast.error("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        toast.error(response.error.description || "Payment failed!");
        setPaying(false);
      });

      rzp.open();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to initiate payment");
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="px-4 md:px-8 py-6 pt-20 max-w-4xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 tracking-tight mb-6">
          Payment
        </h1>

        <div className="flex flex-col gap-6">

          {/* Security note */}
          <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
            <FiShield className="text-green-500 shrink-0" size={14} />
            Payments are processed securely via Razorpay. We never store your card details.
          </div>


          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 sticky top-20">
            <h2 className="text-base font-bold text-gray-800">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {checkoutItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.productId?.images?.[0]?.url}
                    alt={item.productId?.title}
                    className="w-10 h-10 object-contain rounded-lg bg-indigo-50 p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 line-clamp-1">{item.productId?.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 shrink-0">
                    ₹{(item.productId?.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-700">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-500 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-800 border-t border-gray-100 pt-2">
                <span>Total</span>
                <span className="text-indigo-600">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full py-3 rounded-xl text-white font-bold text-sm bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 transition-opacity shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {paying ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
              ) : (
                `Pay ₹${subtotal.toLocaleString("en-IN")}`
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
