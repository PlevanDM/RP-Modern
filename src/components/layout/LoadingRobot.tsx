import React from 'react';
import { motion } from 'framer-motion';

interface LoadingRobotProps {
  collapsed: boolean;
  isLoading?: boolean;
}

const LoadingRobot: React.FC<LoadingRobotProps> = ({ collapsed, isLoading = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-32 flex items-center justify-center bg-white border-t border-gray-200"
    >
      {/* Robot Container */}
      <div className="relative flex items-end justify-center">
        {/* Head */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20"
        >
          {/* Head Base */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl shadow-xl"
          >
            {/* Eyes */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <motion.div
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-white rounded-full shadow-lg"
              />
              <motion.div
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-3 h-3 bg-white rounded-full shadow-lg"
              />
            </div>

            {/* Mouth */}
            <motion.div
              animate={{ width: ['1.5rem', '1.8rem', '1.5rem'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 h-1.5 bg-white rounded-full opacity-90"
            />

            {/* Antenna */}
            <motion.div
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <div className="w-1 h-3 bg-blue-400 rounded-full" />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 0.3, 0.8],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1 h-1 bg-yellow-400 rounded-full mx-auto"
              />
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-md -z-10"
            />
          </motion.div>
        </motion.div>

        {/* Body with Arms and Legs */}
        <div className="absolute top-16 flex flex-col items-center">
          {/* Body */}
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
            className="relative w-14 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-lg shadow-lg"
          >
            {/* Chest Panel */}
            <div className="absolute inset-2 bg-blue-500/20 rounded border border-blue-300/30 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full"
              />
            </div>
          </motion.div>

          {/* Arms */}
          <div className="absolute top-5 -left-6 flex gap-1">
            {/* Left Arm */}
            <motion.div
              animate={{
                rotate: [0, 30, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full shadow-md" />
              <motion.div
                animate={{
                  rotate: [0, -20, 20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2.5 h-2.5 bg-blue-500 rounded-full"
              />
            </motion.div>
          </div>

          <div className="absolute top-5 -right-6 flex gap-1">
            {/* Right Arm */}
            <motion.div
              animate={{
                rotate: [0, -30, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="flex flex-col items-center"
            >
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full shadow-md" />
              <motion.div
                animate={{
                  rotate: [0, 20, -20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2.5 h-2.5 bg-blue-500 rounded-full"
              />
            </motion.div>
          </div>

          {/* Legs */}
          <div className="absolute top-[3.5rem] flex gap-2">
            {/* Left Leg */}
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full shadow-md" />
              <motion.div
                animate={{
                  rotate: [0, 10, -5, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-4 h-3 bg-blue-700 rounded-b-lg shadow-md"
              />
            </motion.div>

            {/* Right Leg */}
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="flex flex-col items-center"
            >
              <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full shadow-md" />
              <motion.div
                animate={{
                  rotate: [0, -10, 5, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-4 h-3 bg-blue-700 rounded-b-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Orders */}
        {isLoading && !collapsed && (
          <>
            <motion.div
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.7, 1, 0.7],
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              className="absolute -left-8 top-2 text-2xl"
            >
              📱
            </motion.div>
            <motion.div
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.7, 1, 0.7],
                rotate: [0, -360],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
              className="absolute -right-8 top-6 text-2xl"
            >
              💻
            </motion.div>
            <motion.div
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.7, 1, 0.7],
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.6 }}
              className="absolute -left-10 bottom-4 text-xl"
            >
              ⌚
            </motion.div>
          </>
        )}

        {/* Energy Waves */}
        {isLoading && (
          <>
            <motion.div
              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 border-2 border-blue-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 border-2 border-purple-400 rounded-full blur-sm"
            />
          </>
        )}

        {/* Sparkles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-6 h-6"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                transformOrigin: '0 1.5rem',
                transform: `rotate(${i * 60}deg) translateY(-1.5rem)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Status Text */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-medium text-gray-600"
          >
            {isLoading ? 'Завантаження замовлень...' : 'Готово'}
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingRobot;
