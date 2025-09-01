import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import Button from "../components/Button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // spinner icon

interface LoginFormInputs {
  identifier: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      setServerError(null);

      // Show a loading toast
      const toastId = toast.loading("Logging in...");

      const res = await axios.post("/user/login", data, {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/ai-chat");
        toast.success("Login successful! 🎉", { id: toastId });
      } else {
        setServerError(res.data.message || "Login failed");
        toast.error(res.data.message || "Login failed", { id: toastId });
      }
    } catch (err: any) {
      console.error("❌ Login Error:", err);
      setServerError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f0a] via-[#111] to-black px-4">
      <div className="w-full max-w-md bg-[#111]/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-emerald-900/40">
        {/* Brand */}
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-400 via-lime-400 to-teal-400 bg-clip-text text-transparent">
          TalkVerse
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-200 text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Error Alert */}
        {serverError && (
          <div className="mb-4 text-red-400 text-sm text-center animate-pulse">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Identifier */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="Enter email or username"
              {...register("identifier", {
                required: "Email or Username is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0f0a] text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            {errors.identifier && (
              <p className="text-red-400 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0f0a] text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold 
                       bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-400 
                       hover:opacity-90 transition text-black shadow-lg disabled:opacity-50"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
