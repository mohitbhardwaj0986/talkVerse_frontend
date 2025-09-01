import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      {/* Animated TalkVerse Logo Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 flex items-center justify-center shadow-lg"
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 text-lg tracking-wide text-gray-300"
      >
        Loading TalkVerse...
      </motion.p>
    </div>
  );
}

export default Loading;
