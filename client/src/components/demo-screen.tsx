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
const AnimatedCounter = ({
  showGrowthIndicator = true,
}: {
  showGrowthIndicator?: boolean;
}) => {
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
        const increase = Math.floor(Math.random() * 200) + 75;
        globalLastIncrease = increase;
        globalIsIncreasing = true;
        globalShowIncrease = true;
        globalJackpotCount += increase;

        // Notify all listeners
        jackpotListeners.forEach((listener) => listener());

        // Reset the flash effect
        setTimeout(() => {
          globalIsIncreasing = false;
          globalShowIncrease = false;
          jackpotListeners.forEach((listener) => listener());
        }, 800);
      }, 1400); // Update every 1.4 seconds
    }

    return () => {
      // Remove listener
      const index = jackpotListeners.indexOf(updateState);
      if (index > -1) {
        jackpotListeners.splice(index, 1);
      }
      // Clear interval if this was the last listener
      if (jackpotListeners.length === 0 && interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="relative">
      <motion.span
        animate={{
          scale: isIncreasing ? [1, 1.08, 1] : 1,
          color: isIncreasing ? ["#22c55e", "#10b981", "#22c55e"] : "#22c55e",
        }}
        transition={{ duration: 0.4 }}
      >
        ${count.toLocaleString()}
      </motion.span>

      {/* Growing indicator */}
      {showIncrease && showGrowthIndicator && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xl font-medium text-yellow-400"
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
  const [currentStep, setCurrentStep] = useState(-1); // Start with pre-credits
  const [showAnimations, setShowAnimations] = useState(autoStart);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  // Enhanced timing based on waveform analysis - Extended for better comprehension
  const steps = [
    { delay: 0, duration: 6500 }, // [0:00–0:06.5] Step 0: Sophisticated Title Reveal
    { delay: 6500, duration: 7500 }, // [0:06.5–0:14] Step 1: Elegant Token Interaction
    { delay: 14000, duration: 12000 }, // [0:14–0:26] Step 2: Epic Jackpot Reveal with Screen Impact
    { delay: 26000, duration: 6000 }, // [0:26–0:32] Step 3: Bridge to Fee Structure
    { delay: 32000, duration: 6000 }, // [0:32–0:38] Step 4: Fee Opportunities Introduction
    { delay: 38000, duration: 8000 }, // [0:38–0:46] Step 5: Enhanced Fee Breakdown Details
    { delay: 46000, duration: 15000 }, // [0:46–1:00] Step 6: Chainlink VRF Lottery - Immersive Camera Dive
    { delay: 61000, duration: 9000 }, // [1:00–1:09] Step 7: Refined Odds Table
    { delay: 70000, duration: 10000 }, // [1:09–1:19] Step 8: LayerZero Cross-Chain Implementation - Immersive Deep Dive
    { delay: 80000, duration: 8000 }, // [1:19–1:27] Step 9: Epic Finale with CTA
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);

      // Start with pre-credits, then move to step 0 after 3 seconds
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
              background:
                i % 3 === 0 ? "#FF6B35" : i % 3 === 1 ? "#FFEB3B" : "#3B82F6",
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

        {/* Subtle geometric overlay */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Ambient light streaks */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-warm-orange to-transparent opacity-20"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white-400 to-transparent opacity-15"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scaleY: [1.2, 0.8, 1.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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
                  <video
                    className="w-24 h-24 opacity-70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(156,163,175,0.5))",
                    }}
                  >
                    <source
                      src={`@assets/omnidragon_1749365523315.mp4`}
                      type="video/mp4"
                    />
                  </video>
                </motion.div>

                <motion.p
                  className="text-xl tracking-wider text-gray-400 font-light text-center max-w-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1.5 }}
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(156,163,175,0.3))",
                  }}
                >
                  From the creator of $AKITA V2, $AKITA V3, $oooOOO GODDOG aka
                  Vitalik's Mum's Doge, $WAIT aka We're All In Together, etc..
                </motion.p>
              </motion.div>
            )}

            {/* Step 0: Sophisticated Title Reveal */}
            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                transition={{ duration: 1 }}
              >
                <div className="text-center relative">
                  {/* Elegant glow backdrop */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-20"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(255,107,53,0.3) 0%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.h1
                    className="text-8xl font-bold tracking-wider bg-gradient-to-r from-white via-amber-400 to-white bg-clip-text text-transparent relative z-10"
                    initial={{ scale: 0.3, y: 100, opacity: 0, rotateX: 45 }}
                    animate={{
                      scale: [0.3, 1.1, 1],
                      y: [100, -20, 0],
                      opacity: [0, 1, 1],
                      rotateX: [45, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 1,
                      times: [0, 0.7, 1],
                    }}
                    style={{
                      filter: "drop-shadow(0 0 60px rgba(251,191,36,0.6))",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    <Typewriter
                      text="SONIC RED DRAGON"
                      delay={2000}
                      speed={120}
                    />
                  </motion.h1>

                  {/* Refined particle system */}
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-amber-400 opacity-60"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      animate={{
                        x:
                          Math.cos((i * 22.5 * Math.PI) / 180) *
                          (150 + Math.random() * 50),
                        y:
                          Math.sin((i * 22.5 * Math.PI) / 180) *
                          (150 + Math.random() * 50),
                        opacity: [0.6, 0, 0.6],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: 2.5 + i * 0.05,
                        ease: "easeOut",
                        repeat: 1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Elegant Token Interaction */}
            {currentStep === 1 && (
              <motion.div
                key="tokens"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="relative w-full h-96">
                  <div className="text-center mb-16">
                    <div className="text-5xl font-light mb-6 tracking-wide">
                      <motion.span
                        className="text-white"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{
                          fontWeight: 300,
                        }}
                      >
                        SWAP{" "}
                        <span
                          className="text-yellow-400 font-bold"
                          style={{
                            filter:
                              "drop-shadow(0 0 25px rgba(255,235,59,0.5))",
                            fontWeight: 700,
                          }}
                        >
                          $S
                        </span>
                      </motion.span>
                      <motion.span
                        className="text-white ml-4"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 0.5,
                        }}
                        style={{
                          fontWeight: 300,
                        }}
                      >
                        FOR{" "}
                        <span
                          className="text-amber-400 font-medium"
                          style={{
                            filter:
                              "drop-shadow(0 0 25px rgba(251,191,36,0.5))",
                            fontWeight: 500,
                          }}
                        >
                          $DRAGON
                        </span>
                      </motion.span>
                    </div>
                    <motion.p
                      className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1,
                      }}
                    >
                      Trade for Dragon tokens on Sonic the highest-performing
                      EVM L1
                    </motion.p>
                  </div>

                  {/* Simultaneous token convergence and exchange */}
                  <motion.div
                    className="absolute left-16 top-1/2 w-40 h-40 rounded-full border-3 border-yellow-400/80 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-md"
                    initial={{ x: -1200, scale: 0, opacity: 0, rotateZ: -90 }}
                    animate={{
                      x: [-1200, -200, 200, 1600],
                      scale: [0, 1, 1.2, 1.2],
                      opacity: [0, 1, 1, 1],
                      rotateZ: [-90, 0, 360, 720],
                    }}
                    transition={{
                      duration: 5,
                      times: [0, 0.4, 0.6, 1],
                      ease: [0.16, 1, 0.3, 1],
                      delay: 2,
                    }}
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(234,179,8,0.8))",
                      boxShadow:
                        "0 0 50px rgba(234,179,8,0.4), inset 0 0 30px rgba(234,179,8,0.2)",
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="S Token"
                      className="w-28 h-28"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute right-16 top-1/2 w-40 h-40 rounded-full border-3 border-amber-400/80 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-md"
                    initial={{ x: 1200, scale: 0, opacity: 0, rotateZ: 90 }}
                    animate={{
                      x: [1200, 200, -200, -1600],
                      scale: [0, 1, 1.2, 1.2],
                      opacity: [0, 1, 1, 1],
                      rotateZ: [90, 0, -360, -720],
                    }}
                    transition={{
                      duration: 5,
                      times: [0, 0.4, 0.6, 1],
                      ease: [0.16, 1, 0.3, 1],
                      delay: 2,
                    }}
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(251,191,36,0.8))",
                      boxShadow:
                        "0 0 50px rgba(251,191,36,0.4), inset 0 0 30px rgba(251,191,36,0.2)",
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-24 h-24"
                    />
                  </motion.div>

                  {/* Epic collision effect when tokens meet */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 6, 3, 0],
                      opacity: [0, 1, 0.7, 0],
                      rotateZ: [0, 360, 720],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  ></motion.div>

                  {/* Screen shake effect for collision */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      x: [0, -8, 8, -5, 5, 0],
                      y: [0, 5, -5, 3, -3, 0],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 4,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Energy burst particles */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-white"
                      style={{
                        left: "50%",
                        top: "50%",
                        boxShadow: `0 0 15px ${i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF6B35" : "#FFEB3B"}`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        x:
                          Math.cos((i * 12 * Math.PI) / 180) *
                          (120 + Math.random() * 150),
                        y:
                          Math.sin((i * 12 * Math.PI) / 180) *
                          (120 + Math.random() * 150),
                        opacity: [0, 1, 0],
                        rotateZ: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                      }}
                      transition={{
                        duration: 2,
                        delay: 4 + i * 0.03,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Epic Jackpot Reveal with Screen Impact */}
            {currentStep === 2 && (
              <motion.div
                key="jackpot"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: [0, -8, 8, -4, 4, 0], // Screen shake effect
                  y: [0, 4, -4, 2, -2, 0],
                }}
                exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  x: { duration: 0.4, delay: 1 },
                  y: { duration: 0.4, delay: 1 },
                }}
              >
                {/* Simplified visual effects */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${15 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
                  {/* Flash effect */}
                  <motion.div
                    className="fixed inset-0 bg-white pointer-events-none z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 0.2, delay: 0.8 }}
                  />

                  <motion.h2
                    className="text-9xl font-bold text-amber-400 relative z-10 tracking-wide mb-8"
                    initial={{ scale: 0.1, y: 300, opacity: 0, rotateX: 180 }}
                    animate={{
                      scale: [0.1, 0.6, 1.3, 1],
                      y: [300, 150, -50, 0],
                      opacity: [0, 0.3, 1, 1],
                      rotateX: [180, 90, -15, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.3, 0.7, 1],
                      delay: 0.3,
                    }}
                    style={{
                      filter:
                        "drop-shadow(0 0 100px rgba(251,191,36,1)) drop-shadow(0 0 150px rgba(251,191,36,0.8))",
                      fontWeight: 900,
                      textShadow: "0 0 80px rgba(251,191,36,1)",
                    }}
                  >
                    WIN THE JACKPOT!
                  </motion.h2>

                  <motion.div
                    className="mt-12 max-w-3xl mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.8,
                    }}
                  >
                    <p className="text-2xl text-gray-300 font-light leading-relaxed text-center mb-8">
                      Every swap automatically enters you into our{" "}
                      <span className="text-yellow-400 font-medium">
                        VRF-powered lottery
                      </span>{" "}
                      where your trading fees can become massive rewards
                    </p>

                    <motion.div
                      className="text-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.5,
                      }}
                    >
                      <motion.div
                        className="text-5xl font-bold text-green-400 mb-2"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(34,197,94,0.5)",
                            "0 0 40px rgba(34,197,94,0.8)",
                            "0 0 20px rgba(34,197,94,0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <AnimatedCounter />
                      </motion.div>
                      <div className="text-lg text-gray-400 font-light">
                        Current Jackpot Prize
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Epic confetti burst */}
                  {[...Array(35)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 4 + Math.random() * 8 + "px",
                        height: 4 + Math.random() * 8 + "px",
                        background:
                          i % 4 === 0
                            ? "#FFD700"
                            : i % 4 === 1
                              ? "#FFA500"
                              : i % 4 === 2
                                ? "#FBBF24"
                                : "#10B981",
                        left: `${15 + Math.random() * 70}%`,
                        top: `${5 + Math.random() * 40}%`,
                        boxShadow: `0 0 20px ${i % 4 === 0 ? "#FFD700" : i % 4 === 1 ? "#FFA500" : i % 4 === 2 ? "#FBBF24" : "#10B981"}`,
                      }}
                      initial={{ scale: 0, y: 0, opacity: 0, rotateZ: 0 }}
                      animate={{
                        scale: [0, 1.5, 0.8, 0],
                        y: [
                          0,
                          -400 - Math.random() * 200,
                          -600 - Math.random() * 100,
                        ],
                        x: [0, (Math.random() - 0.5) * 400],
                        opacity: [0, 1, 0.8, 0],
                        rotateZ: [0, 720 * (Math.random() > 0.5 ? 1 : -1)],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        delay: 2.5 + Math.random() * 1.5,
                        ease: [0.16, 1, 0.3, 1],
                        times: [0, 0.3, 0.7, 1],
                      }}
                    />
                  ))}

                  {/* Elegant energy waves */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 bg-gradient-to-b from-yellow-400 via-orange-400 to-transparent opacity-60"
                      style={{
                        height: "140px",
                        left: `${20 + i * 13}%`,
                        top: "-70px",
                        transformOrigin: "bottom",
                        filter: "blur(0.5px)",
                      }}
                      animate={{
                        scaleY: [0, 1, 0.3, 0],
                        opacity: [0, 0.8, 0.4, 0],
                        rotateZ: [0, i % 2 === 0 ? 8 : -8, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 1.5 + i * 0.15,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Bridge to Fee Structure */}
            {currentStep === 3 && (
              <motion.div
                key="fee-bridge"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Simplified background effects */}
                <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center relative max-w-4xl z-10">
                  {/* Connecting question */}
                  <motion.h2
                    className="text-5xl font-light text-gray-300 mb-12 tracking-wide"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                      filter: "drop-shadow(0 0 25px rgba(255,255,255,0.2))",
                      fontWeight: 300,
                    }}
                  >
                    BUT HOW DOES THE JACKPOT GROW?
                  </motion.h2>

                  {/* Dramatic fee reveal */}
                  <motion.div
                    className="text-9xl font-bold text-warm-orange mb-8 tracking-wider"
                    initial={{ scale: 0.2, rotateZ: -20, opacity: 0 }}
                    animate={{
                      scale: [0.2, 1.2, 1],
                      rotateZ: [-20, 10, 0],
                      opacity: [0, 1, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 1.5,
                      times: [0, 0.7, 1],
                    }}
                    style={{
                      filter: "drop-shadow(0 0 80px rgba(255,107,53,1))",
                      fontWeight: 800,
                      textShadow: "0 0 60px rgba(255,107,53,0.8)",
                    }}
                  >
                    10% FEE
                  </motion.div>

                  <motion.div
                    className="text-4xl font-light text-yellow-400 tracking-wide"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(255,235,59,0.6))",
                      fontWeight: 300,
                    }}
                  >
                    ON EVERY SINGLE SWAP
                  </motion.div>

                  {/* Subtle hint of what's coming */}
                  <motion.p
                    className="text-xl text-gray-400 mt-8 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4, duration: 1 }}
                  >
                    Every trade feeds the ecosystem...
                  </motion.p>

                  {/* Elegant expanding rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border border-warm-orange/30 rounded-full"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 2.5 + i * 0.5, 3 + i * 0.5],
                        opacity: [1, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 1.2 + i * 0.3,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Fee Opportunities Introduction */}
            {currentStep === 4 && (
              <motion.div
                key="fee-opportunities"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Background visual effects */}
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1.2, 0],
                        opacity: [0, 0.7, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
                  <div className="mb-16">
                    {/* Main message */}
                    <motion.div
                      className="text-4xl text-gray-300 mb-12 font-light"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      But here's where it gets interesting...
                    </motion.div>

                    <motion.p
                      className="text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.8,
                      }}
                    >
                      On other DEXs they just take your fees or give them to farmers, but on{" "}
                      <span className="text-yellow-400 font-semibold">
                        Sonic Red Dragon
                      </span>
                      , we turn them into{" "}
                      <span className="text-amber-400 font-bold">
                        opportunities
                      </span>
                    </motion.p>

                    <motion.div
                      className="text-5xl font-light text-yellow-400 tracking-wide"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 1.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.5,
                      }}
                      style={{
                        filter: "drop-shadow(0 0 30px rgba(255,235,59,0.5))",
                      }}
                    >
                      ✨ OPPORTUNITIES ✨
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Enhanced Fee Breakdown Details */}
            {currentStep === 5 && (
              <motion.div
                key="fee-breakdown"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Background visual effects */}
                <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      style={{
                        left: `${5 + i * 12}%`,
                        top: `${10 + (i % 4) * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
                  <div className="mb-16">
                    <motion.h2
                      className="text-6xl font-light mb-6 text-yellow-400 tracking-wide"
                      initial={{ y: -40, opacity: 0, rotateX: 45 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.3,
                      }}
                      style={{
                        filter: "drop-shadow(0 0 40px rgba(255,235,59,0.6))",
                        fontWeight: 300,
                      }}
                    >
                      YOUR 10% FEE BECOMES
                    </motion.h2>
                  </div>

                  <div className="space-y-12">
                    {[
                      {
                        percent: "6.9%",
                        label: "JACKPOT VAULT",
                        description: "Win massive prizes every trade",
                        color: "amber",
                        delay: 0.5,
                        size: 120,
                      },
                      {
                        percent: "2.41%",
                        label: "LP REWARDS",
                        description: "Earn passive income",
                        color: "blue",
                        delay: 1,
                        size: 84,
                      },
                      {
                        percent: "0.69%",
                        label: "TOKEN BURN",
                        description: "Increase scarcity & value",
                        color: "red",
                        delay: 1.5,
                        size: 48,
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-center space-x-16"
                        initial={{
                          x: i % 2 === 0 ? -600 : 600,
                          opacity: 0,
                          rotateY: 45,
                        }}
                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: item.delay,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <motion.div
                          className={`rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${
                            item.color === "amber"
                              ? "bg-amber-500/10 border-amber-400/60"
                              : item.color === "blue"
                                ? "bg-blue-500/10 border-blue-400/60"
                                : item.color === "red"
                                  ? "bg-red-500/10 border-red-400/60"
                                  : "bg-yellow-500/10 border-yellow-400/60"
                          }`}
                          style={{
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            filter: `drop-shadow(0 0 25px ${
                              item.color === "amber"
                                ? "rgba(251,191,36,0.4)"
                                : item.color === "blue"
                                  ? "rgba(59,130,246,0.4)"
                                  : item.color === "red"
                                    ? "rgba(239,68,68,0.4)"
                                    : "rgba(234,179,8,0.4)"
                            })`,
                            boxShadow: `inset 0 0 20px ${
                              item.color === "amber"
                                ? "rgba(251,191,36,0.1)"
                                : item.color === "blue"
                                  ? "rgba(59,130,246,0.1)"
                                  : item.color === "red"
                                    ? "rgba(239,68,68,0.1)"
                                    : "rgba(234,179,8,0.1)"
                            }`,
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: item.delay + 1,
                          }}
                        >
                          <span
                            className={`font-medium ${
                              item.color === "amber"
                                ? "text-amber-400"
                                : item.color === "blue"
                                  ? "text-blue-400"
                                  : item.color === "red"
                                    ? "text-red-400"
                                    : "text-yellow-400"
                            }`}
                            style={{
                              fontSize: `${Math.max(item.size * 0.15, 14)}px`,
                            }}
                          >
                            {item.percent}
                          </span>
                        </motion.div>

                        <div className="text-left">
                          <motion.div
                            className={`text-3xl font-medium tracking-wide ${
                              item.color === "amber"
                                ? "text-amber-400"
                                : item.color === "blue"
                                  ? "text-blue-400"
                                  : item.color === "red"
                                    ? "text-red-400"
                                    : "text-yellow-400"
                            }`}
                            animate={{ x: [0, 8, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: item.delay + 1,
                            }}
                          >
                            → {item.label}
                          </motion.div>
                          <motion.p
                            className="text-lg text-gray-400 font-light mt-2 ml-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: item.delay + 1.5 }}
                          >
                            {item.description}
                          </motion.p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Chainlink VRF Lottery - Immersive Camera Dive */}
            {currentStep === 6 && (
              <motion.div
                key="lottery"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
