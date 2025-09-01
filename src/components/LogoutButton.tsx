// LogoutButton.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axiosInstance from "../axios/axios"; 
import axios from "axios";  
import { BiLogOut } from "react-icons/bi";

const LogoutButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      // 👇 use axiosInstance, not raw axios
      const res = await axiosInstance.post<{ message?: string }>("/user/logout");

      toast.success(res.data?.message || "Logged out successfully ✨");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err: unknown) {
      let message = "Logout failed ❌";

      if (axios.isAxiosError<{ message?: string }>(err)) {
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      disabled={loading}
      onClick={handleLogout}
      className={`px-4 py-2 rounded-xl font-medium text-white transition-colors shadow-md
        ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
      `}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
        />
      ) : (
        <div className="flex justify-between items-center gap-2">
          <BiLogOut />
          Logout
        </div>
      )}
    </motion.button>
  );
};

export default LogoutButton;
