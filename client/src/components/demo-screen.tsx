import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import TokenExchangeAnimation from "./token-exchange-animation";
import SonicToken from "./sonic-token";
import DragonToken from "./dragon-token";
import AnimatedCounter from "./animated-counter";
import StepContent from "./step-content";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

// Sophisticated lottery odds table
const LOTTERY_ODDS = [
  { tier: "GRAND JACKPOT", odds: "1:10,000", multiplier: "1000x", percentage: "69%", color: "from-yellow-400 to-amber-600" },
  { tier: "MEGA WIN", odds: "1:1,000", multiplier: "100x", percentage: "15%", color: "from-orange-400 to-red-500" },
  { tier: "BIG WIN", odds: "1:500", multiplier: "50x", percentage: "10%", color: "from-purple-400 to-pink-500" },
  { tier: "MAJOR WIN", odds: "1:100", multiplier: "25x", percentage: "4%", color: "from-blue-400 to-cyan-500" },
  { tier: "LUCKY WIN", odds: "1:50", multiplier: "10x", percentage: "2%", color: "from-green-400 to-emerald-500" },
];

// Advanced Chainlink VRF configuration
const CHAINLINK_CONFIG = {
  vrfVersion: "2.5",
  subscriptionId: "0x4A7B8C9D2E3F1A5B",
  keyHash: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
  requestConfirmations: 3,
  gasLimit: 2500000,
  networks: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"]
};

