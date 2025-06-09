import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TokenExchangeAnimation from "./token-exchange-animation";
import AnimatedCounter from "./animated-counter";
// Import audio directly from attached_assets - using newer file
const audioFile = "/attached_assets/hybrid-epic-hollywood-trailer-247114_1749430771436.mp3";

interface DemoScreenProps {
  autoStart?: boolean;
}

// Clean data structures
const LOTTERY_TIERS = [
  { name: "grand jackpot", odds: "1:10,000", multiplier: "1000x", allocation: "69%" },
  { name: "mega win", odds: "1:1,000", multiplier: "100x", allocation: "15%" },
  { name: "big win", odds: "1:500", multiplier: "50x", allocation: "10%" },
  { name: "major win", odds: "1:100", multiplier: "25x", allocation: "4%" },
  { name: "lucky win", odds: "1:50", multiplier: "10x", allocation: "2%" },
];

const FEE_STRUCTURE = [
  { percentage: "6.9%", name: "jackpot pool", description: "automated lottery system" },
  { percentage: "2.41%", name: "liquidity rewards", description: "provider incentives" },
  { percentage: "0.69%", name: "token burn", description: "deflationary mechanics" },
];

const TECH_SPECS = [
  { label: "vrf version", value: "2.5" },
  { label: "networks", value: "7 chains" },
  { label: "confirmations", value: "3 blocks" },
  { label: "gas optimized", value: "minimal fees" },
];

