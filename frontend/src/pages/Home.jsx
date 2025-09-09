// // src/pages/Home.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("token");

//   const [displayedTitle, setDisplayedTitle] = useState("");
//   const title = "Become the Best Version of Yourself";

//   useEffect(() => {
//     let words = title.split(" "); // exact words array
//     let current = "";

//     const interval = setInterval(() => {
//       if (words.length > 0) {
//         const nextWord = words.shift(); // take first word
//         current = current ? `${current} ${nextWord}` : nextWord;
//         setDisplayedTitle(current);
//       } else {
//         clearInterval(interval); // stop when done
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const handleChatClick = () => {
//     navigate(isLoggedIn ? "/chat" : "/login");
//   };

//   const handleQuizClick = () => {
//     navigate(isLoggedIn ? "/quiz" : "/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      
//       {/* Animated Background Circles */}
//       <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-10 left-10"></div>
//       <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-40 right-10"></div>
//       <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-1/2"></div>

//       {/* Centered Content */}
//       <main className="flex flex-1 flex-col items-center justify-center text-center px-4 relative z-10">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 mb-4 transition-all duration-500">
//           {displayedTitle}
//         </h1>
//         <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
//           Let's Learn, Grow, and Succeed Together with{" "}
//           <span className="font-bold text-purple-600">MindCraft</span>.
//         </p>

//         {/* Buttons */}
//         {isLoggedIn && (
//           <div className="flex flex-col md:flex-row gap-4">
//             <button
//               onClick={handleChatClick}
//               className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all"
//             >
//               Start Chat
//             </button>
//             <button
//               onClick={handleQuizClick}
//               className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all"
//             >
//               Start Quiz
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-4 text-gray-600 text-sm relative z-10">
//         © {new Date().getFullYear()} MindCraft — Learn Smarter
//       </footer>
//     </div>
//   );
// };

// export default Home;
// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const [displayedTitle, setDisplayedTitle] = useState("");
  const title = "Become the Best Version of Yourself";

  useEffect(() => {
    let words = title.split(" ");
    let current = "";

    const interval = setInterval(() => {
      if (words.length > 0) {
        const nextWord = words.shift();
        current = current ? `${current} ${nextWord}` : nextWord;
        setDisplayedTitle(current);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleChatClick = () => {
    navigate(isLoggedIn ? "/chat" : "/login");
  };

  const handleQuizClick = () => {
    navigate(isLoggedIn ? "/quiz" : "/login");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Animated Blobs */}
      <div className="absolute w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 top-1/3 right-10"></div>
      <div className="absolute w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 bottom-10 left-1/2"></div>

      {/* Centered Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 transition-all duration-500">
          {displayedTitle}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl bg-black/20 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg">
          Let's Learn, Grow, and Succeed Together with{" "}
          <span className="font-bold text-yellow-300">MindCraft</span>.
        </p>

        {/* Buttons */}
        {isLoggedIn && (
          <div className="flex flex-col md:flex-row gap-6">
            <button
              onClick={handleChatClick}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-xl hover:scale-110 hover:shadow-purple-400/50 transition-all"
            >
              💬 Start Chat
            </button>
            <button
              onClick={handleQuizClick}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-xl hover:scale-110 hover:shadow-orange-400/50 transition-all"
            >
              📝 Start Quiz
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-white/80 text-sm relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-300">MindCraft</span> — Learn
        Smarter ✨
      </footer>
    </div>
  );
};

export default Home;
