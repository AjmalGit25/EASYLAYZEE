import { NavLink } from "react-router-dom";
import { FiUser, FiPackage, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import { useState } from "react";

export default function AdminNavbar() {

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: <FiUser /> },
    { to: '/admin/products', label: 'Products', icon: <FiGrid /> },
    { to: '/add-product', label: 'Add Product', icon: <FiPackage /> }
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
      ? 'bg-white text-amber-800 shadow'
      : 'text-white/90 hover:bg-white/20'
    }`;

  const [open, setOpen] = useState(false);


  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="h-14 bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 shadow-lg flex items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <NavLink to="/admin-home" className="text-white font-extrabold text-lg sm:text-xl tracking-wide">
          ⚡ EASY<span className="text-yellow-300">LAYZEE</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="hidden sm:flex items-center gap-2">
          {links.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-white text-2xl p-1"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden bg-linear-to-b from-amber-600 to-amber-800 px-4 py-3 flex flex-col gap-2 shadow-xl">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {icon} {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
