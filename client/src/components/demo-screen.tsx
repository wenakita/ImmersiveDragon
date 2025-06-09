import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimations, setShowAnimations] = useState(false);

  const steps = [
    {
      title: "SONIC RED DRAGON",
      subtitle: "The Future of DeFi Trading",
      description: "Experience revolutionary blockchain mechanics with VRF-powered jackpots"
    },
    {
      title: "SWAP TOKENS",
      subtitle: "$S ⟷ $DRAGON",
      description: "Every swap enters you into our lottery system"
    },
    {
      title: "WIN THE JACKPOT",
      subtitle: "$137,852",
      description: "Growing jackpot from every transaction"
    },
    {
      title: "10% FEE STRUCTURE",
      subtitle: "6.9% Jackpot • 2.41% LP • 0.69% Burn",
      description: "Transparent fee distribution that benefits everyone"
    }
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(255,107,53,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 50%, rgba(255,235,59,0.06) 0%, transparent 60%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: i % 3 === 0 ? "#FF6B35" : i % 3 === 1 ? "#FFEB3B" : "#3B82F6",
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {showAnimations && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="text-center max-w-4xl mx-auto px-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {steps[currentStep].title}
              </motion.h1>

              <motion.p
                className="text-3xl md:text-4xl text-yellow-400 mb-6 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {steps[currentStep].subtitle}
              </motion.p>

              <motion.p
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {steps[currentStep].description}
              </motion.p>

              {/* Progress indicators */}
              <motion.div
                className="flex justify-center space-x-2 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'bg-orange-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Manual navigation */}
      {!showAnimations && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}