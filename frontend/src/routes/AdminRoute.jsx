import { AdminAuthProvider } from "../context/AdminContext";
import { useAdminAuth } from "../context/AdminContext";
import { Navigate } from "react-router-dom";

const AdminRouteInner = ({ element }) => {
  const { admin, loading } = useAdminAuth();
  if (loading) return null;
  return admin ? element : <Navigate to="/admin/login" />;
};

const AdminRoute = ({ element }) => (
  <AdminAuthProvider>
    <AdminRouteInner element={element} />
  </AdminAuthProvider>
);

export default AdminRoute;