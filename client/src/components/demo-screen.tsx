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

  // Enhanced timing based on waveform analysis - Extended for better comprehension
  const steps = [
    { delay: 0, duration: 6500 }, // [0:00–0:06.5] Step 0: Sophisticated Title Reveal
    { delay: 6500, duration: 7500 }, // [0:06.5–0:14] Step 1: Elegant Token Interaction
    { delay: 14000, duration: 12000 }, // [0:14–0:26] Step 2: Epic Jackpot Reveal with Screen Impact
    { delay: 26000, duration: 6000 }, // [0:26–0:32] Step 3: Hook - Transforming Fees into Opportunities
    { delay: 32000, duration: 8000 }, // [0:32–0:40] Step 4: Bridge to Fee Structure
    { delay: 40000, duration: 12000 }, // [0:40–0:52] Step 5: Enhanced Fee Breakdown with Transition
    { delay: 52000, duration: 13000 }, // [0:52–1:05] Step 6: Chainlink VRF Lottery - Immersive Camera Dive
    { delay: 65000, duration: 7000 }, // [1:05–1:12] Step 7: Modern Minimalist Odds Table
    { delay: 72000, duration: 12000 }, // [1:12–1:24] Step 8: LayerZero Cross-Chain Implementation - Immersive Deep Dive
    { delay: 84000, duration: 8000 }, // [1:24–1:32] Step 9: Epic Finale with CTA
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
    <motion.div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
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
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider bg-gradient-to-r from-white via-amber-400 to-white bg-clip-text text-transparent relative z-10 px-4"
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
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                {/* Fire Ember Background Animation */}
                {[...Array(35)].map((_, i) => (
                  <motion.div
                    key={`ember-${i}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${2 + Math.random() * 4}px`,
                      height: `${2 + Math.random() * 4}px`,
                      background: `radial-gradient(circle, ${
                        i % 4 === 0
                          ? "#FF4500"
                          : i % 4 === 1
                            ? "#FF6347"
                            : i % 4 === 2
                              ? "#DC143C"
                              : "#B22222"
                      } 0%, transparent 70%)`,
                      boxShadow: `0 0 ${8 + Math.random() * 12}px ${
                        i % 4 === 0
                          ? "#FF4500"
                          : i % 4 === 1
                            ? "#FF6347"
                            : i % 4 === 2
                              ? "#DC143C"
                              : "#B22222"
                      }`,
                      left: `${Math.random() * 100}%`,
                      bottom: `-20px`,
                    }}
                    initial={{
                      y: 0,
                      x: 0,
                      opacity: 0,
                      scale: 0.2 + Math.random() * 0.8,
                    }}
                    animate={{
                      y: [-50, -window.innerHeight - 200],
                      x: [
                        0,
                        (Math.random() - 0.5) * 300,
                        (Math.random() - 0.5) * 200,
                        (Math.random() - 0.5) * 400,
                      ],
                      opacity: [0, 0.7 + Math.random() * 0.3, 0.4, 0],
                      scale: [
                        0.2 + Math.random() * 0.8,
                        0.6 + Math.random() * 0.6,
                        0.3 + Math.random() * 0.4,
                        0.05,
                      ],
                      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                    }}
                    transition={{
                      duration: 12 + Math.random() * 18,
                      delay: Math.random() * 15,
                      repeat: Infinity,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                ))}

                {/* Larger Glowing Embers */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`large-ember-${i}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${4 + Math.random() * 6}px`,
                      height: `${4 + Math.random() * 6}px`,
                      background: `radial-gradient(circle, ${
                        i % 3 === 0
                          ? "#FF4500"
                          : i % 3 === 1
                            ? "#DC143C"
                            : "#B22222"
                      } 0%, ${
                        i % 3 === 0
                          ? "#FF4500"
                          : i % 3 === 1
                            ? "#DC143C"
                            : "#B22222"
                      }40 50%, transparent 80%)`,
                      boxShadow: `0 0 ${15 + Math.random() * 20}px ${
                        i % 3 === 0
                          ? "#FF4500"
                          : i % 3 === 1
                            ? "#DC143C"
                            : "#B22222"
                      }`,
                      left: `${Math.random() * 100}%`,
                      bottom: `-30px`,
                    }}
                    initial={{
                      y: 0,
                      x: 0,
                      opacity: 0,
                      rotate: 0,
                    }}
                    animate={{
                      y: [-80, -window.innerHeight - 250],
                      x: [
                        0,
                        (Math.random() - 0.5) * 250,
                        (Math.random() - 0.5) * 150,
                        (Math.random() - 0.5) * 350,
                      ],
                      opacity: [0, 0.9, 0.6, 0],
                      rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)],
                      scale: [0.5, 1.2, 0.8, 0.1],
                    }}
                    transition={{
                      duration: 20 + Math.random() * 15,
                      delay: Math.random() * 12,
                      repeat: Infinity,
                      ease: [0.12, 0.6, 0.8, 0.1],
                    }}
                  />
                ))}

                {/* Heat Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(255,69,0,0.03) 0%, transparent 40%)",
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative w-full h-96 z-10">
                  <div className="text-center mb-8 sm:mb-16 px-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-wide">
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

                  {/* Enhanced Token Interaction - Meet in Center & Accelerate Out */}
                  {[...Array(3)].map((_, loopIndex) => (
                    <div key={`token-loop-${loopIndex}`}>
                      {/* S Token - Left to Center to Right */}
                      <motion.div
                        className="absolute w-32 h-32 rounded-full border-2 border-yellow-400/60 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          filter: "drop-shadow(0 0 30px rgba(234,179,8,0.6))",
                          boxShadow: "0 0 40px rgba(234,179,8,0.3), inset 0 0 20px rgba(234,179,8,0.1)",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                          x: [-600, -50, 0, 1000],
                          y: loopIndex === 0 ? [0, -10, 0, -120] :
                             loopIndex === 1 ? [-120, -15, 0, 180] :
                             [150, 20, 0, -300],
                          scale: loopIndex === 0 ? [0.4, 1, 1.2, 0.2] :
                                 loopIndex === 1 ? [0.3, 0.9, 1.1, 0.3] :
                                 [0.5, 1.1, 1.3, 0.1],
                          opacity: [0, 0.8, 1, 0],
                          rotateZ: loopIndex === 0 ? [-180, -90, 0, 360] :
                                   loopIndex === 1 ? [90, 45, 0, -270] :
                                   [-90, -45, 0, 270],
                        }}
                        transition={{
                          duration: 5.5,
                          times: [0, 0.4, 0.55, 1],
                          ease: loopIndex === 0 ? 
                            // First loop: explosive exit after convergence
                            [[0.25, 0.46, 0.45, 0.94], [0.25, 0.46, 0.45, 0.94], [0.87, 0, 0.13, 1], [0.99, 0.01, 0.99, 0.01]] :
                            loopIndex === 1 ?
                            // Second loop: rapid acceleration exit
                            [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1], [0.76, 0, 0.24, 1], [0.97, 0.03, 0.97, 0.03]] :
                            // Third loop: instant launch exit
                            [[0.68, -0.55, 0.265, 1.55], [0.68, -0.55, 0.265, 1.55], [0.95, 0.05, 0.795, 0.035], [0.99, 0.01, 0.99, 0.01]],
                          delay: loopIndex * 2.5,
                          repeat: Infinity,
                        }}
                        initial={{
                          x: -600,
                          y: loopIndex === 0 ? 0 : loopIndex === 1 ? -120 : 150,
                          scale: loopIndex === 0 ? 0.4 : loopIndex === 1 ? 0.3 : 0.5,
                          opacity: 0,
                        }}
                      >
                        <img
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                          alt="S Token"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </motion.div>

                      {/* DRAGON Token - Right to Center to Left */}
                      <motion.div
                        className="absolute w-32 h-32 rounded-full border-2 border-amber-400/60 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          filter: "drop-shadow(0 0 30px rgba(251,191,36,0.6))",
                          boxShadow: "0 0 40px rgba(251,191,36,0.3), inset 0 0 20px rgba(251,191,36,0.1)",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                          x: [600, 50, 0, -1000],
                          y: loopIndex === 0 ? [0, 10, 0, 120] :
                             loopIndex === 1 ? [120, 15, 0, -180] :
                             [-150, -20, 0, 300],
                          scale: loopIndex === 0 ? [0.4, 1, 1.2, 0.2] :
                                 loopIndex === 1 ? [0.3, 0.9, 1.1, 0.3] :
                                 [0.5, 1.1, 1.3, 0.1],
                          opacity: [0, 0.8, 1, 0],
                          rotateZ: loopIndex === 0 ? [180, 90, 0, -360] :
                                   loopIndex === 1 ? [-90, -45, 0, 270] :
                                   [90, 45, 0, -270],
                        }}
                        transition={{
                          duration: 5.5,
                          times: [0, 0.4, 0.55, 1],
                          ease: loopIndex === 0 ? 
                            // First loop: explosive exit after convergence
                            [[0.25, 0.46, 0.45, 0.94], [0.25, 0.46, 0.45, 0.94], [0.87, 0, 0.13, 1], [0.99, 0.01, 0.99, 0.01]] :
                            loopIndex === 1 ?
                            // Second loop: rapid acceleration exit
                            [[0.42, 0, 0.58, 1], [0.42, 0, 0.58, 1], [0.76, 0, 0.24, 1], [0.97, 0.03, 0.97, 0.03]] :
                            // Third loop: instant launch exit
                            [[0.68, -0.55, 0.265, 1.55], [0.68, -0.55, 0.265, 1.55], [0.95, 0.05, 0.795, 0.035], [0.99, 0.01, 0.99, 0.01]],
                          delay: loopIndex * 2.5,
                          repeat: Infinity,
                        }}
                        initial={{
                          x: 600,
                          y: loopIndex === 0 ? 0 : loopIndex === 1 ? 120 : -150,
                          scale: loopIndex === 0 ? 0.4 : loopIndex === 1 ? 0.3 : 0.5,
                          opacity: 0,
                        }}
                      >
                        <img
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                          alt="DRAGON Token"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </motion.div>

                      {/* Enhanced Center Collision Effect */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${
                            loopIndex === 0 ? '#FFD700' :
                            loopIndex === 1 ? '#FF6B35' : '#FF4500'
                          } 0%, ${
                            loopIndex === 0 ? '#FFA500' :
                            loopIndex === 1 ? '#FF8C00' : '#DC143C'
                          } 40%, transparent 70%)`,
                          boxShadow: `0 0 40px ${
                            loopIndex === 0 ? '#FFD700' :
                            loopIndex === 1 ? '#FF6B35' : '#FF4500'
                          }, 0 0 80px ${
                            loopIndex === 0 ? '#FFA500' :
                            loopIndex === 1 ? '#FF8C00' : '#DC143C'
                          }`,
                        }}
                        animate={{
                          scale: [0, 6, 4, 1, 0],
                          opacity: [0, 0.9, 0.7, 0.3, 0],
                          rotateZ: [0, 180, 270, 360],
                        }}
                        transition={{
                          duration: 2,
                          delay: (loopIndex * 4) + 2.4,
                          ease: [0.87, 0, 0.13, 1],
                          repeat: Infinity,
                          times: [0, 0.2, 0.4, 0.7, 1],
                        }}
                      />

                      {/* Explosion Particles */}
                      {[...Array(8)].map((_, particleIndex) => (
                        <motion.div
                          key={`particle-${loopIndex}-${particleIndex}`}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: loopIndex === 0 ? '#FFD700' :
                                       loopIndex === 1 ? '#FF6B35' : '#FF4500',
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                          animate={{
                            x: [0, (Math.cos(particleIndex * 45 * Math.PI / 180) * 120)],
                            y: [0, (Math.sin(particleIndex * 45 * Math.PI / 180) * 120)],
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: (loopIndex * 4) + 2.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
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
                {/* Continuous Token Interaction Loop - Background Layer */}
                {[...Array(2)].map((_, loopIndex) => (
                  <div key={`token-loop-step2-${loopIndex}`} className="absolute inset-0 opacity-30">
                    {/* S Token from different angles */}
                    <motion.div
                      className="absolute w-24 h-24 rounded-full border border-yellow-400/40 flex items-center justify-center backdrop-blur-sm"
                      style={{
                        filter: "drop-shadow(0 0 20px rgba(234,179,8,0.4))",
                        boxShadow: "0 0 30px rgba(234,179,8,0.2)",
                      }}
                      animate={{
                        x: [-600, -50, 0, 600],
                        y: loopIndex === 0 ? [0, -10, 0, -100] :
                           [-120, -15, 0, 150],
                        scale: [0.2, 0.8, 0.9, 0.6],
                        opacity: [0, 0.6, 0.6, 0],
                        rotateZ: loopIndex === 0 ? [-120, 60, 240, 420] :
                                 [60, 180, 360, 540],
                      }}
                      transition={{
                        duration: 10 + loopIndex * 3,
                        times: [0, 0.35, 0.65, 1],
                        ease: loopIndex === 0 ? [0.25, 0.1, 0.25, 1] :
                              [0.42, 0, 0.58, 1],
                        delay: loopIndex * 2.5,
                        repeat: Infinity,
                      }}
                      initial={{
                        x: loopIndex === 0 ? -600 : -800,
                        y: loopIndex === 0 ? 100 : -150,
                        scale: 0.2,
                        opacity: 0,
                      }}
                    >
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                        alt="S Token"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>

                    {/* DRAGON Token from different angles */}
                    <motion.div
                      className="absolute w-24 h-24 rounded-full border border-amber-400/40 flex items-center justify-center backdrop-blur-sm"
                      style={{
                        filter: "drop-shadow(0 0 20px rgba(251,191,36,0.4))",
                        boxShadow: "0 0 30px rgba(251,191,36,0.2)",
                      }}
                      animate={{
                        x: [600, 50, 0, -600],
                        y: loopIndex === 0 ? [0, 10, 0, 100] :
                           [120, 15, 0, -150],
                        scale: [0.2, 0.8, 0.9, 0.6],
                        opacity: [0, 0.6, 0.6, 0],
                        rotateZ: loopIndex === 0 ? [120, -60, -240, -420] :
                                 [-60, -180, -360, -540],
                      }}
                      transition={{
                        duration: 10 + loopIndex * 3,
                        times: [0, 0.35, 0.65, 1],
                        ease: loopIndex === 0 ? [0.25, 0.1, 0.25, 1] :
                              [0.42, 0, 0.58, 1],
                        delay: loopIndex * 2.5,
                        repeat: Infinity,
                      }}
                      initial={{
                        x: loopIndex === 0 ? 600 : 800,
                        y: loopIndex === 0 ? -100 : 150,
                        scale: 0.2,
                        opacity: 0,
                      }}
                    >
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                        alt="DRAGON Token"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>

                    {/* Subtle Collision Effect */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${
                          loopIndex === 0 ? '#FFD700' : '#FF6B35'
                        } 0%, transparent 70%)`,
                        boxShadow: `0 0 20px ${
                          loopIndex === 0 ? '#FFD700' : '#FF6B35'
                        }`,
                      }}
                      animate={{
                        scale: [0, 2, 1, 0],
                        opacity: [0, 0.4, 0.2, 0],
                        rotateZ: [0, 90, 180],
                      }}
                      transition={{
                        duration: 1,
                        delay: (loopIndex * 2.5) + 3.5,
                        ease: [0.87, 0, 0.13, 1],
                        repeat: Infinity,
                        repeatDelay: 9.5 + loopIndex * 3,
                      }}
                    />
                  </div>
                ))}
                <div className="text-center relative z-10">
                  {/* Flash effect */}
                  <motion.div
                    className="fixed inset-0 bg-white pointer-events-none z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 0.2, delay: 0.8 }}
                  />

                  <motion.h2
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold relative z-10 tracking-wide mb-6 sm:mb-8 px-4"
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
                      fontWeight: 900,
                    }}
                  >
                    <span 
                      className="text-white"
                      style={{
                        filter: "drop-shadow(0 0 60px rgba(255,255,255,0.8))",
                        textShadow: "0 0 40px rgba(255,255,255,0.6)",
                      }}
                    >
                      WIN THE{" "}
                    </span>
                    <span 
                      className="text-amber-400"
                      style={{
                        filter: "drop-shadow(0 0 100px rgba(251,191,36,1)) drop-shadow(0 0 150px rgba(251,191,36,0.8))",
                        textShadow: "0 0 80px rgba(251,191,36,1)",
                      }}
                    >
                      JACKPOT!
                    </span>
                  </motion.h2>

                  <motion.div
                    className="mt-8 sm:mt-12 max-w-3xl mx-auto px-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.8,
                    }}
                  >
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed text-center mb-6 sm:mb-8">
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

            {/* Step 3: Hook - Transforming Fees into Opportunities */}
            {currentStep === 3 && (
              <motion.div
                key="hook"
                className="flex items-center justify-center min-h-screen px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="text-center max-w-4xl">
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    <motion.h2
                      className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(255,255,255,0.1)",
                          "0 0 30px rgba(255,255,255,0.2)",
                          "0 0 20px rgba(255,255,255,0.1)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      Here's where it gets interesting,
                    </motion.h2>
                  </motion.div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  >
                    <motion.p
                      className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.5 }}
                    >
                      Unlike traditional DEXs that{" "}
                      <motion.span
                        className="text-red-400"
                        animate={{ 
                          color: ["#f87171", "#ef4444", "#dc2626", "#f87171"],
                          textShadow: [
                            "0 0 10px rgba(239,68,68,0.3)",
                            "0 0 20px rgba(239,68,68,0.6)",
                            "0 0 10px rgba(239,68,68,0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        route fees to farmers
                      </motion.span>
                      ,
                    </motion.p>

                    <motion.p
                      className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 leading-relaxed mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 2.5 }}
                    >
                      Sonic Red Dragon{" "}
                      <motion.span
                        className="text-yellow-400 font-medium"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(251,191,36,0.4)",
                            "0 0 40px rgba(251,191,36,0.8)",
                            "0 0 20px rgba(251,191,36,0.4)"
                          ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                      >
                        transforms them into opportunities
                      </motion.span>
                    </motion.p>
                  </motion.div>

                  {/* Subtle animated elements */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 2 }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-yellow-400/40"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Bridge to Fee Structure */}
            {currentStep === 4 && (
              <motion.div
                key="fee-bridge"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
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

            {/* Step 5: Enhanced Fee Breakdown with Transition */}
            {currentStep === 5 && (
              <motion.div
                key="breakdown"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="text-center relative z-10">
                  <div className="mb-16">
                    <motion.h2
                      className="text-6xl font-light mb-12 text-yellow-400 tracking-wide"
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
                        description: "in $S to jackpot vault",
                        color: "amber",
                        delay: 0.5,
                        size: 120,
                      },
                      {
                        percent: "2.41%",
                        label: "veDRAGON REWARDS",
                        description: "in $S to veDRAGON holders",
                        color: "blue",
                        delay: 1,
                        size: 84,
                      },
                      {
                        percent: "0.69%",
                        label: "DRAGON BURN",
                        description: "in $DRAGON burned",
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

            {/* Step 7: Modern Minimalist Odds Table */}
            {currentStep === 7 && (
              <motion.div
                key="odds"
                className="flex items-center justify-center min-h-screen px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="w-full max-w-4xl">
                  {/* Minimalist Header */}
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.h2
                      className="text-4xl font-extralight mb-4 text-white tracking-wider"
                      animate={{ 
                        textShadow: [
                          "0 0 20px rgba(255,255,255,0.1)",
                          "0 0 30px rgba(255,255,255,0.2)",
                          "0 0 20px rgba(255,255,255,0.1)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      WINNING PROBABILITIES
                    </motion.h2>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
                  </motion.div>

                  {/* Interactive Cards Grid */}
                  <motion.div
                    className="grid gap-4 md:gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                  >
                    {[
                      { amount: "$10", odds: "0.004%", boosted: "0.01%", gradient: "from-red-500/20 to-red-600/20", border: "border-red-500/30", text: "text-red-300" },
                      { amount: "$100", odds: "0.04%", boosted: "0.1%", gradient: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30", text: "text-orange-300" },
                      { amount: "$1,000", odds: "0.4%", boosted: "1%", gradient: "from-yellow-500/20 to-yellow-600/20", border: "border-yellow-500/30", text: "text-yellow-300" },
                      { amount: "$10,000", odds: "4%", boosted: "10%", gradient: "from-green-500/20 to-green-600/20", border: "border-green-500/30", text: "text-green-300" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-gradient-to-br ${item.gradient} backdrop-blur-sm cursor-pointer`}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.8 + (i * 0.1),
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -4,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Subtle animated background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        
                        <div className="relative p-6 md:p-8">
                          <div className="flex items-center justify-between">
                            {/* Swap Amount */}
                            <div className="flex-1">
                              <div className="text-sm text-white/60 font-light mb-1">Swap Amount</div>
                              <motion.div 
                                className={`text-2xl md:text-3xl font-light ${item.text}`}
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              >
                                {item.amount}
                              </motion.div>
                            </div>

                            {/* Arrow */}
                            <motion.div 
                              className="text-white/40 mx-4 md:mx-6"
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              →
                            </motion.div>

                            {/* Base Odds */}
                            <div className="flex-1 text-center">
                              <div className="text-sm text-white/60 font-light mb-1">Base Odds</div>
                              <motion.div 
                                className={`text-xl md:text-2xl font-light ${item.text}`}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {item.odds}
                              </motion.div>
                            </div>

                            {/* Boost Arrow */}
                            <motion.div 
                              className="text-blue-400/60 mx-4 md:mx-6"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ⚡
                            </motion.div>

                            {/* veDRAGON Boosted */}
                            <div className="flex-1 text-right">
                              <motion.div 
                                className="text-xs text-blue-300/80 font-light mb-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 + (i * 0.1), duration: 0.6 }}
                              >
                                veDRAGON 2.5x
                              </motion.div>
                              <motion.div 
                                className="text-xl md:text-2xl font-medium text-blue-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1,
                                  textShadow: [
                                    "0 0 10px rgba(147,197,253,0.3)",
                                    "0 0 20px rgba(147,197,253,0.5)",
                                    "0 0 10px rgba(147,197,253,0.3)"
                                  ]
                                }}
                                transition={{ 
                                  opacity: { delay: 1.2 + (i * 0.1), duration: 0.8 },
                                  scale: { delay: 1.2 + (i * 0.1), duration: 0.8, ease: "backOut" },
                                  textShadow: { duration: 3, repeat: Infinity, delay: 2 }
                                }}
                              >
                                {item.boosted}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Bottom Caption */}
                  <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <div className="text-white/60 text-sm font-light tracking-wide">
                      Higher swaps unlock exponentially better winning chances
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 8: LayerZero Cross-Chain Implementation - Immersive Deep Dive */}
            {currentStep === 8 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Persistent Cross-Chain Background Animation */}
                <motion.div
                  className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${25 + (i % 3) * 25}%`,
                      }}
                      animate={{
                        opacity: [0, 0.8, 0.8, 0],
                        scale: [0.6, 1.2, 1.2, 0.6],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        delay: i * 3,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Chain Link Visual */}
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-8 h-8 border-2 border-blue-400/40 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(59, 130, 246, 0.1)" }}
                        >
                          <div className="w-3 h-3 bg-blue-400/60 rounded-full"></div>
                        </div>
                        <div className="w-6 h-1 bg-gradient-to-r from-blue-400/40 to-purple-400/40"></div>
                        <div
                          className="w-8 h-8 border-2 border-purple-400/40 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(147, 51, 234, 0.1)" }}
                        >
                          <div className="w-3 h-3 bg-purple-400/60 rounded-full"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Main Content with Cinematic Camera Movement */}
                <motion.div
                  className="text-center relative z-10"
                  initial={{ scale: 0.2, opacity: 0, rotateZ: 45 }}
                  animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80,
                  }}
                >
                  {/* Title with Dramatic Zoom */}
                  <motion.h2
                    className="text-5xl font-light mb-6 tracking-wide"
                    initial={{ scale: 5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 2.5,
                      delay: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                      color: "#E1E8ED",
                      filter: "drop-shadow(0 0 30px rgba(225,232,237,0.4))",
                      fontWeight: 300,
                    }}
                  >
                    ENTERPRISE CROSS-CHAIN INFRASTRUCTURE
                  </motion.h2>

                  {/* Professional Problem Statement */}
                  <motion.p
                    className="text-lg text-gray-300 mb-4 font-light leading-relaxed max-w-4xl mx-auto"
                    initial={{ x: 400, opacity: 0, rotateY: 45 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ delay: 2, duration: 2, ease: "easeOut" }}
                  >
                    Sonic Red Dragon leverages LayerZero V2's omnichain protocol to enable secure cross-chain 
                    randomness generation. Our implementation bridges Chainlink VRF 2.5 from Arbitrum to Sonic, 
                    ensuring cryptographically verifiable lottery results across networks.
                  </motion.p>

                  {/* Technical Benefits */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                  >
                    <div className="text-center p-4">
                      <motion.div 
                        className="text-blue-400 text-lg font-semibold mb-2"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(59,130,246,0.3)",
                            "0 0 20px rgba(59,130,246,0.5)",
                            "0 0 10px rgba(59,130,246,0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Security First
                      </motion.div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Multi-DVN validation ensures message integrity across chains
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <motion.div 
                        className="text-green-400 text-lg font-semibold mb-2"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(34,197,94,0.3)",
                            "0 0 20px rgba(34,197,94,0.5)",
                            "0 0 10px rgba(34,197,94,0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      >
                        Gas Optimized
                      </motion.div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Minimal overhead with LayerZero's lightweight messaging
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <motion.div 
                        className="text-purple-400 text-lg font-semibold mb-2"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(147,51,234,0.3)",
                            "0 0 20px rgba(147,51,234,0.5)",
                            "0 0 10px rgba(147,51,234,0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        Instant Finality
                      </motion.div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Sub-second cross-chain message confirmation
                      </p>
                    </div>
                  </motion.div>

                  {/* LayerZero Logo with 3D Entrance */}
                  <motion.div
                    className="flex items-center justify-center mb-8"
                    initial={{ rotateX: 90, scale: 0, opacity: 0 }}
                    animate={{ rotateX: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 3.5, ease: "backOut" }}
                  >
                    <motion.div
                      className="flex items-center space-x-6"
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreidp4x62pp27pf6cdtddvas7e3d2cshozgzi3yhmr2whhcefo5anly"
                        alt="LayerZero"
                        className="h-16 filter brightness-110"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 1.5, delay: 4 }}
                        style={{
                          filter:
                            "drop-shadow(0 0 25px rgba(74, 144, 226, 0.6))",
                        }}
                      />
                      <motion.span
                        className="text-3xl font-light text-blue-300"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 4.5, duration: 1.2 }}
                        style={{
                          textShadow: "0 0 20px rgba(147,197,253,0.5)",
                        }}
                      >
                        V2 ENDPOINTS
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* DVN Section with Staggered Reveals */}
                  <motion.div
                    className="mb-8"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 4, duration: 1.5, ease: "easeOut" }}
                  >
                    <motion.h3
                      className="text-2xl text-gray-300 mb-4 font-light"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 4.5, duration: 1, ease: "backOut" }}
                    >
                      Decentralized Verification Network
                    </motion.h3>
                    
                    <motion.p
                      className="text-sm text-gray-400 mb-6 max-w-3xl mx-auto leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 5, duration: 1 }}
                    >
                      Multiple independent DVNs validate each cross-chain message, providing institutional-grade 
                      security through redundant verification and eliminating single points of failure.
                    </motion.p>

                    <div className="flex items-center justify-center space-x-12">
                      {/* LayerZero Labs DVN with Camera Zoom */}
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ scale: 0, rotateZ: -45, opacity: 0 }}
                        animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
                        transition={{
                          delay: 6,
                          duration: 1.2,
                          ease: "backOut",
                        }}
                      >
                        <motion.img
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreihml3nahd2duwdjg2ltoeixax2xdj2ldp5unnrjwntyicar74nwra"
                          alt="LayerZero Labs"
                          className="h-12 mb-2"
                          animate={{
                            filter: [
                              "drop-shadow(0 0 10px rgba(74, 144, 226, 0.3))",
                              "drop-shadow(0 0 20px rgba(74, 144, 226, 0.6))",
                              "drop-shadow(0 0 10px rgba(74, 144, 226, 0.3))",
                            ],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="text-blue-300 text-sm font-medium"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 6.3, duration: 0.8 }}
                        >
                          LayerZero Labs
                        </motion.div>
                      </motion.div>

                      {/* Nethermind DVN with Mirror Effect */}
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ scale: 0, rotateZ: 45, opacity: 0 }}
                        animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
                        transition={{
                          delay: 6.5,
                          duration: 1.2,
                          ease: "backOut",
                        }}
                      >
                        <motion.img
                          src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreiax6jur4gjsevwncuu2tgqlotnc33y5nwxwrv2ggxq3al76xegcqi"
                          alt="Nethermind DVN"
                          className="h-12 mb-2"
                          animate={{
                            filter: [
                              "drop-shadow(0 0 10px rgba(155, 89, 182, 0.3))",
                              "drop-shadow(0 0 20px rgba(155, 89, 182, 0.6))",
                              "drop-shadow(0 0 10px rgba(155, 89, 182, 0.3))",
                            ],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                        />
                        <motion.div
                          className="text-purple-300 text-sm font-medium"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 6.8, duration: 0.8 }}
                        >
                          Nethermind DVN
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Enhanced Technical Architecture Flow */}
                  <motion.div
                    className="relative bg-gray-900/30 rounded-lg p-6 border border-gray-700/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 7, duration: 1.5 }}
                  >
                    <motion.h4
                      className="text-xl text-blue-300 mb-4 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 7.5, duration: 1 }}
                    >
                      Message Flow Architecture
                    </motion.h4>
                    
                    <motion.div
                      className="space-y-3 text-sm text-gray-300 max-w-4xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 8, duration: 1.5 }}
                    >
                      <div className="flex items-center justify-between bg-gray-800/40 rounded p-3">
                        <span className="font-mono text-orange-400">1. Request Initiation</span>
                        <span>Sonic → LayerZero Endpoint</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/40 rounded p-3">
                        <span className="font-mono text-blue-400">2. DVN Validation</span>
                        <span>Multi-signature verification</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/40 rounded p-3">
                        <span className="font-mono text-green-400">3. VRF Generation</span>
                        <span>Chainlink VRF 2.5 on Arbitrum</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/40 rounded p-3">
                        <span className="font-mono text-purple-400">4. Result Delivery</span>
                        <span>Verified randomness to Sonic</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="mt-6 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 9, duration: 1 }}
                    >
                      <div className="inline-flex items-center space-x-2 text-xs text-gray-400 font-mono bg-gray-800/60 rounded px-4 py-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>Average latency: ~2.3 seconds</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 9: Epic Finale with CTA */}
            {currentStep === 9 && (
              <motion.div
                key="finale"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="text-center relative max-w-6xl">
                  {/* Modern Logo/Brand Element with Dragon Emblem */}
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 2,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Dragon Emblem Video */}
                    <motion.div
                      className="relative mb-8"
                      initial={{ opacity: 0, rotateZ: -10 }}
                      animate={{ opacity: 1, rotateZ: 0 }}
                      transition={{
                        duration: 2,
                        delay: 1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <motion.video
                        className="w-32 h-32 mx-auto opacity-80"
                        autoPlay
                        loop
                        muted
                        playsInline
                        animate={{
                          scale: [1, 1.05, 1],
                          filter: [
                            "drop-shadow(0 0 30px rgba(239,68,68,0.5))",
                            "drop-shadow(0 0 50px rgba(249,115,22,0.8))",
                            "drop-shadow(0 0 30px rgba(239,68,68,0.5))",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          filter: "drop-shadow(0 0 40px rgba(239,68,68,0.6))",
                        }}
                      >
                        <source
                          src={`@assets/dragon6_1749365546292.mp4`}
                          type="video/mp4"
                        />
                      </motion.video>
                    </motion.div>

                    <motion.div
                      className="relative inline-block"
                      animate={{
                        rotateY: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Modern minimalist brand mark */}
                      <div
                        className="text-6xl font-thin tracking-[0.3em] mb-4"
                        style={{
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #f59e0b 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                          filter: "drop-shadow(0 0 40px rgba(251,191,36,0.3))",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          fontWeight: 100,
                          letterSpacing: "0.3em",
                        }}
                      >
                        SONIC
                      </div>
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                          animate={{
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 15px rgba(239,68,68,0.5)",
                              "0 0 25px rgba(249,115,22,0.8)",
                              "0 0 15px rgba(239,68,68,0.5)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400 to-transparent opacity-60"></div>
                      </div>
                      <div
                        className="text-4xl font-light tracking-[0.2em]"
                        style={{
                          background:
                            "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                          filter: "drop-shadow(0 0 30px rgba(239,68,68,0.3))",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          fontWeight: 300,
                          letterSpacing: "0.2em",
                        }}
                      >
                        RED DRAGON
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Elegant Subtitle */}
                  <motion.h2
                    className="text-3xl font-light mb-16 text-gray-300 tracking-wide opacity-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 200,
                      letterSpacing: "0.1em",
                    }}
                  >
                    Next-Generation Cross-Chain Lottery Protocol
                  </motion.h2>

                  {/* Tech Features */}
                  <motion.div
                    className="mb-16 space-y-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                  >
                    <motion.p
                      className="text-xl text-blue-400 font-light tracking-wide"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(59,130,246,0.4))",
                      }}
                    >
                      ⚡ Chainlink VRF2.5 • LayerZero V2 • drand League of
                      Entropy
                    </motion.p>
                    <motion.p
                      className="text-xl text-warm-orange font-light tracking-wide"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(255,107,53,0.4))",
                      }}
                    >
                      🎯 Every Swap = Unique Lottery Entry
                    </motion.p>
                  </motion.div>

                  {/* Modern CTA Section */}
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.5, duration: 1.5 }}
                  >
                    <motion.div
                      className="text-xl text-white/60 font-light tracking-wide"
                      animate={{ opacity: [0.6, 0.9, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 200,
                        letterSpacing: "0.1em",
                      }}
                    >
                      LAUNCHING Q2 2025
                    </motion.div>

                    <motion.div
                      className="relative inline-block"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="text-3xl font-light tracking-[0.15em] text-amber-300"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(252,211,77,0.3)",
                            "0 0 40px rgba(252,211,77,0.6)",
                            "0 0 20px rgba(252,211,77,0.3)",
                          ],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          fontWeight: 300,
                          letterSpacing: "0.15em",
                        }}
                      >
                        <a href="https://docs.sonicreddragon.io" target="_blank" rel="noopener noreferrer">docs.sonicreddragon.io</a>
                      </motion.div>

                      {/* Subtle underline animation */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                        animate={{
                          width: ["0%", "100%", "0%"],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Epic particle explosion */}
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 3 + Math.random() * 6 + "px",
                        height: 3 + Math.random() * 6 + "px",
                        background:
                          i % 3 === 0
                            ? "#FFD700"
                            : i % 3 === 1
                              ? "#FF6B35"
                              : "#FFEB3B",
                        left: "50%",
                        top: "50%",
                        boxShadow: `0 0 15px ${i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF6B35" : "#FFEB3B"}`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 600,
                        opacity: [0, 1, 0],
                        rotateZ: [0, 720 * (Math.random() > 0.5 ? 1 : -1)],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        delay: 3 + Math.random() * 2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  ))}

                  {/* Dramatic light rays */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-gradient-to-t from-yellow-400/30 via-orange-400/20 to-transparent"
                      style={{
                        width: "2px",
                        height: "400px",
                        left: "50%",
                        top: "50%",
                        transformOrigin: "bottom",
                        transform: `rotate(${i * 45}deg)`,
                        filter: "blur(1px)",
                      }}
                      animate={{
                        scaleY: [0, 1, 0.7, 0],
                        opacity: [0, 0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: 2 + i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Persistent Jackpot Vault - Shows from Step 2 onwards after jackpot reveal */}
          {currentStep >= 3 && (
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
    </motion.div>
  );
}
