import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import audioFile from "@assets/kwa-tempo-phonk-212904.mp3";

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimations, setShowAnimations] = useState(autoStart);
  const audioRef = useRef<HTMLAudioElement>(null);

  const steps = [
    { delay: 0, duration: 3000 },      // Title
    { delay: 3000, duration: 3500 },   // Token Swap
    { delay: 6500, duration: 2500 },   // Twist
    { delay: 9000, duration: 3000 },   // Fee
    { delay: 12000, duration: 4000 },  // Breakdown
    { delay: 16000, duration: 3000 },  // Lottery
    { delay: 19000, duration: 4000 },  // Odds
    { delay: 23000, duration: 4000 },  // VRF
  ];

  useEffect(() => {
    if (autoStart) {
      setShowAnimations(true);
      
      // Start audio with fade in
      if (audioRef.current) {
        setTimeout(() => {
          audioRef.current!.volume = 0;
          audioRef.current!.play().then(() => {
            const fadeIn = () => {
              const current = audioRef.current!.volume;
              if (current < 0.8) {
                audioRef.current!.volume = Math.min(current + 0.01, 0.8);
                requestAnimationFrame(fadeIn);
              }
            };
            fadeIn();
          }).catch(console.log);
        }, 100);
      }

      // Auto-advance steps
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
        }, step.delay);
      });
    }
  }, [autoStart]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <audio ref={audioRef} preload="auto" className="hidden">
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at center, rgba(255,107,53,0.3) 0%, rgba(0,0,0,0) 70%)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-warm-orange to-transparent opacity-30"
          animate={{
            y: [-100, 800],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {showAnimations && (
        <div className="fixed inset-0 z-10">
          <AnimatePresence mode="wait">
            
            {/* Step 0: Epic Title Reveal */}
            {currentStep === 0 && (
              <motion.div
                key="title"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center relative">
                  <motion.div
                    className="absolute inset-0 text-6xl font-black bg-gradient-to-r from-white via-warm-orange to-white bg-clip-text text-transparent"
                    animate={{
                      x: [0, -2, 2, 0],
                      filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"],
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  >
                    SONIC RED DRAGON
                  </motion.div>
                  
                  <motion.h1
                    className="text-6xl font-black bg-gradient-to-r from-white via-warm-orange to-white bg-clip-text text-transparent relative z-10"
                    initial={{ scale: 0.5, rotateX: 90 }}
                    animate={{ scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, ease: "backOut", delay: 0.5 }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(255,107,53,0.8))",
                      textShadow: "0 0 40px rgba(255,107,53,0.6)"
                    }}
                  >
                    <Typewriter text="SONIC RED DRAGON" delay={1500} speed={80} />
                  </motion.h1>
                  
                  {/* Particle burst */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-warm-orange rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      animate={{
                        x: Math.cos(i * 30 * Math.PI / 180) * 200,
                        y: Math.sin(i * 30 * Math.PI / 180) * 200,
                        opacity: [1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 2 + i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Token Collision */}
            {currentStep === 1 && (
              <motion.div
                key="tokens"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -1000, rotateY: 90 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-96">
                  <motion.h2
                    className="text-center text-5xl font-light mb-16 text-yellow-400"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,235,59,0.8))"
                    }}
                  >
                    SWAP $S FOR $DRAGON
                  </motion.h2>

                  {/* S Token */}
                  <motion.div
                    className="absolute left-10 top-1/2 w-32 h-32 rounded-full bg-blue-500/30 border-4 border-blue-400 flex items-center justify-center transform -translate-y-1/2"
                    initial={{ x: -600, rotateY: 180, scale: 0 }}
                    animate={{ 
                      x: [0, 500, 300], 
                      rotateY: [180, 0, 0], 
                      scale: [0, 1.3, 1],
                      rotateZ: [0, 0, 360]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      times: [0, 0.6, 1],
                      ease: "backOut",
                      delay: 0.5
                    }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(59,130,246,0.8))"
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="S Token"
                      className="w-20 h-20"
                    />
                  </motion.div>

                  {/* DRAGON Token */}
                  <motion.div
                    className="absolute right-10 top-1/2 w-32 h-32 rounded-full bg-orange-500/30 border-4 border-orange-400 flex items-center justify-center transform -translate-y-1/2"
                    initial={{ x: 600, rotateY: -180, scale: 0 }}
                    animate={{ 
                      x: [0, -500, -300], 
                      rotateY: [-180, 0, 0], 
                      scale: [0, 1.3, 1],
                      rotateZ: [0, 0, -360]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      times: [0, 0.6, 1],
                      ease: "backOut",
                      delay: 1
                    }}
                    style={{
                      filter: "drop-shadow(0 0 30px rgba(249,115,22,0.8))"
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-20 h-20"
                    />
                  </motion.div>

                  {/* Collision Effect */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 4, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, delay: 2.8 }}
                  >
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-30" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: The Twist */}
            {currentStep === 2 && (
              <motion.div
                key="twist"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "backOut" }}
              >
                <div className="text-center relative">
                  <motion.h2
                    className="text-7xl font-black text-warm-orange relative z-10"
                    initial={{ scale: 0, rotateZ: -45 }}
                    animate={{ 
                      scale: [0, 1.4, 1], 
                      rotateZ: [-45, 15, 0],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "backOut",
                      times: [0, 0.7, 1]
                    }}
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(255,107,53,1))",
                      textShadow: "0 0 60px rgba(255,107,53,0.9)"
                    }}
                  >
                    BUT THERE'S A TWIST...
                  </motion.h2>
                  
                  {/* Lightning effects */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-gradient-to-b from-yellow-400 to-transparent"
                      style={{
                        height: "120px",
                        left: `${15 + i * 12}%`,
                        top: "-60px",
                        transformOrigin: "top"
                      }}
                      animate={{
                        scaleY: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotateZ: [0, (i % 2 === 0 ? 15 : -15), 0]
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 1 + i * 0.1,
                        repeat: 3,
                        repeatDelay: 0.3
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Fee Bomb */}
            {currentStep === 3 && (
              <motion.div
                key="fee"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, y: -1000 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 1000, rotateX: 90 }}
                transition={{ duration: 1, ease: "backOut" }}
              >
                <div className="text-center relative">
                  <motion.div
                    className="text-8xl font-black text-warm-orange mb-8"
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ 
                      scale: [0, 1.3, 1], 
                      rotateY: [180, 0, 0],
                      y: [0, -30, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "backOut",
                      delay: 0.3
                    }}
                    style={{
                      filter: "drop-shadow(0 0 50px rgba(255,107,53,0.9))",
                      textShadow: "0 0 80px rgba(255,107,53,0.8)"
                    }}
                  >
                    10% FEE
                  </motion.div>
                  
                  <motion.div
                    className="text-4xl font-light text-yellow-400"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,235,59,0.8))"
                    }}
                  >
                    ON ALL SWAPS
                  </motion.div>
                  
                  {/* Explosion rings */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-warm-orange rounded-full"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ 
                        scale: [0, 3 + i, 4 + i], 
                        opacity: [1, 0.5, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: 0.8 + i * 0.2,
                        ease: "easeOut"
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
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(20px)" }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-5xl font-light mb-16 text-yellow-400"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      filter: "drop-shadow(0 0 25px rgba(255,235,59,0.8))"
                    }}
                  >
                    FEE BREAKDOWN
                  </motion.h2>

                  <div className="space-y-10">
                    {[
                      { percent: "6.9%", label: "JACKPOT", color: "yellow", delay: 0.5 },
                      { percent: "2.41%", label: "LP REWARDS", color: "blue", delay: 1 },
                      { percent: "0.69%", label: "BURNED", color: "orange", delay: 1.5 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-center space-x-12"
                        initial={{ x: i % 2 === 0 ? -800 : 800, opacity: 0, rotateY: 90 }}
                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                        transition={{ 
                          duration: 1.2, 
                          delay: item.delay,
                          ease: "backOut"
                        }}
                      >
                        <motion.div
                          className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                            item.color === 'yellow' ? 'bg-yellow-500/20 border-yellow-400' :
                            item.color === 'blue' ? 'bg-blue-500/20 border-blue-400' :
                            'bg-orange-500/20 border-orange-400'
                          }`}
                          animate={{
                            rotateZ: [0, 360],
                            scale: [1, 1.15, 1]
                          }}
                          transition={{
                            rotateZ: { duration: 4, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                          style={{
                            filter: `drop-shadow(0 0 25px ${
                              item.color === 'yellow' ? 'rgba(234,179,8,0.8)' :
                              item.color === 'blue' ? 'rgba(59,130,246,0.8)' :
                              'rgba(249,115,22,0.8)'
                            })`
                          }}
                        >
                          <span className={`text-xl font-bold ${
                            item.color === 'yellow' ? 'text-yellow-400' :
                            item.color === 'blue' ? 'text-blue-400' :
                            'text-orange-400'
                          }`}>
                            {item.percent}
                          </span>
                        </motion.div>
                        
                        <motion.span
                          className={`text-3xl font-medium ${
                            item.color === 'yellow' ? 'text-yellow-400' :
                            item.color === 'blue' ? 'text-blue-400' :
                            'text-orange-400'
                          }`}
                          animate={{ x: [0, 15, 0] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: item.delay + 0.5
                          }}
                        >
                          → {item.label}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Lottery */}
            {currentStep === 5 && (
              <motion.div
                key="lottery"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, rotateY: 180 }}
                transition={{ duration: 0.8, ease: "backOut" }}
              >
                <div className="text-center relative">
                  <motion.h2
                    className="text-6xl font-light mb-8"
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                      background: "linear-gradient(45deg, #FFD700, #FFA500, #FFD700)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      filter: "drop-shadow(0 0 30px rgba(255,215,0,0.8))"
                    }}
                  >
                    EVERY SWAP = LOTTERY TICKET
                  </motion.h2>
                  
                  <motion.p
                    className="text-3xl text-yellow-400 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{
                      filter: "drop-shadow(0 0 15px rgba(255,235,59,0.6))"
                    }}
                  >
                    BIGGER SWAPS = BETTER ODDS
                  </motion.p>

                  {/* Floating lottery balls */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"
                      style={{
                        left: `${15 + (i % 4) * 20}%`,
                        top: `${25 + Math.floor(i / 4) * 25}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        rotateZ: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2.5 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(255,165,0,0.8))"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 6: Odds Table */}
            {currentStep === 6 && (
              <motion.div
                key="odds"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, z: -1000 }}
                animate={{ opacity: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.3, rotateX: 90 }}
                transition={{ duration: 1, ease: "backOut" }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-5xl font-light mb-16 text-yellow-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                      filter: "drop-shadow(0 0 25px rgba(255,235,59,0.8))"
                    }}
                  >
                    ODDS TABLE
                  </motion.h2>

                  <div className="space-y-8">
                    {[
                      { amount: "$10", odds: "0.004%", color: "blue", delay: 0.5 },
                      { amount: "$100", odds: "0.04%", color: "green", delay: 0.8 },
                      { amount: "$1,000", odds: "0.4%", color: "yellow", delay: 1.1 },
                      { amount: "$10,000", odds: "4%", color: "orange", delay: 1.4 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-center space-x-12"
                        initial={{ 
                          x: i % 2 === 0 ? -1000 : 1000, 
                          opacity: 0, 
                          rotateY: 180,
                          scale: 0.5
                        }}
                        animate={{ 
                          x: 0, 
                          opacity: 1, 
                          rotateY: 0,
                          scale: 1
                        }}
                        transition={{ 
                          duration: 1.4, 
                          delay: item.delay,
                          ease: "backOut"
                        }}
                      >
                        <motion.span
                          className={`text-4xl font-black w-40 text-left ${
                            item.color === 'blue' ? 'text-blue-400' :
                            item.color === 'green' ? 'text-green-400' :
                            item.color === 'yellow' ? 'text-yellow-400' :
                            'text-orange-400'
                          }`}
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: item.delay + 1
                          }}
                          style={{
                            filter: `drop-shadow(0 0 20px ${
                              item.color === 'blue' ? 'rgba(59,130,246,0.8)' :
                              item.color === 'green' ? 'rgba(34,197,94,0.8)' :
                              item.color === 'yellow' ? 'rgba(234,179,8,0.8)' :
                              'rgba(249,115,22,0.8)'
                            })`
                          }}
                        >
                          {item.amount}
                        </motion.span>
                        
                        <motion.span
                          className="text-3xl text-white font-light"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          =
                        </motion.span>
                        
                        <motion.span
                          className={`text-4xl font-black w-40 text-right ${
                            item.color === 'blue' ? 'text-blue-400' :
                            item.color === 'green' ? 'text-green-400' :
                            item.color === 'yellow' ? 'text-yellow-400' :
                            'text-orange-400'
                          }`}
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: item.delay + 1.5
                          }}
                        >
                          {item.odds}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 7: VRF Tech Finale */}
            {currentStep === 7 && (
              <motion.div
                key="vrf"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                transition={{ duration: 1, ease: "backOut" }}
              >
                <div className="text-center relative max-w-5xl">
                  <motion.h2
                    className="text-4xl font-light mb-8 text-yellow-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,235,59,0.8))"
                    }}
                  >
                    PROVABLY FAIR WITH
                  </motion.h2>
                  
                  <motion.div
                    className="text-6xl font-black mb-10"
                    initial={{ scale: 0, rotateZ: -45 }}
                    animate={{ scale: 1, rotateZ: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
                    style={{
                      background: "linear-gradient(45deg, #FFD700, #FF6B35, #00BFFF)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      filter: "drop-shadow(0 0 40px rgba(255,215,0,0.8))"
                    }}
                  >
                    OMNIDRAGONRANDOMNESS
                  </motion.div>
                  
                  <motion.div
                    className="space-y-6 text-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    <motion.p
                      className="text-blue-400"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(59,130,246,0.6))"
                      }}
                    >
                      Chainlink VRF2.5 + LayerZero + drand aggregation
                    </motion.p>
                    <motion.p
                      className="text-warm-orange font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(255,107,53,0.6))"
                      }}
                    >
                      Results are instantaneous and unique to each swap
                    </motion.p>
                  </motion.div>

                  {/* Tech orbiting elements */}
                  {["VRF", "L0", "DRAND"].map((tech, i) => {
                    const angle = i * 120;
                    return (
                      <motion.div
                        key={tech}
                        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold"
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                        animate={{
                          x: Math.cos((angle) * Math.PI / 180) * 180,
                          y: Math.sin((angle) * Math.PI / 180) * 180,
                          rotateZ: [0, 360],
                        }}
                        transition={{
                          x: { duration: 6, repeat: Infinity, ease: "linear" },
                          y: { duration: 6, repeat: Infinity, ease: "linear" },
                          rotateZ: { duration: 3, repeat: Infinity, ease: "linear" }
                        }}
                        style={{
                          filter: "drop-shadow(0 0 15px rgba(99,102,241,0.8))"
                        }}
                      >
                        {tech}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      )}
    </div>
  );
}