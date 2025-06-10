import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "../hooks/use-mobile";
import { IPFS_ASSETS } from "@/lib/assets";
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

  const steps = [
    { delay: 0 },      // Pre-credits
    { delay: 3000 },   // Step 1: Title
    { delay: 8000 },   // Step 2: Fee Structure Intro
    { delay: 13000 },  // Step 3: Fee Breakdown Part 1
    { delay: 18000 },  // Step 4: Fee Breakdown Part 2
    { delay: 23000 },  // Step 5: LayerZero
    { delay: 28000 },  // Step 6: Chainlink VRF
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
        }, step.delay + 3000); // Add 3 seconds for pre-credits
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

                  {/* Enhanced Token Animation Container */}
                  <div className="relative h-56 flex items-center justify-center overflow-hidden mb-16">
                    {/* S Token - Enhanced Animation */}
                    <motion.div
                      className="absolute"
                      initial={{ x: -500, opacity: 0, scale: 0.8 }}
                      animate={{ 
                        x: [-500, -60, 0, 60, 500],
                        opacity: [0, 1, 1, 1, 0],
                        scale: [0.8, 1.2, 1.4, 1.2, 0.8],
                        rotate: [0, 90, 180, 270, 360]
                      }}
                      transition={{ 
                        duration: 5,
                        times: [0, 0.25, 0.5, 0.75, 1],
                        ease: [0.68, -0.55, 0.265, 1.55],
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <SonicToken 
                        size={isMobile ? "w-20 h-20" : "w-32 h-32"}
                        borderColor="border-yellow-300"
                        gradientFrom="from-yellow-400"
                        gradientTo="to-orange-500"
                        style={{
                          filter: "drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))",
                          boxShadow: "0 0 50px rgba(251, 191, 36, 0.6)"
                        }}
                      />
                    </motion.div>

                    {/* Enhanced Convergence Effects */}
                    <motion.div
                      className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                      animate={{
                        scale: [1, 3, 1],
                        opacity: [0.2, 0.9, 0.2],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: "blur(8px)",
                      }}
                    />

                    {/* Modern Swap Icon */}
                    <motion.div
                      className={`text-yellow-400 font-black z-10 relative ${isMobile ? "text-4xl" : "text-6xl"}`}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.4, 1],
                        rotateY: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: "drop-shadow(0 0 25px rgba(251, 191, 36, 0.9))",
                        textShadow: "0 0 30px rgba(251, 191, 36, 0.8)"
                      }}
                    >
                      ⇄
                    </motion.div>

                    {/* Dragon Token - Enhanced Animation */}
                    <motion.div
                      className="absolute"
                      initial={{ x: 500, opacity: 0, scale: 0.8 }}
                      animate={{ 
                        x: [500, 60, 0, -60, -500],
                        opacity: [0, 1, 1, 1, 0],
                        scale: [0.8, 1.2, 1.4, 1.2, 0.8],
                        rotate: [0, -90, -180, -270, -360]
                      }}
                      transition={{ 
                        duration: 5,
                        times: [0, 0.25, 0.5, 0.75, 1],
                        ease: [0.68, -0.55, 0.265, 1.55],
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <DragonToken 
                        size={isMobile ? "w-20 h-20" : "w-32 h-32"}
                        borderColor="border-yellow-300"
                        gradientFrom="from-yellow-400"
                        gradientTo="to-red-500"
                        style={{
                          filter: "drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))",
                          boxShadow: "0 0 50px rgba(239, 68, 68, 0.6)"
                        }}
                      />
                    </motion.div>

                    {/* Enhanced Energy Trails */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                        style={{
                          left: `${45 + (i % 2 === 0 ? -i * 12 : i * 12)}%`,
                          top: `${48 + Math.sin(i) * 15}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 2, 0],
                          x: [0, (i % 2 === 0 ? -150 : 150)],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      />
                    ))}
                  </div>

                  {/* Modern Fee Display Card */}
                  <motion.div
                    className={`relative overflow-hidden bg-gradient-to-br from-red-900/50 via-red-800/40 to-orange-900/50 backdrop-blur-xl border border-red-500/40 rounded-3xl shadow-2xl ${
                      isMobile ? "p-8 mx-2" : "p-12"
                    }`}
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    {/* Animated background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-red-500/15 via-orange-500/10 to-red-500/15 rounded-3xl"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`font-black bg-gradient-to-r from-red-200 via-orange-200 to-red-100 bg-clip-text text-transparent ${
                          isMobile ? "text-5xl" : "text-8xl"
                        }`}
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '900',
                          letterSpacing: '-0.02em'
                        }}
                        animate={{ 
                          textShadow: [
                            "0 0 40px rgba(239, 68, 68, 0.5)",
                            "0 0 80px rgba(239, 68, 68, 0.3)",
                            "0 0 40px rgba(239, 68, 68, 0.5)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        10% TRADING FEE
                      </motion.div>
                      
                      <motion.div
                        className={`w-20 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto my-8 ${
                          isMobile ? "w-16" : ""
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: isMobile ? "4rem" : "5rem" }}
                        transition={{ duration: 1.5, delay: 2 }}
                      />
                      
                      <p className={`text-gray-100/90 font-light leading-relaxed tracking-[0.02em] ${
                        isMobile ? "text-xl" : "text-3xl"
                      }`} style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: '300'
                      }}>
                        But here's where it gets{" "}
                        <span className="text-yellow-300 font-medium italic">interesting...</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Fee Breakdown Intro */}
            {currentStep === 2 && (
              <motion.div
                key="fee-breakdown-1"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.div
                    className={`mb-12 ${isMobile ? "mb-8" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.h2 
                      className={`font-extralight mb-12 bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 bg-clip-text text-transparent tracking-[-0.01em] ${
                        isMobile ? "text-3xl" : "text-7xl"
                      }`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: '200'
                      }}
                      animate={{
                        textShadow: [
                          "0 0 40px rgba(251, 191, 36, 0.4)",
                          "0 0 80px rgba(251, 191, 36, 0.2)",
                          "0 0 40px rgba(251, 191, 36, 0.4)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      But here's where it gets interesting
                    </motion.h2>
                    
                    <motion.div
                      className={`w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-8 ${
                        isMobile ? "w-16" : ""
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: isMobile ? "4rem" : "6rem" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                    
                    <p className={`text-gray-200/95 font-light max-w-5xl mx-auto leading-relaxed tracking-[0.01em] ${
                      isMobile ? "text-lg" : "text-3xl"
                    }`} style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: '300'
                    }}>
                      On other DEX they just take your fees or give it to farmers, but on{" "}
                      <span className="bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent font-medium">Sonic Red Dragon</span>, 
                      we turn them into <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent font-medium italic">opportunities</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Modern Fee Distribution */}
            {currentStep === 3 && (
              <motion.div
                key="fee-breakdown-2"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.h2 
                      className={`font-black mb-12 bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-100 bg-clip-text text-transparent tracking-[-0.02em] ${
                        isMobile ? "text-4xl" : "text-8xl"
                      }`}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.03em'
                      }}
                      animate={{
                        textShadow: [
                          "0 0 50px rgba(34, 197, 94, 0.4)",
                          "0 0 100px rgba(34, 197, 94, 0.2)",
                          "0 0 50px rgba(34, 197, 94, 0.4)"
                        ]
                      }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      FEE DISTRIBUTION
                    </motion.h2>
                  </motion.div>

                  {/* Premium Fee Breakdown Cards */}
                  <div className={`grid gap-10 ${isMobile ? "grid-cols-1 space-y-8" : "md:grid-cols-3"}`}>
                    {/* Jackpot - Premium Glass Card */}
                    <motion.div
                      className={`group relative overflow-hidden bg-gradient-to-br from-yellow-900/60 via-yellow-800/50 to-amber-900/60 backdrop-blur-xl border border-yellow-400/50 rounded-3xl shadow-2xl ${
                        isMobile ? "p-8" : "p-10"
                      }`}
                      initial={{ opacity: 0, y: 80, rotateY: -15 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.03, y: -10, rotateY: 5 }}
                      style={{
                        boxShadow: "0 30px 60px -12px rgba(251, 191, 36, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      }}
                    >
                      {/* Enhanced background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-yellow-400/25 via-transparent to-amber-400/25 rounded-3xl"
                        animate={{ 
                          opacity: [0.3, 0.5, 0.3],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`font-black bg-gradient-to-r from-yellow-100 via-yellow-200 to-amber-100 bg-clip-text text-transparent ${
                            isMobile ? "text-6xl" : "text-8xl"
                          }`}
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '900',
                            letterSpacing: '-0.03em'
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          6.9%
                        </motion.div>
                        
                        <div className={`w-20 h-[2px] bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full my-8 ${
                          isMobile ? "w-16" : ""
                        }`} />
                        
                        <p className={`text-yellow-50 font-black tracking-[0.1em] uppercase ${
                          isMobile ? "text-xl" : "text-2xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '800'
                        }}>
                          Jackpot Pool
                        </p>
                        <p className={`text-yellow-100/90 mt-6 leading-relaxed font-light tracking-[0.01em] ${
                          isMobile ? "text-base" : "text-xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '300'
                        }}>
                          Every swap becomes a lottery ticket
                        </p>
                      </div>
                    </motion.div>

                    {/* Liquidity - Premium Glass Card */}
                    <motion.div
                      className={`group relative overflow-hidden bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-cyan-900/60 backdrop-blur-xl border border-blue-400/50 rounded-3xl shadow-2xl ${
                        isMobile ? "p-8" : "p-10"
                      }`}
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.03, y: -10 }}
                      style={{
                        boxShadow: "0 30px 60px -12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      }}
                    >
                      {/* Enhanced background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/25 via-transparent to-cyan-400/25 rounded-3xl"
                        animate={{ 
                          opacity: [0.3, 0.5, 0.3],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`font-black bg-gradient-to-r from-blue-100 via-blue-200 to-cyan-100 bg-clip-text text-transparent ${
                            isMobile ? "text-6xl" : "text-8xl"
                          }`}
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '900',
                            letterSpacing: '-0.03em'
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                          2.41%
                        </motion.div>
                        
                        <div className={`w-20 h-[2px] bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full my-8 ${
                          isMobile ? "w-16" : ""
                        }`} />
                        
                        <p className={`text-blue-50 font-black tracking-[0.1em] uppercase ${
                          isMobile ? "text-xl" : "text-2xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '800'
                        }}>
                          Liquidity Pool
                        </p>
                        <p className={`text-blue-100/90 mt-6 leading-relaxed font-light tracking-[0.01em] ${
                          isMobile ? "text-base" : "text-xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '300'
                        }}>
                          Maintains stable trading pairs
                        </p>
                      </div>
                    </motion.div>

                    {/* Burn - Premium Glass Card */}
                    <motion.div
                      className={`group relative overflow-hidden bg-gradient-to-br from-orange-900/60 via-red-900/50 to-orange-900/60 backdrop-blur-xl border border-orange-400/50 rounded-3xl shadow-2xl ${
                        isMobile ? "p-8" : "p-10"
                      }`}
                      initial={{ opacity: 0, y: 80, rotateY: 15 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.03, y: -10, rotateY: -5 }}
                      style={{
                        boxShadow: "0 30px 60px -12px rgba(251, 146, 60, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      }}
                    >
                      {/* Enhanced background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-400/25 via-transparent to-red-400/25 rounded-3xl"
                        animate={{ 
                          opacity: [0.3, 0.5, 0.3],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`font-black bg-gradient-to-r from-orange-100 via-orange-200 to-red-100 bg-clip-text text-transparent ${
                            isMobile ? "text-6xl" : "text-8xl"
                          }`}
                          style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '900',
                            letterSpacing: '-0.03em'
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                          0.69%
                        </motion.div>
                        
                        <div className={`w-20 h-[2px] bg-gradient-to-r from-orange-300 to-red-300 rounded-full my-8 ${
                          isMobile ? "w-16" : ""
                        }`} />
                        
                        <p className={`text-orange-50 font-black tracking-[0.1em] uppercase ${
                          isMobile ? "text-xl" : "text-2xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '800'
                        }}>
                          Token Burn
                        </p>
                        <p className={`text-orange-100/90 mt-6 leading-relaxed font-light tracking-[0.01em] ${
                          isMobile ? "text-base" : "text-xl"
                        }`} style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: '300'
                        }}>
                          Deflationary mechanism
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Modern LayerZero Integration */}
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
                            src={IPFS_ASSETS.LAYER_ZERO.WHITE_LOGO}
                            alt="LayerZero"
                            className="w-full h-full rounded-full object-cover"
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

                  {/* Premium LayerZero Features Card */}
                  <motion.div
                    className={`relative overflow-hidden bg-gradient-to-br from-cyan-900/60 via-blue-900/50 to-purple-900/60 backdrop-blur-xl border border-cyan-400/50 rounded-3xl shadow-2xl ${
                      isMobile ? "p-8 mx-2" : "p-12"
                    }`}
                    initial={{ opacity: 0, scale: 0.9, y: 60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: "0 30px 60px -12px rgba(34, 211, 238, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    {/* Enhanced background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-purple-500/25 rounded-3xl"
                      animate={{ 
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <div className={`grid gap-10 ${isMobile ? "grid-cols-1 space-y-8" : "md:grid-cols-2"}`}>
                        {/* Cross-Chain Messaging Feature */}
                        <motion.div 
                          className="text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-800/40 to-blue-800/40 border border-cyan-400/30"
                          initial={{ opacity: 0, x: -60 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 1.2, delay: 1.2 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <motion.div 
                            className={`font-black text-cyan-100 mb-6 tracking-[0.1em] uppercase ${
                              isMobile ? "text-xl" : "text-2xl"
                            }`}
                            style={{
                              fontFamily: 'Inter, system-ui, sans-serif',
                              fontWeight: '800'
                            }}
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            Cross-Chain Messaging
                          </motion.div>
                          <p className={`text-cyan-200/90 leading-relaxed font-light tracking-[0.01em] ${
                            isMobile ? "text-base" : "text-xl"
                          }`} style={{
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontWeight: '300'
                          }}>
                            Connect multiple blockchains seamlessly
                          </p>
                        </motion.div>

                        {/* Universal Liquidity Feature */}
                        <motion.div 
                          className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-800/40 to-purple-800/40 border border-blue-400/30"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 1.2, delay: 1.4 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <motion.div 
                            className={`font-black text-blue-200 mb-6 ${
                              isMobile ? "text-xl" : "text-3xl"
                            }`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                          >
                            UNIVERSAL LIQUIDITY
                          </motion.div>
                          <p className={`text-blue-100/90 leading-relaxed font-medium ${
                            isMobile ? "text-sm" : "text-lg"
                          }`}>
                            Access liquidity across all chains
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Modern Chainlink VRF Lottery */}
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
                            src={IPFS_ASSETS.CHAINLINK.BLUE_LOGO}
                            alt="Chainlink"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.h2 
                        className={`font-black bg-gradient-to-r from-blue-200 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-wider ${
                          isMobile ? "text-3xl" : "text-7xl"
                        }`}
                        animate={{
                          textShadow: [
                            "0 0 30px rgba(147, 51, 234, 0.6)",
                            "0 0 60px rgba(147, 51, 234, 0.4)",
                            "0 0 30px rgba(147, 51, 234, 0.6)"
                          ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
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
                    
                    <p className={`text-gray-200/90 font-medium max-w-4xl mx-auto leading-relaxed ${
                      isMobile ? "text-lg" : "text-3xl"
                    }`}>
                      Truly <span className="text-purple-400 font-bold">random</span> and{" "}
                      <span className="text-pink-400 font-bold">verifiable</span> lottery system
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
                    
                    <div className="relative z-10">
                      <motion.div
                        className={`font-black text-purple-200 mb-8 ${
                          isMobile ? "text-2xl" : "text-4xl"
                        }`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        DECENTRALIZED LOTTERY
                      </motion.div>
                      
                      <div className={`grid gap-8 ${isMobile ? "grid-cols-1 space-y-6" : "md:grid-cols-2"}`}>
                        <motion.div 
                          className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-800/40 to-blue-800/40 border border-purple-400/30"
                          initial={{ opacity: 0, rotate: -5 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ duration: 1.2, delay: 1.2 }}
                          whileHover={{ scale: 1.05, rotate: 2 }}
                        >
                          <p className={`text-purple-200 font-bold mb-3 ${
                            isMobile ? "text-lg" : "text-xl"
                          }`}>
                            PROVABLY FAIR
                          </p>
                          <p className={`text-purple-100/90 ${
                            isMobile ? "text-sm" : "text-base"
                          }`}>
                            Cryptographically secure randomness
                          </p>
                        </motion.div>

                        <motion.div 
                          className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-800/40 to-pink-800/40 border border-pink-400/30"
                          initial={{ opacity: 0, rotate: 5 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ duration: 1.2, delay: 1.4 }}
                          whileHover={{ scale: 1.05, rotate: -2 }}
                        >
                          <p className={`text-pink-200 font-bold mb-3 ${
                            isMobile ? "text-lg" : "text-xl"
                          }`}>
                            INSTANT PAYOUTS
                          </p>
                          <p className={`text-pink-100/90 ${
                            isMobile ? "text-sm" : "text-base"
                          }`}>
                            Automated smart contract execution
                          </p>
                        </motion.div>
                      </div>

                      {/* Lottery Animation */}
                      <motion.div
                        className="mt-12 flex justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.6 }}
                      >
                        <motion.div
                          className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black ${
                            isMobile ? "w-24 h-24 text-lg" : "w-32 h-32 text-2xl"
                          }`}
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <AnimatedCounter showGrowthIndicator={false} />
                        </motion.div>
                      </motion.div>
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