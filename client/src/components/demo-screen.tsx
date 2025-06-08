import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
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
  style = {}
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
  style = {}
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
      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam" 
      alt="Dragon" 
      className={`${imageSize} object-cover rounded-full`}
    />
  </motion.div>
);

// Shared jackpot state
let globalJackpotCount = 69000;
let globalLastIncrease = 0;
let globalIsIncreasing = false;
let globalShowIncrease = false;
const jackpotListeners: Array<() => void> = [];

// Animated Counter Component with Growth Indicators
const AnimatedCounter = ({ showGrowthIndicator = true }: { showGrowthIndicator?: boolean }) => {
  const [count, setCount] = useState(globalJackpotCount);
  const [isIncreasing, setIsIncreasing] = useState(globalIsIncreasing);
  const [lastIncrease, setLastIncrease] = useState(globalLastIncrease);
  const [showIncrease, setShowIncrease] = useState(globalShowIncrease);

  useEffect(() => {
    // Subscribe to global state changes
    const updateState = () => {
      setCount(globalJackpotCount);
      setIsIncreasing(globalIsIncreasing);
      setLastIncrease(globalLastIncrease);
      setShowIncrease(globalShowIncrease);
    };
    
    jackpotListeners.push(updateState);

    // Start the interval only if this is the first counter
    let interval: NodeJS.Timeout;
    if (jackpotListeners.length === 1) {
      interval = setInterval(() => {
        // Increase by random amount between 500-2000
        const increaseAmount = Math.floor(Math.random() * 1500) + 500;
        
        // Update global state
        globalJackpotCount += increaseAmount;
        globalLastIncrease = increaseAmount;
        globalIsIncreasing = true;
        globalShowIncrease = true;
        
        // Notify all listeners
        jackpotListeners.forEach(listener => listener());

        // Reset increase indicator after 2 seconds
        setTimeout(() => {
          globalShowIncrease = false;
          globalIsIncreasing = false;
          jackpotListeners.forEach(listener => listener());
        }, 2000);
      }, 3000);
    }

    return () => {
      // Remove listener on cleanup
      const index = jackpotListeners.indexOf(updateState);
      if (index > -1) {
        jackpotListeners.splice(index, 1);
      }
      
      // Clear interval when last component unmounts
      if (jackpotListeners.length === 0 && interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <motion.span
        key={count}
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        ${count.toLocaleString()}
      </motion.span>
      
      {showGrowthIndicator && showIncrease && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-1"
        >
          <motion.span 
            className="text-green-400 font-bold text-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: 2 }}
          >
            +${lastIncrease.toLocaleString()}
          </motion.span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: 1 }}
            className="text-green-400"
          >
            ⬆️
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(autoStart);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showJackpot, setShowJackpot] = useState(false);

  // Audio Management
  useEffect(() => {
    if (hasStarted && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current!.currentTime = 0;
          await audioRef.current!.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Audio play failed:", error);
        }
      };
      playAudio();
    }
  }, [hasStarted]);

  // Demo Steps with Timing
  useEffect(() => {
    if (!hasStarted) return;

    const timers: NodeJS.Timeout[] = [];

    // Step 1: Tokens Animation (3 seconds)
    timers.push(setTimeout(() => setCurrentStep(1), 3000));
    
    // Step 2: Chainlink VRF Demo (7 seconds)
    timers.push(setTimeout(() => setCurrentStep(2), 7000));
    
    // Show jackpot vault after step 2 completes (12 seconds)
    timers.push(setTimeout(() => setShowJackpot(true), 12000));
    
    // Step 3: Trading Demo (15 seconds)
    timers.push(setTimeout(() => setCurrentStep(3), 15000));
    
    // Step 4: Token Swap Demo (23 seconds)
    timers.push(setTimeout(() => setCurrentStep(4), 23000));

    return () => timers.forEach(clearTimeout);
  }, [hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentStep(0);
    setShowJackpot(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Audio Element */}
      <audio ref={audioRef} preload="auto">
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      {/* Persistent Jackpot Vault - Shows after step 2 */}
      <AnimatePresence>
        {showJackpot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                className="text-sm text-purple-300 mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏆 SONIC JACKPOT VAULT
              </motion.div>
              <AnimatedCounter showGrowthIndicator={true} />
              <div className="text-xs text-gray-400 mt-2">
                Growing with every transaction
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            // Start Screen
            <motion.div
              key="start"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.5)",
                    "0 0 40px rgba(255, 0, 255, 0.8)",
                    "0 0 20px rgba(255, 255, 255, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SONIC DRAGON
              </motion.h1>
              
              <motion.div
                className="text-2xl mb-12 text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Typewriter 
                  text="Advanced Blockchain Ecosystem Demo"
                  speed={80}
                />
              </motion.div>

              <motion.button
                onClick={handleStart}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Start Demo
              </motion.button>
            </motion.div>
          ) : currentStep === 0 ? (
            // Opening Animation
            <motion.div
              key="opening"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8"
                animate={{ 
                  scale: [0.8, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                INITIALIZING...
              </motion.div>
              
              <motion.div
                className="flex justify-center space-x-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : currentStep === 1 ? (
            // Token Swirl Animation
            <motion.div
              key="tokens"
              className="flex items-center justify-center min-h-screen relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background token animation */}
              <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 200 - 100],
                      y: [0, Math.random() * 200 - 100],
                      rotate: [0, 360],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {i % 2 === 0 ? (
                      <SonicToken 
                        size="w-8 h-8"
                        borderColor="border-blue-300/60"
                      />
                    ) : (
                      <DragonToken 
                        size="w-8 h-8"
                        borderColor="border-orange-300/60"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Main content */}
              <div className="text-center relative z-10">
                <motion.div
                  className="text-4xl font-bold mb-8 text-blue-300"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Typewriter 
                    text="Multi-Token Ecosystem"
                    speed={100}
                  />
                </motion.div>

                {/* Central token display */}
                <div className="flex justify-center items-center space-x-8">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <SonicToken 
                      size="w-24 h-24"
                      borderColor="border-blue-400"
                      gradientFrom="from-blue-500"
                      gradientTo="to-cyan-600"
                    />
                  </motion.div>

                  <motion.div
                    className="text-4xl font-bold text-white"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚡
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [360, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    <DragonToken 
                      size="w-24 h-24"
                      borderColor="border-orange-400"
                      gradientFrom="from-red-500"
                      gradientTo="to-orange-600"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : currentStep === 2 ? (
            // Chainlink VRF Lottery Demo
            <motion.div
              key="lottery"
              className="flex items-center justify-center min-h-screen relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Standardized Background Swap Animation */}
              <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${10 + i * 18}%`,
                      top: `${15 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0.8, 0],
                      scale: [0.6, 1, 1, 0.6],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Sonic Token */}
                    <SonicToken
                      borderColor="border-blue-300/60"
                      imageSize="w-8 h-8"
                      animateProps={{
                        x: [0, 60, 0],
                        rotate: [0, 180, 360],
                      }}
                      transitionProps={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)"
                      }}
                    />
                  </motion.div>
                ))}

                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i + 5}
                    className="absolute flex items-center justify-center"
                    style={{
                      right: `${15 + i * 20}%`,
                      top: `${25 + (i % 2) * 30}%`,
                    }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      scale: [0.5, 0.9, 0.9, 0.5],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: (i + 2) * 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Dragon Token */}
                    <DragonToken
                      borderColor="border-orange-300/60"
                      imageSize="w-8 h-8"
                      animateProps={{
                        x: [0, -60, 0],
                        rotate: [0, -180, -360],
                      }}
                      transitionProps={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.2,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(249, 115, 22, 0.3))",
                        boxShadow: "0 0 20px rgba(239, 68, 68, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Main Content with Camera Zoom Effect */}
              <motion.div
                className="text-center relative z-10"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                {/* Chainlink Logo with Dramatic Entrance */}
                <motion.div
                  className="flex items-center justify-center mb-8"
                  initial={{ y: -200, rotateX: 90, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8, ease: "backOut" }}
                >
                  <motion.div
                    className="flex items-center space-x-4"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.8)",
                        "0 0 40px rgba(139, 69, 19, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.8)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-6xl font-extrabold text-blue-400">⛓️</div>
                    <div className="text-5xl font-bold text-white">CHAINLINK VRF 2.5</div>
                  </motion.div>
                </motion.div>

                {/* Epic Jackpot Reveal with Cinematic Effect */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 1.5, ease: "backOut" }}
                >
                  <motion.div
                    className="text-2xl text-yellow-300 mb-4"
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏆 EPIC JACKPOT REVEAL 🏆
                  </motion.div>
                  
                  {/* Synchronized Counter */}
                  <motion.div
                    className="relative"
                    animate={{ 
                      textShadow: [
                        "0 0 30px rgba(255, 215, 0, 0.8)",
                        "0 0 60px rgba(255, 215, 0, 1)",
                        "0 0 30px rgba(255, 215, 0, 0.8)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AnimatedCounter showGrowthIndicator={true} />
                  </motion.div>
                </motion.div>

                {/* LayerZero Integration Display */}
                <motion.div
                  className="text-xl text-purple-300 mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}
                >
                  <Typewriter 
                    text="Cross-Chain Messaging via LayerZero"
                    speed={80}
                  />
                </motion.div>

                {/* Random Number Generation Visualization */}
                <motion.div
                  className="grid grid-cols-3 gap-4 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1 }}
                >
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                      animate={{
                        backgroundColor: [
                          "rgba(255, 255, 255, 0.1)",
                          "rgba(139, 69, 19, 0.3)",
                          "rgba(59, 130, 246, 0.3)",
                          "rgba(255, 255, 255, 0.1)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      <motion.div
                        className="text-lg font-bold"
                        animate={{
                          color: ["#ffffff", "#8b4513", "#3b82f6", "#ffffff"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        {Math.floor(Math.random() * 100)}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : currentStep === 3 ? (
            // Trading Visualization
            <motion.div
              key="trading"
              className="flex items-center justify-center min-h-screen relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              <div className="text-center relative z-10">
                <motion.div
                  className="text-4xl font-bold mb-8 text-green-400"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Typewriter 
                    text="Dynamic Trading Hub"
                    speed={100}
                  />
                </motion.div>

                {/* Trading Chart Simulation */}
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto mb-8">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Buy Side */}
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold text-green-400 mb-4"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🟢 BUY SIGNALS
                      </motion.div>
                      
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex justify-between items-center"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                          >
                            <span className="text-green-300">
                              {(Math.random() * 10 + 5).toFixed(2)} SONIC
                            </span>
                            <span className="text-green-400 font-bold">
                              ${(Math.random() * 0.5 + 0.1).toFixed(3)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Sell Side */}
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold text-red-400 mb-4"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      >
                        🔴 SELL SIGNALS
                      </motion.div>
                      
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex justify-between items-center"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 + 0.5 }}
                          >
                            <span className="text-red-300">
                              {(Math.random() * 8 + 3).toFixed(2)} DRAGON
                            </span>
                            <span className="text-red-400 font-bold">
                              ${(Math.random() * 0.8 + 0.2).toFixed(3)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trading Volume */}
                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <div className="text-lg text-blue-300 mb-2">24h Trading Volume</div>
                    <motion.div
                      className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      $2,847,392
                    </motion.div>
                  </motion.div>
                </div>

                {/* Token Pairs */}
                <div className="flex justify-center space-x-8">
                  <motion.div
                    className="flex items-center space-x-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <SonicToken size="w-12 h-12" />
                    <span className="text-xl font-bold text-blue-300">SONIC/ETH</span>
                  </motion.div>
                  
                  <motion.div
                    className="flex items-center space-x-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <DragonToken size="w-12 h-12" />
                    <span className="text-xl font-bold text-orange-300">DRAGON/USDC</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : currentStep === 4 ? (
            // Token Swap Demo
            <motion.div
              key="swap"
              className="flex items-center justify-center min-h-screen relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center relative z-10">
                <motion.div
                  className="text-4xl font-bold mb-8 text-purple-400"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Typewriter 
                    text="Intelligent Token Swap"
                    speed={100}
                  />
                </motion.div>

                {/* Swap Interface */}
                <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto">
                  {/* From Token */}
                  <motion.div
                    className="bg-white/5 rounded-2xl p-6 mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-300">From</span>
                      <span className="text-blue-300">Balance: 1,247.58</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <SonicToken size="w-12 h-12" />
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-white">500.00</div>
                        <div className="text-blue-300">SONIC</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Swap Arrow */}
                  <motion.div
                    className="flex justify-center mb-4"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="bg-purple-600 rounded-full p-3">
                      <div className="text-2xl">⇅</div>
                    </div>
                  </motion.div>

                  {/* To Token */}
                  <motion.div
                    className="bg-white/5 rounded-2xl p-6 mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-300">To</span>
                      <span className="text-orange-300">Balance: 892.34</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <DragonToken size="w-12 h-12" />
                      <div className="flex-1">
                        <motion.div
                          className="text-2xl font-bold text-white"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {(Math.random() * 100 + 200).toFixed(2)}
                        </motion.div>
                        <div className="text-orange-300">DRAGON</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Fee Breakdown */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <div className="text-center text-purple-300 font-bold mb-2">Fee Allocation</div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-yellow-400 font-bold">2%</div>
                        <div className="text-gray-300">Jackpot</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">1%</div>
                        <div className="text-gray-300">LP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-400 font-bold">1%</div>
                        <div className="text-gray-300">Burn</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Swap Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl py-4 text-xl font-bold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.4)",
                        "0 0 40px rgba(236, 72, 153, 0.6)",
                        "0 0 20px rgba(168, 85, 247, 0.4)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                  >
                    Execute Swap
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Control Panel */}
      <motion.div
        className="fixed bottom-4 left-4 z-50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex space-x-2">
          <motion.button
            onClick={handleStop}
            className="px-4 py-2 bg-red-600/80 backdrop-blur-sm rounded-lg text-white font-semibold hover:bg-red-700/80 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!hasStarted}
          >
            Stop
          </motion.button>
          
          <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg text-white">
            Step: {currentStep}/4
          </div>
          
          {isPlaying && (
            <motion.div
              className="px-4 py-2 bg-green-600/80 backdrop-blur-sm rounded-lg text-white flex items-center space-x-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Playing</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}