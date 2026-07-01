// Previous code 
{/* Product Details */ }
<div className="flex flex-wrap">
  {/* Left section - Product Info */}
  <div className="hidden sm:block md:w-1/3 p-4">
    <div className="space-y-5">
      <h1 className="uppercase tracking-tight text-white text-xl sm:text-3xl md:text-5xl font-extrabold">Eat Our Grilled Potato Chips</h1>
      <h2 className="text-white text-md sm:text-2xl font-bold">{currentProduct.name}</h2>
      <p className="text-white/60 text-xs sm:text-base">{currentProduct.description}</p>

      <div className="flex gap-5 items-center">
        <div className="border-2 border-white text-white font-bold text-xl bg-white/40 rounded-xl flex items-center gap-7 px-5 py-3">
          <span className=""><CiCircleMinus /></span>
          <span className="">1</span>
          <span className=""><CiCirclePlus /></span>
        </div>
        <p className="text-white tracking-tight text-xl sm:text-3xl md:text-5xl font-extrabold">$ {currentProduct.price}</p>
        <Link to="/payment"
          className="bg-white border-2 border-white rounded-xl text-xl font-bold px-5 py-3 shadow-lg shadow-sky-300/60">Order Now</Link>
      </div>
    </div>
  </div>

  {/* Middle section - Product Image */}
  <div className="w-1/2 p-4">
    <img
      src={currentProduct.image}
      alt={currentProduct.name}
      className="w-90 h-120 object-cover"
    />
  </div>
  {/* Right section - Product Vertical Scroller */}
  <div className="w-1/8 p-4 md:w-1/8">
    <h3 className="text-xl font-semibold">Other Products</h3>
    <div className="flex flex-col space-y-4">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => setCurrentProduct(product)}
          className={`p-2 rounded-md cursor-pointer ${currentProduct.id === product.id ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {product.name}
        </button>
      ))}
    </div>
  </div>

  {/* Product Info - visible only on mobile, below image+slider */}
  <div className="block sm:hidden w-full p-4">

    {/* Cart button */}
    <div className="border border-black/20 rounded-xl overflow-hidden w-32 h-10">
      <div className="grid grid-cols-3 items-center justify-center rounded-xl">
        <button className="hover:bg-mauve-500 p-0 sm:p-2 border-r border-white/20 transition-colors duration-300 cursor-pointer" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
          <RiSubtractFill />
        </button>
        <span className="text-center text-xl p-0 sm:p-2">{quantity}</span>
        <button className="hover:bg-mauve-500 p-0 sm:p-2 border-l border-white/20 transition-colors duration-300 cursor-pointer" onClick={() => setQuantity(prev => prev + 1)}>
          <RiAddFill />
        </button>
      </div>
    </div>

        const cartHandler = async (product, quantity) => {
          // Logged-in user
          if (user) {
            // Load cart of the user and check if the product is already in the cart
      
            const response = await axios.post(
              `http://localhost:5000/api/v1/user/addCart/${product._id}`,
              { quantity },
              { withCredentials: true }
            );
      
            console.log("Cart update response: ", response.data);
            console.log("Updated cart data: ", response.data.cartData);
      
          }
      
          // Guest cart logic
          else {
            const existingItem = guestCart.find(item => item.productId === product._id);
      
            let updatedCart;
      
            if (existingItem) {
              updatedCart = guestCart.map(item =>
                item.productId === product._id ? { ...item, quantity: item.quantity + quantity } : item
              );
            } else {
              updatedCart = [
                ...guestCart,
                {
                  productId: product._id,
                  quantity: quantity > 0 ? quantity : 1, // Ensure at least 1 quantity when adding a new product
                }
              ];
            }
      
            localStorage.setItem(
              "guestCart",
              JSON.stringify(updatedCart)
            );
      
            setGuestCart(updatedCart);
          }
        };
  </div>

</div>

// Cart API
// const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4500/api/v1/user/carts", { withCredentials: true });

  //       setCart(response.data.cartData);
  //       console.log("Cart data fetch result: ", response.data.cartData);

  //     } catch (error) {
  //       console.log("Error in fetching cart!", error);
  //     }
  //   };

  //   fetchCart();      // call the function
  // }, []);