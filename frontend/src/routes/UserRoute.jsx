import { UserAuthProvider } from "../context/UserContext";
import { useUserAuth } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const UserRouteInner = ({ element }) => {
  const { user, loading } = useUserAuth();

  if (loading) return null;
  return user ? element : <Navigate to="/login" />;
};

const UserRoute = ({ element }) => (
  <UserAuthProvider>
    <UserRouteInner element={element} />
  </UserAuthProvider>
);

export default UserRoute;