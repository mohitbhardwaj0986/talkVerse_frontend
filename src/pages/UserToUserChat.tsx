import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import axios from "../axios/axios"; // axios instance
import { isObject } from "framer-motion";
import LogoutButton from "../components/LogoutButton";

interface Message {
  _id?: string;
  user: string;
  userChat: string;
  content: string;
  createdAt?: string;
}

interface JoinedChat {
  chatId: string;
  members: { _id: string; userName: string }[];
}

interface Chat {
  _id: string;
  title: string;
  inviteToken?: string;
}

function UserToUserChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [userId] = useState<string>("");
  const [members, setMembers] = useState<{ _id: string; userName: string }[]>(
    []
  );
  const [chats, setChats] = useState<Chat[]>([]);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

  /* -------------------- SOCKET.IO -------------------- */
  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    socket.on("joined-chat", ({ chatId, members }: JoinedChat) => {
      setChatId(chatId);
      setMembers(members);
      setMessages([]); // reset when switching chat
      console.log("📥 Joined chat:", chatId, members);
    });

    socket.on("new-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      console.log("💬 New message:", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* -------------------- SCROLL TO LAST MESSAGE -------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------------------- API CALLS -------------------- */
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`/chat/user/${userData?.userId}`);
        setChats(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching chats:", err);
      }
    };
    fetchChats();
  }, [inviteLink]);

  const createChat = async () => {
    const title = prompt("Enter chat title:");
    if (!title) return;
    try {
      const res = await axios.post("/chat/user/create", { title });
      setChats((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error("❌ Error creating chat:", err);
    }
  };

  const generateInvite = async (id: string) => {
    try {
      const res = await axios.post(`/chat/user/${id}/invite`);
      setInviteLink(res.data.data.link);
    } catch (err) {
      console.error("❌ Error generating invite:", err);
    }
  };

  const joinByLink = async (inviteToken: string) => {
    try {
      await axios.post(`/chat/join/${inviteToken}`);
      socketRef.current?.emit("join-chat", { inviteToken }); // 👈 safe emit
    } catch (err) {
      console.error("❌ Error joining chat:", err);
    }
  };
  const newjoinByLink = async () => {
    try {
      const inviteToken = prompt("Enter invite token:");
      if (!inviteToken) return;

      await axios.post(`/chat/join/${inviteToken}`);
      socketRef.current?.emit("join-chat", { inviteToken }); // 👈 safe emit
    } catch (err) {
      console.error("❌ Error joining chat:", err);
    }
  };

  /* -------------------- SEND MESSAGE -------------------- */
  const sendMessage = () => {
    if (!newMessage.trim() || !chatId) return;

    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      console.warn("⚠️ Socket not connected, message not sent");
      return;
    }

    socket.emit("send-message", { chatId, content: newMessage });
    setNewMessage("");
  };
const HandleClick = (id: string, inviteToken?: string) => {
  if (!inviteToken) {
    console.warn("⚠️ No invite token available for this chat");
    return;
  }
  console.log(inviteToken);
  joinByLink(inviteToken);
  setChatId(id);
};
  /* -------------------- UI -------------------- */
  return (
    <div className="flex relative h-screen bg-gradient-to-b from-black to-[#0a0a0a] text-gray-200">
      {/* ✅ Sidebar */}
      <div
        className={`w-80 h-full xl:static absolute  top-0 transition-all duration-300 bg-[#00100a] flex flex-col border-r border-gray-800 
    ${sidebarOpen ? "left-0" : "-left-full"}`}
      >
        <div className="p-4 text-xl font-bold text-green-400 flex justify-between items-center relative">
          TalkVerse
          <button
            onClick={newjoinByLink}
            className=" right-20 text-red-500 hover:text-red-400"
          >
            Join
          </button>
          <button
            onClick={createChat}
            className="px-2 py-1 bg-green-600 text-white rounded-md text-sm"
          >
            + Chat
          </button>
          <FaTimes onClick={()=> setSidebarOpen(!sidebarOpen)}
            className="xl:hidden"
            />
        </div>

        {/* Chats List */}
        <div className="flex-1 container overflow-y-auto">
          {chats.map((c) => (
            <div
              key={c._id}
              onClick={() => HandleClick(c?._id, c.inviteToken)}
              className={`flex flex-col gap-1 p-4 cursor-pointer rounded-xl mx-2 my-2 transition-all duration-200 shadow-sm ${
                chatId === c._id
                  ? "bg-green-600 text-white shadow-md scale-[1.02]"
                  : "bg-[#121212] hover:bg-[#1a1a1a] text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-lg">💬</span>
                <h3 className="font-medium truncate">{c.title}</h3>
              </div>

              {c.inviteToken && (
                <div className="text-xs text-gray-400 bg-[#1f1f1f] px-2 py-1 rounded-md w-fit">
                  Invite Token:{" "}
                  <span className="text-green-400">
                    {c.inviteToken}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(c.inviteToken!);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="ml-3 px-2 py-1 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                    >
                      📋 Copy
                    </button>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Invite Link Section */}
        <div className="p-4 border-t border-gray-800">
          {chatId && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => generateInvite(chatId)}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-black font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                🚀 Generate Invite Token
              </button>

              {inviteLink ? (
                <div className="bg-[#111] border border-gray-700 rounded-xl p-3 flex items-center justify-between shadow hover:shadow-green-500/20 transition">
                  <span className="truncate text-sm text-green-400">
                    {inviteLink}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="ml-3 px-2 py-1 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                  >
                    📋 Copy
                  </button>
                </div>
              ) : (
                <div className="text-gray-400 text-sm text-center">
                  No invite link yet. Click{" "}
                  <span className="text-green-400">Generate</span> to create
                  one.
                </div>
              )}

              {copied && (
                <div className="text-xs text-green-400 text-center animate-pulse">
                  ✅ Link copied to clipboard!
                </div>
              )}
            </div>
          )}
        </div>

        <div className="cursor-pointer text-gray-400 hover:text-red-400 flex items-center gap-2 mt-3 px-4 py-2">
         <LogoutButton/>
        </div>
      </div>

      {/* ✅ Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-[#0d0d0d] text-green-400 py-3 px-6 shadow flex items-center gap-3 border-b border-gray-800">
          <FaBars onClick={()=>setSidebarOpen(!sidebarOpen)}
            className="xl:hidden"
            />
          
          <span className="font-semibold">Members:</span>
          <div className="flex gap-2 flex-wrap">
            {members.map((m) => (
              <span
                key={m._id}
                className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-600/40"
              >
                {userData.userId === m._id ? `${m.userName} (you)` : m.userName}
              </span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#0a0a0a] to-black">
          {chatId ? (
            messages.map((msg, index) => {
              const isMe = msg.user === userId;
              const sender = members?.find((m) => m._id === msg.user);

              return (
                <div
                  key={msg._id || index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`group max-w-[70%] px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 ${
                      isMe
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none"
                        : "bg-[#111111] text-gray-200 rounded-bl-none border border-gray-800"
                    }`}
                  >
                    {!isMe && (
                      <p className="text-xs font-medium text-green-400 mb-1">
                        {sender?.userName || "Unknown User"}
                      </p>
                    )}

                    <p className="text-sm leading-relaxed">{msg.content}</p>

                    {msg.createdAt && (
                      <span className="opacity-50 text-[10px] mt-1 block text-right group-hover:opacity-100 transition">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-center mt-20">
              👈 Select a chat to start messaging
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {chatId && (
          <div className="flex items-center border-t border-gray-800 bg-[#0d0d0d] p-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-black text-gray-200 border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-green-600 text-white p-3 rounded-full hover:bg-green-500 transition shadow-lg"
            >
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserToUserChat;
