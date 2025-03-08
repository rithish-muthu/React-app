import React from "react";
import logo from "./assets/images.png";

import { useState, useEffect, useRef, } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const iscart = location.pathname ==='/cart'

  // Check if user exists in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsProfileOpen(false);

  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="bg-[#d3e3fd] p-3">
      <div className="flex items-center justify-between pr-4 pl-4">
        <div className="flex gap-10 items-center">
          <img
            src={logo}
            alt="Logo"
            height="50px"
            width="50px"
            className="mix-blend-multiply"
          />
          <h1 className="text-3xl">ACCESS-HUB</h1>
        </div>
        <div>
          <div className="flex space-x-6">
            <Link to="/" className="relative group">
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
                Home
              </h2>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="relative group">
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
                Blogs
              </h2>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/aboutus" className="relative group">
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
                About Us
              </h2>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {!user ? (
              <Link to="/signup" className="relative group">
                <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
                  Sign Up
                </h2>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  className="cursor-pointer text-gray-700 text-xl hover:text-blue-500 transition-colors duration-200"
                  onClick={toggleProfile}
                  aria-expanded={isProfileOpen}
                  aria-label="Toggle profile menu"
                >
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-72 bg-white p-4 border rounded-lg shadow-lg transition-all duration-300 transform ${
                    isProfileOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="text-gray-800 font-medium">
                      <strong>First Name:</strong> {user.fullName || "N/A"}
                    </div>
                    <div className="text-gray-800 font-medium">
                      <strong>Email:</strong> {user.email || "N/A"}
                    </div>
                  </div>


                  { !iscart &&
                  <Link to={'cart'}>
                  <button className="mt-4 w-full bg-blue-200 text-black font-semibold py-2 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-600 active:scale-95">
                    My Cart
                  </button>
                  </Link>
                  }

                  <button
                    className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-red-600 active:scale-95"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
