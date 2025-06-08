import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import audioFile from "@assets/hybrid-epic-hollywood-trailer-247114_1749361601412.mp3";

// Animated Counter Component with Growth Indicators
const AnimatedCounter = () => {
  const [count, setCount] = useState(69000);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [lastIncrease, setLastIncrease] = useState(0);
  const [showIncrease, setShowIncrease] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 200) + 75;
      setLastIncrease(increase);
      setIsIncreasing(true);
      setShowIncrease(true);
      setCount(prev => prev + increase);
      
      // Reset the flash effect
      setTimeout(() => {
        setIsIncreasing(false);
        setShowIncrease(false);
      }, 800);
    }, 1400); // Update every 1.4 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative">
      <motion.span
        animate={{
          scale: isIncreasing ? [1, 1.08, 1] : 1,
          color: isIncreasing ? ["#22c55e", "#10b981", "#22c55e"] : "#22c55e"
        }}
        transition={{ duration: 0.4 }}
      >
        ${count.toLocaleString()}
      </motion.span>
      
      {/* Growing indicator */}
      {showIncrease && (
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

  // Enhanced timing based on waveform analysis
  const steps = [
    { delay: 0, duration: 6500 },      // [0:00–0:06.5] Title intro: swell begins
    { delay: 6500, duration: 7500 },   // [0:06.5–0:14] Swap animation buildup
    { delay: 14000, duration: 6000 },  // [0:14–0:20] Jackpot reveal at first drop
    { delay: 20000, duration: 8500 },  // [0:20–0:28.5] Fee tension – ambient mood
    { delay: 28500, duration: 10000 }, // [0:28.5–0:38.5] Fee breakdown – cinematic swell
    { delay: 38500, duration: 8000 },  // [0:38.5–0:46.5] Lottery mechanics
    { delay: 46500, duration: 7000 },  // [0:46.5–0:53.5] VRF finale
    { delay: 53500, duration: 8000 },  // [0:53.5–1:01.5] Final CTA + logo out
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
            `
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#FFEB3B' : '#3B82F6'
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
              ease: "easeInOut"
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
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Ambient light streaks */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-warm-orange to-transparent opacity-20"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-15"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scaleY: [1.2, 0.8, 1.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
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
                className="flex items-center justify-center min-h-screen bg-black text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <motion.p
                  className="text-xl tracking-wider text-gray-400 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 2.5 }}
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(156,163,175,0.3))"
                  }}
                >
                  From the creator of $AKITA V2, $AKITA V3, $oooOOO GODDOG aka Vitalik's Mum's Doge, $WAIT aka We're All In Together, etc..
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
                      background: "radial-gradient(ellipse, rgba(255,107,53,0.3) 0%, transparent 70%)",
                      filter: "blur(30px)"
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
                  
                  <motion.h1
                    className="text-8xl font-bold tracking-wider bg-gradient-to-r from-white via-amber-400 to-white bg-clip-text text-transparent relative z-10"
                    initial={{ scale: 0.3, y: 100, opacity: 0, rotateX: 45 }}
                    animate={{ 
                      scale: [0.3, 1.1, 1], 
                      y: [100, -20, 0], 
                      opacity: [0, 1, 1],
                      rotateX: [45, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 1,
                      times: [0, 0.7, 1]
                    }}
                    style={{
                      filter: "drop-shadow(0 0 60px rgba(251,191,36,0.6))",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 700
                    }}
                  >
                    <Typewriter text="SONIC RED DRAGON" delay={2000} speed={120} />
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
                        x: Math.cos(i * 22.5 * Math.PI / 180) * (150 + Math.random() * 50),
                        y: Math.sin(i * 22.5 * Math.PI / 180) * (150 + Math.random() * 50),
                        opacity: [0.6, 0, 0.6],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: 2.5 + i * 0.05,
                        ease: "easeOut",
                        repeat: 1
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
                        className="text-yellow-400"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                          filter: "drop-shadow(0 0 25px rgba(255,235,59,0.5))",
                          fontWeight: 300
                        }}
                      >
                        SWAP $S
                      </motion.span>
                      <motion.span
                        className="text-amber-400 ml-4 font-medium"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                        style={{
                          filter: "drop-shadow(0 0 25px rgba(251,191,36,0.5))",
                          fontWeight: 500
                        }}
                      >
                        FOR $DRAGON
                      </motion.span>
                    </div>
                    <motion.p
                      className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 }}
                    >
                      Trade Sonic tokens on the fastest cross-chain protocol with instant settlements and zero slippage
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
                      rotateZ: [-90, 0, 360, 720]
                    }}
                    transition={{ 
                      duration: 5, 
                      times: [0, 0.4, 0.6, 1],
                      ease: [0.16, 1, 0.3, 1],
                      delay: 2
                    }}
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(234,179,8,0.8))",
                      boxShadow: "0 0 50px rgba(234,179,8,0.4), inset 0 0 30px rgba(234,179,8,0.2)"
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
                      rotateZ: [90, 0, -360, -720]
                    }}
                    transition={{ 
                      duration: 5, 
                      times: [0, 0.4, 0.6, 1],
                      ease: [0.16, 1, 0.3, 1],
                      delay: 2
                    }}
                    style={{
                      filter: "drop-shadow(0 0 40px rgba(251,191,36,0.8))",
                      boxShadow: "0 0 50px rgba(251,191,36,0.4), inset 0 0 30px rgba(251,191,36,0.2)"
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
                      rotateZ: [0, 360, 720]
                    }}
                    transition={{ duration: 1.5, delay: 4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 opacity-50 blur-lg" />
                  </motion.div>

                  {/* Screen shake effect for collision */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ 
                      x: [0, -8, 8, -5, 5, 0],
                      y: [0, 5, -5, 3, -3, 0]
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 4,
                      ease: "easeInOut"
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
                        boxShadow: `0 0 15px ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B35' : '#FFEB3B'}`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 2, 0],
                        x: Math.cos(i * 12 * Math.PI / 180) * (120 + Math.random() * 150),
                        y: Math.sin(i * 12 * Math.PI / 180) * (120 + Math.random() * 150),
                        opacity: [0, 1, 0],
                        rotateZ: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                      }}
                      transition={{
                        duration: 2,
                        delay: 4 + i * 0.03,
                        ease: "easeOut"
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
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [0, -8, 8, -4, 4, 0], // Screen shake effect
                  y: [0, 4, -4, 2, -2, 0]
                }}
                exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  x: { duration: 0.4, delay: 1 },
                  y: { duration: 0.4, delay: 1 }
                }}
              >
                <div className="text-center relative">
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
                      rotateX: [180, 90, -15, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.3, 0.7, 1],
                      delay: 0.3
                    }}
                    style={{
                      filter: "drop-shadow(0 0 100px rgba(251,191,36,1)) drop-shadow(0 0 150px rgba(251,191,36,0.8))",
                      fontWeight: 900,
                      textShadow: "0 0 80px rgba(251,191,36,1)"
                    }}
                  >
                    WIN THE JACKPOT!
                  </motion.h2>

                  <motion.div
                    className="mt-12 max-w-3xl mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 }}
                  >
                    <p className="text-2xl text-gray-300 font-light leading-relaxed text-center mb-8">
                      Every swap automatically enters you into our{' '}
                      <span className="text-yellow-400 font-medium">VRF-powered lottery</span>
                      {' '}where your trading fees can become massive rewards
                    </p>
                    
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.5 }}
                    >
                      <motion.div
                        className="text-5xl font-bold text-green-400 mb-2"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(34,197,94,0.5)",
                            "0 0 40px rgba(34,197,94,0.8)",
                            "0 0 20px rgba(34,197,94,0.5)"
                          ]
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
                        width: 4 + Math.random() * 8 + 'px',
                        height: 4 + Math.random() * 8 + 'px',
                        background: i % 4 === 0 ? '#FFD700' : i % 4 === 1 ? '#FFA500' : i % 4 === 2 ? '#FBBF24' : '#10B981',
                        left: `${15 + Math.random() * 70}%`,
                        top: `${5 + Math.random() * 40}%`,
                        boxShadow: `0 0 20px ${i % 4 === 0 ? '#FFD700' : i % 4 === 1 ? '#FFA500' : i % 4 === 2 ? '#FBBF24' : '#10B981'}`
                      }}
                      initial={{ scale: 0, y: 0, opacity: 0, rotateZ: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 0.8, 0],
                        y: [0, -400 - Math.random() * 200, -600 - Math.random() * 100],
                        x: [0, (Math.random() - 0.5) * 400],
                        opacity: [0, 1, 0.8, 0],
                        rotateZ: [0, 720 * (Math.random() > 0.5 ? 1 : -1)]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        delay: 2.5 + Math.random() * 1.5,
                        ease: [0.16, 1, 0.3, 1],
                        times: [0, 0.3, 0.7, 1]
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
                        filter: "blur(0.5px)"
                      }}
                      animate={{
                        scaleY: [0, 1, 0.3, 0],
                        opacity: [0, 0.8, 0.4, 0],
                        rotateZ: [0, (i % 2 === 0 ? 8 : -8), 0]
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 1.5 + i * 0.15,
                        ease: "easeOut"
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
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="text-center relative max-w-4xl">
                  {/* Connecting question */}
                  <motion.h2
                    className="text-5xl font-light text-gray-300 mb-12 tracking-wide"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                      filter: "drop-shadow(0 0 25px rgba(255,255,255,0.2))",
                      fontWeight: 300
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
                      opacity: [0, 1, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 1.5,
                      times: [0, 0.7, 1]
                    }}
                    style={{
                      filter: "drop-shadow(0 0 80px rgba(255,107,53,1))",
                      fontWeight: 800,
                      textShadow: "0 0 60px rgba(255,107,53,0.8)"
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
                      fontWeight: 300
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
                        opacity: [1, 0.3, 0] 
                      }}
                      transition={{ 
                        duration: 2.5, 
                        delay: 1.2 + i * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Enhanced Fee Breakdown with Transition */}
            {currentStep === 4 && (
              <motion.div
                key="breakdown"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="text-center">
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
                        rotateX: 0 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.8
                      }}
                      style={{
                        filter: "drop-shadow(0 0 40px rgba(255,235,59,0.6))",
                        fontWeight: 300
                      }}
                    >
                      YOUR 10% FEE BECOMES
                    </motion.h2>
                    
                    <motion.p
                      className="text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.3 }}
                    >
                      Unlike traditional DEXs that just take your fees, 
                      <span className="text-amber-400 font-medium"> Sonic Red Dragon transforms them into opportunities</span>
                    </motion.p>
                  </div>

                  <div className="space-y-12">
                    {[
                      { percent: "6.9%", label: "JACKPOT FUND", description: "Win massive prizes every trade", color: "amber", delay: 0.5 },
                      { percent: "2.41%", label: "LP REWARDS", description: "Earn passive income", color: "blue", delay: 1 },
                      { percent: "0.69%", label: "TOKEN BURN", description: "Increase scarcity & value", color: "yellow", delay: 1.5 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-center space-x-16"
                        initial={{ x: i % 2 === 0 ? -600 : 600, opacity: 0, rotateY: 45 }}
                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: item.delay,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <motion.div
                          className={`w-28 h-28 rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${
                            item.color === 'amber' ? 'bg-amber-500/10 border-amber-400/60' :
                            item.color === 'blue' ? 'bg-blue-500/10 border-blue-400/60' :
                            'bg-yellow-500/10 border-yellow-400/60'
                          }`}

                          style={{
                            filter: `drop-shadow(0 0 25px ${
                              item.color === 'amber' ? 'rgba(251,191,36,0.4)' :
                              item.color === 'blue' ? 'rgba(59,130,246,0.4)' :
                              'rgba(234,179,8,0.4)'
                            })`,
                            boxShadow: `inset 0 0 20px ${
                              item.color === 'amber' ? 'rgba(251,191,36,0.1)' :
                              item.color === 'blue' ? 'rgba(59,130,246,0.1)' :
                              'rgba(234,179,8,0.1)'
                            }`
                          }}
                        >
                          <span className={`text-xl font-medium ${
                            item.color === 'amber' ? 'text-amber-400' :
                            item.color === 'blue' ? 'text-blue-400' :
                            'text-yellow-400'
                          }`}>
                            {item.percent}
                          </span>
                        </motion.div>
                        
                        <div className="text-left">
                          <motion.div
                            className={`text-3xl font-medium tracking-wide ${
                              item.color === 'amber' ? 'text-amber-400' :
                              item.color === 'blue' ? 'text-blue-400' :
                              'text-yellow-400'
                            }`}
                            animate={{ x: [0, 8, 0] }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              ease: "easeInOut",
                              delay: item.delay + 1
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

            {/* Step 5: Elegant Lottery */}
            {currentStep === 5 && (
              <motion.div
                key="lottery"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="text-center relative">
                  <motion.h2
                    className="text-6xl font-light mb-8 tracking-wide"
                    initial={{ rotateX: 45, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      filter: "drop-shadow(0 0 40px rgba(255,215,0,0.6))",
                      fontWeight: 300
                    }}
                  >
                    CHAINLINK VRF 2.5 LOTTERY
                  </motion.h2>

                  <motion.p
                    className="text-2xl text-gray-300 mb-8 font-light leading-relaxed max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  >
                    Provably fair randomness ensures every trader has a legitimate chance to win massive jackpots
                  </motion.p>
                  
                  <motion.p
                    className="text-3xl text-yellow-400 mb-16 font-light tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(255,235,59,0.4))"
                    }}
                  >
                    BIGGER SWAPS = BETTER ODDS
                  </motion.p>

                  {/* Sophisticated floating elements */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 backdrop-blur-sm"
                      style={{
                        width: 8 + Math.random() * 8 + 'px',
                        height: 8 + Math.random() * 8 + 'px',
                        left: `${10 + (i % 5) * 18}%`,
                        top: `${20 + Math.floor(i / 5) * 20}%`,
                        filter: "drop-shadow(0 0 10px rgba(255,165,0,0.6))"
                      }}
                      animate={{
                        y: [0, -50 - Math.random() * 30, 0],
                        rotateZ: [0, 360],
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 3 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15
                      }}
                    />
                  ))}
                </div>
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
                      fontWeight: 300
                    }}
                  >
                    ODDS TABLE
                  </motion.h2>

                  <div className="space-y-8">
                    {[
                      { amount: "$10", odds: "0.004%", boostedOdds: "0.01%", color: "red", delay: 0.5 },
                      { amount: "$100", odds: "0.04%", boostedOdds: "0.1%", color: "orange", delay: 0.8 },
                      { amount: "$1,000", odds: "0.4%", boostedOdds: "1%", color: "yellow", delay: 1.1 },
                      { amount: "$10,000", odds: "4%", boostedOdds: "10%", color: "green", delay: 1.4 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-center space-x-12"
                        initial={{ 
                          x: i % 2 === 0 ? -800 : 800, 
                          opacity: 0, 
                          rotateY: 90,
                          scale: 0.8
                        }}
                        animate={{ 
                          x: 0, 
                          opacity: 1, 
                          rotateY: 0,
                          scale: 1
                        }}
                        transition={{ 
                          duration: 1.6, 
                          delay: item.delay,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <motion.span
                          className={`text-4xl font-light w-40 text-left tracking-wide ${
                            item.color === 'red' ? 'text-red-400' :
                            item.color === 'orange' ? 'text-orange-400' :
                            item.color === 'yellow' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: item.delay + 1.5
                          }}
                          style={{
                            filter: `drop-shadow(0 0 20px ${
                              item.color === 'red' ? 'rgba(239,68,68,0.4)' :
                              item.color === 'orange' ? 'rgba(249,115,22,0.4)' :
                              item.color === 'yellow' ? 'rgba(234,179,8,0.4)' :
                              'rgba(34,197,94,0.4)'
                            })`
                          }}
                        >
                          {item.amount}
                        </motion.span>
                        
                        <motion.span
                          className="text-3xl text-white/60 font-light"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          =
                        </motion.span>
                        
                        <div className="flex flex-col items-center space-y-1">
                          <motion.span
                            className={`text-3xl font-light tracking-wide ${
                              item.color === 'red' ? 'text-red-400' :
                              item.color === 'orange' ? 'text-orange-400' :
                              item.color === 'yellow' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "easeInOut",
                              delay: item.delay + 2
                            }}
                          >
                            {item.odds}
                          </motion.span>
                          
                          <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: item.delay + 2.5 }}
                          >
                            <div className="text-sm text-gray-400 mb-1">veCRV Boosted:</div>
                            <motion.div
                              className="text-xl font-medium text-blue-300"
                              animate={{ 
                                textShadow: [
                                  "0 0 10px rgba(147,197,253,0.3)",
                                  "0 0 20px rgba(147,197,253,0.6)",
                                  "0 0 10px rgba(147,197,253,0.3)"
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {item.boostedOdds} (2.5x)
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 7: Epic Finale with CTA */}
            {currentStep === 7 && (
              <motion.div
                key="finale"
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="text-center relative max-w-6xl">
                  {/* Main Title */}
                  <motion.h1
                    className="text-8xl font-bold mb-8 tracking-wider"
                    initial={{ scale: 0.3, rotateX: 90, opacity: 0 }}
                    animate={{ 
                      scale: [0.3, 1.1, 1], 
                      rotateX: [90, -10, 0],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.7, 1]
                    }}
                    style={{
                      background: "linear-gradient(135deg, #FFD700, #FF6B35, #FFEB3B)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      filter: "drop-shadow(0 0 80px rgba(255,215,0,1))",
                      fontWeight: 800
                    }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.h2
                    className="text-4xl font-light mb-12 text-gray-300 tracking-wide"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    style={{
                      filter: "drop-shadow(0 0 25px rgba(255,255,255,0.2))",
                      fontWeight: 300
                    }}
                  >
                    The Future of Cross-Chain Lottery DeFi
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
                        filter: "drop-shadow(0 0 15px rgba(59,130,246,0.4))"
                      }}
                    >
                      ⚡ Chainlink VRF2.5 • LayerZero Cross-Chain • Provably Fair
                    </motion.p>
                    <motion.p
                      className="text-xl text-warm-orange font-light tracking-wide"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(255,107,53,0.4))"
                      }}
                    >
                      🎯 Every Swap = Lottery Entry • Win Up to $69,000
                    </motion.p>
                  </motion.div>

                  {/* CTA Section */}
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 4, duration: 1.5 }}
                  >
                    <motion.p
                      className="text-2xl text-white/80 font-light"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Coming Soon
                    </motion.p>
                    <motion.p
                      className="text-4xl text-yellow-400 font-medium tracking-wider"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 0 20px rgba(255,235,59,0.5)",
                          "0 0 40px rgba(255,235,59,0.8)",
                          "0 0 20px rgba(255,235,59,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        filter: "drop-shadow(0 0 30px rgba(255,235,59,0.7))"
                      }}
                    >
                      sonicreddragon.io
                    </motion.p>
                  </motion.div>

                  {/* Epic particle explosion */}
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 3 + Math.random() * 6 + 'px',
                        height: 3 + Math.random() * 6 + 'px',
                        background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B35' : '#FFEB3B',
                        left: "50%",
                        top: "50%",
                        boxShadow: `0 0 15px ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B35' : '#FFEB3B'}`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 600,
                        opacity: [0, 1, 0],
                        rotateZ: [0, 720 * (Math.random() > 0.5 ? 1 : -1)]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        delay: 3 + Math.random() * 2,
                        ease: [0.16, 1, 0.3, 1]
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
                        filter: "blur(1px)"
                      }}
                      animate={{
                        scaleY: [0, 1, 0.7, 0],
                        opacity: [0, 0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: 2 + i * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      )}
    </div>
  );
}