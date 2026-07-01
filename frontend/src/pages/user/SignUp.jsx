import api from "../../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import { FiUser, FiPhone, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { syncGuestCart } = useUserAuth();

  const handleFormData = async () => {
    try {
      await api.post("/user/signup", { firstName, lastName, mobileNumber, email, password, confirmPassword });
      
      setError("");
      await syncGuestCart();
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong in Signup!");
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg p-2.5 pl-10 outline-none text-sm bg-gray-50 transition-all duration-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">

      <div className="flex items-center justify-center min-h-screen pt-18 px-4 py-8">
        <div className="w-full max-w-xl">

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
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-7 text-center">
              <p className="text-white/80 text-3xl font-black tracking-wide">
                ⚡ EASY<span className="text-yellow-300">LAYZEE</span>
              </p>
              <p className="text-white/70 text-sm mt-1">Create your account and start shopping</p>
            </div>

            {/* Card Body */}
            <div className="px-8 py-7">
              <form onSubmit={(e) => { e.preventDefault(); handleFormData(); }} className="space-y-4">

                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        id="firstName" type="text" required placeholder="John"
                        className={inputClass} value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>Last Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        id="lastName" type="text" placeholder="Doe"
                        className={inputClass} value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobileNumber" className={labelClass}>Mobile Number</label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm bg-gray-50 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>
                      <div className="relative flex-1">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          id="mobileNumber" type="tel" required placeholder="9876543210"
                          className={inputClass} value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        id="email" type="email" required placeholder="example@gmail.com"
                        className={inputClass} value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className={labelClass}>Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        id="password" type={showPassword ? "text" : "password"} required
                        placeholder="Min. 5 characters"
                        className={`${inputClass} pr-10`} value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors">
                        {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        id="confirmPassword" type={showConfirm ? "text" : "password"} required
                        placeholder="Re-enter password"
                        className={`${inputClass} pr-10`} value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowConfirm(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors">
                        {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-md mt-1"
                >
                  Create Account
                </button>
              </form>

              {/* Footer */}
              <div className="mt-5 space-y-2 text-center">
                <p className="text-xs text-gray-400">
                  By signing up, you agree to{" "}
                  <Link to="/coupage" className="text-indigo-500 hover:underline">Conditions of Use</Link> and{" "}
                  <Link to="/pnpage" className="text-indigo-500 hover:underline">Privacy Notice</Link>
                </p>
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
