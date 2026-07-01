import api from "../../services/api.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import "../../App.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await api.get("/product");
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

  if (!currentProduct) return (
    <div className="min-h-screen relative background overflow-hidden px-5 md:pt-20">
      <div className="min-h-screen flex items-center justify-center text-white text-lg font-medium">
        No products found.
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen relative background overflow-hidden px-5 md:pt-20"
      style={{
        "--color1": currentProduct.colors.primary,
        "--color2": currentProduct.colors.secondary,
      }}
    >

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>

      ) : (

        /* Desktop (Large Screen) View ======================================================== */

        <div className="hidden lg:block">
          <div className="grid grid-cols-[35%_50%_15%]">
            {/* Left - Heading & Product Info */}

            <div className="space-y-8">
              {/* Heading & Price */}
              <div className="tracking-tighter text-white text-6xl font-extrabold uppercase">
                <h1 className="drop-shadow-xl drop-shadow-black">Eat our Grilled Potato chips</h1>
                <h2 className="mt-4 text-6xl">₹{currentProduct.price}</h2>
              </div>

              <h3 className="text-3xl text-white/90 font-semibold drop-shadow-md drop-shadow-black">{currentProduct.title}</h3>

              {/* Description */}
              <div className="text-white/80 text-sm w-90">
                <p>{currentProduct.description}</p>
              </div>

              {/* quantity & buy */}
              <div className="flex items-center gap-5">

                <div className="bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-between w-60 h-12 overflow-hidden border border-white">
                  <button className="h-full w-full text-white bg-white text-4xl cursor-pointer font-bold flex items-center justify-center"
                    onClick={() => setCurrentQuantity(prev => Math.max(1, prev - 1))}>
                    <CiCircleMinus className="text-black" />
                  </button>

                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{currentQuantity}</span>
                  </div>

                  <button className="h-full w-full text-white bg-white text-4xl cursor-pointer font-bold flex items-center justify-center"
                    onClick={() => setCurrentQuantity(prev => prev + 1)}>
                    <CiCirclePlus className="text-black" />
                  </button>
                </div>

                <Link to="/cart" className="font-bold bg-white backdrop-blur-sm rounded-lg flex items-center justify-center w-60 h-12 shadow-lg shadow-black/40">Order Now</Link>
              </div>
            </div>

            {/* Middle - Product Image Preview */}
            <div className="">
              <Link to={`/products/${currentProduct._id}`} className="flex items-center ml-15">
                <img
                  src={currentProduct.images[0].url}
                  alt={currentProduct.title}
                  className="w-100 h-140 object-cover -rotate-5 drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
                />
              </Link>
            </div>

            {/* Right - Image Slider */}
            <div className="flex items-center justify-center">
              <div className="desktop-slider h-135 overflow-y-auto space-y-10 p-3 rounded-2xl">
                {products.map((product) => (
                  <img
                    onClick={() => setCurrentProduct(product)}
                    key={product._id}
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-25 h-32 object-cover cursor-pointer -rotate-10 transition-transform duration-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                    style={{ ...(currentProduct?._id === product._id ? { transform: "rotate(10deg)" } : {}) }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>)
      }

      {/* Mobile & Tablet Screen (Small & Medium) View =============================================== */}

      {/* Main Heading */}
      <div className="lg:hidden space-y-3 pt-15 pb-20">
        {/* Main Heading */}
        <div className="">
          <h1 className="tracking-tight text-white text-xl sm:text-5xl uppercase font-extrabold text-center [text-shadow:0_0_10px_rgba(0,0,0,0.5)]">
            Eat our Grilled Potato chips
          </h1>
        </div>


        {/* Image Section */}
        <div className="grid grid-cols-[70%_30%] gap-3">

          {/* Image Previewe */}
          <div className="flex items-center justify-center">
            <Link to={`/products/${currentProduct._id}`} className="sm:pl-10">
              <img
                src={currentProduct.images[0].url}
                alt={currentProduct.title}
                className="w-50 h-70 sm:w-90 sm:h-115 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
              />
            </Link>
          </div>

          {/* Image slider */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="product-slider h-85 px-3 sm:h-110 overflow-y-scroll space-y-5"
              style={{ "--scrollbar-color": currentProduct.colors.primary }}
            >
              {products.map((product) => (
                <img
                  onClick={() => setCurrentProduct(product)}
                  key={product._id}
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

          {/* className="text-3xl text-white/90 font-semibold drop-shadow-md drop-shadow-black" */}

          <h3 className="text-lg sm:text-xl text-white/90 font-semibold drop-shadow-sm drop-shadow-black">{currentProduct.title}
          </h3>

          {/* description */}
          <div>
            <p className="text-white/80 text-[11px] sm:text-sm">
              {currentProduct.description}
            </p>
          </div>

          {/* quantity & buy */}
          <div className="flex items-center gap-5">

            <div className="bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-between w-60 h-10 overflow-hidden border border-white">
              <button className="h-full w-full text-white bg-white text-4xl cursor-pointer font-bold flex items-center justify-center"
                onClick={() => setCurrentQuantity(prev => Math.max(1, prev - 1))}>
                <CiCircleMinus className="text-black" />
              </button>

              <div className="h-full w-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{currentQuantity}</span>
              </div>

              <button className="h-full w-full text-white bg-white text-4xl cursor-pointer font-bold flex items-center justify-center"
                onClick={() => setCurrentQuantity(prev => prev + 1)}>
                <CiCirclePlus className="text-black" />
              </button>
            </div>

            <Link to="/cart" className="font-semibold bg-white backdrop-blur-sm rounded-lg flex items-center justify-center w-60 h-10 shadow-lg shadow-black/40">Order Now</Link>
          </div>
        </div>
      </div>
    </div >
  );
}
