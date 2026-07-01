import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiPackage, FiGrid, FiMenu, FiX } from 'react-icons/fi';

const links = [
  { to: '/products', label: 'Products', icon: <FiGrid /> },
  { to: '/account',  label: 'Account',  icon: <FiUser /> },
  { to: '/orders',   label: 'Orders',   icon: <FiPackage /> },
  { to: '/cart',     label: 'Cart',     icon: <FiShoppingCart /> },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-white text-indigo-700 shadow'
      : 'text-white/90 hover:bg-white/20'
  }`;

export default function UserNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Main bar */}
      <div className="h-14 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg flex items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <NavLink to="/" className="text-white font-extrabold text-lg sm:text-xl tracking-wide">
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
        <div className="sm:hidden bg-linear-to-b from-purple-700 to-indigo-800 px-4 py-3 flex flex-col gap-2 shadow-xl">
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
