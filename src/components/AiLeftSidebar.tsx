import { useState, useEffect } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";

import axios from "../axios/axios";
import { useData } from "../context/ContextApi";
import {Link} from 'react-router-dom'
  import {FaTimes } from "react-icons/fa";
import LogoutButton from "./LogoutButton";

interface Chat {
  _id: string;
  title: string;
}
interface AiLeftSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function AiLeftSidebar({ sidebarOpen, setSidebarOpen }: AiLeftSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [newChatTitle, setNewChatTitle] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const {setChatId } = useData();
  const getChatHandle = (id:string) => {
    setActiveChatId(id);
    setChatId(id)
    
  };


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get<{ data: Chat[] }>(
          "/chat/68a81f9b503215ee775946db"
        );
        
        setChats(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };
    fetchChats();
  }, []);

  const handleCreateChat = async () => {
    if (!newChatTitle.trim()) return;
    try {
      const res = await axios.post<{ data: Chat }>("/chat/create", {
        title: newChatTitle.trim(),
      });
      setChats((prev) => [res.data.data, ...prev]);
      setActiveChatId(res.data.data._id); // auto-focus new chat
      setNewChatTitle("");
      setShowInput(false);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  };

  return (
     <div
        className={`w-80 h-full xl:static absolute  top-0 transition-all duration-300 bg-[#00100a] flex flex-col border-r border-gray-800 
    ${sidebarOpen ? "left-0" : "-left-full"}`}
      >
      {/* Header */}
      <div className="px-6 py-4 font-bold text-lg text-green-400 border-b border-gray-800 flex justify-between items-center">
        TalkVerse
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-teal-500 text-black rounded-lg hover:scale-[1.05] transition"
        >
          <FiPlus /> New
        </button>
        <FaTimes onClick={()=> setSidebarOpen(!sidebarOpen)}
                    className="xl:hidden"
                    />
      </div>

      {/* Create Chat Input */}
      {showInput && (
        <div className="p-3 border-b border-gray-800 flex gap-2">
          <input
            type="text"
            placeholder="Enter chat title..."
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateChat()}
            className="flex-1 px-3 py-2 rounded-lg bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:border-green-400"
          />
          <button
            onClick={handleCreateChat}
            className="px-3 py-1 bg-green-600 font-semibold text-xs rounded-lg hover:bg-green-500 transition"
          >
            Create
          </button>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => getChatHandle(chat._id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition border 
                ${
                  activeChatId === chat._id
                    ? "bg-green-900/40 border-green-500 text-green-300"
                    : "bg-[#111] hover:bg-[#1a1a1a] border-transparent hover:border-green-400/40"
                }`}
            >
              <FiMessageSquare
                className={`${
                  activeChatId === chat._id
                    ? "text-green-300"
                    : "text-green-400"
                }`}
              />
              <span>{chat.title}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No chats yet</p>
        )}
      </div>

      {/* Logout */}
      <div className="px-6 py-3 border-t border-gray-800">
      <Link
        to="/userchat"
        className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
      >
        <FiMessageSquare className="text-lg group-hover:scale-110 transition-transform" />
        <span className="font-medium">Talk with Friend</span>
      </Link>
    </div>
      <div className="px-6 py-4 border-t border-gray-800 flex items-center gap-2 cursor-pointer hover:text-green-400 transition">
        <LogoutButton/>
      </div>
    </div>
  );
}

export default AiLeftSidebar;
