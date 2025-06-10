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
            {/* Step 3: Immersive Jackpot Discovery */}
            {currentStep === 2 && (
              <motion.div
                key="jackpot-discovery"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at center, #1a0b3d 0%, #000000 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                {/* Particle System */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -50, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  {/* Hero Title */}
                  <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <motion.h1
                      className={`font-black mb-6 ${isMobile ? "text-4xl" : "text-8xl"}`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        background: "linear-gradient(135deg, #ffd700 0%, #ffb347 50%, #ff6b35 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.02em"
                      }}
                      animate={{
                        textShadow: [
                          "0 0 50px rgba(255, 215, 0, 0.5)",
                          "0 0 100px rgba(255, 215, 0, 0.8)",
                          "0 0 50px rgba(255, 215, 0, 0.5)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      JACKPOT
                    </motion.h1>
                    <motion.div
                      className={`text-yellow-200 font-light ${isMobile ? "text-lg" : "text-2xl"}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      Every swap is a chance to win
                    </motion.div>
                  </motion.div>

                  {/* Interactive Lottery Ball */}
                  <motion.div
                    className="relative mx-auto mb-16"
                    style={{ width: isMobile ? "250px" : "400px", height: isMobile ? "250px" : "400px" }}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  >
                    {/* Central Orb */}
                    <motion.div
                      className="absolute inset-8 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #ffd700, #ff8c00, #1a0b3d)",
                        boxShadow: "inset 0 0 100px rgba(255, 215, 0, 0.3), 0 0 150px rgba(255, 215, 0, 0.5)"
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "inset 0 0 100px rgba(255, 215, 0, 0.3), 0 0 150px rgba(255, 215, 0, 0.5)",
                          "inset 0 0 150px rgba(255, 215, 0, 0.5), 0 0 200px rgba(255, 215, 0, 0.8)",
                          "inset 0 0 100px rgba(255, 215, 0, 0.3), 0 0 150px rgba(255, 215, 0, 0.5)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className={`${isMobile ? "text-6xl" : "text-8xl"}`}
                        animate={{
                          rotateY: [0, 360],
                          textShadow: [
                            "0 0 30px rgba(255, 255, 255, 0.8)",
                            "0 0 60px rgba(255, 255, 255, 1)",
                            "0 0 30px rgba(255, 255, 255, 0.8)"
                          ]
                        }}
                        transition={{
                          rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                          textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        💰
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Prize Tiers */}
                  <motion.div
                    className={`grid gap-6 mb-16 ${isMobile ? "grid-cols-1 px-4" : "grid-cols-3"}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  >
                    {[
                      { 
                        tier: "MEGA", 
                        prize: "$50,000+", 
                        odds: "1:10,000",
                        gradient: "from-yellow-400 via-orange-500 to-red-500",
                        glow: "rgba(255, 215, 0, 0.3)"
                      },
                      { 
                        tier: "MAJOR", 
                        prize: "$5,000+", 
                        odds: "1:1,000",
                        gradient: "from-purple-400 via-violet-500 to-purple-600",
                        glow: "rgba(168, 85, 247, 0.3)"
                      },
                      { 
                        tier: "MINI", 
                        prize: "$500+", 
                        odds: "1:100",
                        gradient: "from-blue-400 via-cyan-500 to-teal-500",
                        glow: "rgba(59, 130, 246, 0.3)"
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 + (i * 0.2) }}
                        whileHover={{ y: -10, scale: 1.05 }}
                      >
                        <div
                          className={`relative backdrop-blur-xl bg-gradient-to-br ${item.gradient}/10 border border-white/20 rounded-2xl ${
                            isMobile ? "p-6" : "p-8"
                          } overflow-hidden`}
                          style={{
                            boxShadow: `0 25px 50px -12px ${item.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                          }}
                        >
                          <div className="relative z-10">
                            <motion.div
                              className={`text-white font-black mb-2 ${isMobile ? "text-lg" : "text-xl"}`}
                              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            >
                              {item.tier}
                            </motion.div>
                            
                            <div className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent font-bold mb-3 ${
                              isMobile ? "text-2xl" : "text-3xl"
                            }`}>
                              {item.prize}
                            </div>
                            
                            <div className="text-white/70 font-light">
                              Odds: {item.odds}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Smart Fee Distribution */}
            {currentStep === 3 && (
              <motion.div
                key="fee-distribution"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  <motion.h1
                    className={`font-black mb-16 ${isMobile ? "text-4xl" : "text-7xl"}`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    SMART FEES
                  </motion.h1>

                  {/* Fee Distribution Grid */}
                  <motion.div
                    className={`grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  >
                    {[
                      { label: "Jackpot Pool", percentage: "2.5%", color: "yellow", icon: "🎰" },
                      { label: "Liquidity", percentage: "1.5%", color: "blue", icon: "💧" },
                      { label: "Token Burn", percentage: "1.0%", color: "red", icon: "🔥" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="relative group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1.2 + (i * 0.2) }}
                        whileHover={{ scale: 1.05, y: -10 }}
                      >
                        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-3xl p-8">
                          <motion.div
                            className="text-5xl mb-4"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          
                          <div className={`text-4xl font-black mb-3 text-${item.color}-400`}>
                            {item.percentage}
                          </div>
                          
                          <div className="text-slate-300 font-medium text-lg">
                            {item.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Token Flow Visualization */}
            {currentStep === 4 && (
              <motion.div
                key="token-flow"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at center, #0d1421 0%, #000000 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  <motion.h1
                    className={`font-black mb-20 ${isMobile ? "text-4xl" : "text-7xl"}`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    TOKEN FLOW
                  </motion.h1>

                  <TokenExchangeAnimation
                    containerClassName="relative mx-auto"
                    delay={0.5}
                    duration={5}
                    repeat={true}
                    scale={isMobile ? 1 : 1.5}
                    showTradeIndicators={true}
                    showFeeBreakdown={true}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 6: Lottery Mechanics */}
            {currentStep === 5 && (
              <motion.div
                key="lottery-mechanics"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a0033 0%, #000000 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  <motion.h1
                    className={`font-black mb-16 ${isMobile ? "text-4xl" : "text-7xl"}`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    LOTTERY ODDS
                  </motion.h1>

                  <motion.div
                    className="backdrop-blur-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-400/30 rounded-3xl p-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  >
                    <AnimatedCounter showGrowthIndicator={true} />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 7: Chainlink VRF */}
            {currentStep === 6 && (
              <motion.div
                key="chainlink-vrf"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0a1628 0%, #000000 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  <motion.h1
                    className={`font-black mb-8 ${isMobile ? "text-4xl" : "text-7xl"}`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: "#375bd2"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    CHAINLINK VRF 2.5
                  </motion.h1>
                  
                  <motion.p
                    className={`text-blue-300 font-light ${isMobile ? "text-lg" : "text-2xl"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    Provably fair randomness for every lottery draw
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Step 8: LayerZero Cross-Chain */}
            {currentStep === 7 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a0f2e 0%, #000000 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  <motion.h1
                    className={`font-black mb-8 ${isMobile ? "text-4xl" : "text-7xl"}`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    LAYERZERO
                  </motion.h1>
                  
                  <motion.p
                    className={`text-purple-300 font-light ${isMobile ? "text-lg" : "text-2xl"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    Seamless cross-chain gaming experience
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Step 9: Final CTA */}
            {currentStep === 8 && (
              <motion.div
                key="final-cta"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at center, #1a0b3d 0%, #000000 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl mx-auto"}`}>
                  <motion.h1
                    className={`font-black mb-12 ${isMobile ? "text-5xl" : "text-9xl"}`}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: "linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #eab308 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>

                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <motion.button
                      className={`backdrop-blur-xl bg-gradient-to-r from-orange-500 to-red-500 border border-orange-400/30 rounded-2xl font-bold text-white ${
                        isMobile ? "px-8 py-4 text-xl" : "px-16 py-6 text-2xl"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      START TRADING NOW
                    </motion.button>
                  </motion.div>

                  <motion.p
                    className={`text-orange-300 font-light ${isMobile ? "text-lg" : "text-2xl"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
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