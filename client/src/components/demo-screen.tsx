import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
// import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

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
      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreiaqhvhqzgp6d4b5abwdxk3jn53azlumhcfipwt4mbxkewlqefnqzy" 
      alt="Dragon" 
      className={`${imageSize} object-cover rounded-full`}
    />
  </motion.div>
);

// Animated Counter Component
const AnimatedCounter = ({ showGrowthIndicator = true }) => {
  const [counter, setCounter] = useState(50000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 1000) + 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <span>${counter.toLocaleString()}</span>
      {showGrowthIndicator && (
        <motion.span
          className="text-green-400 text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          📈
        </motion.span>
      )}
    </div>
  );
};

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [audioStarted, setAudioStarted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(!autoStart);
  const audioRef = useRef<HTMLAudioElement>(null);

  const steps = [
    { delay: 0 },     // Step 0: Chainlink VRF 2.5 Lottery
    { delay: 8000 },  // Step 1: Swap Animation 
    { delay: 16000 }, // Step 2: Jackpot Reveal
    { delay: 24000 }, // Step 3: Fee Distribution
    { delay: 32000 }, // Step 4: Cross-chain messaging
    { delay: 40000 }, // Step 5: Enhanced Swap
    { delay: 48000 }, // Step 6: Odds Table
    { delay: 56000 }, // Step 7: Final Message
  ];

  // Handle autoStart
  useEffect(() => {
    if (autoStart && !audioStarted) {
      setTimeout(() => {
        handlePlayAudio();
      }, 100);
    }
  }, [autoStart, audioStarted]);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setAudioStarted(true);
          setShowPlayButton(false);

          // Fade in audio from 0% to 70% over 2 seconds
          const fadeInDuration = 2000;
          const targetVolume = 0.7;
          const startTime = Date.now();

          const fadeIn = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / fadeInDuration, 1);
            if (audioRef.current) {
              audioRef.current.volume = progress * targetVolume;
            }

            if (progress < 1) {
              requestAnimationFrame(fadeIn);
            }
          };

          fadeIn();

          // Pre-credits countdown (3 seconds of darkness)
          setTimeout(() => setCurrentStep(0), 3000);

          // Auto-advance steps (adjusted for 3-second pre-credits delay)
          steps.forEach((step, index) => {
            setTimeout(() => {
              setCurrentStep(index);
            }, step.delay + 3000); // Add 3 seconds for pre-credits
          });
        })
        .catch(console.log);
    }
  };

  // Auto-start sequence for demo mode
  useEffect(() => {
    if (autoStart) {
      // Pre-credits countdown (3 seconds of darkness)
      setTimeout(() => setCurrentStep(0), 3000);

      // Start audio with fade in after pre-credits
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
            .catch(console.log);
        }, 2800); // Start audio just before step 0
      }

      // Auto-advance steps (adjusted for 3-second pre-credits delay)
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, step.delay + 3000); // Add 3 seconds for pre-credits
      });
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <audio ref={audioRef} preload="auto" className="hidden">
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Play Button Overlay */}
      {showPlayButton && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.button
            onClick={handlePlayAudio}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶ Start Experience
          </motion.button>
        </div>
      )}

      {/* Demo Content */}
      {audioStarted && (
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {/* Step 0: Chainlink VRF 2.5 Lottery */}
            {currentStep === 0 && (
              <motion.div
                key="chainlink"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.5 }}
              >
                <div className="text-center">
                  <motion.h1
                    className="text-6xl font-bold mb-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{
                      color: "#377EFE",
                      filter: "drop-shadow(0 0 40px rgba(55, 126, 254, 0.6))",
                    }}
                  >
                    CHAINLINK VRF 2.5
                  </motion.h1>
                  <motion.p
                    className="text-2xl text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Provably Fair Lottery System
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Step 1: Swap Animation */}
            {currentStep === 1 && (
              <motion.div
                key="swap"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="text-center space-y-8">
                  <motion.h2
                    className="text-5xl font-light mb-12 text-yellow-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    TOKEN SWAP
                  </motion.h2>
                  
                  <div className="flex items-center justify-center space-x-8">
                    <SonicToken
                      size="w-20 h-20"
                      animateProps={{
                        x: [0, 100, 0],
                        rotate: [0, 180, 360],
                      }}
                      transitionProps={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    <motion.div
                      className="text-4xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⟷
                    </motion.div>
                    
                    <DragonToken
                      size="w-20 h-20"
                      animateProps={{
                        x: [0, -100, 0],
                        rotate: [0, -180, -360],
                      }}
                      transitionProps={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Jackpot Reveal */}
            {currentStep === 2 && (
              <motion.div
                key="jackpot"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1.2 }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-6xl font-bold mb-8 text-yellow-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    🏆 JACKPOT 🏆
                  </motion.h2>
                  
                  <motion.div
                    className="text-4xl font-bold text-green-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <AnimatedCounter />
                  </motion.div>
                  
                  <motion.p
                    className="text-xl text-gray-300 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    Growing with every swap
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Fee Distribution */}
            {currentStep === 3 && (
              <motion.div
                key="fees"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="text-center space-y-8">
                  <motion.h2
                    className="text-5xl font-light mb-12 text-blue-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    FEE DISTRIBUTION
                  </motion.h2>
                  
                  <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <motion.div
                      className="bg-yellow-500/20 p-6 rounded-lg border border-yellow-400/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-lg font-semibold">50%</div>
                      <div className="text-sm text-gray-300">Jackpot</div>
                    </motion.div>
                    
                    <motion.div
                      className="bg-blue-500/20 p-6 rounded-lg border border-blue-400/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <div className="text-2xl mb-2">💧</div>
                      <div className="text-lg font-semibold">30%</div>
                      <div className="text-sm text-gray-300">Liquidity</div>
                    </motion.div>
                    
                    <motion.div
                      className="bg-red-500/20 p-6 rounded-lg border border-red-400/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    >
                      <div className="text-2xl mb-2">🔥</div>
                      <div className="text-lg font-semibold">20%</div>
                      <div className="text-sm text-gray-300">Burn</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Cross-chain messaging */}
            {currentStep === 4 && (
              <motion.div
                key="crosschain"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-5xl font-light mb-12 text-purple-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    CROSS-CHAIN MESSAGING
                  </motion.h2>
                  
                  <motion.p
                    className="text-2xl text-gray-300 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    Seamless communication across multiple blockchains
                    via LayerZero integration
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Enhanced Swap */}
            {currentStep === 5 && (
              <motion.div
                key="enhanced-swap"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, z: -500 }}
                animate={{ opacity: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateX: 45 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {/* Standardized Background Swap Animation */}
                <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: `${10 + i * 18}%`,
                        top: `${20 + (i % 2) * 60}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.3,
                        duration: 0.8,
                        ease: "backOut",
                      }}
                    >
                      {/* Swap Direction Indicator */}
                      <motion.div
                        className="text-3xl text-white/40 mb-4"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.5,
                        }}
                      >
                        ⟷
                      </motion.div>

                      <div className="space-y-6">
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

                        {/* Fee Distribution Indicators */}
                        <motion.div
                          className="flex items-center space-x-3 text-xs text-white/70"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.3 + 1, duration: 0.6 }}
                        >
                          <div className="flex items-center space-x-1">
                            <svg width="8" height="8" className="text-yellow-400">
                              <circle cx="4" cy="4" r="3" fill="currentColor" />
                              <text
                                x="4"
                                y="4"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="5"
                                fill="white"
                                fontWeight="bold"
                              >
                                J
                              </text>
                            </svg>
                            <span className="text-yellow-200">Jackpot</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg width="8" height="8" className="text-blue-400">
                              <circle cx="4" cy="4" r="3" fill="currentColor" />
                              <text
                                x="4"
                                y="4"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="6"
                                fill="white"
                                fontWeight="bold"
                              >
                                L
                              </text>
                            </svg>
                            <span className="text-blue-200">LP</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg width="8" height="8" className="text-red-400">
                              <circle cx="4" cy="4" r="3" fill="currentColor" />
                              <text
                                x="4"
                                y="4"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="7"
                                fill="white"
                                fontWeight="bold"
                              >
                                D
                              </text>
                            </svg>
                            <span className="text-orange-200">Burn</span>
                          </div>
                        </motion.div>

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
                      </div>
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
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="relative"
                        initial={{ rotateY: 180, scale: 0 }}
                        animate={{ rotateY: 0, scale: 1 }}
                        transition={{
                          duration: 1.5,
                          delay: 1.5,
                          ease: "backOut",
                        }}
                      >
                        <motion.img
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreia6gvcvo7bk52hr7pphega2i63rxh5xbijlkjko7wf24ycutfelfm"
                          alt="Chainlink"
                          className="w-16 h-16"
                          animate={{
                            filter: [
                              "drop-shadow(0 0 20px rgba(55, 126, 254, 0.4))",
                              "drop-shadow(0 0 40px rgba(55, 126, 254, 0.8))",
                              "drop-shadow(0 0 20px rgba(55, 126, 254, 0.4))",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>

                      <motion.span
                        className="text-4xl font-bold tracking-wider"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 1.2,
                          delay: 2,
                          ease: "easeOut",
                        }}
                        style={{
                          color: "#377EFE",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          filter:
                            "drop-shadow(0 0 20px rgba(55, 126, 254, 0.3))",
                        }}
                      >
                        CHAINLINK
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Title with 3D Rotation */}
                  <motion.h2
                    className="text-6xl font-light mb-4 tracking-wide"
                    initial={{ rotateX: 90, scale: 0.5, opacity: 0 }}
                    animate={{ rotateX: 0, scale: 1, opacity: 1 }}
                    transition={{
                      duration: 2,
                      delay: 2.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100,
                    }}
                    style={{
                      color: "#377EFE",
                      filter: "drop-shadow(0 0 40px rgba(55, 126, 254, 0.6))",
                      fontWeight: 300,
                      textShadow: "0 0 30px rgba(55, 126, 254, 0.4)",
                    }}
                  >
                    VRF 2.5 LOTTERY
                  </motion.h2>

                  <motion.p
                    className="text-2xl text-gray-300 mb-6 font-light leading-relaxed max-w-3xl mx-auto"
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 3.2, duration: 1.5, ease: "easeOut" }}
                  >
                    Provably fair randomness ensures every trader has a
                    legitimate chance to win massive jackpots
                  </motion.p>

                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    <motion.div
                      className="inline-block px-6 py-3 rounded-full bg-blue-500/10 border border-blue-400/30"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(55, 126, 254, 0.2)",
                          "0 0 30px rgba(55, 126, 254, 0.4)",
                          "0 0 20px rgba(55, 126, 254, 0.2)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="text-blue-300 text-lg font-medium">
                        Chromion: A Chainlink Hackathon Participant
                      </div>
                      <div className="text-blue-400/80 text-sm mt-1">
                        Multi-agent & Orchestration Category
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    className="text-3xl text-yellow-400 mb-16 font-light tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,235,59,0.4))",
                    }}
                  >
                    BIGGER SWAPS = BETTER ODDS
                  </motion.p>

                  {/* Expanded floating elements across full viewport */}
                  <div className="fixed inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 backdrop-blur-sm"
                        style={{
                          width: 6 + Math.random() * 8 + "px",
                          height: 6 + Math.random() * 8 + "px",
                          left: Math.random() * 100 + "vw",
                          top: Math.random() * 100 + "vh",
                          filter: "drop-shadow(0 0 8px rgba(255,165,0,0.4))",
                        }}
                        animate={{
                          x: [0, (Math.random() - 0.5) * 200, 0],
                          y: [0, (Math.random() - 0.5) * 200, 0],
                          rotateZ: [0, 360],
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 8 + Math.random() * 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 6: Refined Odds Table */}
            {currentStep === 6 && (
              <motion.div
                key="odds"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, z: -500 }}
                animate={{ opacity: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateX: 45 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-5xl font-light mb-20 text-yellow-400 tracking-wide"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(255,235,59,0.5))",
                      fontWeight: 300,
                    }}
                  >
                    ODDS TABLE
                  </motion.h2>

                  <div className="space-y-8">
                    {[
                      {
                        amount: "$10",
                        odds: "0.004%",
                        boostedOdds: "0.01%",
                        color: "red",
                        delay: 0.5,
                      },
                      {
                        amount: "$100",
                        odds: "0.04%",
                        boostedOdds: "0.1%",
                        color: "orange",
                        delay: 0.8,
                      },
                      {
                        amount: "$1,000",
                        odds: "0.4%",
                        boostedOdds: "1%",
                        color: "yellow",
                        delay: 1.1,
                      },
                      {
                        amount: "$10,000",
                        odds: "4%",
                        boostedOdds: "10%",
                        color: "green",
                        delay: 1.4,
                      },
                    ].map((row, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center justify-between p-6 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-${row.color}-400/30 backdrop-blur-sm max-w-2xl mx-auto`}
                        initial={{ opacity: 0, x: -100, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: row.delay,
                          ease: "backOut",
                        }}
                        style={{
                          boxShadow: `0 0 20px rgba(${
                            row.color === "red"
                              ? "239, 68, 68"
                              : row.color === "orange"
                              ? "249, 115, 22"
                              : row.color === "yellow"
                              ? "234, 179, 8"
                              : "34, 197, 94"
                          }, 0.2)`,
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className={`text-3xl font-bold text-${row.color}-400`}
                            animate={{
                              scale: [1, 1.1, 1],
                              textShadow: [
                                "0 0 10px rgba(255,255,255,0.3)",
                                "0 0 20px rgba(255,255,255,0.6)",
                                "0 0 10px rgba(255,255,255,0.3)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: row.delay + 0.5,
                            }}
                          >
                            {row.amount}
                          </motion.div>
                          <div className="text-left">
                            <div className="text-xl font-medium text-white">
                              Swap Amount
                            </div>
                            <div className="text-gray-400 text-sm">
                              Per transaction
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-8">
                          <div className="text-center">
                            <div className="text-gray-400 text-sm mb-1">
                              Base Odds
                            </div>
                            <div className="text-xl font-semibold text-gray-200">
                              {row.odds}
                            </div>
                          </div>
                          <motion.div
                            className="text-center"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: row.delay + 1,
                            }}
                          >
                            <div className="text-green-400 text-sm mb-1 font-medium">
                              Enhanced Odds
                            </div>
                            <div className="text-2xl font-bold text-green-300">
                              {row.boostedOdds}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <div className="text-gray-300 text-lg mb-4">
                      🎯 <strong>Pro Tip:</strong> Larger swaps = Better odds of
                      winning the jackpot!
                    </div>
                    <div className="text-yellow-400 text-sm">
                      *Odds are calculated using Chainlink VRF 2.5 for provable
                      fairness
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 7: Final Message */}
            {currentStep === 7 && (
              <motion.div
                key="final"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                  <motion.h2
                    className="text-5xl font-light mb-8 text-blue-400"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    Welcome to the Future
                  </motion.h2>
                  
                  <motion.div
                    className="space-y-6 text-xl text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                  >
                    <p>Experience the next generation of DeFi</p>
                    <p>Where every swap is an opportunity</p>
                    <p>And fairness is guaranteed by Chainlink VRF 2.5</p>
                  </motion.div>
                  
                  <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <div className="text-4xl mb-4">🚀</div>
                    <div className="text-2xl font-semibold text-yellow-400">
                      Start Trading Today
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Persistent Jackpot Vault - Shows from Step 2 onwards after jackpot reveal */}
          {currentStep >= 2 && (
            <motion.div
              className="fixed top-4 right-4 z-50 pointer-events-none"
              initial={{ opacity: 0, scale: 0.5, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "backOut", delay: 2 }}
            >
              <motion.div
                className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/30 rounded-xl p-4 min-w-[200px]"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                    "0 0 30px rgba(251, 191, 36, 0.5)",
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-yellow-300 text-sm font-medium mb-2 flex items-center justify-center">
                  <span className="mr-2">🏆</span>
                  JACKPOT VAULT
                </div>
                <div className="flex justify-center">
                  <motion.div
                    className="text-2xl font-bold text-yellow-100"
                    animate={{
                      scale: [1, 1.05, 1],
                      textShadow: [
                        "0 0 10px rgba(251, 191, 36, 0.5)",
                        "0 0 20px rgba(251, 191, 36, 0.8)",
                        "0 0 10px rgba(251, 191, 36, 0.5)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <AnimatedCounter showGrowthIndicator={false} />
                  </motion.div>
                </div>
                <div className="text-yellow-400/80 text-xs mt-1 text-center">
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