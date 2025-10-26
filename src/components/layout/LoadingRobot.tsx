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
      className="relative w-full h-24 flex items-center justify-center bg-white border-t border-gray-200"
    >
      {/* Robot Container */}
      <div className="relative">
        {/* Robot Body */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg"
        >
          {/* Robot Eyes */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-center">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>

          {/* Robot Mouth */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-white rounded-full opacity-80" />

          {/* Loading Dots */}
          {isLoading && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              ))}
            </motion.div>
          )}

          {/* Energy Waves */}
          {isLoading && (
            <>
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-2 border-blue-400 rounded-lg"
              />
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 border-2 border-purple-400 rounded-lg"
              />
            </>
          )}

          {/* Sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 w-4 h-4"
          >
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="absolute left-0 top-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="absolute right-0 top-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Floating Order Icons */}
        {isLoading && !collapsed && (
          <>
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute -left-4 top-2 text-xl"
            >
              📱
            </motion.div>
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -right-4 top-4 text-xl"
            >
              💻
            </motion.div>
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -left-6 bottom-2 text-xl"
            >
              ⌚
            </motion.div>
          </>
        )}
      </div>

      {/* Status Text */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
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
