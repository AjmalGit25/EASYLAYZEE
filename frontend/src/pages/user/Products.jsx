import api from "../../services/api.js";
import { GoHeartFill } from "react-icons/go";
import { useState } from "react";
import { useEffect } from "react";
import { FiShoppingCart } from 'react-icons/fi';
import { FaPlus, FaMinus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";



export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("guestCart")) || []);
  const [wishlist, setWishlist] = useState({ products: [] });
  const [user, setUser] = useState(null);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [productLoading, setProductLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
        setError(error.message);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch current user | (It is not protected route, so fetch manually, user is optional here)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Fetch Mongo Cart | default Cart is "guestCart" in local storage
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartRes = await api.get("/cart");
        setCart(cartRes.data.cartData.items);
      } catch {
        // No cart yet — stays as empty array, user is still logged in
      }
    }

    fetchCart();
  }, []);

  // Fetch Mongo Wishlist | default Wishlist is empty array
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistRes = await api.get("/wishlist");
        setWishlist(wishlistRes.data.wishlist);
      } catch (error) {
        console.log("Error during wishlist fetch:", error);
      }
    }
    fetchWishlist();
  }, []);


  // Helper function to get Quantity
  const getQty = (productId) => {
    const item = cart.find((item) =>
      (item.productId?._id || item.productId)?.toString() === productId
    );

    return item?.quantity || 0;
  };

  const cartHandler = async (productId, newQty) => {
    if (user) {
      const existingItem = cart.find((item) => {
        const id = item.productId?._id ?? item.productId;
        return id?.toString() === productId;
      });

      setCartLoading(productId);

      try {
        let response;

        if (newQty == 0) {                                 // delete cart
          response = await api.delete(`cart/${productId}`);
        }

        else if (existingItem) {                           // update cart
          response = await api.patch(`cart/${productId}`, { quantity: newQty });
        }

        else {                                             // add new cart
          response = await api.post(`cart/${productId}`, { quantity: newQty });
        }

        setCart(response.data.cartData.items);
        toast.success(response.data.message || "Added to Cart");
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message || "Failed to add in cart");
      } finally {
        setCartLoading(false);
      }

      return;
    };

    // Guest Cart  | No User? Now guestCart is cart | Guest Cart logic
    const currentCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const existingItem = currentCart.find((item) => {
      const id = item.productId?._id ?? item.productId;
      return id?.toString() === productId;
    });

    let updatedCart;

    if (newQty === 0) {

      // delete cart                             
      updatedCart = currentCart.filter(item => item.productId !== productId);
    }

    else if (existingItem) {

      // update cart
      updatedCart = currentCart.map(item =>
        item.productId === productId ? { ...item, quantity: newQty } : item
      );
    }

    else {

      // add new cart
      updatedCart = [...currentCart, { productId: productId, quantity: newQty }];
    }

    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  const wishlistHandler = async (productId) => {
    try {
      if (user) {
        setWishlistLoading(productId);
        const res = await api.post(`wishlist/${productId}`);
        setWishlist(res.data.wishlist);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add in Wishlist");
    } finally {
      setWishlistLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 ">

      {/* Main Container - Header, Error, Loading, Products grid */}
      <div className="px-4 md:px-8 py-6 pt-20">

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-tight">
              All Products
            </h1>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 border border-amber-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-white shadow-sm"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Product Loading */}
        {productLoading ? (
          <div className="flex items-center justify-center h-60">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-60 text-gray-400 text-lg font-medium">
            No products found.
          </div>
        ) : (
          <div className="grid gap-4
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-5
                  xl:grid-cols-6
                "
          >
            {filtered.map((product) => {
              const productId = product._id.toString();
              const wishlistIds = (wishlist.products ?? []).map(p => p._id.toString());
              const isWishlisted = wishlistIds.includes(productId);

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Image */}
                  <div
                    className="relative flex items-center justify-center p-3 h-36 md:h-44"
                    style={{ backgroundColor: product.colors?.primary + "22" || "#fff7ed" }}
                  >
                    <Swiper
                      className="w-full h-full"
                      nested={true}
                      preventClicks={true}
                      preventClicksPropagation={true}
                      slidesPerView={1}
                      spaceBetween={0}
                      centeredSlides={true}
                      allowTouchMove={true}
                      simulateTouch={true}     // Allows mouse drag on desktop
                      touchRatio={1}
                      resistanceRatio={0.85}
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                    >
                      {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="h-full w-full flex items-center justify-center">
                            <img
                              src={product.images[index]?.url}
                              alt={product.title}
                              className="h-full w-full object-contain drop-shadow-md group-hover:scale-103 transition-transform duration-300"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col gap-1 flex-1">
                    <Link to={`/products/${product._id}`} className="cursor-pointer">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </Link>
                    <div className="mt-auto pt-2">
                      <span className="text-sm sm:text-base font-extrabold text-amber-800">
                        ₹{product.price}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-2">

                      {/* Wishlist */}
                      <button
                        onClick={() => wishlistHandler(productId)}
                        className={`flex-1 flex items-center justify-center text-[10px] sm:text-xs font-medium h-8 rounded-lg text-gray-500 border border-pink-200  transition-colors duration-200 cursor-pointer 
                          ${isWishlisted ? "text-pink-500 hover:border-pink-400" : "text-gray-500 border-pink-200 hover:border-pink-400"}`}
                      >
                        {wishlistLoading === productId ? (
                          <div className="h-4 w-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                        ) : (<GoHeartFill size={15} className="text-sm" />)}
                      </button>

                      {getQty(productId) === 0 ? (
                        <button
                          onClick={() => cartHandler(productId, 1)}
                          className="flex-3 flex items-center justify-center gap-2 text-[11px] sm:text-sm font-bold h-8 rounded-lg text-white bg-orange-700 hover:bg-orange-800 transition-all duration-200 cursor-pointer px-2"
                        >
                          <FiShoppingCart className="text-sm" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex-3 text-[11px] sm:text-sm font-bold rounded-lg text-white overflow-hidden transition-all duration-200">
                          <div className="flex items-center justify-between h-8 w-full rounded-lg">

                            {/* Minus */}
                            <button
                              onClick={() => cartHandler(productId, getQty(productId) - 1)}
                              className="flex items-center justify-center text-lg font-medium bg-orange-700 h-full w-full cursor-pointer"
                            >
                              <FaMinus size={15} />
                            </button>

                            <div className="flex items-center justify-center h-full w-full text-white bg-sky-500">
                              {cartLoading === productId ? (<div className="h-5 w-5 border-2 border-white border-b-transparent rounded-full animate-spin"></div>) : (getQty(productId))}
                            </div>

                            {/* Plus */}
                            <button
                              onClick={() => cartHandler(productId, getQty(productId) + 1)}
                              className="flex items-center justify-center text-lg font-medium bg-orange-700 h-full w-full cursor-pointer"
                            >
                              <FaPlus size={15} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>)
            })}
          </div>
        )}
      </div>


    </div>
  );
}