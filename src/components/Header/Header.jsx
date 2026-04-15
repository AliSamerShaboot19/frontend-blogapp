import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import {
  FaBlog,
  FaHome,
  FaNewspaper,
  FaPlusCircle,
  FaCrown,
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/api/authApi";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.2 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.1 } },
  };

  const navItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/posts", icon: <FaNewspaper />, label: "Posts" },
  ];
  if (user) {
    navItems.push({
      path: "/posts/create-post",
      icon: <FaPlusCircle />,
      label: "Create",
    });
  }
  if (user?.isAdmin) {
    navItems.push({
      path: "/admin-dashboard",
      icon: <FaCrown />,
      label: "Admin Dashboard",
    });
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 md:py-4">
          <NavLink to="/" className="flex items-center gap-2">
            <FaBlog className="text-2xl text-blue-400" />
            <span className="text-xl font-bold text-white">MyBlog</span>
          </NavLink>

          <nav className="hidden md:block">
            <ul className="flex gap-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                >
                  <FaSignInAlt /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <FaUserPlus /> Register
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 transition"
                >
                  {user?.profilePhoto ? (
                    <img
                      src={user.profilePhoto.url}
                      alt={user?.username}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-gray-400" />
                  )}
                  <span className="font-medium">{user?.username}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-700"
                    >
                      <Link
                        to={`/profile/${user?._id}`}
                        onClick={closeDropdown}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
                      >
                        <FaUser /> Profile
                      </Link>
                      <button
                        onClick={() => dispatch(logoutUser())}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="p-2 text-gray-300 rounded-md md:hidden hover:bg-gray-800 hover:text-white"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden md:hidden"
            >
              <nav className="py-3 border-t border-gray-800">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-md ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}

                  <div className="flex flex-col gap-1 pt-3 mt-2 border-t border-gray-800">
                    {!user ? (
                      <>
                        <NavLink
                          to="/login"
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                        >
                          <FaSignInAlt /> Login
                        </NavLink>
                        <NavLink
                          to="/register"
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          <FaUserPlus /> Register
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/profile/${user?._id}`}
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                        >
                          {user?.profilePhoto ? (
                            <img
                              src={user?.profilePhoto?.url}
                              alt=""
                              className="w-5 h-5 rounded-full"
                            />
                          ) : (
                            <FaUserCircle className="text-xl" />
                          )}
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={() => dispatch(logoutUser())}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white w-full text-left"
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </>
                    )}
                  </div>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
