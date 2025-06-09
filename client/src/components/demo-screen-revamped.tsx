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

  const steps = [
    { id: 0, duration: 6000, name: "intro" },
    { id: 1, duration: 7000, name: "swap" },
    { id: 2, duration: 6000, name: "fees" },
    { id: 3, duration: 6000, name: "lottery" },
    { id: 4, duration: 6000, name: "vrf" },
    { id: 5, duration: 6000, name: "layerzero" },
    { id: 6, duration: 6000, name: "complete" },
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

      // Auto-advance steps
      let totalDelay = 2000;
      steps.forEach((step, index) => {
        setTimeout(() => setCurrentStep(index), totalDelay);
        totalDelay += step.duration;
      });
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
                
                {/* Epic Token Crossing Animation - Full Screen */}
                <div className="fixed inset-0 z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  {/* Title Overlay */}
                  <motion.div
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <h2 className="text-6xl font-light text-white mb-4 tracking-wide">seamless token exchange</h2>
                    <p className="text-xl text-slate-300 font-light">cross-chain liquidity powered by chainlink vrf</p>
                  </motion.div>

                  {/* Sonic Token - From Left */}
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
                    style={{
                      background: "linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(59, 130, 246, 0.25))",
                      boxShadow: "0 0 60px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(34, 211, 238, 0.5)",
                      left: "5%",
                      top: "50%",
                      transform: "translateY(-50%)"
                    }}
                    initial={{ x: -400, opacity: 0, scale: 0.3 }}
                    animate={{
                      x: [0, 600, 1200],
                      opacity: [0, 1, 0],
                      scale: [0.3, 1.5, 0.3],
                      rotate: [0, 360, 720]
                    }}
                    transition={{
                      duration: 4,
                      ease: [0.68, -0.55, 0.265, 1.55],
                      delay: 1
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="Sonic"
                      className="w-20 h-20"
                      style={{ filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))" }}
                    />
                  </motion.div>

                  {/* Dragon Token - From Right */}
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
                    style={{
                      background: "linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.25))",
                      boxShadow: "0 0 60px rgba(251, 191, 36, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(251, 191, 36, 0.5)",
                      right: "5%",
                      top: "50%",
                      transform: "translateY(-50%)"
                    }}
                    initial={{ x: 400, opacity: 0, scale: 0.3 }}
                    animate={{
                      x: [0, -600, -1200],
                      opacity: [0, 1, 0],
                      scale: [0.3, 1.5, 0.3],
                      rotate: [0, -360, -720]
                    }}
                    transition={{
                      duration: 4,
                      ease: [0.68, -0.55, 0.265, 1.55],
                      delay: 1
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="Dragon"
                      className="w-16 h-16"
                      style={{ filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))" }}
                    />
                  </motion.div>

                  {/* Central Collision Effect */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 15, 8, 0],
                      opacity: [0, 1, 0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: 3,
                      ease: [0.25, 0.8, 0.25, 1]
                    }}
                    style={{
                      width: "200px",
                      height: "200px",
                      background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(34,211,238,0.3) 30%, rgba(251,191,36,0.3) 60%, transparent 100%)",
                      borderRadius: "50%"
                    }}
                  />

                  {/* Exchange Symbol */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white z-30"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 2, 1.5, 0],
                      rotate: [0, 180, 360, 540]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 2.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))"
                    }}
                  >
                    ⇄
                  </motion.div>

                  {/* Energy Burst Particles */}
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: (6 + Math.random() * 8) + "px",
                        height: (6 + Math.random() * 8) + "px",
                        left: "50%",
                        top: "50%",
                        background: i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#FBBF24" : "#F59E0B",
                        boxShadow: `0 0 20px ${i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#FBBF24" : "#F59E0B"}`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        x: Math.cos((i * 15 * Math.PI) / 180) * (200 + Math.random() * 300),
                        y: Math.sin((i * 15 * Math.PI) / 180) * (200 + Math.random() * 300),
                        opacity: [0, 1, 0],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 3 + i * 0.03,
                        ease: "easeOut"
                      }}
                    />
                  ))}

                  {/* Bottom Info Panel */}
                  <motion.div
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 4 }}
                  >
                    <p className="text-lg text-slate-300 font-light mb-2">every trade automatically enters the lottery system</p>
                    <p className="text-sm text-slate-400 font-light">powered by chainlink vrf 2.5 • fees distributed to stakers</p>
                  </motion.div>
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
            {currentStep === 2 && (
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

            {/* Lottery System */}
            {currentStep === 3 && (
              <motion.div key="lottery" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-8 tracking-wide"
                >
                  autonomous lottery
                </motion.h2>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mb-8"
                >
                  <div className="text-5xl font-light text-green-400 mb-4">
                    <AnimatedCounter showGrowthIndicator={false} />
                  </div>
                  <p className="text-lg text-slate-400 font-light">
                    current prize pool
                  </p>
                </motion.div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-300 font-light"
                >
                  powered by chainlink vrf for provable fairness
                </motion.p>
              </motion.div>
            )}

            {/* Chainlink VRF */}
            {currentStep === 4 && (
              <motion.div key="odds" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-12 tracking-wide"
                >
                  dynamic probability system
                </motion.h2>
                <div className="bg-slate-800/20 rounded-xl p-8 backdrop-blur-sm border border-slate-700/20">
                  <div className="grid grid-cols-4 gap-4 mb-6 text-sm text-slate-400 font-light">
                    <div>tier</div>
                    <div>odds</div>
                    <div>multiplier</div>
                    <div>allocation</div>
                  </div>
                  <div className="space-y-3">
                    {LOTTERY_TIERS.map((tier, index) => (
                      <motion.div
                        key={tier.name}
                        {...slideUp}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                        className="grid grid-cols-4 gap-4 py-3 border-b border-slate-700/30 last:border-b-0"
                      >
                        <div className="text-left font-light text-white">
                          {tier.name}
                        </div>
                        <div className="font-mono text-slate-300">
                          {tier.odds}
                        </div>
                        <div className="font-light text-green-400">
                          {tier.multiplier}
                        </div>
                        <div className="font-light text-blue-400">
                          {tier.allocation}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Technology */}
            {currentStep === 5 && (
              <motion.div key="tech" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-12 tracking-wide"
                >
                  enterprise infrastructure
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    {...slideUp}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="bg-slate-800/20 rounded-xl p-6 backdrop-blur-sm border border-slate-700/20"
                  >
                    <h3 className="text-xl font-light mb-4 text-blue-400">
                      chainlink vrf 2.5
                    </h3>
                    <div className="space-y-3">
                      {TECH_SPECS.map((spec, index) => (
                        <div key={spec.label} className="flex justify-between">
                          <span className="text-slate-400 font-light">
                            {spec.label}
                          </span>
                          <span className="text-white font-light">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    {...slideUp}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="bg-slate-800/20 rounded-xl p-6 backdrop-blur-sm border border-slate-700/20"
                  >
                    <h3 className="text-xl font-light mb-4 text-purple-400">
                      layerzero protocol
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-light">
                          cross-chain messaging
                        </span>
                        <span className="text-white font-light">
                          unified
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-light">
                          supported networks
                        </span>
                        <span className="text-white font-light">
                          7 blockchains
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-light">
                          liquidity pooling
                        </span>
                        <span className="text-white font-light">
                          global
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Future */}
            {currentStep === 6 && (
              <motion.div key="future" {...fadeIn} className="text-center max-w-5xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-5xl font-extralight mb-8 tracking-wide"
                  style={{ fontWeight: 100 }}
                >
                  the future of defi
                </motion.h2>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-xl text-slate-300 font-light mb-8"
                >
                  where every transaction creates opportunity
                </motion.p>
                <motion.div
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-sm text-slate-400 font-light"
                >
                  sonic red dragon
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Manual controls */}
      {!isPlaying && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
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