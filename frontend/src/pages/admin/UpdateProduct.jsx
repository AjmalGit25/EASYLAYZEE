import { useEffect, useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import toast from "react-hot-toast";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin, loading } = useAdminAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#16a34a");
  const [secondaryColor, setSecondaryColor] = useState("#15803d");
  const [currentImage, setCurrentImage] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setFetching(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/v1/product/${id}`, {
          withCredentials: true,
        });

        const product = response.data.product;
        setTitle(product.title || "");
        setDescription(product.description || "");
        setPrice(product.price?.toString() || "");
        setPrimaryColor(product.colors?.primary || "#16a34a");
        setSecondaryColor(product.colors?.secondary || "#15803d");
        setCurrentImage(product.images?.[0]?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load product");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Product id is missing");
      return;
    }

    try {
      setWaiting(true);

      await axios.patch(
        `http://localhost:5000/api/v1/product/${id}`,
        {
          title,
          description,
          price: Number(price),
          primaryColor,
          secondaryColor,
        },
        { withCredentials: true }
      );

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.log("Error updating product", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setWaiting(false);
    }
  };

  if (loading || fetching) {
    return <div className="min-h-screen bg-teal-800 flex items-center justify-center text-8xl text-white">Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/signup" />;
  }

  if (!id) {
    return <Navigate to="/admin/products" />;
  }

  const inputClass = `border border-gray-300 rounded-lg px-3 py-2 outline-none w-full
    shadow-sm transition-all duration-200
    hover:border-orange-300
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-200
    focus:shadow-md`;
  
  const submitButton = `w-full py-3 rounded-lg cursor-pointer
    bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950
    border border-amber-700
    text-white font-semibold
    shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]
    hover:brightness-110
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
    transition-all duration-300`;

  return (
    <div className="min-h-screen">
      <AdminNavbar />

      <div className="px-4 md:px-8 py-6 pt-20">
        <div className="mb-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-amber-700">Update Product</h1>
          <p className="text-black text-sm mt-1">Edit the product details below and save your changes.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-sm font-semibold text-black/70">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Grilled Potato Chips"
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 text-sm font-semibold text-black/70">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              required
              placeholder="e.g. 199"
              className={inputClass}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="mb-1 text-sm font-semibold text-black/70">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={4}
              placeholder="Describe the product..."
              className={`${inputClass} resize-none`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-black/70">
              Theme Colors <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-3">
              <div className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs text-black/50">Primary</span>
                <div className="relative w-full h-10 rounded-lg overflow-hidden border border-gray-300" style={{ backgroundColor: primaryColor }}>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
                <span className="text-xs font-mono text-black/50">{primaryColor}</span>
              </div>

              <div className="w-px h-12 bg-gray-300" />

              <div className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs text-black/50">Secondary</span>
                <div className="relative w-full h-10 rounded-lg overflow-hidden border border-gray-300" style={{ backgroundColor: secondaryColor }}>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
                <span className="text-xs font-mono text-black/50">{secondaryColor}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm font-semibold text-black/70">Current Image</label>
            {currentImage ? (
              <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                <img src={currentImage} alt="Current product" className="h-40 object-contain mx-auto" />
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-500">
                No image available for this product.
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className={submitButton}
            >
              {waiting ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Updating your Product...</span>
                  <div className="h-5 w-5 border-2 border-white border-l-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <span>Update Product</span>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
