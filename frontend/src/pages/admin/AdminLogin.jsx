import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminContext.jsx";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const handleFormData = async () => {
    console.log(email, password);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/admin/login", {
        email,
        password
      }, {
        withCredentials: true,
      }
      );

      loginAdmin(response.data.admin);
      toast.success("Login successful");
      setError("");

      // navigate after login
      setTimeout(() => { navigate("/dashboard"); }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong in Admin Signin!");
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg p-2.5 pl-10 outline-none text-sm transition-all duration-200 bg-gray-50 hover:border-orange-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 focus:bg-white";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">

      <div className="flex items-center justify-center min-h-screen pt-14 px-4">
        <div className="w-full max-w-md">

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 border border-red-300 bg-red-50 rounded-xl text-red-600 text-sm">
              <ul className="list-disc pl-3 text-xs sm:text-sm">
                {(Array.isArray(error) ? error : [error]).map((err, i) => (<li key={i}>{err}</li>))}
              </ul>
            </div>
          )}

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 px-8 py-8 text-center">
              <p className="text-white/80 text-3xl font-black tracking-wide">
                ⚡ EASY<span className="text-yellow-300">LAYZEE</span>
              </p>
              <p className="text-white/70 text-sm mt-1">Hi Admin! Sign in to your account</p>
            </div>

            {/* Card Body */}
            <div className="px-8 py-7">
              <form onSubmit={(e) => { e.preventDefault(); handleFormData(); }} className="space-y-5">

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="email" type="email" required
                      placeholder="example@gmail.com"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Your password"
                      className={`${inputClass} pr-10`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-md mt-2"
                >
                  Sign In
                </button>
              </form>

              {/* Footer */}
              <div className="mt-5 space-y-2 text-center">
                <p className="text-xs text-gray-400">
                  By signing in, you agree to{" "}
                  <Link to="/coupage" className="text-indigo-500 hover:underline">Conditions of Use</Link> and{" "}
                  <Link to="/pnpage" className="text-indigo-500 hover:underline">Privacy Notice</Link>
                </p>
                <p className="text-sm text-gray-500">
                  New customer?{" "}
                  <Link to="/admin/signup" className="text-amber-600 font-medium hover:underline">Create account</Link>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminLogin;
