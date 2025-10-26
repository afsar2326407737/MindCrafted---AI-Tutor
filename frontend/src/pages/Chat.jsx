import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
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
      formData.append("question", input);

      const res = await axios.post("http://localhost:8000/ask", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const botMessage = { text: res.data.answer || "No answer received.", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to the server.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h3: ({ node, ...props }) => (
                      <h3 className="font-semibold text-lg mt-2" {...props} />
                    ),
                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                    li: ({ node, ...props }) => (
                      <li className="ml-4 list-disc" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-purple-600" {...props} />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {loading && (
            <div className="p-3 rounded-lg max-w-xs bg-gray-200 italic text-gray-500">
              Thinking...
            </div>
          )}
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
