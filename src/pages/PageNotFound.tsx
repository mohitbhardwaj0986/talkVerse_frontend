import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-8xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 text-xl text-gray-300 text-center"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Cute animation circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-10 w-40 h-40 border-4 border-green-400/50 rounded-full flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-t-transparent border-green-400 rounded-full"
        />
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          to="/"
          className="mt-10 inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition rounded-xl font-semibold shadow-lg"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default PageNotFound;
