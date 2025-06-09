import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import TokenExchangeAnimation from "./token-exchange-animation";
import SonicToken from "./sonic-token";
import DragonToken from "./dragon-token";
import AnimatedCounter from "./animated-counter";
import StepContent from "./step-content";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimations, setShowAnimations] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const steps = [
    { step: 0, delay: 0 },
    { step: 1, delay: 8000 },
    { step: 2, delay: 16000 },
    { step: 3, delay: 24000 },
    { step: 4, delay: 32000 },
    { step: 5, delay: 40000 },
    { step: 6, delay: 48000 },
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);

      // Pre-load and setup audio
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

      // Auto-advance steps
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

        {/* Enhanced floating particles with grid-like movement */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background:
                i % 3 === 0 ? "rgba(23, 212, 170, 0.8)" : 
                i % 3 === 1 ? "rgba(59, 130, 246, 0.6)" : 
                "rgba(220, 38, 38, 0.4)",
              boxShadow: `0 0 8px ${
                i % 3 === 0 ? "rgba(23, 212, 170, 0.4)" : 
                i % 3 === 1 ? "rgba(59, 130, 246, 0.3)" : 
                "rgba(220, 38, 38, 0.3)"
              }`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.sin(i) * 40, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1.3, 0],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid intersection glow points */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: (i % 4) * 25 + 10 + "%",
              top: Math.floor(i / 4) * 40 + 20 + "%",
              background: "radial-gradient(circle, rgba(23, 212, 170, 0.5) 0%, transparent 70%)",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {showAnimations && (
        <div className="fixed inset-0 z-10">
          <AnimatePresence mode="wait">
            {/* Pre-Credits */}
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
                >
                  From the creator of $AKITA V2, $AKITA V3, $oooOOO GODDOG aka
                  Vitalik's Mum's Doge, $WAIT aka We're All In Together, etc..
                </motion.p>
              </motion.div>
            )}

            {/* Step 0: Title Reveal */}
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
                        "radial-gradient(ellipse, rgba(23,212,170,0.3) 0%, transparent 70%)",
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
                    className="text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent relative z-10"
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
                        "drop-shadow(0 0 100px rgba(255,107,53,1)) drop-shadow(0 0 150px rgba(255,107,53,0.8))",
                      fontWeight: 900,
                      textShadow: "0 0 80px rgba(255,107,53,1)",
                    }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>

                  <motion.p
                    className="text-3xl text-gray-300 font-light relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1.5 }}
                  >
                    The Most{" "}
                    <span className="text-amber-400 font-medium">
                      Innovative
                    </span>{" "}
                    Token Ecosystem
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Step 1: Token Swap */}
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
                        </span>{" "}
                        FOR{" "}
                        <span
                          className="text-amber-400 font-bold"
                          style={{
                            filter:
                              "drop-shadow(0 0 25px rgba(251,191,36,0.5))",
                            fontWeight: 700,
                          }}
                        >
                          $DRAGON
                        </span>
                      </motion.span>
                    </div>
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

                  {/* Energy burst particles */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-white"
                      style={{
                        left: "50%",
                        top: "50%",
                        boxShadow: `0 0 15px ${
                          i % 3 === 0
                            ? "#FFD700"
                            : i % 3 === 1
                              ? "#FF6B35"
                              : "#FFEB3B"
                        }`,
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

            {/* Step 2: Jackpot Reveal */}
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
                {/* Trading animation background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: "absolute",
                        left: `${15 + i * 20}%`,
                        top: `${20 + (i % 2) * 40}%`,
                      }}
                      index={i}
                      duration={4}
                      scale={1}
                      showTradeIndicators={true}
                      showFeeBreakdown={true}
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
                        boxShadow: `0 0 20px ${
                          i % 4 === 0
                            ? "#FFD700"
                            : i % 4 === 1
                              ? "#FFA500"
                              : i % 4 === 2
                                ? "#FBBF24"
                                : "#10B981"
                        }`,
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
                        duration: 3.5 + Math.random() * 2,
                        delay: 1.5 + i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Fee Structure */}
            {currentStep === 3 && (
              <motion.div
                key="fees"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-6xl font-bold text-orange-400 mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    style={{
                      filter: "drop-shadow(0 0 80px rgba(255,107,53,1))",
                      fontWeight: 800,
                      textShadow: "0 0 60px rgba(255,107,53,0.8)",
                    }}
                  >
                    10% FEE
                  </motion.h2>

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

            {/* Step 4: Fee Breakdown */}
            {currentStep === 4 && (
              <motion.div
                key="breakdown"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Continuous Background Swap Animation */}
                <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: "absolute",
                        left: `${10 + i * 18}%`,
                        top: `${15 + (i % 3) * 25}%`,
                      }}
                      index={i}
                      duration={8}
                      delay={i * 1.2}
                      scale={0.8}
                      showTradeIndicators={true}
                      showFeeBreakdown={true}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
                  <div className="mb-16">
                    {/* Transition from previous slide */}
                    <motion.div
                      className="text-3xl text-gray-400 mb-8 font-light"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      Here's where it gets interesting...
                    </motion.div>

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
                        delay: 0.8,
                      }}
                      style={{
                        filter: "drop-shadow(0 0 40px rgba(255,235,59,0.6))",
                        fontWeight: 300,
                      }}
                    >
                      YOUR 10% FEE BECOMES
                    </motion.h2>

                    <motion.p
                      className="text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 1.3,
                      }}
                    >
                      Unlike traditional DEXs that just take your fees,
                      <span className="text-amber-400 font-medium">
                        {" "}
                        Sonic Red Dragon transforms them into opportunities
                      </span>
                    </motion.p>
                  </div>

                  <div className="space-y-12">
                    {[
                      {
                        percent: "6.9%",
                        label: "JACKPOT VAULT",
                        description: "Win massive prizes every trade",
                        color: "amber",
                        icon: "🎰",
                      },
                      {
                        percent: "2.41%",
                        label: "LP REWARDS",
                        description: "Earn from liquidity provision",
                        color: "blue",
                        icon: "💧",
                      },
                      {
                        percent: "0.69%",
                        label: "TOKEN BURN",
                        description: "Reduce supply, increase scarcity",
                        color: "orange",
                        icon: "🔥",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-center space-x-8"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 1,
                          delay: 2 + index * 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <div
                          className={`text-4xl font-bold text-${item.color}-400`}
                        >
                          {item.percent}
                        </div>
                        <div className="text-2xl">{item.icon}</div>
                        <div className="text-left">
                          <div
                            className={`text-xl font-medium text-${item.color}-300`}
                          >
                            {item.label}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {item.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: How Jackpot Grows */}
            {currentStep === 5 && (
              <motion.div
                key="howjackpot"
                className="flex items-center justify-center min-h-screen relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 1.5 }}
              >
                {/* Background trading activity */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: "absolute",
                        left: `${20 + i * 20}%`,
                        top: `${30 + (i % 2) * 30}%`,
                      }}
                      index={i}
                      duration={6}
                      delay={i * 1.5}
                      scale={0.6}
                      showTradeIndicators={false}
                      showFeeBreakdown={false}
                    />
                  ))}
                </div>

                <div className="text-center relative z-10">
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

                  <motion.p
                    className="text-3xl text-yellow-400 mb-16 font-light tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,235,59,0.4))",
                    }}
                  >
                    BIGGER SWAPS = BIGGER CONTRIBUTIONS
                  </motion.p>

                  <motion.div
                    className="text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 2.5,
                    }}
                  >
                    <motion.div
                      className="text-5xl font-bold text-green-400 mb-2"
                      animate={{
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
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Final */}
            {currentStep === 6 && (
              <motion.div
                key="final"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <div className="text-center">
                  <motion.h1
                    className="text-6xl font-bold text-white mb-8"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>
                  <motion.p
                    className="text-2xl text-gray-300"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                  >
                    The Future of DeFi Trading
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Step Navigation */}
      {!showAnimations && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <StepContent
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            totalSteps={6}
          />
        </div>
      )}

      {/* Animated Counter in corner */}
      <motion.div
        className="fixed bottom-4 right-4 z-20 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="text-2xl font-bold text-green-400 mb-1"
          animate={{
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
        <div className="text-yellow-400/80 text-xs mt-1 text-center">
          Growing with every swap
        </div>
      </motion.div>
    </div>
  );
}
