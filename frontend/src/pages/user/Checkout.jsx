import api from "../../services/api.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext.jsx";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { SiPhonepe } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";

export default function Checkout() {
  const { user, } = useUserAuth();
  const [itemLoading, setItemLoading] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState([]);

  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }

  const location = useLocation();
  const mode = location.state?.mode;

  console.log("Checkout mode:", mode);

  // console.log("Location: ",location);
  // console.log("Location state: ", location.state);

  useEffect(() => {
    if (mode === "cart") {
      // Fetch the user's cart from the backend
      const fetchCart = async () => {
        try {
          const cartRes = await api.get("/cart");
          setCheckoutItems(cartRes.data.cartData.items || []);

          console.log("Cart items:", cartRes.data.cartData.items);
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCheckoutItems([]);
        } finally {
          setItemLoading(false);
        }
      }

      fetchCart();
    }
    else if (mode === "single") {
      // Use the product and quantity from location.state (Sent by ProductDetails.jsx)
      console.log("Product to be checkout:", location.state?.product);
      console.log("Product quantity:", location.state?.quantity);
      
      const fetchProduct = async (product) => {
        console.log("Fetching product for checkout:", product._id);

        try {
          const response = await api.get(`/product/${product._id}`);

          const fetched = response.data.product;
          console.log("Product response = ", fetched);
          setCheckoutItems([{ productId: fetched, quantity: location.state?.quantity ?? 1 }]);

        } catch (error) {
          console.log("Error while fetching product!", error);
        } finally {
          setItemLoading(false);
        }
      }

      fetchProduct(location.state?.product);
    }
  }, [location.state?.product, location.state?.quantity, mode]);

  const handleQuantityChange = (item, newQty) => {

    if (mode === "cart") {
      updateCartQuantity(item, newQty);

    }
    else if (mode === "single") {
      updateCheckoutQuantity(item, newQty);
    }
  };

  const updateCartQuantity = async (item, newQty) => {
    const productId = item.productId?._id;

    const existingItem = checkoutItems.find((i) => {
      const id = i.productId?._id ?? i.productId;
      return id?.toString() === productId?.toString();
    });

    setItemLoading(productId);

    try {
      let response;

      if (newQty == 0) {                                 // delete cart
        response = await api.delete(
          `/cart/${productId}`
        );
      }

      else if (existingItem) {                           // update cart
        response = await api.patch(
          `/cart/${productId}`,
          { quantity: newQty }
        );
      }

      else {                                             // add new cart
        response = await api.post(
          `/cart/${productId}`,
          { quantity: newQty },
          { withCredentials: true }
        );
      }

      setCheckoutItems(response.data.cartData.items || []);
      toast.success(response.data.message || "Added to Cart");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add in cart");
    } finally {
      setItemLoading(null);
    }

    return;
  };

  const updateCheckoutQuantity = (item, newQty) => {

    if (newQty < 1) return;

    setCheckoutItems(prev =>
      prev.map(checkoutItem => {
        const id =
          checkoutItem.productId?._id ?? checkoutItem.productId;

        const currentId =
          item.productId?._id ?? item.productId;

        if (id?.toString() === currentId?.toString()) {
          return {
            ...checkoutItem,
            quantity: newQty
          };
        }

        return checkoutItem;
      })
    );
  };

  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.productId?.price ?? 0) * item.quantity, 0);

  return (
    <div className="min-h-screen">
      <div className="px-4 mx-auto pt-20 max-w-7xl">
        <h1 className="text-xl md:text-3xl font-extrabold text-green-700 tracking-tight">Order Summary</h1>

        <div className="flex flex-col md:flex-row justify-between gap-6 mt-5">
          {/* Ship Address + Cart items */}
          <div className="flex-5 space-y-5">
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-2">
              <h3>Deliver to:</h3>
              <div className="flex items-center gap-3">
                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                <span className="text-[11px] text-gray-500 font-semibold bg-gray-200 px-1.5 rounded-lg">Home</span>
              </div>
              <p className="text-sm">Rising Glory, 1st Floor, Makarba, Sarkhej Makarba Road, near Royal Hotel, Ahmedabad 382210</p>
              <p className="text-sm">{user?.phone}</p>
            </div>

            <div className="flex flex-col flex-5">
              {checkoutItems.map((item, index) => {

                return (
                  <div
                    key={index}
                    className="bg-white border-t border-gray-200 p-3 sm:p-4 flex gap-4"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${item.productId?._id}`}
                      className="shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={item.productId?.images?.[0]?.url}
                        alt={item.productId?.title}
                        className="w-full h-full object-contain p-1"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col flex-1 justify-between min-w-0">
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-1">{item.productId?.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mt-0.5">{item.productId?.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                        <span className="text-base sm:text-lg font-extrabold text-indigo-600">₹{(item.productId?.price * item.quantity).toLocaleString("en-IN")}</span>
                        <span className="text-xs text-gray-400">₹{item.productId?.price} × {item.quantity}</span>
                      </div>
                      {/* Actions row */}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {/* Qty stepper */}
                        <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 h-8">
                          <button
                            disabled={itemLoading === (item.productId?._id ?? item.productId)}
                            onClick={() => handleQuantityChange(item, Math.max(item.quantity - 1, 0))}
                            className="w-8 h-full bg-gray-100 hover:bg-indigo-100 text-gray-700 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                          >−</button>
                          <span className="w-8 h-full flex items-center justify-center text-sm font-semibold text-gray-700 bg-white">{itemLoading === (item.productId?._id ?? item.productId) ? (<div className="h-5 w-5 border-2 border-amber-600 border-b-transparent rounded-full animate-spin"></div>) : (item.quantity)}</span>
                          <button
                            disabled={itemLoading === (item.productId?._id ?? item.productId)}
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="w-8 h-full bg-gray-100 hover:bg-indigo-100 text-gray-700 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                          >+</button>
                        </div>

                        <button
                          disabled={itemLoading === (item.productId?._id ?? item.productId)}
                          onClick={() => handleQuantityChange(item, 0)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium transition-colors cursor-pointer"
                        >
                          <RiDeleteBin5Fill /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bill Amount */}
          <div className="hidden md:block flex-3 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 sticky top-20">
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Items ({checkoutItems.length})</span>
                  <span className="font-medium text-gray-700">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-500 font-medium">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between text-base font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-indigo-600">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Link
                to="/payment"
                state={{ checkoutItems, subtotal }}
                className="block text-center w-full py-3 rounded-xl text-white font-bold text-sm bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 transition-opacity duration-200 shadow-md"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile device */}
      <div className="md:hidden shadow-[0_-2px_5px_rgba(0,0,0,0.15)] fixed border-t border-gray-300 w-full bottom-0">
        <div className="flex bg-gray-200 gap-3 p-1 px-2">
          <div className="flex items-center justify-center">
            <IoHome size={30} />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm text-slate-800">Delivering to <strong>Home</strong></h3>
              <p className="text-[10px] text-slate-500 line-clamp-1">Rising Glory, 1st Floor, Makarba, Sarkhej Makarba Road, near Royal Hotel, Ahmedabad 382210</p>
            </div>

            <Link className="text-[10px] border border-green-700/20 rounded-lg p-1 px-2 text-green-700 tracking-wide">Change</Link>
          </div>
        </div>

        <div className="flex bg-white p-2 px-4">
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <SiPhonepe size={15} />
              <span className="text-[11px] uppercase">Pay using</span>
            </div>
            <p className="text-sm text-slate-700">PhonePe UPI</p>
          </div>

          <Link to={"/payment"} className="flex-2 flex items-center justify-between bg-green-700 text-white rounded-lg px-2 py-1.5">
            <div className="uppercase flex flex-col text-[12px]">
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
              <span className="">Total</span>
            </div>
            <div className="flex items-center">
              <span>Place Order</span>
              <IoMdArrowDropright size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
