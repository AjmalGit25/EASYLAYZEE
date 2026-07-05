import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext.jsx";
import { FiEdit2, FiHeart, FiPackage, FiMapPin, FiCreditCard, FiLogOut } from "react-icons/fi";



function Account() {
  const { user, loading, logoutUser } = useUserAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <>

      {loading ? (
        <div className="min-h-screen bg-red-500">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>

      ) : (

        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-900">

          <div className="px-4 md:px-8 py-6 pt-20">

            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-2 tracking-tight">
                Hello, {user?.firstName}!
              </h1>
              <p className="text-gray-600">
                Manage your profile, orders, and shopping preferences in one place.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-5 mt-6 max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-[1fr_3fr]">
                <div className="">
                  {/* Account Summary */}
                  <div className="border border-gray-300 rounded-2xl p-4">
                    <div className="space-y-3 text-sm text-slate-700">
                      <h1 className="text-green-600 font-semibold">Account Summary</h1>
                      <p>
                        <span className="font-semibold text-slate-900">Name:</span> {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Email:</span> {user.email}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Phone:</span> {user.phone || "Not set"}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/account"
                        className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-95"
                      >
                        <FiEdit2 /> Edit profile
                      </Link>
                      <form onSubmit={handleLogout}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
                        >
                          <FiLogOut /> Log out
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    { label: "Orders", icon: FiPackage, value: "8+", detail: "Delivered & in progress" },
                    { label: "Wishlist", icon: FiHeart, value: "12", detail: "Saved favorites" },
                    { label: "Addresses", icon: FiMapPin, value: "3", detail: "Home & work" },
                    { label: "Payments", icon: FiCreditCard, value: "2", detail: "Secure saved cards" },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-3xl border border-slate-300 bg-slate-50 p-5 hover:bg-gray-100"
                      >
                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                          <Icon size={20} />
                          <span>{item.label}</span>
                        </p>

                        <p className="mt-3 text-3xl font-semibold text-slate-900">
                          {item.value}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* COU & PN */}
              <div className="flex items-center justify-around ga-4">
                <Link to="/coupage" className="border border-gray-300 p-2 px-4 rounded-full text-sm hover:bg-gray-200">Conditions of Use</Link>
                <Link to="/pnpage" className="border border-gray-300 p-2 px-4 rounded-full text-sm hover:bg-gray-200">Privacy Notice</Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Account;

