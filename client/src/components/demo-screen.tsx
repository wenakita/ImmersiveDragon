import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import TokenExchangeAnimation from "./token-exchange-animation";
import AnimatedCounter from "./animated-counter";

// Audio file import
const audioFile = "https://cdn.replit.com/agent/uploads/28_sonic_red_dragon_soundtrack.mp3";

interface DemoScreenProps {
  autoStart?: boolean;
}

function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showAnimations, setShowAnimations] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  // Enhanced timing based on waveform analysis
  const steps = [
    { delay: 0, duration: 6500 }, // Step 1: Title intro
    { delay: 6500, duration: 7500 }, // Step 2: Swap animation
    { delay: 14000, duration: 12000 }, // Step 3: Jackpot reveal
    { delay: 26000, duration: 8000 }, // Step 4: Fee distribution
    { delay: 34000, duration: 12000 }, // Step 5: Token flow
    { delay: 46000, duration: 15000 }, // Step 6: Lottery mechanics
    { delay: 61000, duration: 7000 }, // Step 7: Chainlink VRF
    { delay: 68000, duration: 8000 }, // Step 8: LayerZero cross-chain
    { delay: 76000, duration: 8000 }, // Step 9: Final CTA
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.play().catch(console.warn);
      }

      // Set up step progression
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, step.delay);
      });
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <audio ref={audioRef} preload="auto" className="hidden">
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      {/* Enhanced Background Effects */}
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
            {/* Pre-Credits: From the creators of OmniDragon */}
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
                  <p className={`text-gray-400 font-light tracking-wider uppercase ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}>From the creators of</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                >
                  <h1 className={`font-black text-amber-400 tracking-wider ${
                    isMobile ? "text-4xl" : "text-7xl"
                  }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    OMNIDRAGON
                  </h1>
                </motion.div>
              </motion.div>
            )}

            {/* Step 1: Clean Title Sequence */}
            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex flex-col items-center justify-center min-h-screen relative bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.h1 
                      className={`font-light text-white mb-4 ${isMobile ? "text-5xl" : "text-8xl"}`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: '300',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      Sonic Red
                    </motion.h1>
                    
                    <motion.h2
                      className={`font-black text-amber-400 mb-16 ${isMobile ? "text-6xl" : "text-9xl"}`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        letterSpacing: '-0.01em'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      Dragon
                    </motion.h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    <p className={`text-gray-400 font-light ${isMobile ? "text-lg" : "text-2xl"}`}
                       style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      The Future of DeFi Gaming
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Clean Token Swap */}
            {currentStep === 1 && (
              <motion.div
                key="swap-animation"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-20 ${isMobile ? "text-4xl" : "text-7xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Token Exchange
                    </h1>
                  </motion.div>

                  <motion.div
                    className="max-w-md mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <div className="border border-gray-800 rounded-lg bg-gray-900/30 p-8 space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-gray-400 text-sm">Swap</div>
                          <div className="text-white text-2xl font-semibold">$S</div>
                        </div>
                        <div className="text-gray-600 text-2xl">→</div>
                        <div>
                          <div className="text-gray-400 text-sm">Receive</div>
                          <div className="text-amber-400 text-2xl font-semibold">$DRAGON</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800">
                        <div className="text-gray-400 text-sm mb-2">Network Fee</div>
                        <div className="text-white text-lg font-mono">5.0%</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Elegant Jackpot Reveal */}
            {currentStep === 2 && (
              <motion.div
                key="jackpot-reveal"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  {/* Minimal Typography */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.h1
                      className={`font-light text-white mb-4 ${isMobile ? "text-5xl" : "text-8xl"}`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: '300',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      Every Swap
                    </motion.h1>
                    
                    <motion.h2
                      className={`font-black text-amber-400 mb-16 ${isMobile ? "text-3xl" : "text-6xl"}`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        letterSpacing: '-0.01em'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      Wins
                    </motion.h2>
                  </motion.div>

                  {/* Clean Prize Display */}
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  >
                    <div className="border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm p-8">
                      <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Current Pool</div>
                      <div className={`text-white font-mono ${isMobile ? "text-3xl" : "text-5xl"}`}>
                        $2,847,563
                      </div>
                    </div>
                    
                    <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                      {[
                        { label: "Mega", odds: "1:10,000", prize: "$50K+" },
                        { label: "Major", odds: "1:1,000", prize: "$5K+" },
                        { label: "Mini", odds: "1:100", prize: "$500+" }
                      ].map((tier, i) => (
                        <motion.div
                          key={i}
                          className="border border-gray-800 rounded-lg bg-gray-900/30 p-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 1.5 + (i * 0.1) }}
                        >
                          <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">{tier.label}</div>
                          <div className="text-white text-xl font-semibold mb-1">{tier.prize}</div>
                          <div className="text-gray-500 text-sm">{tier.odds}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Clean Fee Structure */}
            {currentStep === 3 && (
              <motion.div
                key="fee-structure"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-5xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-20 ${isMobile ? "text-4xl" : "text-7xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Fee Distribution
                    </h1>
                  </motion.div>

                  <motion.div
                    className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    {[
                      { label: "Jackpot Pool", percentage: "2.5%" },
                      { label: "Liquidity", percentage: "1.5%" },
                      { label: "Token Burn", percentage: "1.0%" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="border border-gray-800 rounded-lg bg-gray-900/30 p-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 + (i * 0.1) }}
                      >
                        <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">{item.label}</div>
                        <div className="text-white text-4xl font-mono font-bold">{item.percentage}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="mt-16 text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                  >
                    Transparent, automated distribution on every transaction
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Minimal Token Flow */}
            {currentStep === 4 && (
              <motion.div
                key="token-flow"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-20 ${isMobile ? "text-4xl" : "text-7xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Seamless Exchange
                    </h1>
                  </motion.div>

                  <motion.div
                    className="max-w-md mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <div className="border border-gray-800 rounded-lg bg-gray-900/30 p-8 space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-gray-400 text-sm">From</div>
                          <div className="text-white text-2xl font-semibold">SONIC</div>
                        </div>
                        <div className="text-gray-600 text-2xl">→</div>
                        <div>
                          <div className="text-gray-400 text-sm">To</div>
                          <div className="text-amber-400 text-2xl font-semibold">DRAGON</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800">
                        <div className="text-gray-400 text-sm mb-2">Exchange Rate</div>
                        <div className="text-white text-lg font-mono">1 SONIC = 0.847 DRAGON</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Clean Lottery Display */}
            {currentStep === 5 && (
              <motion.div
                key="lottery-display"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-16 ${isMobile ? "text-4xl" : "text-7xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Live Pool
                    </h1>
                  </motion.div>

                  <motion.div
                    className="border border-gray-800 rounded-lg bg-gray-900/30 p-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <AnimatedCounter showGrowthIndicator={false} />
                  </motion.div>

                  <motion.div
                    className="mt-12 text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    Growing with every transaction
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 7: Chainlink Integration */}
            {currentStep === 6 && (
              <motion.div
                key="chainlink"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-8 ${isMobile ? "text-4xl" : "text-7xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Powered by
                    </h1>
                    <h2 className={`font-semibold text-blue-400 mb-16 ${isMobile ? "text-3xl" : "text-5xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Chainlink VRF 2.5
                    </h2>
                  </motion.div>

                  <motion.div
                    className="border border-gray-800 rounded-lg bg-gray-900/30 p-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">Randomness Source</div>
                    <div className="text-white text-xl">Verifiable Random Function</div>
                    <div className="text-gray-500 text-sm mt-2">Cryptographically secure and tamper-proof</div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 8: LayerZero Network */}
            {currentStep === 7 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-8 ${isMobile ? "text-4xl" : "text-7xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Built on
                    </h1>
                    <h2 className={`font-semibold text-purple-400 mb-16 ${isMobile ? "text-3xl" : "text-5xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      LayerZero
                    </h2>
                  </motion.div>

                  <motion.div
                    className="border border-gray-800 rounded-lg bg-gray-900/30 p-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">Cross-Chain Protocol</div>
                    <div className="text-white text-xl">Omnichain Interoperability</div>
                    <div className="text-gray-500 text-sm mt-2">Unified liquidity across all networks</div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 9: Elegant Final CTA */}
            {currentStep === 8 && (
              <motion.div
                key="final-cta"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-6 max-w-sm mx-auto" : "max-w-4xl mx-auto"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h1 className={`font-light text-white mb-4 ${isMobile ? "text-4xl" : "text-8xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '300' }}>
                      Sonic Red
                    </h1>
                    <h2 className={`font-black text-amber-400 mb-20 ${isMobile ? "text-5xl" : "text-9xl"}`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Dragon
                    </h2>
                  </motion.div>

                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  >
                    <button className={`w-full border border-amber-400 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 rounded-lg font-medium transition-colors ${
                      isMobile ? "py-4 text-lg" : "py-6 text-xl"
                    }`}>
                      Enter App
                    </button>
                    
                    <div className="text-gray-400 text-sm">
                      Experience the future of DeFi gaming
                    </div>
                  </motion.div>
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