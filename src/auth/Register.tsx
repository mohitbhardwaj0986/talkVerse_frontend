import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { toast } from "sonner";
import axios from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // spinner icon

type RegisterFormData = {
  userName: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      await axios.post("/user/register", data);
      toast.success("User registered successfully, Please login!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-[#0a0f0a] to-[#111] overflow-hidden relative">
      {/* Background Animated Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[500px] h-[500px] bg-emerald-500/30 blur-3xl rounded-full top-1/4 left-1/3"
      />

      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="relative bg-[#111]/80 backdrop-blur-xl w-full max-w-md rounded-2xl shadow-2xl p-8 border border-[#222]"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-center text-emerald-400 mb-8 tracking-wide"
        >
          TalkVerse ✨
        </motion.h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <label className="text-gray-300 mb-2 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...register("userName", { required: "Username is required" })}
              className="px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
            {errors.userName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </span>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col"
          >
            <label className="text-gray-300 mb-2 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col"
          >
            <label className="text-gray-300 mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
              })}
              className="px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold shadow-lg transition-all 
                ${
                  loading
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
                }`}
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {loading ? "Registering..." : "Register"}
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-sm text-center mt-6"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Register;
