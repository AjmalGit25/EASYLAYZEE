/* eslint-disable  */
import api from "../services/api.js";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

const syncGuestCart = async () => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  if (guestCart.length === 0) return;

  try {

    for (const { productId, quantity } of guestCart) {
      await api.post(`/cart/${productId}`, { quantity });
    }

    localStorage.removeItem("guestCart");
    toast.success("Guest cart synced successfully!");
  } catch (err) {
    console.error("Guest cart sync failed:", err);
    toast.error("Guest cart not synced!");

    console.error("Guest cart sync failed:", err);
    console.log(err.response?.status);
    console.log(err.response?.data);
    console.log(err.config?.url);

  }
};

// Plain provider — no fetch. Used by login/signup pages.
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData, token) => {
    setUser(userData);
  };
  const signupUser = (userData, token) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      await api.post("/user/logout", {});

      localStorage.removeItem("guestCart");
      toast.success("Logout successfully");
      setUser(null);
    } catch (error) {
      toast.error("Error during logout!");
      console.log("Error during logout!", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading: false, loginUser, signupUser, logoutUser, syncGuestCart }}>
      {children}
    </UserContext.Provider>
  );
};

// Auth provider — fetches /me. Used only inside UserRoute.
export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      await api.post("/user/logout", {});

      localStorage.removeItem("guestCart");
      toast.success("Logout successfully");
      setUser(null);
    } catch (error) {
      console.log("Error during logout!", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};