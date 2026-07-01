/* eslint-disable  */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../services/api.js";

const AdminContext = createContext();

// Plain provider — no fetch. Used by login/signup pages.
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const signupAdmin = (adminData) => setAdmin(adminData);
  const loginAdmin = (adminData) => setAdmin(adminData);

  const logoutAdmin = async () => {
    try {
      await api.post("/admin/logout", {});
      setAdmin(null);
    } catch (error) {
      console.log("Error during logout!", error);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, loading: false, signupAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

// Auth provider — fetches /me. Used only inside AdminRoute.
export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get("/admin/me");
        setAdmin(response.data.admin);
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // useEffect(() => {
  //   console.log("UserAuthProvider mounted");

  //   return () => console.log("UserAuthProvider unmounted");
  // }, []);

  const logoutAdmin = async () => {
    try {
      await api.post("/admin/logout", {});
      toast.error("Logout successfully");
      setAdmin(null);
    } catch (error) {
      toast.error("Error during logout!");
      console.log("Error during logout!", error);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, loading, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(AdminContext);
};