// import React, { useState } from "react";

// const Quiz = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages([...messages, { text: input, sender: "user" }]);
//       setInput("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl flex flex-col h-[70vh]">
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {messages.length === 0 && (
//             <p className="text-gray-500 text-center">Start your quiz chat here...</p>
//           )}
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-lg max-w-xs ${
//                 msg.sender === "user" ? "bg-orange-400 text-white ml-auto" : "bg-gray-200"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="p-4 border-t flex gap-2">
//           <input
//             type="text"
//             className="flex-1 border rounded-lg p-2"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your quiz message..."
//           />
//           <button
//             onClick={handleSend}
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
// src/pages/Quiz.jsx
import React, { useState } from "react";

const Quiz = () => {
  const questions = [
    { q: "What is 2 + 2?", a: "4" },
    { q: "Capital of France?", a: "Paris" },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === questions[current].a.toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer("");
    setCurrent(current + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">

      {/* Animated Background Circles */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-40 right-10"></div>
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-1/2"></div>

      {/* Quiz Box */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6 text-center">
          {current < questions.length ? (
            <>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                {questions[current].q}
              </h2>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="border p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your answer..."
              />
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-2 rounded-lg hover:scale-105 transition"
              >
                Submit
              </button>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-green-600">
              Quiz Finished! Score: {score} / {questions.length}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
