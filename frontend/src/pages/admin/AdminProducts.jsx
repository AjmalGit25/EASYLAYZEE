import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar.jsx";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BADGE_COLORS = [
  "bg-rose-100 text-rose-600 border-rose-300",
  "bg-violet-100 text-violet-600 border-violet-300",
  "bg-sky-100 text-sky-600 border-sky-300",
  "bg-emerald-100 text-emerald-600 border-emerald-300",
  "bg-amber-100 text-amber-600 border-amber-300",
  "bg-pink-100 text-pink-600 border-pink-300",
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/admin/admin-products", { withCredentials: true });
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/product/${id}`, { withCredentials: true });
      setProducts((prev) => prev.filter((p) => p._id !== id));

      toast.success("Product deleted successfully!")
    } catch (error) {
      console.log("Delete error:", error);
      toast.error(error.message || "Product not deleted!")
    } finally {
      setDeleteId(null);
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
      <AdminNavbar />

      {/* Main Container - Header, Error, Loading, Products grid */}
      <div className="px-4 md:px-8 py-6 pt-20">

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-tight">
              All Products
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length} products total
            </p>
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

        {/* Loading */}
        {loading ? (
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
          ">
            {filtered.map((product, index) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image */}
                <div
                  className="relative flex items-center justify-center p-3 h-36 md:h-44"
                  style={{ backgroundColor: product.colors?.primary + "22" || "#fff7ed" }}
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.title}
                    className="h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge */}
                  <span className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${BADGE_COLORS[index % BADGE_COLORS.length]}`}>
                    #{index + 1}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-extrabold text-amber-600">
                      ₹{product.price}
                    </span>

                    {/* Stock badge */}
                    <span className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                      {product.stock > 0 ? `${product.stock} left` : "Out"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2">

                    {/* Edit */}
                    <Link to={`/update-product/${product._id}`} className="flex-1 flex items-center justify-center gap-1 text-[10px] sm:text-xs font-medium py-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-600 hover:text-white transition-colors duration-200 cursor-pointer">
                      <MdOutlineEdit className="text-sm" />
                      Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteId(product._id)}
                      className="flex-1 flex items-center justify-center gap-1 text-[10px] sm:text-xs font-medium py-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <MdDeleteOutline className="text-sm" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <MdDeleteOutline className="text-rose-600 text-xl" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Delete Product?</h2>
                <p className="text-xs text-gray-400">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 cursor-pointer transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
