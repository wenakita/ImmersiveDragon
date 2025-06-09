import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SimpleDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "SONIC RED DRAGON",
    "TOKEN SWAPS",
    "VRF JACKPOTS", 
    "FEE DISTRIBUTION"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        key={currentStep}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          {steps[currentStep]}
        </h1>
        <p className="text-gray-400 mt-4">
          The Future of DeFi Trading
        </p>
      </motion.div>
    </div>
  );
}