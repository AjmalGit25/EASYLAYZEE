import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminRoute from './routes/AdminRoute.jsx';
import UserRoute from './routes/UserRoute.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

import "./App.css";

import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

// User Pages
import Home from './pages/user/Home.jsx';
import SignUp from './pages/user/SignUp.jsx';
import Login from './pages/user/LogIn.jsx';
import Account from './pages/user/Account.jsx';
import Payment from './pages/user/Payment.jsx';
import Cart from './pages/user/Cart.jsx';
import ProductDetails from './pages/user/ProductDetails.jsx';
import Products from './pages/user/Products.jsx';
import Checkout from './pages/user/Checkout.jsx';

// Admin Pages
import AdminSignup from "./pages/admin/AdminSignup.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminHome from './pages/admin/AdminHome.jsx';
import AddProduct from "./pages/admin/AddProduct.jsx";
import Orders from "./pages/admin/Orders.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";

// Common Pages
import NotFound from './pages/NotFound.jsx';
import COUPage from './pages/COUPage.jsx';
import PNPage from './pages/PNPage.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [

      // User Routes
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "account", element: <UserRoute element={<Account />} /> },
      { path: "cart", element: <UserRoute element={<Cart />} /> },
      { path: "checkout", element: <UserRoute element={<Checkout />} /> },
      { path: "payment", element: <UserRoute element={<Payment />} /> },

      // Admin Routes
      { path: "admin/signup", element: <AdminSignup /> },
      { path: "admin/login", element: <AdminLogin /> },
      { path: "dashboard", element: <AdminRoute element={<Dashboard />} /> },
      { path: "admin-home", element: <AdminRoute element={<AdminHome />} /> },
      { path: "add-product", element: <AdminRoute element={<AddProduct />} /> },
      { path: "update-product", element: <AdminRoute element={<UpdateProduct />} /> },
      { path: "update-product/:id", element: <AdminRoute element={<UpdateProduct />} /> },
      { path: "admin/orders", element: <AdminRoute element={<Orders />} /> },
      { path: "admin/products", element: <AdminRoute element={<AdminProducts />} /> },


      // Common Routes
      { path: "coupage", element: <COUPage /> },
      { path: "pnpage", element: <PNPage /> },
      { path: "*", element: <NotFound /> }
    ]
  },
  { path: "*", element: <NotFound /> }
]);

// Setup Router in main.jsx         // ✅ Modern Way (Recommended Today)
createRoot(document.getElementById("root")).render(
  <UserProvider>
    <AdminProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AdminProvider>
  </UserProvider>
);