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
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-indigo-700">
        MindCraft
      </Link>

      {/* Nav Buttons */}
      <div className="flex gap-4 items-center">
        {/* Quiz always visible */}
        <Link
          to="/quiz"
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded shadow hover:from-indigo-700 hover:to-purple-700 transition"
        >
          Quiz
        </Link>

        {/* Chat — requires login */}
        <button
          onClick={handleChatClick}
          className="px-4 py-2 bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-600 text-white rounded shadow hover:from-blue-800 hover:to-cyan-700 transition"
        >
          Chat
        </button>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
            //   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded shadow hover:from-blue-700 hover:to-blue-500 transition"
            // >
            className="px-4 py-2 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 text-white rounded shadow-lg hover:from-blue-500 hover:to-green-500 transition"
  >
              Login
            </Link>
            <Link
              to="/signup"
            //   className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-400 text-white rounded shadow hover:from-teal-700 hover:to-cyan-500 transition"
            // >
             className="px-4 py-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-white rounded shadow-lg hover:from-blue-400 hover:to-pink-400 transition"
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
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded shadow hover:from-red-700 hover:to-pink-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
