import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TokenExchangeAnimation from "./token-exchange-animation";
import AnimatedCounter from "./animated-counter";
// Import audio directly from attached_assets
const audioFile = "/attached_assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

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
  const audioRef = useRef<HTMLAudioElement>(null);

  const steps = [
    { id: 0, duration: 6000, name: "intro" },
    { id: 1, duration: 6000, name: "swap" },
    { id: 2, duration: 6000, name: "lottery" },
    { id: 3, duration: 6000, name: "fees" },
    { id: 4, duration: 6000, name: "odds" },
    { id: 5, duration: 6000, name: "tech" },
    { id: 6, duration: 6000, name: "future" },
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
            
            // Smooth fade in
            const fadeIn = () => {
              if (audioRef.current && audioRef.current.volume < 0.6) {
                audioRef.current.volume = Math.min(audioRef.current.volume + 0.015, 0.6);
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
      
      try {
        if (audioPlaying) {
          audioRef.current.pause();
          setAudioPlaying(false);
          console.log("Audio paused");
        } else {
          audioRef.current.volume = 0.6;
          console.log("Attempting to play audio...");
          await audioRef.current.play();
          setAudioPlaying(true);
          console.log("Audio playing successfully");
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
                <div className="flex justify-center items-center space-x-8 mb-8">
                  <TokenExchangeAnimation
                    duration={4}
                    scale={1.2}
                    showTradeIndicators={false}
                    showFeeBreakdown={false}
                  />
                </div>
                <motion.p
                  {...slideUp}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg text-slate-400 font-light"
                >
                  every trade automatically enters the lottery system
                </motion.p>
              </motion.div>
            )}

            {/* Lottery System */}
            {currentStep === 2 && (
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

            {/* Fee Structure */}
            {currentStep === 3 && (
              <motion.div key="fees" {...fadeIn} className="text-center max-w-6xl mx-auto p-8">
                <motion.h2
                  {...slideUp}
                  className="text-4xl font-light mb-12 tracking-wide"
                >
                  transparent fee allocation
                </motion.h2>
                <div className="space-y-6">
                  {FEE_STRUCTURE.map((fee, index) => (
                    <motion.div
                      key={fee.name}
                      {...slideUp}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                      className="flex justify-between items-center bg-slate-800/30 rounded-lg p-6 backdrop-blur-sm border border-slate-700/30"
                    >
                      <div className="text-left">
                        <div className="text-xl font-light text-white">
                          {fee.name}
                        </div>
                        <div className="text-sm text-slate-400 font-light">
                          {fee.description}
                        </div>
                      </div>
                      <div className="text-2xl font-light text-blue-400">
                        {fee.percentage}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Odds Table */}
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