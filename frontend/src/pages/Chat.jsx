// import React, { useState } from "react";

// const Chat = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hi! How can I help you today?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages((prev) => [...prev, { text: input, sender: "user" }]);
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           {
//             text: `World War II lasted from 1939 to 1945, involving over 30 nations.

// The main sides were the Allies (US, UK, USSR, China) and the Axis Powers (Germany, Italy, Japan).

// It began when Germany invaded Poland on September 1, 1939.

// Germany quickly conquered much of Europe, but failed to defeat Britain in the Battle of Britain.

// In 1941, Germany invaded the Soviet Union, and Japan attacked Pearl Harbor, bringing the US into the war.

// Major turning points included Stalingrad (1943) and Midway (1942).

// On D-Day (June 6, 1944), Allied forces landed in Normandy, opening a Western Front.

// Germany surrendered in May 1945 after Hitler’s suicide.

// The US dropped atomic bombs on Hiroshima and Nagasaki, leading to Japan’s surrender in August 1945.

// The war caused 70–85 million deaths and reshaped the global order, starting the Cold War.`,
//             sender: "bot",
//           },
//         ]);
//       }, 500);
//       setInput("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl flex flex-col h-[80vh]">
//         {/* Chat messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-4 rounded-lg whitespace-pre-line leading-relaxed max-w-4xl ${
//                 msg.sender === "user"
//                   ? "bg-blue-500 text-white ml-auto text-base"
//                   : "bg-gray-100 text-gray-900 text-lg"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Input bar */}
//         <div className="p-4 border-t flex gap-2">
//           <input
//             type="text"
//             className="flex-1 border rounded-lg p-3 text-base"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSend}
//             className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
// src/pages/Chat.jsx
import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "World War II lasted from 1939 to 1945, involving over 30 nations...",
            sender: "bot",
          },
        ]);
      }, 500);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">

      {/* Animated Background Circles */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-40 right-10"></div>
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-1/2"></div>

      {/* Chat Box */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl flex flex-col h-[80vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[80%] text-lg leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2 bg-gray-50">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
