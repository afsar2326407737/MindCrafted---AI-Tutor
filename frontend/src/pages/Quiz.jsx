import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Quiz = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("content", input);
      formData.append("num_questions", 5);

      const res = await axios.post(
        "http://127.0.0.1:8000/generate-quiz",
        formData
      );
      const quizText = res.data.quiz;

      const botMessage = { text: quizText, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Failed to generate quiz. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl flex flex-col h-[70vh]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">
              Start your quiz chat here...
            </p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[90%] ${
                msg.sender === "user"
                  ? "bg-orange-400 text-white ml-auto"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="prose max-w-none text-gray-800">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h3: ({ node, ...props }) => (
                      <h3 className="font-semibold text-lg mt-2" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2 leading-relaxed" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-6 list-disc" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong
                        className="font-bold text-purple-600"
                        {...props}
                      />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-center text-gray-400 italic">
              Generating quiz...
            </p>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter topic or content to generate quiz..."
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
