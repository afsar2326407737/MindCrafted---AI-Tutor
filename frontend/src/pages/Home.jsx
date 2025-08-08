// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleChatClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/chat");
    }
  };

  const handleQuizClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Centered Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-4">
          Become the Best Version of Yourself
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8">
          Let's Learn, Grow, and Succeed Together with MindCraft.
        </p>

        {/* Show buttons only if logged in */}
        {isLoggedIn && (
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleChatClick}
              className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Start Chat
            </button>
            <button
              onClick={handleQuizClick}
              className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Start Quiz
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
   <footer className="text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} MindCraft — Learn Smarter
   </footer>
    </div>
  );
};

export default Home;
