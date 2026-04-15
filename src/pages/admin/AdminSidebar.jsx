import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaNewspaper,
  FaTags,
  FaComments,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isMobileOpen, closeMobileMenu }) => {
  const links = [
    { to: "/admin-dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/admin-dashboard/users-table", icon: FaUsers, label: "Users" },
    { to: "/admin-dashboard/posts-table", icon: FaNewspaper, label: "Posts" },
    {
      to: "/admin-dashboard/categories-table",
      icon: FaTags,
      label: "Categories",
    },
    {
      to: "/admin-dashboard/comments-table",
      icon: FaComments,
      label: "Comments",
    },
  ];

  const sidebarContent = (
    <>
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-3">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <button
          onClick={closeMobileMenu}
          className="text-gray-400 hover:text-white md:hidden"
        >
          <FaTimes size={24} />
        </button>
      </div>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <aside className="hidden md:block w-64 bg-gray-900 text-white flex-shrink-0 min-h-screen p-5">
        {sidebarContent}
      </aside>
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 w-64 bg-gray-900 text-white h-full z-50 p-5 shadow-xl md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
