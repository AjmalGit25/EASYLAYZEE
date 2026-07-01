import { Outlet } from "react-router-dom";
import { useAdminAuth } from "../src/context/AdminContext.jsx";
import UserNavbar from "../src/components/UserNavbar.jsx";
import AdminNavbar from "../src/components/AdminNavbar.jsx";

export default function App() {
  const { admin } = useAdminAuth();
  return (
    <div className="min-h-screen relative">
      {admin ? (<AdminNavbar/>) : (<UserNavbar />)}

      <Outlet />

    </div>
  )
}
