import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaRocket } from "react-icons/fa";

const NotFound = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            initial={{
              x: dimensions.width ? Math.random() * dimensions.width : 0,
              y: dimensions.height ? Math.random() * dimensions.height : 0,
              scale: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, -20, 20, -20],
              x: [null, 15, -15, 15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="perspective-1000 mb-8 inline-block">
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 mx-auto"
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {[
              {
                face: "front",
                bg: "bg-red-500",
                transform: "translateZ(64px)",
              },
              {
                face: "back",
                bg: "bg-blue-500",
                transform: "rotateY(180deg) translateZ(64px)",
              },
              {
                face: "right",
                bg: "bg-green-500",
                transform: "rotateY(90deg) translateZ(64px)",
              },
              {
                face: "left",
                bg: "bg-yellow-500",
                transform: "rotateY(-90deg) translateZ(64px)",
              },
              {
                face: "top",
                bg: "bg-purple-500",
                transform: "rotateX(90deg) translateZ(64px)",
              },
              {
                face: "bottom",
                bg: "bg-pink-500",
                transform: "rotateX(-90deg) translateZ(64px)",
              },
            ].map((face, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 ${face.bg} opacity-80 rounded-lg shadow-2xl border border-white/30`}
                style={{
                  transform: face.transform,
                  backfaceVisibility: "visible",
                }}
              />
            ))}
          </motion.div>
        </div>

        <motion.h1
          initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ type: "spring", damping: 12, duration: 0.8 }}
          className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-2xl"
          style={{ textShadow: "0 0 30px rgba(0,255,255,0.5)" }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/80 mt-4 font-light"
        >
          Oops! The page you're looking for has drifted into another dimension.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <FaHome className="group-hover:animate-bounce" />
            Return to Home
            <FaRocket className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-500/20 rounded-full animate-spin-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 border border-purple-500/20 rounded-full animate-spin-slow-reverse" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
