/* eslint-disable */
import api from "../../services/api.js";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoHeartFill } from "react-icons/go";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Cart() {
  const [loading, setLoading] = useState(true);         // Page load

  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(null);
  const [wishlist, setWishlist] = useState({ products: [] });
  const [wishlistLoading, setWishlistLoading] = useState(null);

  // Fetch all cart items
  const fetchCart = async () => {
    try {
      const cartRes = await api.get("/cart");
      setCart(cartRes.data.cartData.items || []);

      console.log("Cart items:", cartRes.data.cartData.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartHandler = async (cartItem, newQty) => {
    const productId = cartItem.productId?._id ?? cartItem.productId;

    const existingItem = cart.find((item) => {
      const id = item.productId?._id ?? item.productId;
      return id?.toString() === productId?.toString();
    });

    setCartLoading(productId);

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

      await fetchCart();
      toast.success(response.data.message || "Added to Cart");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add in cart");
    } finally {
      setCartLoading(null);
    }

    return;
  }

  const wishlistHandler = async (productId) => {
    const id = productId?.toString();
    try {
      setWishlistLoading(id);
      const res = await api.post(`/wishlist/${id}`);
      setWishlist(res.data.wishlist);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add in Wishlist");
    } finally {
      setWishlistLoading(null);
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.productId?.price ?? 0) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">

      <div className="px-4 md:px-8 py-6 pt-20">

        {/* Page heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-6 tracking-tight">
          🛒 Your Cart
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-60">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 gap-4">
            <FiShoppingCart className="text-6xl text-indigo-300" />
            <p className="text-gray-400 text-lg font-medium">Your cart is empty.</p>
            <Link
              to="/products"
              className="text-sm font-semibold text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Cart Items */}
            <div className="flex flex-col gap-4 lg:w-[68%]">
              {cart.map((cartItem, index) => {
                const wishlistIds = (wishlist.products ?? []).map(cartItem => cartItem._id);
                const isWishlisted = wishlistIds.includes(cartItem.productId._id);

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex gap-4 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${cartItem.productId._id}`}
                      className="shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={cartItem.productId?.images?.[0]?.url}
                        alt={cartItem.productId?.title}
                        className="w-full h-full object-contain p-1"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col flex-1 justify-between min-w-0">
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-1">{cartItem.productId?.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mt-0.5">{cartItem.productId?.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                        <span className="text-base sm:text-lg font-extrabold text-indigo-600">₹{(cartItem.productId?.price * cartItem.quantity).toLocaleString("en-IN")}</span>
                        <span className="text-xs text-gray-400">₹{cartItem.productId?.price} × {cartItem.quantity}</span>
                      </div>
                      {/* Actions row */}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {/* Qty stepper */}
                        <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 h-8">
                          <button
                            onClick={() => cartHandler(cartItem, Math.max(cartItem.quantity - 1, 0))}
                            className="w-8 h-full bg-gray-100 hover:bg-indigo-100 text-gray-700 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                          >−</button>
                          <span className="w-8 h-full flex items-center justify-center text-sm font-semibold text-gray-700 bg-white">{cartLoading === (cartItem.productId?._id ?? cartItem.productId) ? (<div className="h-5 w-5 border-2 border-amber-600 border-b-transparent rounded-full animate-spin"></div>) : (cartItem.quantity)}</span>
                          <button
                            onClick={() => cartHandler(cartItem, cartItem.quantity + 1)}
                            className="w-8 h-full bg-gray-100 hover:bg-indigo-100 text-gray-700 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                          >+</button>
                        </div>

                        <button
                          onClick={() => cartHandler(cartItem, 0)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium transition-colors cursor-pointer"
                        >
                          <RiDeleteBin5Fill /> Delete
                        </button>

                        {/* Wishlist */}
                        <button
                          onClick={() => wishlistHandler(cartItem.productId._id)}
                          className={`flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer
                            ${isWishlisted ? "text-pink-500" : "text-gray-400 hover:text-pink-400"}`}
                        >
                          {wishlistLoading === cartItem.productId._id?.toString() ? (
                            <div className="h-4 w-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <div className="flex items-center gap-1">
                              <GoHeartFill size={12} /> <span>Wishlist</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Panel */}
            <div className="lg:w-[32%] h-fit">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 sticky top-20">
                <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Items ({cart.length})</span>
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
                  to="/checkout"
                  className="block text-center w-full py-3 rounded-xl text-white font-bold text-sm bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 transition-opacity duration-200 shadow-md"
                >
                  Proceed to Buy
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
