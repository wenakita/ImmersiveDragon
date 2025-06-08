import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

// Animated Jackpot Counter Component
const AnimatedJackpotCounter = ({ startValue = 69000 }: { startValue?: number }) => {
  const [count, setCount] = useState(startValue);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [lastIncrease, setLastIncrease] = useState(0);
  const [showIncrease, setShowIncrease] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 300) + 150;
      setLastIncrease(increase);
      setIsIncreasing(true);
      setShowIncrease(true);
      setCount((prev) => prev + increase);

      setTimeout(() => {
        setIsIncreasing(false);
        setShowIncrease(false);
      }, 800);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.span
        animate={{
          scale: isIncreasing ? [1, 1.08, 1] : 1,
          color: isIncreasing ? ["#fbbf24", "#f59e0b", "#fbbf24"] : "#fbbf24",
        }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-yellow-100"
      >
        ${count.toLocaleString()}
      </motion.span>

      {showIncrease && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-green-400"
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], y: -20, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          +${lastIncrease}
        </motion.div>
      )}
    </div>
  );
};

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showAnimations, setShowAnimations] = useState(autoStart);
  const [showJackpotVault, setShowJackpotVault] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const steps = [
    { delay: 0, duration: 6500 },
    { delay: 6500, duration: 7500 },
    { delay: 14000, duration: 12000 },
    { delay: 26000, duration: 8000 },
    { delay: 34000, duration: 12000 },
    { delay: 46000, duration: 14000 },
    { delay: 60000, duration: 7000 },
    { delay: 67000, duration: 8000 },
    { delay: 75000, duration: 8000 },
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);
      setTimeout(() => setCurrentStep(0), 3000);

      if (audioRef.current) {
        setTimeout(() => {
          audioRef.current!.volume = 0;
          audioRef
            .current!.play()
            .then(() => {
              const fadeIn = () => {
                const current = audioRef.current!.volume;
                if (current < 0.8) {
                  audioRef.current!.volume = Math.min(current + 0.01, 0.8);
                  requestAnimationFrame(fadeIn);
                }
              };
              fadeIn();
            })
            .catch((err) => console.error("Audio failed to start:", err));
        }, 3000);
      }

      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
          if (index === 2) {
            setTimeout(() => setShowJackpotVault(true), 2000);
          }
        }, step.delay + 3000);
      });
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <audio ref={audioRef} src={audioFile} />

      {showAnimations && (
        <div className="relative min-h-screen">
          <AnimatePresence mode="wait">
            {currentStep === -1 && (
              <motion.div
                key="pre-credits"
                className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <h1 className="text-8xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
                    SONIC RED DRAGON
                  </h1>
                  <p className="text-gray-400 text-xl">DeFi Lottery Revolution</p>
                </motion.div>
              </motion.div>
            )}

            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.h1 
                    className="text-9xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(239, 68, 68, 0.5)",
                        "0 0 40px rgba(239, 68, 68, 0.8)",
                        "0 0 20px rgba(239, 68, 68, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>
                  <motion.p 
                    className="text-2xl text-gray-300 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    The Ultimate DeFi Lottery Experience
                  </motion.p>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="swap-buildup"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="text-center relative">
                  <motion.h2 
                    className="text-6xl font-bold mb-12"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <span className="font-black text-5xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">$S</span>
                    <span className="text-white ml-2">Swap</span>
                    <span className="text-gray-400 mx-4">for</span>
                    <span className="font-black text-5xl bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">$D</span>
                  </motion.h2>

                  <motion.div
                    className="flex items-center justify-center space-x-8"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        x: [0, 50, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-blue-300 overflow-hidden">
                        <img 
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy" 
                          alt="Sonic" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-full shadow-2xl"
                      animate={{
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 20px rgba(147, 51, 234, 0.5)",
                          "0 0 40px rgba(147, 51, 234, 0.8)",
                          "0 0 20px rgba(147, 51, 234, 0.5)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <span className="text-3xl">↔️</span>
                    </motion.div>

                    <motion.div
                      className="relative"
                      animate={{
                        x: [0, -50, 0],
                        rotate: [0, -180, -360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl border-4 border-red-300 overflow-hidden">
                        <img 
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam" 
                          alt="Dragon" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="jackpot"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, z: -1000 }}
                animate={{ opacity: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.h2 
                    className="text-7xl font-bold text-yellow-400 mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.5, 
                      duration: 1, 
                      type: "spring", 
                      stiffness: 100 
                    }}
                  >
                    WIN THE JACKPOT! 🏆
                  </motion.h2>
                  
                  <motion.div
                    className="text-8xl font-black text-green-400 mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      textShadow: [
                        "0 0 20px rgba(34, 197, 94, 0.5)",
                        "0 0 40px rgba(34, 197, 94, 0.8)",
                        "0 0 20px rgba(34, 197, 94, 0.5)"
                      ]
                    }}
                    transition={{ 
                      delay: 1,
                      duration: 1,
                      textShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    $69,000
                  </motion.div>
                  
                  <motion.p 
                    className="text-2xl text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Growing with every swap
                  </motion.p>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="fee-tension"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.h2 
                    className="text-6xl font-bold text-red-400 mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    Every Swap Has Fees...
                  </motion.h2>
                  <motion.p 
                    className="text-3xl text-gray-300 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    But where do they go?
                  </motion.p>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="fee-breakdown"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="text-center max-w-4xl">
                  <motion.h2 
                    className="text-5xl font-bold text-white mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    Smart Fee Distribution
                  </motion.h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                      className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/30 rounded-xl p-6"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <div className="text-yellow-300 text-lg font-medium mb-2 flex items-center justify-center">
                        <img 
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy" 
                          alt="Sonic" 
                          className="w-6 h-6 mr-2 rounded-full"
                        />
                        Jackpot
                      </div>
                      <div className="text-3xl font-bold text-yellow-100">$6.90</div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6"
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    >
                      <div className="text-blue-300 text-lg font-medium mb-2 flex items-center justify-center">
                        <img 
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy" 
                          alt="Sonic" 
                          className="w-6 h-6 mr-2 rounded-full"
                        />
                        LP Rewards
                      </div>
                      <div className="text-3xl font-bold text-blue-100">$2.41</div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-md border border-red-400/30 rounded-xl p-6"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      <div className="text-red-300 text-lg font-medium mb-2 flex items-center justify-center">
                        <img 
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam" 
                          alt="Dragon" 
                          className="w-6 h-6 mr-2 rounded-full"
                        />
                        Burn
                      </div>
                      <div className="text-3xl font-bold text-red-100">$0.69</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {showJackpotVault && (
            <motion.div
              className="fixed top-4 right-4 z-50 pointer-events-none"
              initial={{ opacity: 0, scale: 0.5, x: 100, y: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "backOut",
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/30 rounded-xl p-4 min-w-[220px]"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                    "0 0 30px rgba(251, 191, 36, 0.5)",
                    "0 0 20px rgba(251, 191, 36, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-yellow-300 text-sm font-medium mb-2 flex items-center">
                  <span className="mr-2">🏆</span>
                  JACKPOT VAULT
                </div>
                <AnimatedJackpotCounter startValue={69000} />
                <div className="text-yellow-400/80 text-xs mt-1">
                  Growing with every swap
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}