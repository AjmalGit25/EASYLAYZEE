import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { useAdminAuth } from "../../context/AdminContext.jsx";
import { FiEdit2, FiLogOut } from "react-icons/fi";

export default function Dashboard() {
  const { admin, logoutAdmin } = useAdminAuth();

  const footerHeader = "text-sm md:text-xl font-semibold";
  const footerText = "hover:text-orange-500 transition-colors duration-300";

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen">

      {/* Navbar for both - Mobile & Tablet */}
      <AdminNavbar />

      <div className="px-4 md:px-8 py-6 pt-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl mb-4 text-transparent bg-clip-text font-black bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 leading-none p-1.5 drop-shadow-sm">
            Welcome to EasyLayzee Admin Dashboard
          </h1>
          <p className="text-black/90 max-w-2xl mx-auto">Manage your products and inventory efficiently</p>
        </div>

        <div className="max-w-7xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-green-600 mb-3">Account Summary</h3>
              <div className="text-black/80 space-y-2">
                <p><strong>Name:</strong> {admin.firstName + " " + admin.lastName}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Phone:</strong> {admin.phone}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  <FiEdit2 /> Edit profile
                </Link>
                <form action={handleLogout} method="POST">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-slate-100 cursor-pointer"
                  >
                    <FiLogOut /> Log out
                  </button>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-black mb-2">Product Management</h3>
                <p className="text-black/80 mb-4">Add, edit, and delete products from your inventory</p>
                <Link to="/admin/products" className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-300">
                  Manage Products
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-black mb-2">Order Processing</h3>
                <p className="text-black/80 mb-4">View and manage customer orders</p>
                <Link to="/admin/orders" className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-300">
                  View Orders
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-black mb-2">Analytics</h3>

              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 pt-20">
        <p>
          Vitae explicabo veritatis dolorem fuga minus possimus placeat doloremque, dolorum eveniet iusto quaerat neque eius qui voluptate esse natus iste architecto modi saepe deleniti voluptas porro perferendis. Odit, a debitis!
          Omnis ullam nulla voluptate provident accusamus sapiente quaerat reprehenderit non veniam voluptatibus, nisi, at repellendus ipsam eaque iusto harum cupiditate hic deleniti fugiat laudantium, aut debitis maiores minus! Sit, quos.
          Dolore velit ex quod recusandae tempore vel amet minima reprehenderit quisquam similique, autem officiis in quia provident maxime! Quis totam eum maxime qui atque expedita voluptas et autem ipsa est.
          Vel quisquam a rem minus aliquid sint harum totam? Ullam error reprehenderit consequatur corrupti consectetur esse, tenetur fuga, in dignissimos non obcaecati eveniet dolore, cupiditate maiores eius possimus? Aliquid, debitis?
          Adipisci molestiae consectetur delectus ea omnis architecto rem vitae ullam asperiores! Minus illum ex impedit at, officia quibusdam recusandae voluptatum debitis natus enim accusamus est ea iste suscipit ab pariatur.
          Debitis dolores vitae ea atque nemo adipisci nobis tempore aperiam voluptatem quos omnis necessitatibus, recusandae veritatis voluptas delectus sed deleniti odit distinctio incidunt saepe dignissimos pariatur culpa? Expedita, porro vitae?
        </p>
      </div>

      {/* Footer ================================================================ */}
      <div className="w-full bg-sky-900">
        {/* Upper - Grid */}
        <div className="grid grid-cols-3 justify-between gap-5 p-3 md:p-5 text-white/80 text-sm">

          {/* Left Column */}
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-lg md:text-2xl font-extrabold">EASYLAYZEE</h3>
            <div className="flex flex-col gap-3 text-[12px]">
              <a href="">Facebook</a>
              <a href="">Instagram</a>
              <a href="">Twitter</a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-5 items-center">
            <h3 className={footerHeader}>Make Money with Us</h3>
            <div className="flex flex-col gap-3 text-[12px]">
              <a href="" className={footerText}>Sell on EasyLayzee</a>
              <a href="" className={footerText}>Create an Admin Account</a>
              <a href="" className={footerText}>Become an Affiliate</a>
            </div>
          </div>

          {/* Right Column  */}
          <div className="flex flex-col gap-5 items-center">
            <h3 className={footerHeader}>Help and Support</h3>
            <div className="flex flex-col gap-3 text-[12px]">
              <a href="" className={footerText}>Customer Care</a>
              <a href="" className={footerText}>Chat with Us</a>
              <a href="" className={footerText}>Toll Free Number</a>
            </div>
          </div>
        </div>

        {/* Lower */}
        <div className="bg-sky-950 text-white/80 space-y-5 py-3">
          <div className="flex items-center justify-center gap-10 text-[12px] md:text-sm">
            <Link to="/coupage" className={footerText}>Conditions of Use</Link>
            <Link to="/pnpage" className={footerText}>Privacy Notice</Link>
          </div>

          <div className="text-center">
            <p className="text-[10px]">© 2026 EASYLAYZEE. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
