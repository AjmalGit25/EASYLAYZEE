import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import toast from "react-hot-toast";


export default function ProductDetails() {
  const { id } = useParams();               // Take id from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState({ products: [] });
  const [cartLoading, setCartLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch the product for additional details
  useEffect(() => {
    const fetchProduct = async (id) => {

      try {
        const response = await api.get(`/product/${id}`);

        const fetched = response.data.product;
        console.log("Product response = ", fetched);
        setProduct(fetched);

      } catch (error) {
        console.log("Error while fetching product!", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct(id);
  }, [id]);

  // Fetch current user | (It is not protected route, so fetch manually, user is optional here)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      } catch {
        toast.error("User please login");
        setUser(null);
      }
    };

    fetchUser();
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

  // Left / Right buttons ------------------------------------------
  // Right Button
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % product.images.length);
  };

  // Left Button
  const previousImage = () => {
    setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };


  // Cart Handler
  const cartHandler = async (productId, quantity) => {
    try {
      setCartLoading(true);
      const res = await api.post(`cart/${productId}`, { quantity });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error while: ", error.message);
      toast.error(error.message);
    } finally {
      setCartLoading(false);
    }
  };

  const wishlistHandler = async (productId) => {
    try {
      if (user) {
        const res = await api.post(`wishlist/${productId}`);
        setWishlist(res.data.wishlist);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add in Wishlist");
    }
  }

  const wishlistIds = (wishlist.products ?? []).map(p => p._id.toString());
  const isWishlisted = product ? wishlistIds.includes(product._id?.toString()) : false;

  return (
    <div className="min-h-screen bg-blue-100">

      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 border-4 border-indigo-700 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-500 font-medium text-xs md:text-base">Fetching Product Details ...</p>
        </div>
      ) : (
        <div className="px-4 md:px-8 py-6 pt-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="h-fit flex border border-gray-200 rounded-2xl bg-white shadow-md group p-2">

              {/* Thumbnail */}
              <div className="hidden sm:flex flex-col gap-3 cursor-pointer">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setSelectedImage(index)}
                    className={`w-15 h-15 border rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden ${selectedImage === index ? "border-blue-500" : "border-gray-400"}`}
                  >
                    <img src={product.images[index]?.url}
                      alt={product.title}
                      className="w-10 object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Image Preview */}
              <div className="self-start w-full aspect-6/4 relative rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product?.images?.[selectedImage]?.url}
                  alt={product?.title}
                  key={selectedImage}
                  className="hidden sm:block h-full w-full object-contain drop-shadow-lg"
                />

                {/* Wishlist heart */}
                <div className="absolute right-3 top-5 -translate-y-1/2 cursor-pointer z-2">
                  <GoHeartFill
                    onClick={() => wishlistHandler(product._id)}
                    size={25}
                    className={`flex-1 flex items-center justify-center cursor-pointer 
                          ${isWishlisted ? "text-pink-500" : "text-gray-400 "}`}
                  />
                </div>

                {/* Left button  */}
                <button
                  onClick={previousImage}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-200 text-gray-600 p-2 rounded-full cursor-pointer"
                >
                  <FaCaretLeft />
                </button>

                {/* Right button */}
                <button
                  onClick={nextImage}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-200 text-gray-600 p-2 rounded-full cursor-pointer"
                >
                  <FaCaretRight />
                </button>

                {/* Swiper - mobile only */}
                <div className="sm:hidden h-full w-full">
                  <Swiper
                    className="h-full w-full"
                    slidesPerView={1}
                    allowTouchMove={true}
                    simulateTouch={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="h-full w-full flex items-center justify-center pb-8">
                          <img
                            src={product.images[index]?.url}
                            alt={product.title}
                            className="h-full w-full object-contain drop-shadow-md"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

              </div>
            </div >

            {/* Details Area */}
            <div className="flex flex-col gap-5">

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                  {product.title}
                </h1>

                <div className="flex items-center gap-3 flex-wrap text-xs sm:text-sm">
                  <div className="flex text-yellow-500 text-lg">
                    ★★★★☆
                  </div>

                  <span className="text-gray-500 text-xs sm:text-sm">
                    (214 Reviews)
                  </span>

                  <span className="text-green-600 font-medium">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="border-y border-gray-300 py-3">

                <div className="flex items-end gap-3 flex-wrap">

                  <span className="font-bold text-indigo-700 text-2xl sm:text-4xl">
                    ₹{product.price}
                  </span>

                  <span className="line-through text-gray-400 ">
                    ₹99
                  </span>

                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold text-xs sm:text-sm">
                    25% OFF
                  </span>

                </div>

                <p className="text-gray-500 mt-1.5 text-xs sm:text-sm">
                  Inclusive of all taxes
                </p>

              </div>

              {/* Delivery */}
              <div className="space-y-2 text-sm sm:text-base">

                <div className="flex justify-between">
                  <span className="text-gray-500 ">Delivery</span>

                  <span className="font-semibold text-green-600">
                    Free Delivery
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated</span>

                  <span className="font-medium">
                    2 - 5 Days
                  </span>
                </div>

              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 w-fit relative text-sm sm:text-base">
                <label htmlFor="quantity" className="font-medium cursor-pointer pl-2">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="pl-20 cursor-pointer outline-none border border-gray-500 absolute rounded-lg p-1"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button
                  onClick={() => cartHandler(product._id, quantity)}
                  className={`transition text-white font-semibold py-3 rounded-xl shadow cursor-pointer
                    ${cartLoading ? "bg-indigo-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                  {cartLoading ? "Adding to Cart..." : "Add to Cart"}
                </button>

                <Link
                  to="/checkout"
                  className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 rounded-xl shadow text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-5">
            {/* Description */}
            <div>
              <h2 className="font-bold text-lg mb-2">
                About this item
              </h2>

              <p className="text-gray-600 leading-7">
                {product.description}
              </p>
            </div>

            {/* Product Info */}
            <div className="border-t border-gray-300 pt-5 mb-10">
              <h2 className="font-bold text-lg mb-3">
                Product Details
              </h2>

              <div className="grid grid-cols-2 gap-y-3 text-sm max-w-3xl">

                <span className="text-gray-500">
                  Brand
                </span>

                <span>
                  EasyLayzee
                </span>

                <span className="text-gray-500">
                  Category
                </span>

                <span>
                  XYZ Category
                </span>

                <span className="text-gray-500">
                  Availability
                </span>

                <span className="text-green-600">
                  In Stock
                </span>

                <span className="text-gray-500">
                  Shipping
                </span>

                <span>
                  Free
                </span>

              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
