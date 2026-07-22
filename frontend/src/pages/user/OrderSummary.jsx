import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api.js";
import { FiPackage, FiCheckCircle } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";

export default function OrderSummary() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const justOrdered = location.state?.justOrdered ?? false;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await api.get("/user/purchased");
        setPurchases(res.data.productData || []);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="px-4 md:px-8 py-6 pt-20 max-w-4xl mx-auto">

        {/* Success Banner — shown only right after placing order */}
        {justOrdered && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 shadow-sm">
            <FiCheckCircle className="text-green-500 shrink-0" size={24} />
            <div>
              <p className="font-bold text-green-700 text-sm sm:text-base">Order placed successfully!</p>
              <p className="text-xs text-green-600 mt-0.5">Thank you for shopping with EasyLayzee. Your items are on their way.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 tracking-tight flex items-center gap-2">
            <FiPackage /> My Orders
          </h1>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Shop more <IoMdArrowDropright size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-60">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>

        ) : purchases.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 gap-4">
            <FiPackage className="text-indigo-300" size={56} />
            <p className="text-gray-400 text-lg font-medium">No orders yet.</p>
            <Link
              to="/products"
              className="text-sm font-semibold text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Browse Products
            </Link>
          </div>

        ) : (
          <div className="flex flex-col gap-4">
            {purchases.map((product, index) => (
              <div
                key={product._id ?? index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow duration-200"
              >
                {/* Image */}
                <Link
                  to={`/products/${product._id}`}
                  className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-contain p-1"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-1">{product.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mt-0.5">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                    <span className="text-base font-extrabold text-indigo-600">₹{product.price?.toLocaleString("en-IN")}</span>

                    <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      <FiCheckCircle size={11} /> Delivered
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
