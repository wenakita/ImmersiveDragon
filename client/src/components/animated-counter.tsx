import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimatedCounterProps {
  showGrowthIndicator?: boolean;
}

function AnimatedCounter({ showGrowthIndicator = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();
  const targetValue = 2847563;

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="text-center">
      <motion.div
        className={`font-black mb-4 ${isMobile ? "text-4xl" : "text-6xl"}`}
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          background: "linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #ff6b35 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
        animate={{
          textShadow: [
            "0 0 30px rgba(255, 215, 0, 0.5)",
            "0 0 60px rgba(255, 215, 0, 0.8)",
            "0 0 30px rgba(255, 215, 0, 0.5)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {formatNumber(count)}
      </motion.div>

      {showGrowthIndicator && (
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="text-green-400 text-2xl"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ↗️
          </motion.div>
          <span className={`text-green-400 font-semibold ${isMobile ? "text-lg" : "text-xl"}`}>
            +$247,892 today
          </span>
        </motion.div>
      )}

      <motion.p
        className={`text-gray-400 font-light mt-4 ${isMobile ? "text-sm" : "text-base"}`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Current jackpot pool
      </motion.p>
    </div>
  );
}

export default AnimatedCounter;