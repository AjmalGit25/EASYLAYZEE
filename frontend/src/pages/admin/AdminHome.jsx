import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

import AdminNavbar from "../../components/AdminNavbar.jsx";

export default function AdminHome() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await axios.get("http://localhost:5000/api/v1/product");
        console.log("Products fetched successfully: ", response.data);
        const fetched = response.data.products;

        setProducts(fetched);
        setCurrentProduct(fetched[0]);

      } catch (error) {

        console.log("Error fetching products:", error);
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error || !currentProduct) return (
    <div className="min-h-screen">
      <AdminNavbar />

      <div className="px-4 md:px-8 py-6 pt-20">
        <div className="flex items-center justify-center">
          <p className="text-white text-5xl font-semibold">{error || "No products found."}</p>
        </div>
      </div>

    </div>
  );

  return (

    <div
      className="background min-h-screen"
      style={{
        "--color1": currentProduct.colors.primary,
        "--color2": currentProduct.colors.secondary,
      }}
    >
      {/* Navbar for both - Mobile & Tablet */}
      <AdminNavbar />

      {/* Desktop (Large Screen) View ======================================================== */}

      {
        loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-white text-xl font-semibold">Loading...</p>
          </div>
        ) : (

          <div className="hidden lg:block px-4 md:px-8 py-6 pt-20">
            <div className="grid grid-cols-[35%_50%_15%]">
              {/* Left - Heading & Product Info */}
              <div className="">
                <div className="space-y-8">
                  {/* Heading & Price */}
                  <div className="tracking-tighter text-white text-6xl font-extrabold uppercase">
                    <h1 className="drop-shadow-xl drop-shadow-black">Eat our Grilled Potato chips</h1>
                    <h2 className="mt-4 text-6xl">₹{currentProduct.price}</h2>
                  </div>

                  <h3>
                    <span className="text-3xl text-white/60">Flavour: </span>
                    <span className="text-3xl text-white/90">{currentProduct.title}</span>
                  </h3>

                  {/* Description */}
                  <div className="text-white/60 text-sm w-90">
                    <p>{currentProduct.description}</p>
                  </div>

                </div>
              </div>

              {/* Middle - Product Image Preview */}
              <div className="">
                <div className="flex items-center ml-15">
                  <img
                    src={currentProduct.images[0].url}
                    alt={currentProduct.title}
                    className="w-100 h-140 object-cover -rotate-5 drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
                  />
                </div>
              </div>

              {/* Right - Image Slider */}
              <div className="flex items-center justify-center">
                <div className="desktop-slider h-135 overflow-y-auto space-y-10 p-3 rounded-2xl">
                  {products.map((product) => (
                    <img
                      onClick={() => setCurrentProduct(product)}
                      src={product.images[0].url}
                      alt={product.title}
                      key={product.id}
                      className="w-25 h-32 object-cover cursor-pointer -rotate-10 transition-transform duration-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                      style={{ ...(currentProduct?._id === product._id ? { transform: "rotate(10deg)" } : {}) }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }


      {/* Mobile & Tablet Screen (Small & Medium) View =============================================== */}

      {/* Main Heading */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="lg:hidden py-6 pt-20">
          {/* Main Heading */}
          <div className="">
            <h1 className="tracking-tight text-white text-xl sm:text-5xl uppercase font-extrabold text-center [text-shadow:0_0_10px_rgba(0,0,0,0.5)]">
              Eat our Grilled Potato chips
            </h1>
          </div>

          {/* Image viewer & slider */}
          <div className="grid grid-cols-[70%_30%]">

            {/* Image viewer */}
            <div className="flex items-center justify-center">
              <div className="sm:pl-10">
                <img
                  src={currentProduct.images[0].url}
                  alt={currentProduct.title}
                  className="w-50 h-70 sm:w-72 sm:h-115 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>

            {/* Products Image slider */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="product-slider h-85 px-3 sm:h-110 overflow-y-scroll space-y-5"
                style={{ "--scrollbar-color": currentProduct.colors.primary }}
              >
                {products.map((product) => (
                  <img
                    onClick={() => setCurrentProduct(product)}
                    key={product.id}
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-20 h-20 sm:w-20 sm:h-30 object-contain -rotate-10 cursor-pointer drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)] transition-transform duration-300"
                    style={{ ...(currentProduct?._id === product._id ? { transform: "rotate(10deg)" } : {}) }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* price, description, quantity, buy */}
          <div className="space-y-3 mx-3">
            {/* price */}
            <h1 className="tracking-tight text-white text-2xl sm:text-4xl md:text-6xl font-extrabold">
              ₹{currentProduct.price}
            </h1>

            <h3 className="text-lg sm:text-xl font-medium">
              <span className="text-white/40">Flavour: </span>
              <span className="text-white/90">{currentProduct.title}</span>
            </h3>

            {/* description */}
            <div>
              <p className="text-white/60 text-[11px] sm:text-sm">
                {currentProduct.description}
              </p>
            </div>

          </div>
        </div>
      )
      }
    </div >
  )
}