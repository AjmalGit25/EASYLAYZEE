import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch the product for additional details
  useEffect(() => {
    const fetchProduct = async (id) => {

      try {
        const response = await api.get(`/product/${id}`);

        const fetched = response.data.product;

        setProduct(fetched);

      } catch (error) {
        console.log("Error while fetching product!", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct(id);
  }, [id]);

  // Left / Right buttons ------------------------------------------
  // Right Button
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % product.images.length);
  };

  // Left Button
  const previousImage = () => {
    setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-blue-300">

      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 border-4 border-indigo-700 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-500 font-medium text-xs md:text-base">Fetching Product Details ...</p>
        </div>
      ) : (
        <div className="px-4 md:px-8 py-6 pt-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="flex w-full aspect-6/5 border border-gray-200  rounded-2xl bg-white shadow-md overflow-hidden group p-2">

              {/* Thumbnail */}
              <div className="flex flex-col gap-3 cursor-pointer">
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
              <div className="w-full aspect-2/4 p-2 relative">
                <img
                  src={product.images[selectedImage]?.url}
                  key={selectedImage}
                  className="h-full w-full object-contain drop-shadow-lg"
                />

                {/* Left button  */}
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-200 text-black p-2 rounded-full cursor-pointer"
                >←</button>

                {/* Right button */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-200 text-black p-2 rounded-full cursor-pointer"
                >→</button>
              </div>
            </div >

            {/* Details area (very limited) */}
            {/* <div>
              <p className="font-medium">{product.title}</p>
              <p className="font-extrabold">{product.price}</p>
              <p className="font-medium">{product.description}</p>
            </div> */}

            {/* Details Area */}
            <div className="flex flex-col gap-5 bg-white rounded-2xl shadow-md p-6">

              {/* Title */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.title}
                </h1>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex text-yellow-500 text-lg">
                    ★★★★☆
                  </div>

                  <span className="text-sm text-gray-500">
                    (214 Reviews)
                  </span>

                  <span className="text-green-600 font-medium">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="border-y py-5">

                <div className="flex items-end gap-3 flex-wrap">

                  <span className="text-4xl font-bold text-indigo-700">
                    ₹{product.price}
                  </span>

                  <span className="line-through text-gray-400">
                    ₹9999
                  </span>

                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                    25% OFF
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Inclusive of all taxes
                </p>

              </div>

              {/* Delivery */}
              <div className="space-y-2">

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>

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
              <div className="flex items-center gap-4">

                <span className="font-medium">
                  Quantity
                </span>

                <div className="flex border rounded-lg overflow-hidden">

                  <button className="px-4 py-2 hover:bg-gray-100">
                    -
                  </button>

                  <div className="px-5 py-2 bg-gray-50">
                    1
                  </div>

                  <button className="px-4 py-2 hover:bg-gray-100">
                    +
                  </button>

                </div>

              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button
                  className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-xl shadow cursor-pointer"
                >
                  Add to Cart
                </button>

                <button
                  className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 rounded-xl shadow cursor-pointer"
                >
                  Buy Now
                </button>

              </div>

              {/* Wishlist */}
              <button
                className="border rounded-xl py-3 hover:bg-gray-50 transition font-medium cursor-pointer"
              >
                🤍 Add to Wishlist
              </button>

              {/* Description */}
              <div>

                <h2 className="font-bold text-lg mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>

              </div>

              {/* Product Info */}
              <div className="border-t pt-5">

                <h2 className="font-bold text-lg mb-3">
                  Product Details
                </h2>

                <div className="grid grid-cols-2 gap-y-3 text-sm">

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
                    {product.category}
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
          </div >
        </div >
      )
      }
    </div >
  );
}
