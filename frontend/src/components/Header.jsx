// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/chat");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-sm shadow-md fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-indigo-700">
        MindCraft
      </Link>

      {/* Nav Buttons */}
      <div className="flex gap-6 items-center">
        {/* Quiz */}
        <Link
          to="/quiz"
          className="text-gray-700 font-medium hover:text-indigo-600 hover:underline underline-offset-4"
        >
          Quiz
        </Link>

        {/* Chat */}
        <button
          onClick={handleChatClick}
          className="text-gray-700 font-medium hover:text-indigo-600 hover:underline underline-offset-4"
        >
          Chat
        </button>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