export default function DemoScreenRevamped({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Enhanced timing based on waveform analysis - Extended for better comprehension
  const steps = [
    { delay: 0, duration: 6500, name: "intro" }, // [0:00–0:06.5] Title intro: swell begins
    { delay: 6500, duration: 7500, name: "swap" }, // [0:06.5–0:14] Swap animation buildup
    { delay: 14000, duration: 12000, name: "lottery" }, // [0:14–0:26] Jackpot reveal at first drop - EXTENDED +3s
    { delay: 26000, duration: 8000, name: "fees" }, // [0:26–0:34] Fee tension – ambient mood - EXTENDED +2.5s
    { delay: 34000, duration: 12000, name: "breakdown" }, // [0:34–0:46] Fee breakdown – cinematic swell - EXTENDED +2s
    { delay: 46000, duration: 15000, name: "mechanics" }, // [0:46–1:00] Lottery mechanics - EXTENDED +6s for veDRAGON readability
    { delay: 61000, duration: 7000, name: "vrf" }, // [1:00–1:07] Chainlink VRF
    { delay: 68000, duration: 8000, name: "layerzero" }, // [1:07–1:15] LayerZero cross-chain
    { delay: 76000, duration: 8000, name: "complete" }, // [1:15–1:23] Final CTA + logo out
  ];

  useEffect(() => {
    // Debug audio file path
    console.log("Audio file path:", audioFile);
    
    if (autoStart) {
      setIsPlaying(true);
      
      // Start audio with user gesture handling
      const startAudio = async () => {
        if (audioRef.current) {
          console.log("Starting audio auto-play...");
          try {
            audioRef.current.volume = 0;
            audioRef.current.currentTime = 0;
            
            // Load the audio first
            audioRef.current.load();
            
            // Wait for it to be ready
            await new Promise((resolve) => {
              audioRef.current!.addEventListener('canplaythrough', resolve, { once: true });
            });
            
            // Try to play
            await audioRef.current.play();
            setAudioPlaying(true);
            console.log("Auto-play successful");
            
            // Smooth fade in to higher volume
            const fadeIn = () => {
              if (audioRef.current && audioRef.current.volume < 0.8) {
                audioRef.current.volume = Math.min(audioRef.current.volume + 0.02, 0.8);
                requestAnimationFrame(fadeIn);
              }
            };
            fadeIn();
          } catch (error) {
            console.error("Audio auto-play failed:", error);
            // Continue without audio if it fails
          }
        }
      };

      // Small delay before starting audio
      setTimeout(startAudio, 500);

      // Timeline-based step progression
      const startTime = Date.now();
      
      const updateStep = () => {
        const elapsed = Date.now() - startTime;
        
        // Find current step based on elapsed time
        for (let i = steps.length - 1; i >= 0; i--) {
          if (elapsed >= steps[i].delay) {
            setCurrentStep(i);
            break;
          }
        }
        
        // Continue checking if we haven't reached the end
        const totalDuration = steps[steps.length - 1].delay + steps[steps.length - 1].duration;
        if (elapsed < totalDuration) {
          requestAnimationFrame(updateStep);
        }
      };
      
      // Start timeline after initial delay
      setTimeout(() => {
        setCurrentStep(0);
        updateStep();
      }, 2000);
    }
  }, [autoStart]);

  const toggleAudio = async () => {
    console.log("Toggle audio clicked");
    if (audioRef.current) {
      console.log("Audio element exists:", audioRef.current.src);
      console.log("Audio ready state:", audioRef.current.readyState);
      console.log("Audio can play:", audioRef.current.canPlayType("audio/mpeg"));
      console.log("Current volume:", audioRef.current.volume);
      console.log("Is muted:", audioRef.current.muted);
      console.log("Duration:", audioRef.current.duration);
      console.log("Current time:", audioRef.current.currentTime);
      
      try {
        if (audioPlaying) {
          audioRef.current.pause();
          setAudioPlaying(false);
          console.log("Audio paused");
        } else {
          // Ensure not muted and set high volume
          audioRef.current.muted = false;
          audioRef.current.volume = 1.0; // Maximum volume
          console.log("Attempting to play audio at full volume...");
          await audioRef.current.play();
          setAudioPlaying(true);
          console.log("Audio playing successfully at volume:", audioRef.current.volume);
        }
      } catch (error) {
        console.error("Audio toggle failed:", error);
        console.error("Error details:", error instanceof Error ? error.message : String(error));
      }
    } else {
      console.log("No audio element found");
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const slideUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <audio 
        ref={audioRef} 
        preload="metadata" 
        loop 
        onLoadedData={() => console.log("Audio loaded successfully")}
        onError={(e) => console.error("Audio error:", e)}
        onCanPlay={() => console.log("Audio can play")}
      >
        <source src={audioFile} type="audio/mpeg" />
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Minimal background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(59,130,246,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147,51,234,0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255,235,59,0.05) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {isPlaying && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Pre-credits */}
            {currentStep === -1 && (
              <motion.div key="precredits" {...fadeIn} className="text-center max-w-4xl mx-auto p-8">
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mb-12"
                >
                  <video
                    className="w-24 h-24 mx-auto opacity-70"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="@assets/omnidragon_1749365523315.mp4" type="video/mp4" />
                  </video>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="text-xl text-slate-300 font-light leading-relaxed"
                >
                  from the creator of{" "}
                  <span className="text-yellow-400">$akita v2</span>,{" "}
                  <span className="text-blue-400">$akita v3</span>,{" "}
                  <span className="text-green-400">$oooOOO goddog</span>,{" "}
                  <span className="text-purple-400">$wait</span>
                </motion.p>
              </motion.div>
            )}

            {/* Introduction */}
            {currentStep === 0 && (
              <motion.div key="intro" {...fadeIn} className="text-center max-w-5xl mx-auto p-8">
                <motion.h1
                  {...slideUp}
                  className="text-7xl font-extralight mb-8 tracking-wide"
                  style={{ fontWeight: 100, letterSpacing: "0.1em" }}
                >
                  sonic red dragon
                </motion.h1>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-xl text-slate-300 font-light"
                >
                  next generation defi ecosystem
                </motion.p>
              </motion.div>
            )}

            {/* Token Swap */}
            {currentStep === 1 && (
              <motion.div key="swap" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-12 tracking-wide"
                >
                  seamless token exchange
                </motion.h2>
                
                {/* Epic Token Convergence - Full Screen */}
                <div className="fixed inset-0 z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  {/* Title Section */}
                  <div className="text-center mb-16 pt-20">
                    <div className="text-5xl font-light mb-6 tracking-wide">
                      <motion.span
                        className="text-white"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{ fontWeight: 300 }}
                      >
                        SWAP{" "}
                        <span
                          className="text-cyan-400 font-bold"
                          style={{
                            filter: "drop-shadow(0 0 25px rgba(34, 211, 238, 0.5))",
                            fontWeight: 700,
                          }}
                        >
                          $SONIC
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
                        style={{ fontWeight: 300 }}
                      >
                        FOR{" "}
                        <span
                          className="text-amber-400 font-medium"
                          style={{
                            filter: "drop-shadow(0 0 25px rgba(251, 191, 36, 0.5))",
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
                      Trade for Dragon tokens on Sonic the highest-performing EVM L1
                    </motion.p>
                  </div>

                  {/* Sonic Token - Left Side */}
                  <motion.div
                    className="absolute left-16 top-1/2 w-40 h-40 rounded-full border-3 border-cyan-400/80 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-md"
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
                      filter: "drop-shadow(0 0 40px rgba(34, 211, 238, 0.8))",
                      boxShadow: "0 0 50px rgba(34, 211, 238, 0.4), inset 0 0 30px rgba(34, 211, 238, 0.2)",
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="Sonic Token"
                      className="w-28 h-28"
                    />
                  </motion.div>

                  {/* Dragon Token - Right Side */}
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
                      filter: "drop-shadow(0 0 40px rgba(251, 191, 36, 0.8))",
                      boxShadow: "0 0 50px rgba(251, 191, 36, 0.4), inset 0 0 30px rgba(251, 191, 36, 0.2)",
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="Dragon Token"
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
                    style={{
                      width: "200px",
                      height: "200px",
                      background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
                      borderRadius: "50%"
                    }}
                  />

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
                        boxShadow: `0 0 15px ${i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#FBBF24" : "#F59E0B"}`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        x: Math.cos((i * 12 * Math.PI) / 180) * (120 + Math.random() * 150),
                        y: Math.sin((i * 12 * Math.PI) / 180) * (120 + Math.random() * 150),
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

                <motion.p
                  {...slideUp}
                  transition={{ delay: 4, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  every trade automatically enters the lottery system
                </motion.p>
              </motion.div>
            )}

            {/* Fee Distribution */}
            {currentStep === 3 && (
              <motion.div key="fees" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-8 tracking-wide"
                >
                  transparent fee structure
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-3 gap-8 mb-8"
                >
                  <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl font-light text-blue-400 mb-3">60%</div>
                    <div className="text-lg font-light text-slate-300 mb-2">lottery pool</div>
                    <div className="text-sm text-slate-400 font-light">automatic entry for all trades</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl font-light text-green-400 mb-3">30%</div>
                    <div className="text-lg font-light text-slate-300 mb-2">staking rewards</div>
                    <div className="text-sm text-slate-400 font-light">distributed to token holders</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl font-light text-purple-400 mb-3">10%</div>
                    <div className="text-lg font-light text-slate-300 mb-2">development</div>
                    <div className="text-sm text-slate-400 font-light">protocol maintenance & growth</div>
                  </div>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  every 0.3% trading fee is automatically distributed across the ecosystem
                </motion.p>
              </motion.div>
            )}

            {/* Epic Jackpot Reveal */}
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
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: `${15 + i * 20}%`,
                        top: `${20 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        opacity: [0, 0.7, 0.7, 0],
                        scale: [0.6, 1, 1, 0.6],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
                        <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                      </div>
                      <div className="mx-3 text-white text-lg">⇄</div>
                      <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                        <div className="w-6 h-6 bg-amber-400 rounded-full"></div>
                      </div>
                    </motion.div>
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
                      filter: "drop-shadow(0 0 100px rgba(251,191,36,1)) drop-shadow(0 0 150px rgba(251,191,36,0.8))",
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
                        <AnimatedCounter showGrowthIndicator={false} />
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
                        y: [0, -400 - Math.random() * 200, -600 - Math.random() * 100],
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
                </div>
              </motion.div>
            )}

            {/* Fee Breakdown */}
            {currentStep === 4 && (
              <motion.div key="breakdown" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-8 tracking-wide"
                >
                  fee allocation breakdown
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
                >
                  <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-lg p-8 backdrop-blur-sm border border-yellow-700/30">
                    <div className="text-5xl font-light text-yellow-400 mb-4">6.9%</div>
                    <div className="text-xl font-light text-slate-300 mb-3">jackpot vault</div>
                    <div className="text-sm text-slate-400 font-light">in $S to jackpot vault</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg p-8 backdrop-blur-sm border border-blue-700/30">
                    <div className="text-5xl font-light text-blue-400 mb-4">2.41%</div>
                    <div className="text-xl font-light text-slate-300 mb-3">liquidity providers</div>
                    <div className="text-sm text-slate-400 font-light">in $S to locked liquidity providers</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-lg p-8 backdrop-blur-sm border border-red-700/30">
                    <div className="text-5xl font-light text-red-400 mb-4">0.69%</div>
                    <div className="text-xl font-light text-slate-300 mb-3">token burn</div>
                    <div className="text-sm text-slate-400 font-light">of $DRAGON burned</div>
                  </div>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  transparent distribution • community-driven • sustainable growth
                </motion.p>
              </motion.div>
            )}

            {/* Lottery Mechanics */}
            {currentStep === 5 && (
              <motion.div key="mechanics" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-8 tracking-wide"
                >
                  lottery mechanics
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                >
                  <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">🎯</div>
                    <div className="text-xl font-light text-slate-300 mb-3">automatic entry</div>
                    <div className="text-sm text-slate-400 font-light">every trade above $10 automatically enters the lottery system</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">⚡</div>
                    <div className="text-xl font-light text-slate-300 mb-3">instant draws</div>
                    <div className="text-sm text-slate-400 font-light">draws triggered every 1000 trades or 24 hours</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">🔒</div>
                    <div className="text-xl font-light text-slate-300 mb-3">veDRAGON boost</div>
                    <div className="text-sm text-slate-400 font-light">stakers get up to 10x lottery multiplier</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">🏆</div>
                    <div className="text-xl font-light text-slate-300 mb-3">tiered rewards</div>
                    <div className="text-sm text-slate-400 font-light">multiple prize tiers for better winning odds</div>
                  </div>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  fair • transparent • community-driven
                </motion.p>
              </motion.div>
            )}

            {/* Chainlink VRF */}
            {currentStep === 6 && (
              <motion.div key="vrf" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-8 tracking-wide"
                >
                  provably fair randomness
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-2 gap-8 mb-8"
                >
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-lg p-8 backdrop-blur-sm border border-blue-700/30">
                    <div className="text-6xl font-light text-blue-400 mb-4">VRF 2.5</div>
                    <div className="text-xl font-light text-slate-300 mb-3">chainlink integration</div>
                    <div className="text-sm text-slate-400 font-light">cryptographically secure randomness ensures every lottery draw is completely unpredictable and verifiable on-chain</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-lg p-8 backdrop-blur-sm border border-purple-700/30">
                    <div className="text-6xl font-light text-purple-400 mb-4">24/7</div>
                    <div className="text-xl font-light text-slate-300 mb-3">automated draws</div>
                    <div className="text-sm text-slate-400 font-light">smart contracts execute lottery draws automatically based on trading volume thresholds and time intervals</div>
                  </div>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  no human intervention • transparent algorithms • immutable results
                </motion.p>
              </motion.div>
            )}

            {/* LayerZero Cross-Chain */}
            {currentStep === 7 && (
              <motion.div key="layerzero" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-8 tracking-wide"
                >
                  cross-chain infrastructure
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-3 gap-6 mb-8"
                >
                  <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">🌉</div>
                    <div className="text-lg font-light text-slate-300 mb-2">unified liquidity</div>
                    <div className="text-sm text-slate-400 font-light">access tokens across multiple chains seamlessly</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">⚡</div>
                    <div className="text-lg font-light text-slate-300 mb-2">instant messaging</div>
                    <div className="text-sm text-slate-400 font-light">real-time lottery updates across all supported networks</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50">
                    <div className="text-3xl mb-4">🔗</div>
                    <div className="text-lg font-light text-slate-300 mb-2">omnichain protocol</div>
                    <div className="text-sm text-slate-400 font-light">single interface for multi-chain defi operations</div>
                  </div>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  powered by layerzero • ethereum • polygon • arbitrum • optimism
                </motion.p>
              </motion.div>
            )}

            {/* Complete */}
            {currentStep === 8 && (
              <motion.div key="complete" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-5xl font-light mb-8 tracking-wide"
                >
                  next generation defi
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="space-y-6 mb-8"
                >
                  <div className="text-2xl font-light text-slate-300">
                    trade • earn • win
                  </div>
                  <div className="text-lg text-slate-400 font-light max-w-3xl mx-auto">
                    experience the future of decentralized finance where every transaction contributes to a transparent, community-driven ecosystem powered by cutting-edge blockchain technology
                  </div>
                </motion.div>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="flex justify-center space-x-8"
                >
                  <div className="text-center">
                    <div className="text-3xl font-light text-cyan-400 mb-2">$SONIC</div>
                    <div className="text-sm text-slate-400 font-light">speed & efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-amber-400 mb-2">$DRAGON</div>
                    <div className="text-sm text-slate-400 font-light">power & rewards</div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Legacy content removed for cleaner structure */}


          </AnimatePresence>
        </div>
      )}

      {/* Manual controls */}
      {!isPlaying && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentStep === index
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Audio Control */}
      <motion.button
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-20 bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/90 transition-all duration-300 hover:scale-105"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex items-center space-x-2">
          <div className="text-white text-lg">
            {audioPlaying ? "🔊" : "🔇"}
          </div>
          <div className="text-xs text-slate-300 font-light">
            {audioPlaying ? "playing" : "click to play"}
          </div>
        </div>
      </motion.button>

      {/* Live counter */}
      <motion.div
        className="fixed bottom-6 right-6 z-20 bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="text-2xl font-light text-green-400 mb-1">
          <AnimatedCounter showGrowthIndicator={false} />
        </div>
        <div className="text-xs text-slate-400 font-light text-center">
          live jackpot
        </div>
      </motion.div>
    </div>
  );
}