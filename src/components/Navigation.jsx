import React from "react";
import { useLocation, Link } from "react-router";

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium 
${
  location.pathname === "/"
    ? "border-blue-500 text-gray-900"
    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
}`}
            >
              Home
            </Link>

            <Link
              to="/Companys"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium 
${
  location.pathname === "/Companys"
    ? "border-blue-500 text-gray-900"
    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
}`}
            >
              Companys
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
