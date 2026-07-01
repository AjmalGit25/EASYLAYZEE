import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <UserNavbar />

      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">

        {/* Glowing 404 */}
        <div className="relative select-none">
          <span className="text-[10rem] sm:text-[14rem] font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-600 via-purple-500 to-pink-500 leading-none drop-shadow-sm">
            404
          </span>
          <span className="absolute inset-0 text-[10rem] sm:text-[14rem] font-black text-indigo-200 leading-none blur-2xl -z-10 select-none">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">
          Oops! Page not found.
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-md">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-full text-white font-semibold text-sm bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-90 transition-opacity shadow-md"
          >
            Browse Products
          </Link>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full text-indigo-600 font-semibold text-sm border border-indigo-300 bg-white hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  );
}
