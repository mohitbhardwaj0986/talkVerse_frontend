  import React, { useEffect, useRef, useState } from "react";
  import { io } from "socket.io-client";
  import { FaPaperPlane } from "react-icons/fa";
  import { motion } from "framer-motion";
  import axios from "../axios/axios";
  import AiLeftSidebar from "../components/AiLeftSidebar";
  import { useData } from "../context/ContextApi";
  import ReactMarkdown from "react-markdown";
  import { FaBars, FaTimes } from "react-icons/fa";

  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  export default function AiChat() {
    const [messages, setMessages] = useState([
      {
        role: "ai",
        content: "Hello 👋, I'm TalkVerse AI. How can I help you today?",
      },
    ]);
    const { chatId } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef(null);

    // ✅ Auto-scroll
    useEffect(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, [messages, isLoading]);

    // ✅ Socket listeners
    useEffect(() => {
      socket.on("ai-response", (msg) => {
        setIsLoading(false);
        setMessages((prev) => [...prev, { role: "ai", content: msg.content }]);
      });

      socket.on("connect_error", (err) => {
        console.error("Socket error:", err);
      });

      return () => {
        socket.off("ai-response");
      };
    }, []);

    // ✅ Send Message
    const handleSend = () => {
      if (!input.trim()) return;

      const userMsg = { role: "user", content: input };
      setMessages((prev) => [...prev, userMsg]);

      socket.emit("ai-message", { content: input, chat: chatId });

      setInput("");
      setIsLoading(true);
    };

    // ✅ Fetch messages from backend when chatId changes
    useEffect(() => {
      if (!chatId) return;

      const fetchMessages = async () => {
        try {
          const res = await axios.get(`/chat/message/${chatId}`);
          // 👇 Assuming backend returns: [{ role: "user"|"ai", content: "..." }]
          setMessages(res?.data?.data || []);
          console.log(res?.data?.data);
          
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      };

      fetchMessages();
    }, [chatId]);

    return (
      <div className="h-screen  flex bg-gradient-to-br from-black via-[#0a0f0a] to-[#111] text-white">
        {/* LEFT SIDEBAR */}
    <AiLeftSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


        {/* MAIN CHAT */}
        <div className="flex-1 max-w-3xl flex flex-col">
          <FaBars onClick={()=>setSidebarOpen(!sidebarOpen)}
                      className="xl:hidden mt-5 ml-5"/>
          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="flex-1 container overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#0a0f0a] to-[#111] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-lg break-words ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-black font-medium shadow-green-500/30"
                      : "bg-[#1c1c1c] text-gray-200 border border-gray-700"
                  }`}
                >
                <ReactMarkdown>{msg.content}</ReactMarkdown> 
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl bg-[#1c1c1c] border border-gray-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800 bg-[#0d0d0d]">
            {chatId ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-green-400 placeholder-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-black font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-md"
                >
                  <FaPaperPlane />
                </button>
              </div>
            ) : (
              <h1 className="text-gray-400 text-center py-2">
                👉 Select or create a chat to start
              </h1>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
      
      </div>
    );
  }
