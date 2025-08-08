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
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Quiz
        </Link>

        {/* Chat — requires login */}
        <button
          onClick={handleChatClick}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Chat
        </button>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
