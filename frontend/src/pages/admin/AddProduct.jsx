import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminContext";
import { Navigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import toast from "react-hot-toast";

export default function AddProduct() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#16a34a");
  const [secondaryColor, setSecondaryColor] = useState("#15803d");
  const [images, setImages] = useState([null, null]);
  const [previews, setPreviews] = useState([null, null]);

  const [waiting, setWaiting] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setImages(prev => { const updated = [...prev]; updated[index] = file; return updated; });
    setPreviews(prev => { const updated = [...prev]; updated[index] = URL.createObjectURL(file); return updated; });
  };

  const removeImage = (index) => {
    setImages(prev => { const updated = [...prev]; updated[index] = null; return updated; });
    setPreviews(prev => { const updated = [...prev]; updated[index] = null; return updated; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description, price, primaryColor, secondaryColor, images });

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("primaryColor", primaryColor);
    formData.append("secondaryColor", secondaryColor);

    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    try {
      setWaiting(true);

      const response = await axios.post("http://localhost:5000/api/v1/product/",
        formData,
        {
          withCredentials: true
        }
      );

      setWaiting(false);
      console.log(response.data);
      toast.success("Product created successfully!");
    } catch (error) {
      console.log("Error occurred while creating product!", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Check if admin is authenticated, if not redirect to admin signup page
  const { admin, loading } = useAdminAuth();
  if (loading) {
    return <div className="min-h-screen bg-pink-600 text-8xl text-white">Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/signup" />;
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
    <div className="min-h-screen ">

      {/* Navbar for both - Mobile & Tablet */}
      <AdminNavbar />

      <div className="px-4 md:px-8 py-6 pt-20">

        {/* Header */}
        <div className="mb-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-amber-700">Add New Product</h1>
          <p className="text-black text-sm mt-1">Fill in the details below to list a new product.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* Title */}
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

          {/* Price */}
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

          {/* Description */}
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

          {/* Colors */}
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

          {/* Image Upload */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-sm font-semibold text-black/70">
              Product Images <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((index) => (
                <div key={index}>
                  {!previews[index] ? (
                    <label
                      htmlFor={`image-${index}`}
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-36 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
                    >
                      <MdOutlineCloudUpload className="text-3xl text-gray-400" />
                      <span className="text-sm text-gray-400 mt-1">Image {index + 1}</span>
                      <input id={`image-${index}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, index)} />
                    </label>
                  ) : (
                    <div className="relative h-36 rounded-lg overflow-hidden border border-gray-300">
                      <img src={previews[index]} alt={`preview-${index}`} className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 text-white bg-black/50 rounded-full hover:bg-black/80 transition-colors duration-200 cursor-pointer"
                      >
                        <IoCloseCircle className="text-2xl" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={submitButton}
            >
              {waiting ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Adding your Product...</span>
                  <div className="h-5 w-5 border-2 border-white border-l-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <span>Add Product</span>)}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
