import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "../hooks/use-mobile";
import { IPFS_ASSETS, getAssetUrl } from "@/lib/assets";
import TokenExchangeAnimation from "./token-exchange-animation";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

// Modern Sonic Token Component
const SonicToken = ({
  size = "w-12 h-12",
  borderColor = "border-blue-300",
  gradientFrom = "from-blue-400",
  gradientTo = "to-cyan-500",
  imageSize = "w-full h-full",
  animateProps = {},
  transitionProps = {},
  style = {},
}: {
  size?: string;
  borderColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  imageSize?: string;
  animateProps?: any;
  transitionProps?: any;
  style?: any;
}) => (
  <motion.div
    className={`${size} rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-2xl border-2 ${borderColor} overflow-hidden relative`}
    animate={animateProps}
    transition={transitionProps}
    style={style}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
    <img
      src={IPFS_ASSETS.S}
      alt="Sonic"
      className={`${imageSize} object-cover rounded-full relative z-10`}
    />
  </motion.div>
);

// Modern Dragon Token Component
const DragonToken = ({
  size = "w-12 h-12",
  borderColor = "border-red-300",
  gradientFrom = "from-red-500",
  gradientTo = "to-orange-600",
  imageSize = "w-full h-full",
  animateProps = {},
  transitionProps = {},
  style = {},
}: {
  size?: string;
  borderColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  imageSize?: string;
  animateProps?: any;
  transitionProps?: any;
  style?: any;
}) => (
  <motion.div
    className={`${size} rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-2xl border-2 ${borderColor} overflow-hidden relative`}
    animate={animateProps}
    transition={transitionProps}
    style={style}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
    <img
      src={IPFS_ASSETS.DRAGON}
      alt="Dragon"
      className={`${imageSize} object-cover rounded-full relative z-10`}
    />
  </motion.div>
);

// Enhanced Animated Counter Component
const AnimatedCounter = ({ showGrowthIndicator = true }: { showGrowthIndicator?: boolean }) => {
  const [count, setCount] = useState(142850);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.span
        className="text-green-300 font-bold"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5 }}
        key={count}
      >
        ${count.toLocaleString()}
      </motion.span>
      {showGrowthIndicator && (
        <motion.span
          className="text-green-300 text-sm"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          +$25
        </motion.span>
      )}
    </div>
  );
};

interface DemoScreenProps {
  autoStart?: boolean;
}

