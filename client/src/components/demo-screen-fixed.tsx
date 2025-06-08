import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio and timing configuration
  const stepTimings = [
    { step: 1, time: 0 },     // Welcome/Logo
    { step: 2, time: 8000 },  // Token Swap Animation
    { step: 3, time: 22000 }, // Fee Breakdown
    { step: 4, time: 36000 }, // Growing Jackpot
    { step: 5, time: 50000 }, // Multi-agent Trading
    { step: 6, time: 64000 }, // Probability Breakdown
    { step: 7, time: 78000 }, // Chainlink & LayerZero
    { step: 8, time: 92000 }, // Epic Finale
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        const nextStepIndex = stepTimings.findIndex(s => s.step > currentStep);
        if (nextStepIndex !== -1) {
          setCurrentStep(stepTimings[nextStepIndex].step);
        } else if (currentStep < 8) {
          setCurrentStep(currentStep + 1);
        } else {
          setCurrentStep(1); // Loop back to beginning
        }
      }, 14000); // 14 seconds per step

      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Standardized Token Swap Animation Component
  const TokenSwapAnimation = ({ opacity = 0.6 }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
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
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-blue-300/60 overflow-hidden backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)"
            }}
            animate={{
              x: [0, 60, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          >
            <img 
              src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy" 
              alt="Sonic" 
              className="w-8 h-8 object-cover rounded-full"
            />
          </motion.div>
          
          {/* Swap Action Center */}
          <div className="mx-3 flex flex-col items-center relative">
            {/* 10% Fee Indicator - Top */}
            <motion.div
              className="absolute -top-10 text-xs font-bold text-red-400 px-3 py-1.5 bg-red-500/15 rounded-lg border border-red-500/40 backdrop-blur-sm"
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 1.2,
              }}
              style={{
                boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)"
              }}
            >
              10% FEE
            </motion.div>
            
            {/* Buy/Sell Indicator */}
            <motion.div
              className={`absolute -top-6 text-xs font-bold px-2 py-1 rounded-md border ${
                i % 2 === 0 
                  ? 'text-green-300 bg-green-500/20 border-green-500/50' 
                  : 'text-red-300 bg-red-500/20 border-red-500/50'
              }`}
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -2, 0]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: i * 1.2 + 0.3,
              }}
              style={{
                boxShadow: i % 2 === 0 
                  ? "0 0 12px rgba(34, 197, 94, 0.4)"
                  : "0 0 12px rgba(239, 68, 68, 0.4)"
              }}
            >
              {i % 2 === 0 ? 'BUY' : 'SELL'}
            </motion.div>
            
            {/* Enhanced Swap Arrow */}
            <motion.div
              className="text-lg text-white relative"
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.2, 1],
                rotateZ: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1.2 + 0.5,
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))"
              }}
            >
              ⇄
            </motion.div>
            
            {/* Enhanced Fee Breakdown */}
            <motion.div
              className="absolute top-8 flex flex-col items-center text-xs space-y-1 bg-black/30 backdrop-blur-md rounded-lg px-2 py-1.5 border border-white/10"
              initial={{ opacity: 0, y: 4, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.9, 0.9, 0], 
                y: [4, 16, 32, 48],
                scale: [0.8, 1, 1, 0.8]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 1.2 + 1,
              }}
              style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.8)"
              }}
            >
              <div className="flex items-center space-x-1.5 text-yellow-300 whitespace-nowrap">
                <span className="font-semibold">$6.90</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="#00D4FF"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">S</text>
                </svg>
                <span className="text-yellow-200">Jackpot</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-300 whitespace-nowrap">
                <span className="font-semibold">$2.41</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="#00D4FF"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">S</text>
                </svg>
                <span className="text-blue-200">LP</span>
              </div>
              <div className="flex items-center space-x-1.5 text-orange-300 whitespace-nowrap">
                <span className="font-semibold">$0.69</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="#DC2626"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">D</text>
                </svg>
                <span className="text-orange-200">Burn</span>
              </div>
            </motion.div>
          </div>
          
          {/* Dragon Token */}
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-orange-300/60 overflow-hidden backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(249, 115, 22, 0.3))",
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)"
            }}
            animate={{
              x: [0, -60, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          >
            <img 
              src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam" 
              alt="Dragon" 
              className="w-8 h-8 object-cover rounded-full"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );

  // Persistent Jackpot Vault Component
  const PersistentJackpotVault = () => (
    <motion.div
      className="fixed top-4 right-4 z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.5, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, ease: "backOut" }}
    >
      <motion.div
        className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/30 rounded-xl p-4 min-w-[200px]"
        animate={{
          boxShadow: [
            "0 0 20px rgba(251, 191, 36, 0.3)",
            "0 0 30px rgba(251, 191, 36, 0.5)",
            "0 0 20px rgba(251, 191, 36, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-yellow-300 text-sm font-medium mb-2 flex items-center">
          <span className="mr-2">🏆</span>
          JACKPOT VAULT
        </div>
        <motion.div 
          className="text-2xl font-bold text-yellow-100"
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 10px rgba(251, 191, 36, 0.5)",
              "0 0 20px rgba(251, 191, 36, 0.8)",
              "0 0 10px rgba(251, 191, 36, 0.5)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          $847,293
        </motion.div>
        <div className="text-yellow-400/80 text-xs mt-1">
          Growing with every swap
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/attached_assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3" type="audio/mpeg" />
      </audio>

      {/* Controls */}
      <div className="fixed top-4 left-4 z-50 flex space-x-2">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          disabled={!isPlaying}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Pause
        </button>
        <div className="px-3 py-2 bg-black/50 text-white rounded text-sm">
          Step {currentStep}/8
        </div>
      </div>

      {/* Main Demo Content */}
      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {/* Step 1: Epic Logo/Brand Reveal */}
          {currentStep === 1 && (
            <motion.div
              key="intro"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.5 }}
            >
              <motion.div
                className="text-center relative z-10"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                <motion.div
                  className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent mb-8"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  SONIC RED DRAGON
                </motion.div>
                <motion.div
                  className="text-2xl text-slate-300 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  Next-Gen DeFi Lottery Platform
                </motion.div>
                <motion.div
                  className="text-lg text-slate-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  Powered by Chainlink VRF & LayerZero Cross-Chain Technology
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Token Swap Animation */}
          {currentStep === 2 && (
            <motion.div
              key="swap"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.8} />
              
              <motion.div
                className="text-center relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "backOut" }}
              >
                <h2 className="text-6xl font-bold text-white mb-8">
                  Swap & <span className="text-yellow-400">Win</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Every token swap automatically enters you into the lottery with a 10% fee structure
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Fee Breakdown */}
          {currentStep === 3 && (
            <motion.div
              key="fees"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.3} />
              
              <motion.div
                className="text-center relative z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h2 className="text-5xl font-bold text-white mb-12">
                  Smart Fee <span className="text-blue-400">Distribution</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {[
                    { amount: "$6.90", token: "S", color: "yellow", category: "Jackpot", desc: "Growing prize pool" },
                    { amount: "$2.41", token: "S", color: "blue", category: "Liquidity", desc: "LP rewards" },
                    { amount: "$0.69", token: "D", color: "red", category: "Burn", desc: "Deflationary mechanism" }
                  ].map((fee, i) => (
                    <motion.div
                      key={i}
                      className={`bg-gradient-to-br from-${fee.color}-500/20 to-${fee.color}-600/20 backdrop-blur-md border border-${fee.color}-400/30 rounded-xl p-6`}
                      initial={{ y: 100, opacity: 0, rotateX: 45 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.2, ease: "backOut" }}
                      whileHover={{ scale: 1.05, y: -10 }}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <span className={`text-3xl font-bold text-${fee.color}-300 mr-3`}>{fee.amount}</span>
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10" fill={fee.color === 'red' ? '#DC2626' : '#00D4FF'}/>
                          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">{fee.token}</text>
                        </svg>
                      </div>
                      <h3 className={`text-xl font-bold text-${fee.color}-200 mb-2`}>{fee.category}</h3>
                      <p className={`text-${fee.color}-300/80 text-sm`}>{fee.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Growing Jackpot */}
          {currentStep === 4 && (
            <motion.div
              key="jackpot"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, z: -500 }}
              animate={{ opacity: 1, z: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateX: 45 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.4} />
              
              <motion.div
                className="text-center relative z-10"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-7xl font-bold text-yellow-400 mb-8"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(251, 191, 36, 0.5)",
                      "0 0 40px rgba(251, 191, 36, 0.8)",
                      "0 0 20px rgba(251, 191, 36, 0.5)"
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  $847,293
                </motion.h2>
                <p className="text-2xl text-slate-300 mb-8">
                  Current Jackpot Prize Pool
                </p>
                <motion.div
                  className="text-lg text-yellow-300/80"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Growing with every swap transaction
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Multi-Agent Trading */}
          {currentStep === 5 && (
            <motion.div
              key="agents"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateY: -45 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.5} />
              
              <motion.div
                className="text-center relative z-10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "backOut" }}
              >
                <h2 className="text-6xl font-bold text-white mb-8">
                  Multi-Agent <span className="text-purple-400">Trading</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
                  AI-powered trading bots compete in real-time, generating volume and lottery entries
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {['Alpha Bot', 'Beta Agent', 'Gamma Trader', 'Delta Scanner'].map((agent, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md border border-purple-400/30 rounded-xl p-4"
                      initial={{ opacity: 0, scale: 0, rotate: 180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "backOut" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="text-3xl mb-2">🤖</div>
                      <h3 className="text-purple-200 font-bold text-sm">{agent}</h3>
                      <div className="text-xs text-purple-300/80 mt-1">Active</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 6: Probability Breakdown */}
          {currentStep === 6 && (
            <motion.div
              key="odds"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, z: -500 }}
              animate={{ opacity: 1, z: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateX: 45 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.3} />
              
              <motion.div
                className="text-center relative z-10 max-w-6xl mx-auto"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "backOut" }}
              >
                <h2 className="text-5xl font-bold text-white mb-12">
                  Win <span className="text-green-400">Probability</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-8"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    <h3 className="text-3xl font-bold text-blue-300 mb-6">Base Probability</h3>
                    <div className="text-6xl font-bold text-white mb-4">1:1000</div>
                    <p className="text-blue-200/80">Standard lottery entry odds</p>
                  </motion.div>
                  
                  <motion.div
                    className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/30 rounded-xl p-8"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  >
                    <h3 className="text-3xl font-bold text-yellow-300 mb-6">veDRAGON Boost</h3>
                    <div className="text-6xl font-bold text-white mb-4">2.5x</div>
                    <p className="text-yellow-200/80">Enhanced odds for stakers</p>
                  </motion.div>
                </div>
                
                <motion.div
                  className="mt-8 text-lg text-slate-300"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                >
                  Lock DRAGON tokens to boost your winning chances
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 7: Chainlink & LayerZero Integration */}
          {currentStep === 7 && (
            <motion.div
              key="integration"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateY: 45 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.3} />
              
              <motion.div
                className="text-center relative z-10 max-w-6xl mx-auto"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "backOut" }}
              >
                <h2 className="text-5xl font-bold text-white mb-12">
                  Cross-Chain <span className="text-cyan-400">Infrastructure</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-8"
                    initial={{ x: -100, opacity: 0, rotateY: 45 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "backOut" }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                  >
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      🔗
                    </motion.div>
                    <h3 className="text-3xl font-bold text-blue-300 mb-4">Chainlink VRF</h3>
                    <p className="text-blue-200/80 text-lg">
                      Provably fair randomness for lottery draws with cryptographic verification
                    </p>
                  </motion.div>
                  
                  <motion.div
                    className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md border border-purple-400/30 rounded-xl p-8"
                    initial={{ x: 100, opacity: 0, rotateY: -45 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "backOut" }}
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                  >
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🌐
                    </motion.div>
                    <h3 className="text-3xl font-bold text-purple-300 mb-4">LayerZero V2</h3>
                    <p className="text-purple-200/80 text-lg">
                      Seamless cross-chain messaging for multi-chain lottery participation
                    </p>
                  </motion.div>
                </div>
                
                <motion.div
                  className="mt-12 text-xl text-slate-300"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-lg px-6 py-3 inline-block"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 40px rgba(147, 51, 234, 0.3)",
                        "0 0 20px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Sonic → LayerZero → Arbitrum → Chainlink VRF → LayerZero → Sonic
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 8: Epic Finale with CTA */}
          {currentStep === 8 && (
            <motion.div
              key="finale"
              className="flex items-center justify-center min-h-screen relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <TokenSwapAnimation opacity={0.6} />
              
              <motion.div
                className="text-center relative z-10"
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "backOut" }}
              >
                <motion.h1
                  className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent mb-8"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  SONIC RED DRAGON
                </motion.h1>
                
                <motion.p
                  className="text-2xl text-slate-300 mb-12"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  The Future of DeFi Lottery is Here
                </motion.p>
                
                <motion.button
                  className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-bold rounded-xl shadow-2xl"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(147, 51, 234, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Launch Application
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent Jackpot Vault - Shows from Step 2 onwards */}
        {currentStep >= 2 && <PersistentJackpotVault />}
      </div>
    </div>
  );
}