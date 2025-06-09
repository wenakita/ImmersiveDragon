import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  showGrowthIndicator?: boolean;
}

export const AnimatedCounter = ({ showGrowthIndicator = true }: AnimatedCounterProps) => {
  const [count, setCount] = useState(137852);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 50) + 25);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span>${count.toLocaleString()}</span>
      {showGrowthIndicator && (
        <motion.span
          className="text-green-400 text-sm"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ↗
        </motion.span>
      )}
    </div>
  );
};

export default AnimatedCounter;