function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showAnimations, setShowAnimations] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  // Enhanced timing based on waveform analysis - Extended for better comprehension
  const steps = [
    { delay: 0, duration: 6500 }, // [0:00–0:06.5] Step 1: Title intro: swell begins
    { delay: 6500, duration: 7500 }, // [0:06.5–0:14] Step2: Swap animation buildup
    { delay: 14000, duration: 12000 }, // [0:14–0:26] Step 3: Jackpot reveal at first drop
    { delay: 26000, duration: 8000 }, // [0:26–0:34] Step 4: Fee tension – ambient mood 
    { delay: 34000, duration: 12000 }, // [0:34–0:46] Step 5: Fee breakdown – cinematic swell
    { delay: 46000, duration: 15000 }, // [0:46–1:00] Step 6: Lottery mechanice - Odds Table
    { delay: 61000, duration: 7000 }, // [1:00–1:07] Step 7: Chainlink VRF
    { delay: 68000, duration: 8000 }, // [1:07–1:15] Step 8: LayerZero cross-chain
    { delay: 76000, duration: 8000 }, // [1:15–1:23] Step 9: Final CTA + logo out
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.play().catch(console.warn);
      }

      // Set up step progression with new timing
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

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated gradient mesh */}
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

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-20, -100],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
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
                  <p className={`text-gray-400/80 font-light tracking-[0.3em] uppercase ${
                    isMobile ? "text-xs" : "text-sm"
                  }`} style={{ letterSpacing: '0.25em' }}>From the creators of</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                >
                  <h1 className={`font-black bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent tracking-[0.15em] ${
                    isMobile ? "text-4xl" : "text-7xl"
                  }`} style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textShadow: '0 0 40px rgba(251, 191, 36, 0.3)'
                  }}>OMNIDRAGON</h1>
                </motion.div>
              </motion.div>
            )}

            {/* Step 1: Modern Title Sequence */}
            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex flex-col items-center justify-center min-h-screen relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <motion.h1 
                      className={`font-black mb-12 bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent tracking-tight ${
                        isMobile ? "text-6xl leading-[1.1]" : "text-[10rem] leading-[0.9]"
                      }`}
                      style={{
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.02em'
                      }}
                      animate={{
                        textShadow: [
                          "0 0 60px rgba(251, 191, 36, 0.4)",
                          "0 0 120px rgba(251, 191, 36, 0.2)",
                          "0 0 60px rgba(251, 191, 36, 0.4)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      SONIC RED DRAGON
                    </motion.h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                  >
                    <motion.div
                      className={`w-32 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full mx-auto mb-8 ${
                        isMobile ? "w-24" : ""
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: isMobile ? "6rem" : "8rem" }}
                      transition={{ duration: 1.5, delay: 2 }}
                    />
                    
                    <p className={`text-gray-300/90 font-light tracking-[0.05em] ${
                      isMobile ? "text-xl" : "text-4xl"
                    }`} style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: '300'
                    }}>
                      The Future of <span className="text-orange-300 font-medium italic">DeFi Gaming</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Enhanced Token Swap Animation */}
            {currentStep === 1 && (
              <motion.div
                key="swap-animation"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  {/* Modern Swap Title */}
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h2 className={`font-light mb-8 tracking-[0.02em] ${
                      isMobile ? "text-3xl" : "text-7xl"
                    }`} style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: '200',
                      letterSpacing: '-0.01em'
                    }}>
                      Swap <span className="font-black bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">$S</span> for <span className="font-black bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">$DRAGON</span>
                    </h2>
                  </motion.div>

                  {/* Featured Token Swap Animation - Extended Display */}
                  <motion.div
                    className="flex justify-center items-center mb-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <TokenExchangeAnimation
                      containerClassName="relative"
                      delay={0.8}
                      duration={4.2}
                      repeat={true}
                      scale={isMobile ? 0.8 : 1.3}
                      showTradeIndicators={false}
                      showFeeBreakdown={false}
                    />
                  </motion.div>


                </div>
              </motion.div>
            )}

            {/* Step 3: Revolutionary Lottery Reveal */}
            {currentStep === 2 && (
              <motion.div
                key="lottery-reveal"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Quantum Field Background */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Digital Grid Matrix */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '60px 60px',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      backgroundPosition: ['0px 0px', '60px 60px'],
                    }}
                    transition={{
                      opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                  />
                  
                  {/* Neural Network Connections */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
                      style={{
                        left: `${10 + (i * 10)}%`,
                        transformOrigin: 'center',
                      }}
                      animate={{
                        scaleY: [0.5, 1.2, 0.5],
                        opacity: [0.2, 0.8, 0.2],
                      }}
                      transition={{
                        duration: 3 + (i * 0.5),
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-7xl"}`}>
                  {/* Holographic Lottery Interface */}
                  <motion.div
                    className="relative mb-16"
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ perspective: "1000px" }}
                  >
                    {/* Main Lottery Display */}
                    <motion.div
                      className={`relative backdrop-blur-2xl bg-gradient-to-br from-purple-900/20 via-violet-800/10 to-purple-900/20 border border-purple-400/30 rounded-3xl ${
                        isMobile ? "p-8" : "p-16"
                      }`}
                      style={{
                        boxShadow: "0 0 100px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 100px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          "0 0 150px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                          "0 0 100px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Header */}
                      <motion.h2
                        className={`font-light text-purple-200 mb-8 tracking-[0.3em] uppercase ${
                          isMobile ? "text-sm" : "text-lg"
                        }`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                      >
                        Revolutionary Lottery System
                      </motion.h2>

                      {/* Central Lottery Ball */}
                      <motion.div
                        className="relative mx-auto mb-12"
                        style={{ width: isMobile ? "200px" : "300px", height: isMobile ? "200px" : "300px" }}
                      >
                        {/* Rotating Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-purple-400 via-violet-300 to-purple-400"
                          style={{
                            background: "conic-gradient(from 0deg, rgba(168,85,247,0.3), rgba(139,69,196,0.5), rgba(168,85,247,0.3))"
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Inner Sphere */}
                        <motion.div
                          className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 via-violet-700 to-purple-800 flex items-center justify-center"
                          style={{
                            boxShadow: "inset 0 0 50px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)"
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              "inset 0 0 50px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)",
                              "inset 0 0 70px rgba(168, 85, 247, 0.7), 0 0 120px rgba(168, 85, 247, 0.5)",
                              "inset 0 0 50px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <motion.div
                            className={`text-white font-black ${isMobile ? "text-4xl" : "text-6xl"}`}
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            animate={{
                              textShadow: [
                                "0 0 20px rgba(255, 255, 255, 0.8)",
                                "0 0 40px rgba(255, 255, 255, 1)",
                                "0 0 20px rgba(255, 255, 255, 0.8)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            🎲
                          </motion.div>
                        </motion.div>

                        {/* Orbiting Elements */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-purple-400 rounded-full"
                            style={{
                              left: "50%",
                              top: "50%",
                              transformOrigin: isMobile ? "0 100px" : "0 150px",
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Probability Matrix */}
                      <motion.div
                        className="grid grid-cols-3 gap-4 mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.5 }}
                      >
                        {[
                          { prize: "JACKPOT", odds: "1:1000", color: "from-yellow-400 to-amber-500" },
                          { prize: "SUPER", odds: "1:100", color: "from-purple-400 to-violet-500" },
                          { prize: "MINI", odds: "1:10", color: "from-blue-400 to-cyan-500" }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            className={`backdrop-blur-xl bg-gradient-to-br ${item.color}/10 border border-white/10 rounded-xl p-4`}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className={`text-xs font-semibold text-white/70 mb-1 ${isMobile ? "text-xs" : "text-sm"}`}>
                              {item.prize}
                            </div>
                            <div className={`font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent ${
                              isMobile ? "text-sm" : "text-lg"
                            }`}>
                              {item.odds}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Live Stats */}
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        <motion.div
                          className={`text-purple-200 font-light mb-2 ${isMobile ? "text-sm" : "text-lg"}`}
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          Current Pool
                        </motion.div>
                        <motion.div
                          className={`font-black text-white ${isMobile ? "text-3xl" : "text-5xl"}`}
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          animate={{
                            textShadow: [
                              "0 0 30px rgba(255, 255, 255, 0.5)",
                              "0 0 60px rgba(168, 85, 247, 0.8)",
                              "0 0 30px rgba(255, 255, 255, 0.5)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <AnimatedCounter showGrowthIndicator={false} />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Quantum Mechanics Explanation */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                  >
                    <motion.p
                      className={`text-purple-300 font-light leading-relaxed max-w-4xl mx-auto ${
                        isMobile ? "text-lg" : "text-xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Every swap triggers quantum randomness through{" "}
                      <span className="text-purple-100 font-medium">Chainlink VRF 2.5</span>,{" "}
                      creating provably fair lottery mechanics with instant settlement across{" "}
                      <span className="text-purple-100 font-medium">LayerZero networks</span>
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Neural Fee Analysis */}
            {currentStep === 3 && (
              <motion.div
                key="neural-analysis"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-cyan-950 to-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* AI Processing Environment */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Data Stream Lines */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                      style={{
                        top: `${10 + (i * 7)}%`,
                        left: '0%',
                        right: '0%',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleX: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Floating Data Packets */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  {/* AI Brain Visualization */}
                  <motion.div
                    className="relative mb-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    {/* Central Processing Unit */}
                    <motion.div
                      className={`relative mx-auto backdrop-blur-2xl bg-gradient-to-br from-cyan-900/20 via-blue-800/10 to-cyan-900/20 border border-cyan-400/30 rounded-full ${
                        isMobile ? "w-64 h-64 p-8" : "w-96 h-96 p-16"
                      }`}
                      style={{
                        boxShadow: "0 0 100px rgba(34, 211, 238, 0.3), inset 0 0 50px rgba(34, 211, 238, 0.1)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 100px rgba(34, 211, 238, 0.3), inset 0 0 50px rgba(34, 211, 238, 0.1)",
                          "0 0 150px rgba(34, 211, 238, 0.5), inset 0 0 80px rgba(34, 211, 238, 0.2)",
                          "0 0 100px rgba(34, 211, 238, 0.3), inset 0 0 50px rgba(34, 211, 238, 0.1)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Neural Network Pattern */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `
                            radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.2) 2px, transparent 2px),
                            radial-gradient(circle at 70% 30%, rgba(34, 211, 238, 0.2) 2px, transparent 2px),
                            radial-gradient(circle at 30% 70%, rgba(34, 211, 238, 0.2) 2px, transparent 2px),
                            radial-gradient(circle at 70% 70%, rgba(34, 211, 238, 0.2) 2px, transparent 2px),
                            radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.3) 3px, transparent 3px)
                          `,
                          backgroundSize: '60px 60px',
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          rotate: [0, 360],
                        }}
                        transition={{
                          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                        }}
                      />
                      
                      {/* Central AI Icon */}
                      <div className="relative flex items-center justify-center h-full">
                        <motion.div
                          className={`text-cyan-300 ${isMobile ? "text-6xl" : "text-8xl"}`}
                          animate={{
                            textShadow: [
                              "0 0 30px rgba(34, 211, 238, 0.8)",
                              "0 0 60px rgba(34, 211, 238, 1)",
                              "0 0 30px rgba(34, 211, 238, 0.8)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          🧠
                        </motion.div>
                      </div>

                      {/* Processing Rings */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border border-cyan-400/20"
                          style={{
                            margin: `${i * 20}px`,
                          }}
                          animate={{
                            rotate: [0, 360],
                            opacity: [0.2, 0.6, 0.2],
                          }}
                          transition={{
                            rotate: { duration: 10 + (i * 5), repeat: Infinity, ease: "linear" },
                            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* AI Analysis Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                  >
                    <motion.h2
                      className={`font-light text-cyan-200 mb-8 tracking-[0.2em] uppercase ${
                        isMobile ? "text-xl" : "text-3xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Neural Fee Processing
                    </motion.h2>
                    
                    <motion.p
                      className={`text-cyan-300 font-light leading-relaxed max-w-4xl mx-auto ${
                        isMobile ? "text-lg" : "text-xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 2 }}
                    >
                      Our quantum AI continuously analyzes market conditions, optimizing fee distribution in real-time.{" "}
                      <span className="text-cyan-100 font-medium">Smart contracts</span> automatically route{" "}
                      <span className="text-cyan-100 font-medium">10% of all swap fees</span> through advanced algorithms
                    </motion.p>
                  </motion.div>

                  {/* Processing Indicators */}
                  <motion.div
                    className={`mt-16 grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                  >
                    {[
                      { label: "Analyzing", value: "Market Conditions", icon: "📊" },
                      { label: "Processing", value: "Fee Distribution", icon: "⚡" },
                      { label: "Optimizing", value: "Yield Strategies", icon: "🎯" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-cyan-500/10 border border-cyan-400/20 rounded-xl p-6"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`text-3xl mb-3 ${isMobile ? "text-2xl" : ""}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className={`text-cyan-200 font-light mb-1 ${isMobile ? "text-sm" : "text-base"}`}>
                          {item.label}
                        </div>
                        <div className={`text-cyan-100 font-semibold ${isMobile ? "text-sm" : "text-lg"}`}>
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Holographic Token Flow */}
            {currentStep === 4 && (
              <motion.div
                key="holographic-flow"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-emerald-950 to-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Holographic Environment */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Holographic Grid */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                        linear-gradient(45deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                        linear-gradient(-45deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
                    }}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      backgroundPosition: [
                        '0px 0px, 0px 0px, 0px 0px, 0px 0px',
                        '100px 100px, 100px 100px, 50px 50px, 50px 50px'
                      ],
                    }}
                    transition={{
                      opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      backgroundPosition: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                  />
                  
                  {/* Energy Streams */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${15 + (i * 12)}%`,
                        top: '0%',
                        bottom: '0%',
                        width: '2px',
                        background: 'linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.6), transparent)',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleY: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 4 + (i * 0.5),
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-7xl"}`}>
                  {/* Main Title */}
                  <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    <motion.h2 
                      className={`font-light text-emerald-200 mb-8 tracking-[0.3em] uppercase ${
                        isMobile ? "text-xl" : "text-3xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Molecular Token Flow
                    </motion.h2>
                  </motion.div>

                  {/* 3D Token Flow Visualization */}
                  <motion.div
                    className="relative h-96 w-full mb-16"
                    style={{ perspective: "1500px" }}
                    initial={{ opacity: 0, rotateX: 30 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  >
                    {/* Central Hub */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <motion.div
                        className={`backdrop-blur-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-500/20 border border-emerald-400/30 rounded-full flex items-center justify-center ${
                          isMobile ? "w-32 h-32" : "w-48 h-48"
                        }`}
                        style={{
                          boxShadow: "0 0 100px rgba(16, 185, 129, 0.4), inset 0 0 50px rgba(16, 185, 129, 0.2)"
                        }}
                        animate={{
                          rotateY: [0, 360],
                          boxShadow: [
                            "0 0 100px rgba(16, 185, 129, 0.4), inset 0 0 50px rgba(16, 185, 129, 0.2)",
                            "0 0 150px rgba(16, 185, 129, 0.6), inset 0 0 80px rgba(16, 185, 129, 0.3)",
                            "0 0 100px rgba(16, 185, 129, 0.4), inset 0 0 50px rgba(16, 185, 129, 0.2)"
                          ]
                        }}
                        transition={{
                          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                          boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <motion.div
                          className={`text-emerald-300 ${isMobile ? "text-4xl" : "text-6xl"}`}
                          animate={{
                            textShadow: [
                              "0 0 30px rgba(16, 185, 129, 0.8)",
                              "0 0 60px rgba(16, 185, 129, 1)",
                              "0 0 30px rgba(16, 185, 129, 0.8)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          💎
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Orbiting Fee Destinations */}
                    {[
                      { label: "Jackpot", color: "yellow", angle: 0, radius: isMobile ? 120 : 180, icon: "🎰" },
                      { label: "Liquidity", color: "blue", angle: 120, radius: isMobile ? 120 : 180, icon: "💧" },
                      { label: "Burn", color: "red", angle: 240, radius: isMobile ? 120 : 180, icon: "🔥" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transformOrigin: `0 ${item.radius}px`,
                          transform: `rotate(${item.angle}deg) translate(0, -${item.radius}px)`,
                        }}
                        animate={{
                          rotate: [item.angle, item.angle + 360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 2
                        }}
                      >
                        <motion.div
                          className={`backdrop-blur-xl bg-gradient-to-br from-${item.color}-500/20 via-${item.color}-500/10 to-${item.color}-500/20 border border-${item.color}-400/30 rounded-2xl ${
                            isMobile ? "w-20 h-20 p-3" : "w-32 h-32 p-6"
                          }`}
                          style={{
                            transform: `rotate(-${item.angle}deg)`,
                            boxShadow: `0 0 50px rgba(${item.color === 'yellow' ? '251, 191, 36' : item.color === 'blue' ? '59, 130, 246' : '239, 68, 68'}, 0.3)`
                          }}
                          whileHover={{ scale: 1.1, y: -10 }}
                        >
                          <div className="text-center h-full flex flex-col justify-center">
                            <div className={`${isMobile ? "text-2xl" : "text-3xl"} mb-1`}>
                              {item.icon}
                            </div>
                            <div className={`text-${item.color}-200 font-semibold ${isMobile ? "text-xs" : "text-sm"}`}>
                              {item.label}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}

                    {/* Energy Flows */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                      {[0, 120, 240].map((angle, i) => {
                        const centerX = 400;
                        const centerY = 200;
                        const radius = isMobile ? 120 : 180;
                        const endX = centerX + Math.cos((angle * Math.PI) / 180) * radius;
                        const endY = centerY + Math.sin((angle * Math.PI) / 180) * radius;
                        
                        return (
                          <motion.path
                            key={i}
                            d={`M${centerX},${centerY} Q${centerX + 50},${centerY - 50} ${endX},${endY}`}
                            stroke={`url(#flow-gradient-${i})`}
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="12,8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                              pathLength: 1, 
                              opacity: [0, 1, 0.7],
                              strokeDashoffset: [0, -40]
                            }}
                            transition={{ 
                              pathLength: { duration: 2, delay: 1 + (i * 0.3), ease: "easeInOut" },
                              opacity: { duration: 1.5, delay: 1 + (i * 0.3) },
                              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
                            }}
                          />
                        );
                      })}
                      <defs>
                        <linearGradient id="flow-gradient-0" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
                          <stop offset="100%" stopColor="rgba(251, 191, 36, 0.8)" />
                        </linearGradient>
                        <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
                        </linearGradient>
                        <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
                          <stop offset="100%" stopColor="rgba(239, 68, 68, 0.8)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* Flow Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                  >
                    <motion.p
                      className={`text-emerald-300 font-light leading-relaxed max-w-4xl mx-auto ${
                        isMobile ? "text-lg" : "text-xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Each swap creates a molecular-level token flow, where fees are atomically distributed through{" "}
                      <span className="text-emerald-100 font-medium">quantum smart contracts</span>, ensuring{" "}
                      <span className="text-emerald-100 font-medium">perfect balance</span> across all ecosystem participants
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            )}
                    {/* Jackpot - Modern Glassmorphism */}
                    <motion.div
                      className={`group relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10 border border-amber-400/20 rounded-2xl ${
                        isMobile ? "p-6" : "p-8"
                      }`}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Subtle animated background */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-yellow-400/5 rounded-2xl"
                        animate={{ 
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Interactive highlight on hover */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-400/10 rounded-2xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <motion.div 
                          className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center ${
                            isMobile ? "w-12 h-12 mb-4" : ""
                          }`}
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <span className="text-2xl">🎰</span>
                        </motion.div>

                        {/* Percentage */}
                        <motion.div 
                          className={`font-bold text-amber-200 mb-3 ${
                            isMobile ? "text-4xl" : "text-5xl"
                          }`}
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '700',
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          6.9%
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className={`text-amber-100 font-semibold mb-3 tracking-wide ${
                          isMobile ? "text-lg" : "text-xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}>
                          Jackpot Pool
                        </h3>
                        
                        {/* Description */}
                        <p className={`text-amber-200/80 leading-relaxed ${
                          isMobile ? "text-sm" : "text-base"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '300'
                        }}>
                          Every swap becomes a lottery ticket with instant win potential
                        </p>
                      </div>
                    </motion.div>

                    {/* Liquidity - Modern Glassmorphism */}
                    <motion.div
                      className={`group relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border border-blue-400/20 rounded-2xl ${
                        isMobile ? "p-6" : "p-8"
                      }`}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Subtle animated background */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-cyan-400/5 rounded-2xl"
                        animate={{ 
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                      
                      {/* Interactive highlight on hover */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <motion.div 
                          className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center ${
                            isMobile ? "w-12 h-12 mb-4" : ""
                          }`}
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <span className="text-2xl">💧</span>
                        </motion.div>

                        {/* Percentage */}
                        <motion.div 
                          className={`font-bold text-blue-200 mb-3 ${
                            isMobile ? "text-4xl" : "text-5xl"
                          }`}
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '700',
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                          2.41%
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className={`text-blue-100 font-semibold mb-3 tracking-wide ${
                          isMobile ? "text-lg" : "text-xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}>
                          Liquidity Pool
                        </h3>
                        
                        {/* Description */}
                        <p className={`text-blue-200/80 leading-relaxed ${
                          isMobile ? "text-sm" : "text-base"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '300'
                        }}>
                          Maintains stable trading pairs and deep market liquidity
                        </p>
                      </div>
                    </motion.div>

                    {/* Burn - Modern Glassmorphism */}
                    <motion.div
                      className={`group relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-orange-500/10 via-red-500/5 to-orange-500/10 border border-orange-400/20 rounded-2xl ${
                        isMobile ? "p-6" : "p-8"
                      }`}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Subtle animated background */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-red-400/5 rounded-2xl"
                        animate={{ 
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      />
                      
                      {/* Interactive highlight on hover */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-2xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <motion.div 
                          className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center ${
                            isMobile ? "w-12 h-12 mb-4" : ""
                          }`}
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <span className="text-2xl">🔥</span>
                        </motion.div>

                        {/* Percentage */}
                        <motion.div 
                          className={`font-bold text-orange-200 mb-3 ${
                            isMobile ? "text-4xl" : "text-5xl"
                          }`}
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '700',
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                          0.69%
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className={`text-orange-100 font-semibold mb-3 tracking-wide ${
                          isMobile ? "text-lg" : "text-xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}>
                          Token Burn
                        </h3>
                        
                        {/* Description */}
                        <p className={`text-orange-200/80 leading-relaxed ${
                          isMobile ? "text-sm" : "text-base"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '300'
                        }}>
                          Deflationary mechanism reducing total supply permanently
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Interactive Flow Visualization */}
                  <motion.div
                    className={`mt-20 ${isMobile ? "mt-16" : ""}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  >
                    <motion.div
                      className="relative h-32 w-full max-w-4xl mx-auto"
                      style={{ perspective: "1000px" }}
                    >
                      {/* Animated flow lines */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 128">
                        <motion.path
                          d="M100,64 Q200,20 300,64 T500,64 T700,64"
                          stroke="url(#flow-gradient)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="8,12"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1, 
                            opacity: [0, 1, 0.7],
                            strokeDashoffset: [0, -40]
                          }}
                          transition={{ 
                            pathLength: { duration: 3, delay: 1.5, ease: "easeInOut" },
                            opacity: { duration: 2, delay: 1.5 },
                            strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" }
                          }}
                        />
                        <defs>
                          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                            <stop offset="33%" stopColor="rgba(251, 191, 36, 0.8)" />
                            <stop offset="66%" stopColor="rgba(34, 197, 94, 0.6)" />
                            <stop offset="100%" stopColor="rgba(239, 68, 68, 0.6)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <motion.div
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                      >
                        <p className={`text-gray-400 text-center font-light ${
                          isMobile ? "text-sm" : "text-base"
                        }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Automated fee distribution creates sustainable tokenomics
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Fee Breakdown – Cinematic Swell */}
            {currentStep === 4 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  {/* Modern LayerZero Header */}
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`relative ${isMobile ? "w-24 h-24 mr-6" : "w-32 h-32 mr-8"}`}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full p-1">
                          <img
                            src={getAssetUrl('LAYER_ZERO.WHITE_LOGO')}
                            alt="LayerZero"
                            className="w-full h-full rounded-full object-cover bg-black"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.h2 
                        className={`font-black bg-gradient-to-r from-cyan-100 via-blue-200 to-purple-200 bg-clip-text text-transparent tracking-[-0.02em] ${
                          isMobile ? "text-5xl" : "text-9xl"
                        }`}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '900',
                          letterSpacing: '-0.025em'
                        }}
                        animate={{
                          textShadow: [
                            "0 0 50px rgba(34, 211, 238, 0.5)",
                            "0 0 100px rgba(34, 211, 238, 0.3)",
                            "0 0 50px rgba(34, 211, 238, 0.5)"
                          ]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        LAYERZERO
                      </motion.h2>
                    </motion.div>
                    
                    <motion.div
                      className={`w-28 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mx-auto mb-10 ${
                        isMobile ? "w-20" : ""
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: isMobile ? "5rem" : "7rem" }}
                      transition={{ duration: 1.8, delay: 1 }}
                    />
                    
                    <p className={`text-gray-200/95 font-light max-w-5xl mx-auto leading-relaxed tracking-[0.01em] ${
                      isMobile ? "text-xl" : "text-4xl"
                    }`} style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: '300'
                    }}>
                      Seamless <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-medium italic">cross-chain messaging</span> and{" "}
                      <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-medium italic">interoperability</span>
                    </p>
                  </motion.div>

                  {/* Elegant Floating Cards Design */}
                  <div className="relative h-96 w-full max-w-6xl mx-auto">
                    {/* Floating Cross-Chain Card */}
                    <motion.div
                      className={`absolute ${isMobile ? "top-4 left-4 right-1/2" : "top-8 left-16 w-80"} z-20`}
                      initial={{ opacity: 0, y: -100, rotateX: 45, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                      transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ 
                        y: -25, 
                        rotateY: 12,
                        scale: 1.08,
                        transition: { duration: 0.5, ease: "easeOut" }
                      }}
                    >
                      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-900/90 via-blue-900/80 to-cyan-800/90 backdrop-blur-3xl border border-cyan-300/40 rounded-3xl shadow-2xl p-8" style={{
                        boxShadow: "0 30px 60px -12px rgba(34, 211, 238, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      }}>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-conic from-cyan-400/30 via-blue-500/20 to-cyan-400/30 rounded-3xl"
                          animate={{ 
                            rotate: [0, 360],
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{ 
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                        <div className="relative z-10">
                          <motion.div 
                            className={`font-bold text-cyan-100 mb-4 tracking-wide ${
                              isMobile ? "text-lg" : "text-2xl"
                            }`}
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            animate={{ 
                              textShadow: [
                                "0 0 20px rgba(34, 211, 238, 0.5)",
                                "0 0 40px rgba(34, 211, 238, 0.8)",
                                "0 0 20px rgba(34, 211, 238, 0.5)"
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            Cross-Chain Messaging
                          </motion.div>
                          <p className={`text-cyan-200/90 leading-relaxed font-light ${
                            isMobile ? "text-sm" : "text-base"
                          }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            Secure protocols enabling seamless multi-chain communication
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Universal Liquidity Card */}
                    <motion.div
                      className={`absolute ${isMobile ? "bottom-4 right-4 left-1/2" : "bottom-8 right-16 w-80"} z-20`}
                      initial={{ opacity: 0, y: 100, rotateX: -45, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                      transition={{ duration: 2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ 
                        y: -25, 
                        rotateY: -12,
                        scale: 1.08,
                        transition: { duration: 0.5, ease: "easeOut" }
                      }}
                    >
                      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-purple-800/90 backdrop-blur-3xl border border-purple-300/40 rounded-3xl shadow-2xl p-8" style={{
                        boxShadow: "0 30px 60px -12px rgba(147, 51, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      }}>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-conic from-purple-400/30 via-blue-500/20 to-purple-400/30 rounded-3xl"
                          animate={{ 
                            rotate: [360, 0],
                            opacity: [0.2, 0.5, 0.2]
                          }}
                          transition={{ 
                            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                          }}
                        />
                        <div className="relative z-10">
                          <motion.div 
                            className={`font-bold text-purple-100 mb-4 tracking-wide ${
                              isMobile ? "text-lg" : "text-2xl"
                            }`}
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            animate={{ 
                              textShadow: [
                                "0 0 20px rgba(147, 51, 234, 0.5)",
                                "0 0 40px rgba(147, 51, 234, 0.8)",
                                "0 0 20px rgba(147, 51, 234, 0.5)"
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                          >
                            Universal Interoperability
                          </motion.div>
                          <p className={`text-purple-200/90 leading-relaxed font-light ${
                            isMobile ? "text-sm" : "text-base"
                          }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            Universal protocol compatibility across all blockchain networks
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dynamic Connection Lines */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5, duration: 1.5 }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 800 400">
                        <motion.path
                          d="M160,120 Q400,200 640,280"
                          stroke="url(#layerzero-gradient)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="8,12"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1, 
                            opacity: [0, 1, 0.7],
                            strokeDashoffset: [0, -20]
                          }}
                          transition={{ 
                            pathLength: { duration: 2.5, delay: 3, ease: "easeInOut" },
                            opacity: { duration: 2, delay: 3 },
                            strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
                          }}
                        />
                        <defs>
                          <linearGradient id="layerzero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
                            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
                            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.8)" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Lottery Mechanics - Odds Table */}
            {currentStep === 5 && (
              <motion.div
                key="lottery"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  {/* Modern Chainlink Header */}
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`relative ${isMobile ? "w-24 h-24 mr-6" : "w-32 h-32 mr-8"}`}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.08, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full p-1">
                          <img
                            src={getAssetUrl('CHAINLINK.WHITE_LOGO')}
                            alt="Chainlink"
                            className="w-full h-full rounded-full object-cover bg-blue-900"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.h2 
                        className={`font-black bg-gradient-to-r from-blue-100 via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-[-0.02em] ${
                          isMobile ? "text-4xl" : "text-8xl"
                        }`}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '900',
                          letterSpacing: '-0.025em'
                        }}
                        animate={{
                          textShadow: [
                            "0 0 50px rgba(147, 51, 234, 0.5)",
                            "0 0 100px rgba(147, 51, 234, 0.3)",
                            "0 0 50px rgba(147, 51, 234, 0.5)"
                          ]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        CHAINLINK VRF 2.5
                      </motion.h2>
                    </motion.div>
                    
                    <motion.div
                      className={`w-28 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-10 ${
                        isMobile ? "w-20" : ""
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: isMobile ? "5rem" : "7rem" }}
                      transition={{ duration: 1.8, delay: 1 }}
                    />
                    
                    <p className={`text-gray-200/95 font-light max-w-5xl mx-auto leading-relaxed tracking-[0.01em] ${
                      isMobile ? "text-xl" : "text-4xl"
                    }`} style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: '300'
                    }}>
                      Truly <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-medium italic">random</span> and{" "}
                      <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent font-medium italic">verifiable</span> lottery system
                    </p>
                  </motion.div>

                  {/* Premium Chainlink Features Card */}
                  <motion.div
                    className={`relative overflow-hidden bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-pink-900/60 backdrop-blur-xl border border-purple-400/50 rounded-3xl shadow-2xl ${
                      isMobile ? "p-8 mx-2" : "p-12"
                    }`}
                    initial={{ opacity: 0, scale: 0.9, y: 60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: "0 30px 60px -12px rgba(147, 51, 234, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    {/* Enhanced background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-400/25 via-blue-500/15 to-pink-500/25 rounded-3xl"
                      animate={{ 
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Elegant Chainlink VRF Floating Cards */}
                    <div className="relative h-96 w-full max-w-6xl mx-auto">
                      {/* Floating Verifiable Randomness Card */}
                      <motion.div
                        className={`absolute ${isMobile ? "top-4 left-4 right-1/2" : "top-8 left-16 w-80"} z-20`}
                        initial={{ opacity: 0, y: -120, rotateX: 60, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={{ duration: 2.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ 
                          y: -30, 
                          rotateY: 15,
                          scale: 1.1,
                          transition: { duration: 0.6, ease: "easeOut" }
                        }}
                      >
                        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/95 via-purple-800/85 to-purple-900/95 backdrop-blur-3xl border border-purple-300/50 rounded-3xl shadow-2xl p-8" style={{
                          boxShadow: "0 35px 70px -12px rgba(147, 51, 234, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.25)"
                        }}>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-conic from-purple-400/40 via-pink-500/25 to-purple-400/40 rounded-3xl"
                            animate={{ 
                              rotate: [0, 360],
                              opacity: [0.3, 0.7, 0.3],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                          <div className="relative z-10">
                            <motion.div 
                              className={`font-bold text-purple-100 mb-4 tracking-wide ${
                                isMobile ? "text-lg" : "text-2xl"
                              }`}
                              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                              animate={{ 
                                textShadow: [
                                  "0 0 25px rgba(147, 51, 234, 0.6)",
                                  "0 0 50px rgba(147, 51, 234, 0.9)",
                                  "0 0 25px rgba(147, 51, 234, 0.6)"
                                ]
                              }}
                              transition={{ duration: 3.5, repeat: Infinity }}
                            >
                              Verifiable Randomness
                            </motion.div>
                            <p className={`text-purple-200/95 leading-relaxed font-light ${
                              isMobile ? "text-sm" : "text-base"
                            }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                              Cryptographically secure random number generation with mathematical proof
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating Instant Payouts Card */}
                      <motion.div
                        className={`absolute ${isMobile ? "bottom-4 right-4 left-1/2" : "bottom-8 right-16 w-80"} z-20`}
                        initial={{ opacity: 0, y: 120, rotateX: -60, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={{ duration: 2.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ 
                          y: -30, 
                          rotateY: -15,
                          scale: 1.1,
                          transition: { duration: 0.6, ease: "easeOut" }
                        }}
                      >
                        <div className="relative overflow-hidden bg-gradient-to-br from-pink-900/95 via-purple-900/85 to-pink-800/95 backdrop-blur-3xl border border-pink-300/50 rounded-3xl shadow-2xl p-8" style={{
                          boxShadow: "0 35px 70px -12px rgba(236, 72, 153, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.25)"
                        }}>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-conic from-pink-400/40 via-purple-500/25 to-pink-400/40 rounded-3xl"
                            animate={{ 
                              rotate: [360, 0],
                              opacity: [0.3, 0.7, 0.3],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                              scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                            }}
                          />
                          <div className="relative z-10">
                            <motion.div 
                              className={`font-bold text-pink-100 mb-4 tracking-wide ${
                                isMobile ? "text-lg" : "text-2xl"
                              }`}
                              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                              animate={{ 
                                textShadow: [
                                  "0 0 25px rgba(236, 72, 153, 0.6)",
                                  "0 0 50px rgba(236, 72, 153, 0.9)",
                                  "0 0 25px rgba(236, 72, 153, 0.6)"
                                ]
                              }}
                              transition={{ duration: 3.5, repeat: Infinity, delay: 0.7 }}
                            >
                              Instant Payouts
                            </motion.div>
                            <p className={`text-pink-200/95 leading-relaxed font-light ${
                              isMobile ? "text-sm" : "text-base"
                            }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                              Automated smart contract execution with immediate reward distribution
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Central Lottery Animation */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
                      >
                        <motion.div
                          className={`bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black shadow-2xl ${
                            isMobile ? "w-20 h-20 text-sm" : "w-28 h-28 text-lg"
                          }`}
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              "0 0 40px rgba(147, 51, 234, 0.6)",
                              "0 0 80px rgba(236, 72, 153, 0.8)",
                              "0 0 40px rgba(147, 51, 234, 0.6)"
                            ]
                          }}
                          transition={{
                            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <AnimatedCounter showGrowthIndicator={false} />
                        </motion.div>
                      </motion.div>

                      {/* Dynamic VRF Connection Lines */}
                      <motion.div 
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.8, duration: 1.5 }}
                      >
                        <svg className="w-full h-full" viewBox="0 0 800 400">
                          <motion.path
                            d="M160,120 Q400,50 640,280"
                            stroke="url(#chainlink-gradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="10,15"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                              pathLength: 1, 
                              opacity: [0, 1, 0.8],
                              strokeDashoffset: [0, -25]
                            }}
                            transition={{ 
                              pathLength: { duration: 3, delay: 3.2, ease: "easeInOut" },
                              opacity: { duration: 2, delay: 3.2 },
                              strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" }
                            }}
                          />
                          <motion.path
                            d="M640,120 Q400,350 160,280"
                            stroke="url(#chainlink-gradient2)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="10,15"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                              pathLength: 1, 
                              opacity: [0, 1, 0.8],
                              strokeDashoffset: [0, 25]
                            }}
                            transition={{ 
                              pathLength: { duration: 3, delay: 3.8, ease: "easeInOut" },
                              opacity: { duration: 2, delay: 3.8 },
                              strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear", delay: 1 }
                            }}
                          />
                          <defs>
                            <linearGradient id="chainlink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.9)" />
                              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.7)" />
                              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.9)" />
                            </linearGradient>
                            <linearGradient id="chainlink-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.9)" />
                              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.7)" />
                              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.9)" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 7: Chainlink VRF */}
            {currentStep === 6 && (
              <motion.div
                key="chainlink-vrf"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-pink-900/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-12"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`relative ${isMobile ? "w-20 h-20 mr-4" : "w-28 h-28 mr-6"}`}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <img
                          src={getAssetUrl('CHAINLINK.WHITE_LOGO')}
                          alt="Chainlink"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.h2 
                        className={`font-black bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent ${
                          isMobile ? "text-4xl" : "text-7xl"
                        }`}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '900',
                          letterSpacing: '-0.02em'
                        }}
                        animate={{
                          textShadow: [
                            "0 0 40px rgba(147, 51, 234, 0.6)",
                            "0 0 80px rgba(236, 72, 153, 0.4)",
                            "0 0 40px rgba(147, 51, 234, 0.6)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        CHAINLINK VRF 2.5
                      </motion.h2>
                    </motion.div>

                    <motion.p
                      className={`text-gray-200 font-light leading-relaxed mb-16 ${
                        isMobile ? "text-xl" : "text-3xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      Provably fair randomness for{" "}
                      <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-medium">
                        tamper-proof lottery results
                      </span>
                    </motion.p>

                    <motion.div
                      className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-10 py-5 rounded-full shadow-2xl ${
                        isMobile ? "px-8 py-4 text-lg" : "text-xl"
                      }`}
                      style={{
                        boxShadow: '0 0 50px rgba(147, 51, 234, 0.6)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: [
                          '0 0 50px rgba(147, 51, 234, 0.6)',
                          '0 0 100px rgba(236, 72, 153, 0.8)',
                          '0 0 50px rgba(147, 51, 234, 0.6)'
                        ]
                      }}
                      transition={{ 
                        opacity: { duration: 1, delay: 1.5 },
                        scale: { duration: 1, delay: 1.5 },
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      CRYPTOGRAPHICALLY SECURE
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 8: LayerZero Cross-Chain */}
            {currentStep === 7 && (
              <motion.div
                key="layerzero-crosschain"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-blue-900/20 to-cyan-900/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-12"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`relative ${isMobile ? "w-20 h-20 mr-4" : "w-28 h-28 mr-6"}`}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full p-1">
                          <img
                            src={getAssetUrl('LAYER_ZERO.WHITE_LOGO')}
                            alt="LayerZero"
                            className="w-full h-full rounded-full object-cover bg-black"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.h2 
                        className={`font-black bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-300 bg-clip-text text-transparent ${
                          isMobile ? "text-4xl" : "text-7xl"
                        }`}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '900',
                          letterSpacing: '-0.02em'
                        }}
                        animate={{
                          textShadow: [
                            "0 0 40px rgba(34, 211, 238, 0.6)",
                            "0 0 80px rgba(59, 130, 246, 0.4)",
                            "0 0 40px rgba(34, 211, 238, 0.6)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        LAYERZERO
                      </motion.h2>
                    </motion.div>

                    <motion.p
                      className={`text-gray-200 font-light leading-relaxed mb-16 ${
                        isMobile ? "text-xl" : "text-3xl"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      Seamless cross-chain messaging for{" "}
                      <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-medium">
                        universal interoperability
                      </span>
                    </motion.p>

                    <motion.div
                      className={`bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-10 py-5 rounded-full shadow-2xl ${
                        isMobile ? "px-8 py-4 text-lg" : "text-xl"
                      }`}
                      style={{
                        boxShadow: '0 0 50px rgba(34, 211, 238, 0.6)',
                        fontFamily: 'Inter, system-ui, sans-serif',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        boxShadow: [
                          '0 0 50px rgba(34, 211, 238, 0.6)',
                          '0 0 100px rgba(59, 130, 246, 0.8)',
                          '0 0 50px rgba(34, 211, 238, 0.6)'
                        ]
                      }}
                      transition={{ 
                        opacity: { duration: 1, delay: 1.5 },
                        scale: { duration: 1, delay: 1.5 },
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      CROSS-CHAIN ENABLED
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 9: Final CTA + Logo Out */}
            {currentStep === 8 && (
              <motion.div
                key="final-cta"
                className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-red-900/20 to-orange-900/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <motion.h1
                      className={`font-black bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent mb-16 ${
                        isMobile ? "text-6xl leading-[1.1]" : "text-[8rem] leading-[0.9]"
                      }`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.03em',
                        textShadow: '0 0 100px rgba(251, 191, 36, 0.8)',
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 0 100px rgba(251, 191, 36, 0.8)",
                          "0 0 200px rgba(251, 146, 60, 1)",
                          "0 0 100px rgba(251, 191, 36, 0.8)"
                        ],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut"
                      }}
                    >
                      SONIC RED DRAGON
                    </motion.h1>

                    <motion.div
                      className="flex items-center justify-center mb-16"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.5 }}
                    >
                      <DragonToken
                        size={isMobile ? "w-24 h-24" : "w-32 h-32"}
                        animateProps={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transitionProps={{
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                          boxShadow: '0 0 60px rgba(251, 146, 60, 0.8)',
                        }}
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 2 }}
                    >
                      <motion.div
                        className={`bg-gradient-to-r from-red-500 to-orange-500 text-white font-black px-16 py-8 rounded-full shadow-2xl ${
                          isMobile ? "px-12 py-6 text-xl" : "text-3xl"
                        }`}
                        style={{
                          boxShadow: '0 0 80px rgba(251, 146, 60, 0.8)',
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            '0 0 80px rgba(251, 146, 60, 0.8)',
                            '0 0 120px rgba(239, 68, 68, 1)',
                            '0 0 80px rgba(251, 146, 60, 0.8)'
                          ],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        START TRADING NOW
                      </motion.div>

                      <motion.p
                        className={`text-gray-300 font-light ${
                          isMobile ? "text-lg" : "text-2xl"
                        }`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut"
                        }}
                      >
                        The future of DeFi gaming is here
                      </motion.p>
                    </motion.div>
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