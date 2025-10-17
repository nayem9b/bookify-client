import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import { FiMenu, FiX, FiHome, FiUsers, FiPackage, FiHeart, FiPlusCircle, FiShoppingBag } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);


  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="w-5 h-5" />,
      visible: true
    },
    {
      title: "All Buyers",
      path: "/dashboard/allbuyers",
      icon: <FiUsers className="w-5 h-5" />,
      visible: true
    },
    {
      title: "All Sellers",
      path: "/dashboard/allsellers",
      icon: <FiUsers className="w-5 h-5" />,
      visible: true
    },
    {
      title: "My Orders",
      path: "/dashboard/myorders",
      icon: <FiPackage className="w-5 h-5" />,
      visible: true
    },
    {
      title: "Wishlist",
      path: "/dashboard/wishlist",
      icon: <FiHeart className="w-5 h-5" />,
      visible: true
    },
    {
      title: "My Products",
      path: "/dashboard/myproducts",
      icon: <FiPackage className="w-5 h-5" />,
      visible: true
    },
    {
      title: "Add Product",
      path: "/dashboard/addaproduct",
      icon: <FiPlusCircle className="w-5 h-5" />,
      visible: true
    }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile header */}
      <div className="bg-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {sidebarOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
            <span className="ml-4 text-xl font-semibold text-gray-800">Bookify</span>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
 <Navbar/>
      <div className="flex flex-1 overflow-hidden mt-24">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-indigo-700">Bookify</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.displayName || 'User'}</p>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-4">
                {menuItems.map((item) =>
                  item.visible ? (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.title}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => logOut()}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