// LayerZero cross-chain endpoints
const LAYERZERO_ENDPOINTS = {
  ethereum: { id: 101, icon: "⟠" },
  polygon: { id: 109, icon: "🔷" },
  arbitrum: { id: 110, icon: "🔵" },
  optimism: { id: 111, icon: "🔴" },
  base: { id: 184, icon: "🔹" },
  avalanche: { id: 106, icon: "🏔️" },
  bsc: { id: 102, icon: "🟡" }
};

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showAnimations, setShowAnimations] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const steps = [
    { step: 0, delay: 0 },      // Title
    { step: 1, delay: 8000 },   // Token Swap
    { step: 2, delay: 16000 },  // Jackpot
    { step: 3, delay: 24000 },  // Fee Structure
    { step: 4, delay: 32000 },  // Fee Breakdown
    { step: 5, delay: 40000 },  // Odds Table
    { step: 6, delay: 48000 },  // Chainlink VRF
    { step: 7, delay: 56000 },  // LayerZero
    { step: 8, delay: 64000 },  // Final
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);

      // Pre-load and setup audio with elegant fade in
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.currentTime = 0;

        setTimeout(() => {
          audioRef.current
            ?.play()
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
        }, 2800);
      }

      // Auto-advance steps with sophisticated timing
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, step.delay + 3000);
      });
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <audio ref={audioRef} preload="auto" className="hidden">
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Sophisticated animated gradient mesh */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(255,107,53,0.15) 0%, transparent 65%),
              radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.12) 0%, transparent 65%),
              radial-gradient(ellipse at 50% 50%, rgba(255,235,59,0.08) 0%, transparent 65%),
              radial-gradient(ellipse at 20% 30%, rgba(139,69,19,0.05) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 70%, rgba(75,0,130,0.06) 0%, transparent 70%)
            `,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced floating particles with varied sizes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (Math.random() * 4 + 2) + "px",
              height: (Math.random() * 4 + 2) + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: i % 4 === 0 ? "#FF6B35" : i % 4 === 1 ? "#FFEB3B" : i % 4 === 2 ? "#3B82F6" : "#8B5CF6",
              boxShadow: `0 0 ${Math.random() * 20 + 10}px ${i % 4 === 0 ? "#FF6B35" : i % 4 === 1 ? "#FFEB3B" : i % 4 === 2 ? "#3B82F6" : "#8B5CF6"}`,
            }}
            animate={{
              y: [0, -200 - Math.random() * 100, 0],
              x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5 + Math.random(), 0],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Elegant geometric overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Sophisticated ambient light streaks */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent opacity-25"
          animate={{
            opacity: [0.15, 0.4, 0.15],
            scaleY: [0.8, 1.3, 0.8],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-20"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [1.2, 0.8, 1.2],
            scaleX: [1, 2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-18"
          animate={{
            opacity: [0.08, 0.25, 0.08],
            scaleY: [0.9, 1.4, 0.9],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Premium orbital rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-white/5 rounded-full"
            style={{
              transform: `scale(${0.3 + i * 0.4})`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.3 + i * 0.4, 0.35 + i * 0.4, 0.3 + i * 0.4],
            }}
            transition={{
              rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      {showAnimations && (
        <div className="fixed inset-0 z-10">
          <AnimatePresence mode="wait">
            {/* Cinematic Pre-Credits */}
            {currentStep === -1 && (
              <motion.div
                key="precredits"
                className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              >
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <video
                    className="w-32 h-32 opacity-80"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(156,163,175,0.6)) brightness(1.1)",
                    }}
                  >
                    <source
                      src={`@assets/omnidragon_1749365523315.mp4`}
                      type="video/mp4"
                    />
                  </video>
                </motion.div>

                <motion.p
                  className="text-2xl tracking-wider text-gray-300 font-light text-center max-w-5xl leading-relaxed"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    filter: "drop-shadow(0 0 25px rgba(156,163,175,0.4))",
                  }}
                >
                  From the visionary creator of{" "}
                  <span className="text-amber-400 font-medium">$AKITA V2</span>,{" "}
                  <span className="text-blue-400 font-medium">$AKITA V3</span>,{" "}
                  <span className="text-green-400 font-medium">$oooOOO GODDOG</span>{" "}
                  aka Vitalik's Mum's Doge,{" "}
                  <span className="text-purple-400 font-medium">$WAIT</span>{" "}
                  aka We're All In Together...
                </motion.p>
              </motion.div>
            )}

            {/* Epic Title Reveal */}
            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="text-center relative">
                  {/* Premium glow backdrop */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(255,107,53,0.4) 0%, rgba(255,235,59,0.2) 50%, transparent 80%)",
                      filter: "blur(40px)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.h1
                    className="text-9xl font-black mb-12 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent relative z-10"
                    initial={{ scale: 0.1, y: 400, opacity: 0, rotateX: 180 }}
                    animate={{
                      scale: [0.1, 0.7, 1.4, 1],
                      y: [400, 200, -80, 0],
                      opacity: [0, 0.4, 1, 1],
                      rotateX: [180, 90, -20, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.3, 0.7, 1],
                      delay: 0.5,
                    }}
                    style={{
                      filter:
                        "drop-shadow(0 0 120px rgba(255,107,53,1)) drop-shadow(0 0 200px rgba(255,107,53,0.8))",
                      fontWeight: 900,
                      textShadow: "0 0 100px rgba(255,107,53,1)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>

                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <motion.p
                      className="text-4xl text-gray-200 font-light mb-6"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(255,255,255,0.3)",
                          "0 0 40px rgba(255,255,255,0.5)",
                          "0 0 20px rgba(255,255,255,0.3)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      The Most{" "}
                      <span className="text-amber-400 font-medium">
                        Revolutionary
                      </span>{" "}
                      Token Ecosystem
                    </motion.p>
                    
                    <motion.div
                      className="text-xl text-gray-400 font-light"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4, duration: 1.5 }}
                    >
                      Where every trade becomes an opportunity
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Sophisticated Token Swap */}
            {currentStep === 1 && (
              <motion.div
                key="tokens"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <div className="relative w-full h-96">
                  <div className="text-center mb-20">
                    <div className="text-6xl font-light mb-8 tracking-wide">
                      <motion.span
                        className="text-white"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 1.5,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{
                          fontWeight: 300,
                          textShadow: "0 0 30px rgba(255,255,255,0.3)",
                        }}
                      >
                        SWAP{" "}
                        <span
                          className="text-yellow-400 font-bold"
                          style={{
                            filter:
                              "drop-shadow(0 0 35px rgba(255,235,59,0.6))",
                            fontWeight: 700,
                          }}
                        >
                          $S
                        </span>
                        {" "}FOR{" "}
                        <span
                          className="text-amber-400 font-bold"
                          style={{
                            filter:
                              "drop-shadow(0 0 35px rgba(251,191,36,0.6))",
                            fontWeight: 700,
                          }}
                        >
                          $DRAGON
                        </span>
                      </motion.span>
                    </div>
                  </div>

                  {/* Enhanced token convergence animation */}
                  <motion.div
                    className="absolute left-20 top-1/2 w-44 h-44 rounded-full border-4 border-yellow-400/90 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-lg"
                    initial={{ x: -1400, scale: 0, opacity: 0, rotateZ: -120 }}
                    animate={{
                      x: [-1400, -250, 250, 1800],
                      scale: [0, 1.1, 1.3, 1.3],
                      opacity: [0, 1, 1, 1],
                      rotateZ: [-120, 0, 420, 840],
                    }}
                    transition={{
                      duration: 6,
                      times: [0, 0.35, 0.65, 1],
                      ease: [0.16, 1, 0.3, 1],
                      delay: 2.5,
                    }}
                    style={{
                      filter: "drop-shadow(0 0 60px rgba(234,179,8,0.9))",
                      boxShadow:
                        "0 0 80px rgba(234,179,8,0.5), inset 0 0 40px rgba(234,179,8,0.3)",
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="S Token"
                      className="w-32 h-32"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute right-20 top-1/2 w-44 h-44 rounded-full border-4 border-amber-400/90 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-lg"
                    initial={{ x: 1400, scale: 0, opacity: 0, rotateZ: 120 }}
                    animate={{
                      x: [1400, 250, -250, -1800],
                      scale: [0, 1.1, 1.3, 1.3],
                      opacity: [0, 1, 1, 1],
                      rotateZ: [120, 0, -420, -840],
                    }}
                    transition={{
                      duration: 6,
                      times: [0, 0.35, 0.65, 1],
                      ease: [0.16, 1, 0.3, 1],
                      delay: 2.5,
                    }}
                    style={{
                      filter: "drop-shadow(0 0 60px rgba(251,191,36,0.9))",
                      boxShadow:
                        "0 0 80px rgba(251,191,36,0.5), inset 0 0 40px rgba(251,191,36,0.3)",
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-28 h-28"
                    />
                  </motion.div>

                  {/* Epic collision effect */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 8, 4, 0],
                      opacity: [0, 1, 0.8, 0],
                      rotateZ: [0, 480, 960],
                    }}
                    transition={{
                      duration: 2,
                      delay: 5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)",
                    }}
                  />

                  {/* Enhanced energy burst particles */}
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: (3 + Math.random() * 6) + "px",
                        height: (3 + Math.random() * 6) + "px",
                        left: "50%",
                        top: "50%",
                        background: i % 4 === 0 ? "#FFD700" : i % 4 === 1 ? "#FF6B35" : i % 4 === 2 ? "#FFEB3B" : "#FF1493",
                        boxShadow: `0 0 25px ${i % 4 === 0 ? "#FFD700" : i % 4 === 1 ? "#FF6B35" : i % 4 === 2 ? "#FFEB3B" : "#FF1493"}`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2.5, 0],
                        x: Math.cos((i * 9 * Math.PI) / 180) * (150 + Math.random() * 200),
                        y: Math.sin((i * 9 * Math.PI) / 180) * (150 + Math.random() * 200),
                        opacity: [0, 1, 0],
                        rotateZ: [0, 540 * (Math.random() > 0.5 ? 1 : -1)],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 5 + i * 0.02,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  {/* Screen shake effect */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      x: [0, -12, 12, -8, 8, 0],
                      y: [0, 8, -8, 5, -5, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 5,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Spectacular Jackpot Reveal */}
            {currentStep === 2 && (
              <motion.div
                key="jackpot"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: [0, -10, 10, -6, 6, 0],
                  y: [0, 6, -6, 4, -4, 0],
                }}
                exit={{ opacity: 0, scale: 1.4, filter: "blur(15px)" }}
                transition={{
                  duration: 2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  x: { duration: 0.5, delay: 1.2 },
                  y: { duration: 0.5, delay: 1.2 },
                }}
              >
                {/* Premium trading animation background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-70">
                  {[...Array(4)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: 'absolute',
                        left: `${12 + i * 25}%`,
                        top: `${15 + (i % 2) * 45}%`,
                      }}
                      index={i}
                      duration={5}
                      scale={1.2}
                      showTradeIndicators={true}
                      showFeeBreakdown={true}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
                  {/* Cinematic flash effect */}
                  <motion.div
                    className="fixed inset-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 pointer-events-none z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.3, delay: 1 }}
                  />

                  <motion.h2
                    className="text-10xl font-black text-amber-400 relative z-10 tracking-tight mb-12"
                    initial={{ scale: 0.1, y: 400, opacity: 0, rotateX: 180 }}
                    animate={{
                      scale: [0.1, 0.7, 1.5, 1],
                      y: [400, 200, -80, 0],
                      opacity: [0, 0.4, 1, 1],
                      rotateX: [180, 90, -20, 0],
                    }}
                    transition={{
                      duration: 3,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.3, 0.7, 1],
                      delay: 0.5,
                    }}
                    style={{
                      filter:
                        "drop-shadow(0 0 150px rgba(251,191,36,1)) drop-shadow(0 0 250px rgba(251,191,36,0.8))",
                      fontWeight: 900,
                      textShadow: "0 0 120px rgba(251,191,36,1)",
                      fontSize: "clamp(4rem, 12vw, 10rem)",
                    }}
                  >
                    WIN THE JACKPOT!
                  </motion.h2>

                  <motion.div
                    className="mt-16 max-w-4xl mx-auto"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 1.5,
                    }}
                  >
                    <p className="text-3xl text-gray-200 font-light leading-relaxed text-center mb-12">
                      Every swap automatically enters you into our{" "}
                      <span className="text-yellow-400 font-medium bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        Chainlink VRF-powered lottery
                      </span>{" "}
                      where your trading fees transform into massive rewards
                    </p>

                    <motion.div
                      className="text-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 2.5,
                      }}
                    >
                      <motion.div
                        className="text-7xl font-black text-green-400 mb-4"
                        animate={{
                          textShadow: [
                            "0 0 30px rgba(34,197,94,0.6)",
                            "0 0 60px rgba(34,197,94,1)",
                            "0 0 30px rgba(34,197,94,0.6)",
                          ],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <AnimatedCounter />
                      </motion.div>
                      <div className="text-2xl text-gray-400 font-light">
                        Current Jackpot Prize Pool
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Premium confetti burst */}
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: (6 + Math.random() * 12) + "px",
                        height: (6 + Math.random() * 12) + "px",
                        background: i % 5 === 0 ? "#FFD700" : i % 5 === 1 ? "#FFA500" : i % 5 === 2 ? "#FBBF24" : i % 5 === 3 ? "#10B981" : "#8B5CF6",
                        left: `${10 + Math.random() * 80}%`,
                        top: `${5 + Math.random() * 50}%`,
                        boxShadow: `0 0 30px ${i % 5 === 0 ? "#FFD700" : i % 5 === 1 ? "#FFA500" : i % 5 === 2 ? "#FBBF24" : i % 5 === 3 ? "#10B981" : "#8B5CF6"}`,
                      }}
                      initial={{ scale: 0, y: 0, opacity: 0, rotateZ: 0 }}
                      animate={{
                        scale: [0, 2, 1, 0],
                        y: [0, -500 - Math.random() * 300, -800 - Math.random() * 200],
                        x: [0, (Math.random() - 0.5) * 600],
                        opacity: [0, 1, 0.9, 0],
                        rotateZ: [0, 1080 * (Math.random() > 0.5 ? 1 : -1)],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        delay: 2 + i * 0.03,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Elegant Fee Structure */}
            {currentStep === 3 && (
              <motion.div
                key="fees"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="text-center relative">
                  {/* Premium backdrop */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
                      filter: "blur(60px)",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.h2
                    className="text-8xl font-black text-orange-400 mb-16 relative z-10"
                    initial={{ opacity: 0, y: -80, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 2, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      filter: "drop-shadow(0 0 100px rgba(255,107,53,1))",
                      fontWeight: 900,
                      textShadow: "0 0 80px rgba(255,107,53,0.8)",
                    }}
                  >
                    10% FEE
                  </motion.h2>

                  <motion.div
                    className="text-5xl font-light text-yellow-400 tracking-wide relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 1.5 }}
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(255,235,59,0.7))",
                      fontWeight: 300,
                    }}
                  >
                    ON EVERY SINGLE SWAP
                  </motion.div>

                  <motion.p
                    className="text-2xl text-gray-300 mt-12 font-light relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5, duration: 2 }}
                  >
                    But here's where the magic happens...
                  </motion.p>

                  {/* Sophisticated expanding rings */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border border-orange-400/20 rounded-full"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 3 + i * 0.8, 4 + i * 0.8],
                        opacity: [1, 0.4, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        delay: 1.5 + i * 0.4,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Premium Fee Breakdown */}
            {currentStep === 4 && (
              <motion.div
                key="breakdown"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Sophisticated background swap animations */}
                <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: 'absolute',
                        left: `${8 + i * 16}%`,
                        top: `${10 + (i % 3) * 30}%`,
                      }}
                      index={i}
                      duration={10}
                      delay={i * 1.5}
                      scale={0.9}
                      showTradeIndicators={true}
                      showFeeBreakdown={true}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10 max-w-6xl mx-auto">
                  <div className="mb-20">
                    <motion.div
                      className="text-4xl text-gray-300 mb-12 font-light"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    >
                      Here's where innovation meets opportunity...
                    </motion.div>

                    <motion.h2
                      className="text-7xl font-light mb-8 text-yellow-400 tracking-wide"
                      initial={{ y: -60, opacity: 0, rotateX: 60 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                      }}
                      transition={{
                        duration: 2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1,
                      }}
                      style={{
                        filter: "drop-shadow(0 0 50px rgba(255,235,59,0.7))",
                        fontWeight: 300,
                      }}
                    >
                      YOUR 10% FEE TRANSFORMS INTO
                    </motion.h2>

                    <motion.p
                      className="text-3xl text-gray-200 font-light max-w-4xl mx-auto leading-relaxed"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.8,
                      }}
                    >
                      Unlike traditional DEXs that simply extract value,{" "}
                      <span className="text-amber-400 font-medium bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                        Sonic Red Dragon redistributes wealth back to traders
                      </span>
                    </motion.p>
                  </div>

                  <div className="space-y-16">
                    {[
                      {
                        percent: "6.9%",
                        label: "JACKPOT VAULT",
                        description: "Massive prize pools with Chainlink VRF lottery system",
                        color: "amber",
                        icon: "🎰",
                        gradient: "from-amber-400 to-yellow-500"
                      },
                      {
                        percent: "2.41%",
                        label: "LP REWARDS",
                        description: "Passive income for liquidity providers",
                        color: "blue",
                        icon: "💧",
                        gradient: "from-blue-400 to-cyan-500"
                      },
                      {
                        percent: "0.69%",
                        label: "TOKEN BURN",
                        description: "Deflationary mechanism increasing token scarcity",
                        color: "orange",
                        icon: "🔥",
                        gradient: "from-orange-400 to-red-500"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-center space-x-12 bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10"
                        initial={{ opacity: 0, x: -150, rotateY: 45 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: 2.5 + index * 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        style={{
                          boxShadow: `0 0 40px rgba(255,255,255,0.1)`,
                        }}
                      >
                        <div className={`text-6xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                          {item.percent}
                        </div>
                        <div className="text-4xl">{item.icon}</div>
                        <div className="text-left">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                            {item.label}
                          </div>
                          <div className="text-gray-300 text-lg max-w-md">
                            {item.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sophisticated Jackpot Growth */}
            {currentStep === 4 && (
              <motion.div
                key="howjackpot"
                className="flex items-center justify-center min-h-screen relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                transition={{ duration: 2 }}
              >
                {/* Premium background trading activity */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: 'absolute',
                        left: `${15 + i * 18}%`,
                        top: `${25 + (i % 2) * 35}%`,
                      }}
                      index={i}
                      duration={8}
                      delay={i * 2}
                      scale={0.7}
                      showTradeIndicators={false}
                      showFeeBreakdown={false}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10 max-w-6xl mx-auto">
                  <motion.h2
                    className="text-6xl font-light text-gray-200 mb-16 tracking-wide"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{
                      filter: "drop-shadow(0 0 35px rgba(255,255,255,0.3))",
                      fontWeight: 300,
                    }}
                  >
                    BUT HOW DOES THE JACKPOT GROW?
                  </motion.h2>

                  <motion.p
                    className="text-4xl text-yellow-400 mb-20 font-light tracking-wide"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(255,235,59,0.5))",
                    }}
                  >
                    BIGGER SWAPS = EXPONENTIALLY BIGGER CONTRIBUTIONS
                  </motion.p>

                  <motion.div
                    className="text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 1.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 3.5,
                    }}
                  >
                    <motion.div
                      className="text-8xl font-black text-green-400 mb-6"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(251, 191, 36, 0.6)",
                          "0 0 40px rgba(251, 191, 36, 1)",
                          "0 0 20px rgba(251, 191, 36, 0.6)",
                        ],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 60px rgba(34,197,94,0.8))",
                      }}
                    >
                      <AnimatedCounter showGrowthIndicator={false} />
                    </motion.div>
                    <div className="text-2xl text-gray-400 font-light">
                      Growing with every transaction on the network
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Sophisticated Odds Table */}
            {currentStep === 5 && (
              <motion.div
                key="odds"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Ultra-premium background with floating data streams */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xs font-mono text-green-400/60"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${Math.random() * 80 + 10}%`,
                      }}
                      animate={{
                        y: [0, -800],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear",
                      }}
                    >
                      {Array.from({ length: 20 }, () => 
                        Math.random().toString(36).substring(2, 15)
                      ).map((text, j) => (
                        <div key={j} className="mb-2">
                          {`VRF_${text.toUpperCase()}_${Math.floor(Math.random() * 999999)}`}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </div>

                <div className="text-center relative z-10 max-w-7xl mx-auto">
                  <motion.h2
                    className="text-7xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -80, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      filter: "drop-shadow(0 0 100px rgba(251,191,36,0.8))",
                      textShadow: "0 0 80px rgba(251,191,36,0.6)",
                    }}
                  >
                    REVOLUTIONARY ODDS SYSTEM
                  </motion.h2>

                  <motion.p
                    className="text-3xl text-gray-200 mb-16 font-light max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                  >
                    Unlike traditional lotteries with fixed odds,{" "}
                    <span className="text-amber-400 font-medium bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      your chances increase with larger swaps
                    </span>
                  </motion.p>

                  {/* Premium odds table */}
                  <motion.div
                    className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    style={{
                      boxShadow: "0 0 100px rgba(0,0,0,0.8), inset 0 0 100px rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Sophisticated header */}
                    <div className="grid grid-cols-4 gap-8 mb-8 text-center">
                      {["PRIZE TIER", "ODDS", "MULTIPLIER", "POOL %"].map((header, i) => (
                        <motion.div
                          key={header}
                          className="text-xl font-bold text-yellow-400"
                          initial={{ opacity: 0, y: -30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.5 + i * 0.1, duration: 0.8 }}
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(255,235,59,0.5))",
                          }}
                        >
                          {header}
                        </motion.div>
                      ))}
                    </div>

                    {/* Dynamic odds rows */}
                    <div className="space-y-4">
                      {LOTTERY_ODDS.map((row, i) => (
                        <motion.div
                          key={row.tier}
                          className="grid grid-cols-4 gap-8 items-center bg-white/5 rounded-2xl p-6 border border-white/10"
                          initial={{ opacity: 0, x: -100, rotateY: 45 }}
                          animate={{ opacity: 1, x: 0, rotateY: 0 }}
                          transition={{
                            delay: 3 + i * 0.2,
                            duration: 1,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(255,255,255,0.1)",
                            transition: { duration: 0.2 }
                          }}
                          style={{
                            boxShadow: `0 0 30px rgba(255,255,255,0.1)`,
                          }}
                        >
                          <div className={`text-2xl font-bold bg-gradient-to-r ${row.color} bg-clip-text text-transparent`}>
                            {row.tier}
                          </div>
                          <div className="text-2xl font-mono text-white">
                            {row.odds}
                          </div>
                          <div className="text-2xl font-black text-green-400">
                            {row.multiplier}
                          </div>
                          <div className="text-2xl font-bold text-blue-400">
                            {row.percentage}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Advanced probability visualization */}
                    <motion.div
                      className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-400/20"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4.5, duration: 1.5 }}
                    >
                      <div className="text-center">
                        <div className="text-2xl text-blue-300 mb-4 font-bold">
                          🎲 DYNAMIC PROBABILITY ENGINE
                        </div>
                        <div className="text-lg text-gray-300 max-w-3xl mx-auto">
                          Larger swaps = Better odds. Our proprietary algorithm adjusts your winning probability based on transaction size, creating unprecedented fairness in DeFi lottery mechanics.
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Advanced Chainlink VRF Integration */}
            {currentStep === 6 && (
              <motion.div
                key="chainlink"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                transition={{ duration: 2 }}
              >
                {/* High-tech background with data streams */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute font-mono text-xs text-blue-400/80"
                      style={{
                        left: `${5 + i * 8}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `rotate(${Math.random() * 20 - 10}deg)`,
                      }}
                      animate={{
                        y: [0, -1200],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "linear",
                      }}
                    >
                      {Array.from({ length: 30 }, (_, j) => (
                        <div key={j} className="mb-3">
                          {`0x${Math.random().toString(16).substring(2, 18)}`}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </div>

                <div className="text-center relative z-10 max-w-7xl mx-auto">
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                  >
                    {/* Chainlink logo animation */}
                    <motion.div
                      className="text-9xl mb-8"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      }}
                      style={{
                        filter: "drop-shadow(0 0 50px rgba(59,130,246,0.8))",
                      }}
                    >
                      🔗
                    </motion.div>

                    <motion.h2
                      className="text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: -80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1.5 }}
                      style={{
                        filter: "drop-shadow(0 0 80px rgba(59,130,246,0.8))",
                        textShadow: "0 0 60px rgba(59,130,246,0.6)",
                      }}
                    >
                      CHAINLINK VRF 2.5
                    </motion.h2>

                    <motion.p
                      className="text-3xl text-gray-200 mb-16 font-light max-w-5xl mx-auto"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 1.5 }}
                    >
                      Cryptographically secure randomness ensuring{" "}
                      <span className="text-blue-400 font-medium bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                        provably fair lottery results
                      </span>{" "}
                      that cannot be manipulated or predicted
                    </motion.p>
                  </motion.div>

                  {/* Technical specifications panel */}
                  <motion.div
                    className="bg-black/50 backdrop-blur-2xl border border-blue-400/20 rounded-3xl p-8 mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    style={{
                      boxShadow: "0 0 100px rgba(59,130,246,0.2), inset 0 0 100px rgba(59,130,246,0.05)",
                    }}
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { label: "VRF VERSION", value: CHAINLINK_CONFIG.vrfVersion, icon: "🔧" },
                        { label: "SUBSCRIPTION ID", value: CHAINLINK_CONFIG.subscriptionId.slice(0, 10) + "...", icon: "🆔" },
                        { label: "KEY HASH", value: CHAINLINK_CONFIG.keyHash.slice(0, 10) + "...", icon: "🔑" },
                        { label: "CONFIRMATIONS", value: CHAINLINK_CONFIG.requestConfirmations.toString(), icon: "✅" },
                        { label: "GAS LIMIT", value: CHAINLINK_CONFIG.gasLimit.toLocaleString(), icon: "⛽" },
                        { label: "NETWORKS", value: `${CHAINLINK_CONFIG.networks.length} Chains`, icon: "🌐" }
                      ].map((spec, i) => (
                        <motion.div
                          key={spec.label}
                          className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 3 + i * 0.1, duration: 0.8 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(59,130,246,0.1)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="text-3xl mb-2">{spec.icon}</div>
                          <div className="text-blue-400 font-bold text-sm mb-1">{spec.label}</div>
                          <div className="text-white font-mono text-lg">{spec.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Supported networks showcase */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-400/20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4, duration: 1.5 }}
                  >
                    <div className="text-2xl text-purple-300 mb-6 font-bold text-center">
                      🚀 MULTI-CHAIN DEPLOYMENT
                    </div>
                    <div className="flex justify-center items-center space-x-8 flex-wrap">
                      {CHAINLINK_CONFIG.networks.map((network, i) => (
                        <motion.div
                          key={network}
                          className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 4.5 + i * 0.1, duration: 0.5 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <div className="text-white font-bold text-lg">{network}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* LayerZero Cross-Chain Messaging */}
            {currentStep === 7 && (
              <motion.div
                key="layerzero"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                transition={{ duration: 2 }}
              >
                {/* Futuristic network visualization background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  {Object.entries(LAYERZERO_ENDPOINTS).map(([chain, config], i) => (
                    <motion.div
                      key={chain}
                      className="absolute"
                      style={{
                        left: `${20 + (i % 3) * 30}%`,
                        top: `${25 + Math.floor(i / 3) * 25}%`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      <div className="text-4xl">{config.icon}</div>
                      <div className="text-xs text-white mt-2 font-mono">
                        ID: {config.id}
                      </div>
                    </motion.div>
                  ))}

                  {/* Animated connection lines */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        height: `${Math.random() * 200 + 100}px`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleY: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10 max-w-7xl mx-auto">
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                  >
                    {/* LayerZero logo animation */}
                    <motion.div
                      className="text-9xl mb-8"
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }}
                      style={{
                        filter: "drop-shadow(0 0 60px rgba(6,182,212,0.8))",
                      }}
                    >
                      🌌
                    </motion.div>

                    <motion.h2
                      className="text-7xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: -80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1.5 }}
                      style={{
                        filter: "drop-shadow(0 0 80px rgba(6,182,212,0.8))",
                        textShadow: "0 0 60px rgba(6,182,212,0.6)",
                      }}
                    >
                      LAYERZERO PROTOCOL
                    </motion.h2>

                    <motion.p
                      className="text-3xl text-gray-200 mb-16 font-light max-w-5xl mx-auto"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 1.5 }}
                    >
                      Seamless cross-chain communication enabling{" "}
                      <span className="text-cyan-400 font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        unified lottery participation across all major blockchains
                      </span>
                    </motion.p>
                  </motion.div>

                  {/* Cross-chain endpoints grid */}
                  <motion.div
                    className="bg-black/50 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-8 mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    style={{
                      boxShadow: "0 0 100px rgba(6,182,212,0.2), inset 0 0 100px rgba(6,182,212,0.05)",
                    }}
                  >
                    <div className="text-2xl text-cyan-300 mb-8 font-bold text-center">
                      🌐 SUPPORTED BLOCKCHAINS
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {Object.entries(LAYERZERO_ENDPOINTS).map(([chain, config], i) => (
                        <motion.div
                          key={chain}
                          className="text-center p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-400/30"
                          initial={{ opacity: 0, rotateY: 90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          transition={{ delay: 3 + i * 0.1, duration: 0.8 }}
                          whileHover={{
                            scale: 1.05,
                            rotateY: 10,
                            backgroundColor: "rgba(6,182,212,0.2)",
                            transition: { duration: 0.3 }
                          }}
                          style={{
                            boxShadow: "0 0 20px rgba(6,182,212,0.3)",
                          }}
                        >
                          <div className="text-4xl mb-3">{config.icon}</div>
                          <div className="text-cyan-400 font-bold text-lg capitalize mb-2">{chain}</div>
                          <div className="text-white font-mono text-sm">ID: {config.id}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Technical advantages */}
                  <motion.div
                    className="bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 rounded-2xl p-6 border border-indigo-400/20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4, duration: 1.5 }}
                  >
                    <div className="text-2xl text-indigo-300 mb-6 font-bold text-center">
                      ⚡ REVOLUTIONARY ADVANTAGES
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: "UNIFIED LIQUIDITY", desc: "All chains contribute to one massive jackpot pool", icon: "💰" },
                        { title: "INSTANT MESSAGING", desc: "Real-time cross-chain lottery result broadcasts", icon: "⚡" },
                        { title: "GAS OPTIMIZATION", desc: "Minimal fees for cross-chain operations", icon: "🔥" }
                      ].map((advantage, i) => (
                        <motion.div
                          key={advantage.title}
                          className="text-center p-4 bg-white/5 rounded-xl"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 4.5 + i * 0.2, duration: 0.8 }}
                        >
                          <div className="text-3xl mb-3">{advantage.icon}</div>
                          <div className="text-indigo-300 font-bold mb-2">{advantage.title}</div>
                          <div className="text-gray-300 text-sm">{advantage.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Epic Final Statement */}
            {currentStep === 8 && (
              <motion.div
                key="final"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 }}
              >
                <div className="text-center relative">
                  {/* Premium backdrop */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(255,107,53,0.2) 0%, rgba(59,130,246,0.15) 50%, transparent 80%)",
                      filter: "blur(80px)",
                    }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 0.8, 0.4],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.h1
                    className="text-8xl font-black text-white mb-12 relative z-10"
                    initial={{ scale: 0.5, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      filter: "drop-shadow(0 0 60px rgba(255,255,255,0.6))",
                      textShadow: "0 0 40px rgba(255,255,255,0.3)",
                    }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>
                  
                  <motion.div
                    className="space-y-6 relative z-10"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 2, delay: 2.5 }}
                  >
                    <p className="text-3xl text-gray-200 font-light">
                      The Revolutionary DeFi Trading Ecosystem
                    </p>
                    <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                      Where every trade becomes an investment in your financial future
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Enhanced Step Navigation */}
      {!showAnimations && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <StepContent
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              totalSteps={8}
            />
          </motion.div>
        </div>
      )}

      {/* Premium Animated Counter */}
      <motion.div
        className="fixed bottom-6 right-6 z-20 bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: 120, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 4, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          boxShadow: "0 0 40px rgba(0,0,0,0.5), 0 0 100px rgba(251,191,36,0.1)",
        }}
      >
        <motion.div
          className="text-3xl font-black text-green-400 mb-2"
          animate={{
            textShadow: [
              "0 0 15px rgba(251, 191, 36, 0.6)",
              "0 0 30px rgba(251, 191, 36, 1)",
              "0 0 15px rgba(251, 191, 36, 0.6)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AnimatedCounter showGrowthIndicator={false} />
        </motion.div>
        <div className="text-yellow-400/90 text-sm text-center font-medium">
          Growing with every swap
        </div>
      </motion.div>
    </div>
  );
}