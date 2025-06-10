import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "../hooks/use-mobile";
import { IPFS_ASSETS, getAssetUrl } from "@/lib/assets";
import TokenExchangeAnimation from "./token-exchange-animation";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

interface DemoScreenProps {
  autoStart?: boolean;
}

function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showAnimations, setShowAnimations] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  const steps = [
    { delay: 0, duration: 6500 },
    { delay: 6500, duration: 7500 },
    { delay: 14000, duration: 12000 },
    { delay: 26000, duration: 8000 },
    { delay: 34000, duration: 12000 },
    { delay: 46000, duration: 15000 },
    { delay: 61000, duration: 7000 },
    { delay: 68000, duration: 8000 },
    { delay: 76000, duration: 8000 },
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);
      
      if (audioRef.current) {
        audioRef.current.play().catch(console.warn);
      }

      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, step.delay);
      });
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden mobile-container">
      <audio ref={audioRef} preload="auto" className="hidden">
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(255,107,53,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.06) 0%, transparent 50%)
            `,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {showAnimations && (
        <div className="fixed inset-0 z-10">
          <AnimatePresence mode="wait">
            {currentStep === -1 && (
              <motion.div
                key="precredits"
                className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                >
                  <p className={`text-gray-400/80 font-light tracking-[0.3em] uppercase ${
                    isMobile ? "text-xs" : "text-sm"
                  }`} style={{ letterSpacing: '0.25em' }}>From the creators of</p>
                </motion.div>

                <motion.h1
                  className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 ${
                    isMobile ? "text-4xl" : "text-7xl"
                  }`}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 2 }}
                >
                  OMNIDRAGON
                </motion.h1>
              </motion.div>
            )}

            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="text-center">
                  <motion.h1
                    className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 ${
                      isMobile ? "text-4xl mb-4" : "text-8xl mb-8"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                  >
                    <Typewriter text="SONIC RED DRAGON" speed={80} />
                  </motion.h1>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="swap"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4" : ""}`}>
                  <motion.h2
                    className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-16 ${
                      isMobile ? "text-3xl mb-8" : "text-6xl"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    Token Exchange
                  </motion.h2>

                  <div className={`grid ${isMobile ? "grid-cols-1 gap-8" : "grid-cols-3 gap-12"} items-center`}>
                    <TokenExchangeAnimation
                      delay={1}
                      duration={3}
                      scale={isMobile ? 0.8 : 1}
                      repeat={true}
                      index={0}
                    />
                    <TokenExchangeAnimation
                      delay={2}
                      duration={3}
                      scale={isMobile ? 0.8 : 1}
                      repeat={true}
                      index={1}
                    />
                    <TokenExchangeAnimation
                      delay={3}
                      duration={3}
                      scale={isMobile ? 0.8 : 1}
                      repeat={true}
                      index={2}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="jackpot"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-yellow-950 to-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.h2
                    className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-12 ${
                      isMobile ? "text-4xl" : "text-7xl"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                  >
                    JACKPOT LOTTERY
                  </motion.h2>

                  <motion.div
                    className={`bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/40 rounded-3xl p-8 backdrop-blur-md ${
                      isMobile ? "p-6" : ""
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className={`text-yellow-300 font-bold mb-4 ${
                          isMobile ? "text-5xl" : "text-8xl"
                        }`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        animate={{
                          scale: [1, 1.1, 1],
                          textShadow: [
                            "0 0 20px rgba(252, 211, 77, 0.5)",
                            "0 0 40px rgba(252, 211, 77, 0.8)",
                            "0 0 20px rgba(252, 211, 77, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        $1,428,500
                      </motion.div>
                      <p className={`text-yellow-200/80 font-medium ${
                        isMobile ? "text-lg" : "text-2xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Current Jackpot Pool
                      </p>
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        <p className={`text-yellow-100/70 ${
                          isMobile ? "text-sm" : "text-lg"
                        }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Every swap = instant lottery ticket
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="fees"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.h2
                    className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-16 ${
                      isMobile ? "text-3xl mb-8" : "text-6xl"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    10% Total Fee Structure
                  </motion.h2>

                  <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-8"}`}>
                    <motion.div
                      className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur-md"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-yellow-400 font-bold mb-3 ${
                        isMobile ? "text-3xl" : "text-4xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        6.9%
                      </div>
                      <h3 className={`text-yellow-300 font-semibold mb-2 ${
                        isMobile ? "text-lg" : "text-xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Jackpot Pool
                      </h3>
                      <p className={`text-yellow-200/80 ${
                        isMobile ? "text-sm" : "text-base"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Funds the lottery system with instant payouts
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-br from-blue-400/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-md"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-blue-400 font-bold mb-3 ${
                        isMobile ? "text-3xl" : "text-4xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        2.41%
                      </div>
                      <h3 className={`text-blue-300 font-semibold mb-2 ${
                        isMobile ? "text-lg" : "text-xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Liquidity Pool
                      </h3>
                      <p className={`text-blue-200/80 ${
                        isMobile ? "text-sm" : "text-base"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Maintains trading stability and market depth
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-br from-red-400/10 to-pink-500/10 border border-red-400/30 rounded-2xl p-6 backdrop-blur-md"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-red-400 font-bold mb-3 ${
                        isMobile ? "text-3xl" : "text-4xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        0.69%
                      </div>
                      <h3 className={`text-red-300 font-semibold mb-2 ${
                        isMobile ? "text-lg" : "text-xl"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Token Burn
                      </h3>
                      <p className={`text-red-200/80 ${
                        isMobile ? "text-sm" : "text-base"
                      }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Deflationary mechanism reducing total supply permanently
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="chainlink"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <img 
                      src={IPFS_ASSETS.CHAINLINK.WHITE_LOGO} 
                      alt="Chainlink"
                      className={`mx-auto mb-8 ${isMobile ? "h-12" : "h-16"}`}
                    />
                    <h2 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-8 ${
                      isMobile ? "text-3xl" : "text-5xl"
                    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Chainlink VRF 2.5
                    </h2>
                    <p className={`text-blue-200/80 max-w-2xl mx-auto leading-relaxed ${
                      isMobile ? "text-base" : "text-xl"
                    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Cryptographically secure randomness ensures fair and transparent lottery results
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <img 
                      src={IPFS_ASSETS.LAYERZERO.WHITE_LOGO} 
                      alt="LayerZero"
                      className={`mx-auto mb-8 ${isMobile ? "h-12" : "h-16"}`}
                    />
                    <h2 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 ${
                      isMobile ? "text-3xl" : "text-5xl"
                    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      LayerZero Protocol
                    </h2>
                    <p className={`text-purple-200/80 max-w-2xl mx-auto leading-relaxed ${
                      isMobile ? "text-base" : "text-xl"
                    }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Cross-chain messaging enables seamless multi-chain lottery participation
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep >= 6 && (
              <motion.div
                key="final"
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4" : ""}`}>
                  <motion.h1
                    className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 mb-8 ${
                      isMobile ? "text-4xl" : "text-7xl"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>
                  
                  <motion.p
                    className={`text-gray-300 mb-12 ${
                      isMobile ? "text-lg" : "text-2xl"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    The future of DeFi gaming is here
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default DemoScreen;