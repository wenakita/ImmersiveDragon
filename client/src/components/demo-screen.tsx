import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { useIsMobile } from "../hooks/use-mobile";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

// Sonic Token Component
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
    className={`${size} rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg border-2 ${borderColor} overflow-hidden`}
    animate={animateProps}
    transition={transitionProps}
    style={style}
  >
    <img
      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
      alt="Sonic"
      className={`${imageSize} object-cover rounded-full`}
    />
  </motion.div>
);

// Dragon Token Component
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
    className={`${size} rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg border-2 ${borderColor} overflow-hidden`}
    animate={animateProps}
    transition={transitionProps}
    style={style}
  >
    <img
      src="https://assets.coingecko.com/coins/images/36096/standard/Sonic_Logo.png?1710331404"
      alt="Dragon"
      className={`${imageSize} object-cover rounded-full`}
    />
  </motion.div>
);

// Animated Counter Component
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
      <span>${count.toLocaleString()}</span>
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
                  <p className={`text-gray-400 tracking-widest ${
                    isMobile ? "text-sm mobile-text-sm" : "text-lg"
                  }`}>FROM THE CREATORS OF</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                >
                  <h1 className={`font-bold text-yellow-400 tracking-wider ${
                    isMobile ? "text-3xl mobile-text-xl" : "text-6xl"
                  }`}>OMNIDRAGON</h1>
                </motion.div>
              </motion.div>
            )}

            {/* Step 1: Title Sequence */}
            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex flex-col items-center justify-center min-h-screen relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                {/* Simplified background effects */}
                <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-orange-500 rounded-full"
                      style={{
                        left: `${5 + i * 8}%`,
                        top: `${10 + (i % 5) * 15}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <h1 className={`font-bold mb-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent ${
                      isMobile ? "text-4xl mobile-text-2xl leading-tight" : "text-8xl leading-tight"
                    }`}>
                      SONIC RED DRAGON
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                  >
                    <p className={`text-gray-300 font-light tracking-wide ${
                      isMobile ? "text-base mobile-text-base" : "text-2xl"
                    }`}>
                      The Future of DeFi Gaming
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Token Swap Animation */}
            {currentStep === 1 && (
              <motion.div
                key="swap-animation"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Background effects */}
                <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{
                        left: `${5 + i * 8}%`,
                        top: `${10 + (i % 5) * 15}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-6xl"}`}>
                  {/* Swap Title */}
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h2 className={`font-light mb-6 tracking-wide ${
                      isMobile ? "text-2xl mobile-text-lg" : "text-5xl"
                    }`}>
                      Swap <span className="font-bold text-yellow-400">$S</span> for <span className="font-bold text-yellow-400">$DRAGON</span>
                    </h2>
                  </motion.div>

                  {/* Token Animation Container */}
                  <div className="relative h-48 flex items-center justify-center overflow-hidden">
                    {/* S Token - Converging Animation */}
                    <motion.div
                      className="absolute"
                      initial={{ x: -400, opacity: 0, scale: 0.8 }}
                      animate={{ 
                        x: [-400, -50, 0, 50, 400],
                        opacity: [0, 1, 1, 1, 0],
                        scale: [0.8, 1.1, 1.2, 1.1, 0.8],
                        rotate: [0, 45, 90, 135, 180]
                      }}
                      transition={{ 
                        duration: 4,
                        times: [0, 0.3, 0.5, 0.7, 1],
                        ease: [0.68, -0.55, 0.265, 1.55], // Custom cubic bezier for dramatic effect
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <SonicToken 
                        size={isMobile ? "w-16 h-16" : "w-24 h-24"}
                        borderColor="border-yellow-300"
                        gradientFrom="from-yellow-400"
                        gradientTo="to-orange-500"
                        style={{
                          filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))",
                          boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)"
                        }}
                      />
                    </motion.div>

                    {/* Convergence Point Effects */}
                    <motion.div
                      className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: "blur(4px)",
                      }}
                    />

                    {/* Swap Arrow with Enhanced Animation */}
                    <motion.div
                      className={`text-yellow-400 font-bold ${isMobile ? "text-3xl" : "text-5xl"} z-10 relative`}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.3, 1],
                        rotateY: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))",
                        textShadow: "0 0 20px rgba(251, 191, 36, 0.6)"
                      }}
                    >
                      ⇄
                    </motion.div>

                    {/* Dragon Token - Converging Animation */}
                    <motion.div
                      className="absolute"
                      initial={{ x: 400, opacity: 0, scale: 0.8 }}
                      animate={{ 
                        x: [400, 50, 0, -50, -400],
                        opacity: [0, 1, 1, 1, 0],
                        scale: [0.8, 1.1, 1.2, 1.1, 0.8],
                        rotate: [0, -45, -90, -135, -180]
                      }}
                      transition={{ 
                        duration: 4,
                        times: [0, 0.3, 0.5, 0.7, 1],
                        ease: [0.68, -0.55, 0.265, 1.55], // Matching cubic bezier
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <DragonToken 
                        size={isMobile ? "w-16 h-16" : "w-24 h-24"}
                        borderColor="border-yellow-300"
                        gradientFrom="from-yellow-400"
                        gradientTo="to-red-500"
                        style={{
                          filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))",
                          boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)"
                        }}
                      />
                    </motion.div>

                    {/* Energy Trails */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        style={{
                          left: `${45 + (i % 2 === 0 ? -i * 8 : i * 8)}%`,
                          top: `${48 + Math.sin(i) * 10}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          x: [0, (i % 2 === 0 ? -100 : 100)],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      />
                    ))}
                  </div>

                  {/* Modern Fee Display Card */}
                  <motion.div
                    className={`relative overflow-hidden bg-gradient-to-br from-red-900/40 via-red-800/30 to-orange-900/40 backdrop-blur-xl border border-red-500/30 rounded-3xl mt-12 shadow-2xl ${
                      isMobile ? "p-6 mx-2" : "p-10"
                    }`}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/5 to-red-500/10 rounded-3xl" />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-300 bg-clip-text text-transparent ${
                          isMobile ? "text-3xl" : "text-5xl"
                        }`}
                        animate={{ 
                          textShadow: [
                            "0 0 20px rgba(239, 68, 68, 0.5)",
                            "0 0 40px rgba(239, 68, 68, 0.3)",
                            "0 0 20px rgba(239, 68, 68, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        10% TRADING FEE
                      </motion.div>
                      
                      <motion.div
                        className={`w-16 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto my-6 ${
                          isMobile ? "w-12" : ""
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: isMobile ? "3rem" : "4rem" }}
                        transition={{ duration: 1, delay: 2 }}
                      />
                      
                      <p className={`text-gray-300/90 font-medium leading-relaxed ${
                        isMobile ? "text-base mobile-text-base" : "text-xl"
                      }`}>
                        But here's where it gets{" "}
                        <span className="text-yellow-400 font-semibold">interesting...</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Fee Breakdown Part 1 */}
            {currentStep === 2 && (
              <motion.div
                key="fee-breakdown-1"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Simplified background effects */}
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{
                        left: `${5 + i * 9}%`,
                        top: `${15 + (i % 4) * 18}%`,
                      }}
                      animate={{
                        scale: [0, 1.3, 0],
                        opacity: [0, 0.8, 0],
                        rotate: [0, 270],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.div
                    className={`mb-12 ${isMobile ? "mb-8" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h2 className={`font-light mb-6 text-yellow-400 tracking-wide ${
                      isMobile ? "text-xl mobile-text-lg" : "text-5xl"
                    }`}>
                      But here's where it gets interesting
                    </h2>
                    <p className={`text-gray-300 font-light max-w-3xl mx-auto leading-relaxed ${
                      isMobile ? "text-sm mobile-text-sm" : "text-xl"
                    }`}>
                      On other DEX they just take your fees or give it to farmers, but on Sonic Red Dragon, 
                      we turn them into opportunities
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Fee Breakdown Part 2 */}
            {currentStep === 3 && (
              <motion.div
                key="fee-breakdown-2"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Simplified background effects */}
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{
                        left: `${8 + i * 7}%`,
                        top: `${12 + (i % 5) * 15}%`,
                      }}
                      animate={{
                        scale: [0, 1.4, 0],
                        opacity: [0, 0.9, 0],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.25,
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-5xl"}`}>
                  <motion.div
                    className={`mb-12 ${isMobile ? "mb-8" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <h2 className={`font-light mb-6 text-green-400 tracking-wide ${
                      isMobile ? "text-2xl mobile-text-lg" : "text-5xl"
                    }`}>
                      FEE DISTRIBUTION
                    </h2>
                  </motion.div>

                  {/* Modern Fee Breakdown Cards */}
                  <div className={`grid gap-8 ${isMobile ? "grid-cols-1 space-y-6" : "md:grid-cols-3"}`}>
                    {/* Jackpot - Premium Glass Card */}
                    <motion.div
                      className={`group relative overflow-hidden bg-gradient-to-br from-yellow-900/50 via-yellow-800/40 to-amber-900/50 backdrop-blur-xl border border-yellow-500/40 rounded-3xl shadow-2xl ${
                        isMobile ? "p-6" : "p-8"
                      }`}
                      initial={{ opacity: 0, y: 50, rotateX: 15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-amber-400/20 rounded-3xl"
                        animate={{ 
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent ${
                            isMobile ? "text-4xl" : "text-6xl"
                          }`}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          6.9%
                        </motion.div>
                        
                        <div className={`w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full my-4 ${
                          isMobile ? "w-8" : ""
                        }`} />
                        
                        <p className={`text-yellow-100 font-bold tracking-wide ${
                          isMobile ? "text-lg" : "text-xl"
                        }`}>
                          JACKPOT POOL
                        </p>
                        <p className={`text-yellow-200/80 mt-3 leading-relaxed ${
                          isMobile ? "text-sm" : "text-base"
                        }`}>
                          Every swap becomes a lottery ticket
                        </p>
                      </div>
                    </motion.div>

                    {/* Liquidity - Premium Glass Card */}
                    <motion.div
                      className={`group relative overflow-hidden bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-cyan-900/50 backdrop-blur-xl border border-blue-500/40 rounded-3xl shadow-2xl ${
                        isMobile ? "p-6" : "p-8"
                      }`}
                      initial={{ opacity: 0, y: 50, rotateX: 15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-cyan-400/20 rounded-3xl"
                        animate={{ 
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`font-black bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent ${
                            isMobile ? "text-4xl" : "text-6xl"
                          }`}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        >
                          2.41%
                        </motion.div>
                        
                        <div className={`w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full my-4 ${
                          isMobile ? "w-8" : ""
                        }`} />
                        
                        <p className={`text-blue-100 font-bold tracking-wide ${
                          isMobile ? "text-lg" : "text-xl"
                        }`}>
                          LIQUIDITY POOL
                        </p>
                        <p className={`text-blue-200/80 mt-3 leading-relaxed ${
                          isMobile ? "text-sm" : "text-base"
                        }`}>
                          Maintains stable trading pairs
                        </p>
                      </div>
                    </motion.div>

                    {/* Burn - Premium Glass Card */}
                    <motion.div
                      className={`group relative overflow-hidden bg-gradient-to-br from-orange-900/50 via-red-900/40 to-orange-900/50 backdrop-blur-xl border border-orange-500/40 rounded-3xl shadow-2xl ${
                        isMobile ? "p-6" : "p-8"
                      }`}
                      initial={{ opacity: 0, y: 50, rotateX: 15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-red-400/20 rounded-3xl"
                        animate={{ 
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className={`font-black bg-gradient-to-r from-orange-300 via-orange-400 to-red-300 bg-clip-text text-transparent ${
                            isMobile ? "text-4xl" : "text-6xl"
                          }`}
                          animate={{ 
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                        >
                          0.69%
                        </motion.div>
                        
                        <div className={`w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full my-4 ${
                          isMobile ? "w-8" : ""
                        }`} />
                        
                        <p className={`text-orange-100 font-bold tracking-wide ${
                          isMobile ? "text-lg" : "text-xl"
                        }`}>
                          TOKEN BURN
                        </p>
                        <p className={`text-orange-200/80 mt-3 leading-relaxed ${
                          isMobile ? "text-sm" : "text-base"
                        }`}>
                          Deflationary mechanism
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: LayerZero Integration */}
            {currentStep === 4 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Simplified background effects */}
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      style={{
                        left: `${6 + i * 9}%`,
                        top: `${18 + (i % 4) * 16}%`,
                      }}
                      animate={{
                        scale: [0, 1.3, 0],
                        opacity: [0, 0.8, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-4xl"}`}>
                  {/* Modern LayerZero Header */}
                  <motion.div
                    className={`mb-16 ${isMobile ? "mb-12" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-8"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`relative ${isMobile ? "w-20 h-20 mr-4" : "w-28 h-28 mr-6"}`}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full p-1">
                          <img
                            src="https://pbs.twimg.com/profile_images/1671947962681049088/3Ld32mOx_400x400.jpg"
                            alt="LayerZero"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.h2 
                        className={`font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider ${
                          isMobile ? "text-3xl" : "text-7xl"
                        }`}
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(34, 211, 238, 0.5)",
                            "0 0 40px rgba(34, 211, 238, 0.3)",
                            "0 0 20px rgba(34, 211, 238, 0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        LAYERZERO
                      </motion.h2>
                    </motion.div>
                    
                    <motion.div
                      className={`w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mx-auto mb-8 ${
                        isMobile ? "w-16" : ""
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: isMobile ? "4rem" : "6rem" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                    
                    <p className={`text-gray-200/90 font-medium max-w-4xl mx-auto leading-relaxed ${
                      isMobile ? "text-base" : "text-2xl"
                    }`}>
                      Seamless <span className="text-cyan-400 font-semibold">cross-chain messaging</span> and{" "}
                      <span className="text-blue-400 font-semibold">interoperability</span>
                    </p>
                  </motion.div>

                  {/* Premium LayerZero Features Card */}
                  <motion.div
                    className={`relative overflow-hidden bg-gradient-to-br from-cyan-900/50 via-blue-900/40 to-purple-900/50 backdrop-blur-xl border border-cyan-500/40 rounded-3xl shadow-2xl ${
                      isMobile ? "p-6 mx-2" : "p-12"
                    }`}
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(34, 211, 238, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    {/* Animated background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-500/20 rounded-3xl"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <div className={`grid gap-8 ${isMobile ? "grid-cols-1 space-y-6" : "md:grid-cols-2"}`}>
                        {/* Cross-Chain Messaging Feature */}
                        <motion.div 
                          className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-800/30 to-blue-800/30 border border-cyan-400/20"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 1, delay: 1 }}
                        >
                          <motion.div 
                            className={`font-black text-cyan-300 mb-4 ${
                              isMobile ? "text-xl" : "text-2xl"
                            }`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            CROSS-CHAIN MESSAGING
                          </motion.div>
                          <p className={`text-cyan-100/80 leading-relaxed ${
                            isMobile ? "text-sm" : "text-base"
                          }`}>
                            Connect multiple blockchains seamlessly
                          </p>
                        </motion.div>

                        {/* Universal Liquidity Feature */}
                        <motion.div 
                          className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-800/30 to-purple-800/30 border border-blue-400/20"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 1, delay: 1.2 }}
                        >
                          <motion.div 
                            className={`font-black text-blue-300 mb-4 ${
                              isMobile ? "text-xl" : "text-2xl"
                            }`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          >
                            UNIVERSAL LIQUIDITY
                          </motion.div>
                          <p className={`text-blue-100/80 leading-relaxed ${
                            isMobile ? "text-sm" : "text-base"
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

            {/* Step 6: Chainlink VRF Lottery */}
            {currentStep === 5 && (
              <motion.div
                key="lottery"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Simplified background effects */}
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                      style={{
                        left: `${8 + i * 11}%`,
                        top: `${15 + (i % 4) * 18}%`,
                      }}
                      animate={{
                        scale: [0, 1.2, 0],
                        opacity: [0, 0.7, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                <div className={`text-center relative z-10 ${isMobile ? "px-4 max-w-sm mx-auto" : "max-w-4xl"}`}>
                  {/* Chainlink Logo and Title */}
                  <motion.div
                    className={`mb-12 ${isMobile ? "mb-8" : ""}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src="https://cryptologos.cc/logos/chainlink-link-logo.png"
                        alt="Chainlink"
                        className={`${isMobile ? "w-16 h-16" : "w-20 h-20"} mr-4`}
                      />
                      <h2 className={`font-light text-blue-400 tracking-wide ${
                        isMobile ? "text-xl mobile-text-lg" : "text-4xl"
                      }`}>
                        CHAINLINK VRF 2.5
                      </h2>
                    </div>
                    <h3 className={`font-bold mb-4 text-yellow-400 tracking-wide ${
                      isMobile ? "text-xl mobile-text-lg" : "text-3xl"
                    }`}>
                      PROVABLY FAIR LOTTERY
                    </h3>
                    <p className={`text-gray-300 font-light max-w-3xl mx-auto leading-relaxed ${
                      isMobile ? "text-sm mobile-text-sm" : "text-xl"
                    }`}>
                      Every swap enters you into our jackpot with verifiable randomness
                    </p>
                  </motion.div>

                  {/* Lottery Mechanism */}
                  <motion.div
                    className={`bg-dark-surface/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl ${
                      isMobile ? "p-4 mx-2" : "p-8"
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
                      {/* Current Jackpot */}
                      <div className="text-center">
                        <motion.div
                          className={`font-bold text-green-400 ${
                            isMobile ? "text-xl jackpot-mobile" : "text-3xl"
                          }`}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <AnimatedCounter showGrowthIndicator={!isMobile} />
                        </motion.div>
                        <p className={`text-gray-400 ${
                          isMobile ? "text-xs mobile-text-sm" : "text-sm"
                        }`}>Current Jackpot</p>
                      </div>

                      {/* Odds */}
                      <div className="text-center">
                        <div className={`font-bold text-blue-400 ${
                          isMobile ? "text-lg" : "text-2xl"
                        }`}>
                          1:420
                        </div>
                        <p className={`text-gray-400 ${
                          isMobile ? "text-xs mobile-text-sm" : "text-sm"
                        }`}>Win Odds</p>
                      </div>

                      {/* Next Draw */}
                      <div className="text-center">
                        <div className={`font-bold text-orange-400 ${
                          isMobile ? "text-lg" : "text-2xl"
                        }`}>
                          2:34
                        </div>
                        <p className={`text-gray-400 ${
                          isMobile ? "text-xs mobile-text-sm" : "text-sm"
                        }`}>Next Draw</p>
                      </div>
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