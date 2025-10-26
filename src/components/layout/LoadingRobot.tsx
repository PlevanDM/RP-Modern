import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingRobotProps {
  collapsed: boolean;
  isLoading?: boolean;
}

const LoadingRobot: React.FC<LoadingRobotProps> = ({ collapsed, isLoading = true }) => {
  const [hasNewOrders, setHasNewOrders] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  // Симуляция получения новых заказов
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 1; // 1-3 новых заказа
      setNewOrdersCount(count);
      setHasNewOrders(true);
      
      // Сброс индикатора через 2 секунды
      setTimeout(() => {
        setHasNewOrders(false);
      }, 2000);
    }, 8000); // Каждые 8 секунд

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-40 flex items-end justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 border-t border-gradient-to-r from-blue-200/50 to-purple-200/50"
    >
      {/* Robot Container */}
      <div className="relative flex items-end justify-center pb-8">
                {/* Modern Head with Glass Morphism */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-20"
        >
          {/* Futuristic Head */}
          <motion.div
            animate={{
              scale: hasNewOrders ? [1, 1.15, 1.1, 1] : [1, 1.03, 1],
              boxShadow: hasNewOrders 
                ? [
                    "0 20px 60px rgba(34, 211, 238, 0.6)",
                    "0 25px 80px rgba(147, 51, 234, 0.7)",
                    "0 20px 60px rgba(34, 211, 238, 0.6)",
                  ]
                : [
                    "0 10px 40px rgba(59, 130, 246, 0.3)",
                    "0 15px 50px rgba(147, 51, 234, 0.4)",
                    "0 10px 40px rgba(59, 130, 246, 0.3)",
                  ],
            }}
            transition={{
              duration: hasNewOrders ? 0.6 : 3,
              repeat: hasNewOrders ? 0 : Infinity,
              ease: "easeInOut",
            }}
                          className="relative w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl shadow-2xl backdrop-blur-sm"
                                                   style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.6) 0%, transparent 50%),
                  linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #4f46e5 100%)
                `,
                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                backgroundSize: '200% 200%, 200% 200%, 100% 100%',
                backgroundPosition: '0% 0%, 100% 100%, center',
                animation: hasNewOrders ? 'shimmer 0.8s ease-in-out' : 'none',
              }}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
            
            {/* Animated grid pattern */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '8px 8px',
              }}
            />

                                                   {/* Glowing Eyes */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
               <motion.div
                 animate={hasNewOrders ? {
                   scale: [1, 1.5, 1],
                   boxShadow: [
                     "0 0 20px rgba(34, 211, 238, 1)",
                     "0 0 40px rgba(34, 211, 238, 1)",
                     "0 0 20px rgba(34, 211, 238, 1)",
                   ],
                 } : { 
                   opacity: [1, 0.1, 1], 
                   scale: [1, 0.7, 1],
                   boxShadow: [
                     "0 0 10px rgba(255, 255, 255, 0.8)",
                     "0 0 30px rgba(59, 130, 246, 1)",
                     "0 0 10px rgba(255, 255, 255, 0.8)",
                   ],
                 }}
                 transition={{ duration: hasNewOrders ? 0.4 : 1.5, repeat: hasNewOrders ? 3 : Infinity }}
                                  className="w-3 h-3 bg-white rounded-full shadow-xl"
                />
                <motion.div
                  animate={hasNewOrders ? {
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      "0 0 20px rgba(147, 51, 234, 1)",
                      "0 0 40px rgba(147, 51, 234, 1)",
                      "0 0 20px rgba(147, 51, 234, 1)",
                    ],
                  } : { 
                    opacity: [1, 0.1, 1], 
                    scale: [1, 0.7, 1],
                    boxShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.8)",
                      "0 0 30px rgba(147, 51, 234, 1)",
                      "0 0 10px rgba(255, 255, 255, 0.8)",
                    ],
                  }}
                  transition={{ duration: hasNewOrders ? 0.4 : 1.5, repeat: hasNewOrders ? 3 : Infinity, delay: hasNewOrders ? 0 : 0.7 }}
                  className="w-3 h-3 bg-white rounded-full shadow-xl"
               />
             </div>

            {/* Futuristic Mouth/Speaker */}
            <motion.div
              animate={{ width: ['2rem', '2.5rem', '2rem'], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 h-2 bg-white/90 rounded-full backdrop-blur-sm shadow-lg"
            />

            {/* Holographic Antenna */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-1.5 h-4 bg-gradient-to-t from-cyan-300 to-blue-400 rounded-full shadow-lg" />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.9, 0.2, 0.9],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-2xl"
                style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 1)" }}
              />
            </motion.div>

            {/* Pulsing glow rings */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
            />
          </motion.div>
        </motion.div>

        {/* Futuristic Body with Neon Accents */}
        <div className="absolute top-14 flex flex-col items-center">
          {/* Sleek Body */}
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
            className="relative w-14 h-12 bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 rounded-2xl shadow-2xl"
                                                   style={{
                background: `
                  repeating-linear-gradient(45deg, rgba(99, 102, 241, 0.2) 0px, rgba(99, 102, 241, 0.2) 2px, transparent 2px, transparent 8px),
                  radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
                  repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(147, 51, 234, 0.1) 4px, rgba(147, 51, 234, 0.1) 6px),
                  linear-gradient(135deg, #6366f1 0%, #2563eb 50%, #7c3aed 100%)
                `,
                boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                backgroundSize: '16px 16px, 100% 100%, 12px 12px, 100% 100%',
              }}
          >
            {/* Glass panel with holographic effect */}
            <div className="absolute inset-1 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-6 h-6 border-3 border-cyan-300 border-t-transparent rounded-full shadow-lg" 
                     style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-cyan-300 rounded-full"
                />
              </motion.div>
            </div>

            {/* Neon accent lines */}
            <motion.div
              animate={{ width: ['100%', '80%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
              style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
            />
          </motion.div>

          {/* Sleek Articulated Arms */}
          <div className="absolute top-6 -left-7 flex gap-1">
            {/* Left Arm */}
            <motion.div
              animate={{
                rotate: [0, 35, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-2.5 h-9 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-lg relative"
                style={{ 
                  boxShadow: "0 4px 15px rgba(34, 211, 238, 0.3)",
                  background: 'repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.3), transparent 1px, transparent 3px, rgba(34, 211, 238, 0.3) 3px, rgba(34, 211, 238, 0.3) 4px)'
                }}
              />
              <motion.div
                animate={{
                  rotate: [0, -25, 25, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 bg-cyan-400 rounded-full"
                style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.8)" }}
              />
            </motion.div>
          </div>

          <div className="absolute top-6 -right-7 flex gap-1">
            {/* Right Arm */}
            <motion.div
              animate={{
                rotate: [0, -35, 15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-2.5 h-9 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full shadow-lg"
                style={{ 
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                  background: 'repeating-linear-gradient(0deg, rgba(147, 51, 234, 0.3), transparent 1px, transparent 3px, rgba(147, 51, 234, 0.3) 3px, rgba(147, 51, 234, 0.3) 4px)'
                }}
              />
              <motion.div
                animate={{
                  rotate: [0, 25, -25, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 bg-purple-400 rounded-full"
                style={{ boxShadow: "0 0 15px rgba(139, 92, 246, 0.8)" }}
              />
            </motion.div>
          </div>

                     {/* Advanced Legs */}
           <div className="absolute top-[3rem] flex gap-2">
             {/* Left Leg */}
             <motion.div
               animate={{
                 y: [0, -2, 0],
                 rotate: [0, -5, 0],
               }}
               transition={{
                 duration: 1.5,
                 repeat: Infinity,
                 ease: "easeInOut",
               }}
               className="flex flex-col items-center"
             >
                               <div 
                  className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-lg"
                 style={{ 
                   boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                   background: 'repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.4), transparent 1px, transparent 3px, rgba(59, 130, 246, 0.4) 3px, rgba(59, 130, 246, 0.4) 4px)'
                 }}
               />
              <motion.div
                animate={{
                  rotate: [0, 12, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                                 className="w-4 h-3 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-b-xl shadow-xl"
                 style={{ boxShadow: "0 4px 15px rgba(79, 70, 229, 0.5)" }}
               />
             </motion.div>

             {/* Right Leg */}
             <motion.div
               animate={{
                 y: [0, -2, 0],
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
                               <div 
                  className="w-3 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full shadow-lg"
                  style={{ 
                    boxShadow: "0 4px 20px rgba(147, 51, 234, 0.4)",
                    background: 'repeating-linear-gradient(90deg, rgba(147, 51, 234, 0.4), transparent 1px, transparent 3px, rgba(147, 51, 234, 0.4) 3px, rgba(147, 51, 234, 0.4) 4px)'
                  }}
                />
               <motion.div
                 animate={{
                   rotate: [0, -8, 5, 0],
                   scale: [1, 1.05, 1],
                 }}
                 transition={{
                   duration: 1.2,
                   repeat: Infinity,
                   ease: "easeInOut",
                 }}
                 className="w-4 h-3 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-b-xl shadow-xl"
                style={{ boxShadow: "0 4px 15px rgba(124, 58, 237, 0.5)" }}
              />
            </motion.div>
          </div>
        </div>

                 {/* Floating Orders with enhanced animation */}
         {isLoading && !collapsed && (
           <>
             <AnimatePresence>
               {hasNewOrders && (
                 <motion.div
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1.2, opacity: 1 }}
                   exit={{ scale: 0, opacity: 0 }}
                   transition={{ duration: 0.5 }}
                   className="absolute -left-6 top-0 text-3xl z-30"
                 >
                   📦
                 </motion.div>
               )}
             </AnimatePresence>
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

        {/* Advanced Energy Field */}
        {isLoading && (
          <>
            <motion.div
              animate={{ scale: [1, 3], opacity: [0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(34, 211, 238, 0.6)",
                filter: "blur(3px)",
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(147, 51, 234, 0.5)",
                filter: "blur(2px)",
                boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(59, 130, 246, 0.7)",
                filter: "blur(1px)",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
              }}
            />
          </>
        )}

        {/* Holographic Particles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute -top-6 -right-6 w-8 h-8"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.3, 1.5, 0.3],
                boxShadow: [
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                  "0 0 30px rgba(147, 51, 234, 1)",
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-purple-400"
              style={{
                transformOrigin: '0 2rem',
                transform: `rotate(${i * 45}deg) translateY(-2rem)`,
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
           <AnimatePresence mode="wait">
             {hasNewOrders ? (
                                <motion.span
                   key="new-orders"
                   initial={{ opacity: 0, scale: 0.5, y: 10 }}
                   animate={{ 
                     opacity: 1, 
                     scale: [1, 1.1, 1], 
                     y: 0,
                   }}
                   exit={{ opacity: 0, scale: 0.5, y: -10 }}
                   transition={{ 
                     opacity: { duration: 0.3 },
                     scale: { duration: 1, repeat: Infinity },
                     y: { duration: 0.3 }
                   }}
                   className="text-xs font-bold text-cyan-600 bg-gradient-to-r from-cyan-100 to-purple-100 px-3 py-1 rounded-full shadow-lg relative"
                 >
                   ✨ {newOrdersCount} нових замовлень!
                 </motion.span>
             ) : (
                                 <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs font-medium text-gray-600"
                  >
                 {isLoading ? 'Завантаження замовлень...' : 'Готово'}
               </motion.span>
             )}
           </AnimatePresence>
         </motion.div>
       )}
    </motion.div>
  );
};

export default LoadingRobot;
