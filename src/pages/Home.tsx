import React from "react";
import { motion } from "framer-motion";
import ai_img from "../assets/ai_img.jpg";
import { Link } from "react-router-dom";

function Home() {
  const MotionLink = motion(Link);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0f0a] to-[#111] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-lg"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Discover, Connect and Chat with{" "}
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              TalkVerse
            </span>
          </h2>
          <p className="text-gray-400 mb-6 text-lg">
            Your personal AI-powered space for smarter conversations. Explore,
            create, and chat seamlessly with memory-powered assistants.
          </p>
          <div className="flex gap-4 xl:justify-start justify-center">
            <MotionLink
              to="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl shadow-lg shadow-green-500/30 transition"
            >
             Get started
            </MotionLink>
          </div>
          <p className="mt-6 text-sm text-gray-400">🔥 40k+ Active Users</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full md:w-1/2 mt-12 md:mt-0"
        >
          <img
            src={ai_img}
            alt="AI Illustration"
            className="rounded-3xl shadow-xl shadow-green-500/20 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </section>

      {/* Popular Conversations */}
      <section className="px-6 md:px-16 py-16">
        <motion.h3
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold mb-10 text-green-400"
        >
          Popular Conversations
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["AI Advice", "Study Helper", "Daily Journal", "Tech News"].map(
            (item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-center hover:border-green-400/50 hover:shadow-xl hover:shadow-green-500/20 transition cursor-pointer"
              >
                <h4 className="text-lg font-semibold">{item}</h4>
                <p className="text-sm text-gray-400 mt-2">
                  Explore trending chat topics
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Top Users */}
      <section className="px-6 md:px-16 py-16">
        <h3 className="text-2xl font-bold mb-10 text-green-400">Dummy Users</h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          {["Alice", "Bob", "Charlie", "Sophia", "David"].map((user, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-[#111] px-5 py-2 rounded-full text-sm border border-gray-700 hover:border-green-400 transition"
            >
              {user}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Explore Categories */}
      <section className="px-6 md:px-16 py-16">
        <h3 className="text-2xl font-bold mb-10 text-green-400">
          Explore Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            "AI Friends",
            "Study Bots",
            "Health Tips",
            "Coding Help",
            "Storytellers",
            "Productivity",
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-center hover:border-green-400/50 hover:shadow-md hover:shadow-green-500/20 transition cursor-pointer"
            >
              <h4 className="text-lg font-semibold">{cat}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Community CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="px-6 md:px-16 py-20 text-center bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl mx-6 md:mx-12 mt-12 shadow-xl shadow-green-500/30"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Join TalkVerse Community
        </h3>
        <p className="text-gray-100 mb-6 max-w-xl mx-auto">
          Create, chat, and explore the future of AI conversations with
          TalkVerse.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-black text-green-400 font-semibold rounded-xl border border-green-400 hover:bg-gray-900"
        >
          Join Now
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 mt-20 border-t border-gray-800 text-gray-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Explore", links: ["Chats", "Categories", "AI Bots"] },
            { title: "My Account", links: ["Profile", "My Chats", "Settings"] },
            {
              title: "Resources",
              links: ["Help Center", "Community", "Suggestions"],
            },
            { title: "Company", links: ["About", "Careers", "Blog"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l, j) => (
                  <li
                    key={j}
                    className="hover:text-green-400 cursor-pointer transition"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-10">
          © 2025 TalkVerse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
