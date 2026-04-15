import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaBars } from "react-icons/fa";

const AdminLayout = ({ children, title }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        closeMobileMenu={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1">
        <div className="md:hidden bg-white shadow-sm p-4 flex items-center gap-3 sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
