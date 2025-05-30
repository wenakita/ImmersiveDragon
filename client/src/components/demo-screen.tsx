import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepContent from "@/components/step-content";
import { demoSteps } from "@/lib/demo-steps";
import { Typewriter } from "@/components/ui/typewriter";
import audioFile from "@assets/kwa-tempo-phonk-212904.mp3";
import { splashSteps, animationVariants, type SplashStep } from "@/lib/splash-config";

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [showBlackScreen, setShowBlackScreen] = useState(true);
  const [showReadyText, setShowReadyText] = useState(false);
  const [showSwapIntro, setShowSwapIntro] = useState(false);
  const [showTwist, setShowTwist] = useState(false);
  const [showFeeDetails, setShowFeeDetails] = useState(false);
  const [showFeeBreakdown, setShowFeeBreakdown] = useState(false);
  const [showSwapExample, setShowSwapExample] = useState(false);
  const [showJackpotExplanation, setShowJackpotExplanation] = useState(false);
  const [showOddsTable, setShowOddsTable] = useState(false);
  const [showVRFDetails, setShowVRFDetails] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioStarted, setAudioStarted] = useState(autoStart);
  const [showPlayButton, setShowPlayButton] = useState(!autoStart);
  const [currentSplashStep, setCurrentSplashStep] = useState<SplashStep | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio-driven animation system
  useEffect(() => {
    let raf: number;
    
    function animateStep() {
      if (!audioRef.current || !audioStarted) return;
      
      const currentTime = audioRef.current.currentTime * 1000; // Convert to ms
      
      // Find current step based on audio time
      const step = splashSteps.find(
        s => currentTime >= s.start && currentTime < s.start + s.duration
      );
      
      if (step && step.key !== currentSplashStep?.key) {
        setCurrentSplashStep(step);
        
        // Handle audio fade-in
        if (step.action === "audioFadeIn") {
          const progress = Math.min(1, (currentTime / 2000));
          audioRef.current.volume = 0.7 * progress;
        }
      }
      
      raf = requestAnimationFrame(animateStep);
    }
    
    if (audioStarted) {
      raf = requestAnimationFrame(animateStep);
    }
    
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [audioStarted, currentSplashStep]);

  // Start audio when autoStart is true
  useEffect(() => {
    if (autoStart && audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => {
        console.log('Audio autoplay prevented:', e);
      });
    }
  }, [autoStart]);

  const handlePlayAudio = () => {
    console.log('Play button clicked');
    if (audioRef.current) {
      console.log('Audio element found, starting play');
      audioRef.current.volume = 0.7; // Start with audible volume for testing
      audioRef.current.play().then(() => {
        console.log('Audio started successfully');
        setAudioStarted(true);
        setShowPlayButton(false);
      }).catch(e => {
        console.log('Audio play prevented:', e);
      });
    } else {
      console.log('No audio element found');
    }
  };

  const handleStepChange = (step: number) => {
    if (step >= 0 && step < demoSteps.length) {
      setCurrentStep(step);
    }
  };

  const handlePlayClick = () => {
    setShowPlayButton(false);
    setAudioStarted(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Audio element for phonk track integration */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        onLoadStart={() => console.log('Audio loading started')}
        onCanPlay={() => console.log('Audio can play')}
        onError={(e) => console.log('Audio error:', e)}
      >
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      {/* Play button overlay */}
      {showPlayButton && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.button
            onClick={handlePlayAudio}
            className="bg-warm-orange hover:bg-warm-orange/80 text-black font-bold text-xl px-8 py-4 rounded-lg flex items-center space-x-3 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Play Demo with Audio</span>
          </motion.button>
        </div>
      )}
      
      <AnimatePresence>
        {showBlackScreen && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Audio-driven Animation Rendering */}
            {currentSplashStep && (
              <>
                {/* Typewriter Title */}
                {currentSplashStep.action === "typewriter" && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h2 
                      className="text-5xl font-light bg-gradient-to-r from-white via-warm-orange to-white bg-clip-text text-transparent relative z-10 drop-shadow-[0_0_20px_rgba(255,107,53,0.7)]"
                      variants={animationVariants.neonGlow}
                      initial="hidden"
                      animate="visible"
                    >
                      <Typewriter text={currentSplashStep.text || ""} delay={0} speed={100} />
                    </motion.h2>
                  </motion.div>
                )}

                {/* Glitch Out Effect */}
                {currentSplashStep.action === "glitchOut" && (
                  <motion.div
                    className="text-center"
                    variants={animationVariants.glitch}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    <h2 className="text-5xl font-light text-warm-orange">
                      {currentSplashStep.text}
                    </h2>
                  </motion.div>
                )}

                {/* Swap Animation */}
                {currentSplashStep.action === "swapPhase" && (
                  <motion.div className="text-center relative h-32">
                    <motion.h2 className="text-3xl font-light mb-4">
                      {currentSplashStep.text}
                    </motion.h2>
                    
                    <motion.div
                      className="absolute top-12 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center"
                      initial={{ 
                        x: currentSplashStep.direction === "left" ? -200 : 200, 
                        opacity: 0 
                      }}
                      animate={{ 
                        x: currentSplashStep.direction === "left" ? -80 : 80, 
                        opacity: 1 
                      }}
                      variants={animationVariants.bounce}
                      transition={{ duration: 0.8, ease: "backOut" }}
                    >
                      <img
                        src={currentSplashStep.token === "S" 
                          ? "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                          : "https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                        }
                        alt={`${currentSplashStep.token} Token`}
                        className="w-10 h-10"
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Token Crossing */}
                {currentSplashStep.action === "swapComplete" && (
                  <motion.div className="text-center relative h-32">
                    <motion.div
                      className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-4"
                      animate={{ 
                        x: [0, 100, -100, 0],
                        rotate: [0, 360, -360, 0]
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                        <img src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy" alt="S" className="w-8 h-8" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
                        <img src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam" alt="DRAGON" className="w-8 h-8" />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-green-400 font-bold"
                      animate={{ 
                        opacity: [0, 1, 0, 1, 0],
                        scale: [1, 1.2, 1, 1.3, 1]
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      Swap Complete!
                    </motion.div>
                  </motion.div>
                )}

                {/* Zoom In Effect for Twist */}
                {currentSplashStep.action === "zoomIn" && (
                  <motion.div
                    className="text-center glitch-effect"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                  >
                    <motion.h2 
                      className="text-4xl font-light text-warm-orange"
                      variants={animationVariants.glitch}
                      animate="visible"
                    >
                      {currentSplashStep.text}
                    </motion.h2>
                  </motion.div>
                )}
              </>
            )}

            {/* Swap Animation with Token Crossing */}
            {showSwapIntro && (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Phase 1: "Swap $S" with $S token slide in */}
                <motion.div className="relative h-32">
                  <motion.h2 
                    className="text-3xl font-light absolute top-0 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 1, 0] }}
                      transition={{ times: [0, 0.5, 1], duration: 3 }}
                    >
                      Swap $S
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0, 1] }}
                      transition={{ times: [0, 0.5, 1], duration: 3 }}
                    >
                      for $DRAGON
                    </motion.span>
                  </motion.h2>
                  
                  {/* $S Token sliding in from left */}
                  <motion.div
                    className="absolute top-12 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ 
                      x: -80, 
                      opacity: 1,
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.5,
                      y: { duration: 0.5, delay: 1 }
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="SONIC Token"
                      className="w-10 h-10"
                    />
                  </motion.div>
                  
                  {/* $DRAGON Token sliding in from right */}
                  <motion.div
                    className="absolute top-12 right-0 w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ 
                      x: 80, 
                      opacity: 1,
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: 1.5,
                      y: { duration: 0.5, delay: 2.5 }
                    }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-10 h-10"
                    />
                  </motion.div>
                  
                  {/* Tokens crossing animation */}
                  <motion.div
                    className="absolute top-12 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                    transition={{ times: [0, 0.6, 0.7, 0.9, 1], duration: 6 }}
                  >
                    <motion.div
                      className="flex space-x-4"
                      animate={{ 
                        x: [0, 100, -100, 0],
                        rotate: [0, 360, -360, 0]
                      }}
                      transition={{ duration: 2, delay: 3 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                        <img src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy" alt="S" className="w-8 h-8" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
                        <img src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam" alt="DRAGON" className="w-8 h-8" />
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* "Swap Complete!" flicker */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-green-400 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0, 1, 0, 1, 0],
                      scale: [1, 1, 1.2, 1, 1.3, 1]
                    }}
                    transition={{ times: [0, 0.7, 0.75, 0.8, 0.85, 1], duration: 6 }}
                  >
                    Swap Complete!
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* The Twist */}
            {showTwist && (
              <motion.div
                className="text-center glitch-effect"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-4xl font-light text-warm-orange"
                  initial={{ opacity: 0, rotateY: 180, scale: 0.3, y: 100 }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0, 
                    scale: 1, 
                    y: 0,
                    rotateZ: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1, 
                    ease: "backOut",
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <motion.span
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(255, 107, 53, 0.8)",
                        "0 0 40px rgba(255, 107, 53, 1)",
                        "0 0 15px rgba(255, 107, 53, 0.6)",
                        "0 0 35px rgba(255, 107, 53, 0.9)"
                      ],
                      scale: [1, 1.05, 0.98, 1.02, 1]
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    But there's a twist
                  </motion.span>
                </motion.h2>
              </motion.div>
            )}

            {/* 10% Fee Reveal with Count-up Animation */}
            {showFeeDetails && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: -300 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -5, 0]
                }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "backOut",
                  y: { duration: 0.3, delay: 0.8 }
                }}
              >
                <motion.h2 
                  className="text-4xl font-bold mb-6 text-warm-orange"
                  initial={{ opacity: 0, x: -150 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2, 
                    ease: "easeOut"
                  }}
                >
                  <motion.span 
                    className="inline-block"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 1.3, 1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.5,
                      ease: "backOut"
                    }}
                  >
                    {/* Count-up from 0% to 10% */}
                    <motion.span
                      animate={{ 
                        scale: [1, 1.1, 1],
                        y: [0, -3, 0]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.2,
                        repeat: 2
                      }}
                    >
                      10%
                    </motion.span>
                  </motion.span> fee on all swaps
                </motion.h2>
                
                {/* Impact shake effect */}
                <motion.div
                  className="w-full h-1 bg-warm-orange mx-auto"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: "100%",
                    x: [0, -2, 2, -1, 1, 0]
                  }}
                  transition={{ 
                    width: { duration: 0.4, delay: 1.5 },
                    x: { duration: 0.2, delay: 1.9 }
                  }}
                />
              </motion.div>
            )}

            {/* Instant Results with Shimmer and Slot Machine */}
            {showFeeBreakdown && (
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-6 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    backgroundImage: [
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                    ],
                    backgroundSize: ["200% 100%", "200% 100%"],
                    backgroundPosition: ["-200% 0", "200% 0"]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    backgroundPosition: { duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }
                  }}
                >
                  Results are instantaneous and unique
                  
                  {/* Lightning sweep effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.h2>
                
                {/* Slot machine reel */}
                <motion.div
                  className="mx-auto w-32 h-16 bg-gray-800 rounded border-2 border-yellow-400 overflow-hidden relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-2xl font-bold text-yellow-400"
                    animate={{ y: [-60, 0, 60, 0] }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                  >
                    <div className="h-16 flex items-center">WIN!</div>
                    <div className="h-16 flex items-center">777</div>
                    <div className="h-16 flex items-center">WIN!</div>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="space-y-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2 }}
                >
                  <motion.div 
                    className="flex items-center justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-400">6.9%</span>
                    </div>
                    <span className="text-lg text-yellow-400 font-medium">→ Jackpot</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-400">2.41%</span>
                    </div>
                    <span className="text-lg text-blue-400 font-medium">→ LP Rewards</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-400">0.69%</span>
                    </div>
                    <span className="text-lg text-orange-400 font-medium">→ Burned</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}



            {/* Lottery Ticket 3D Flip with Coin Burst */}
            {showJackpotExplanation && (
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="relative overflow-hidden">
                  <motion.h2 
                    className="text-3xl font-light mb-4 relative z-10"
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ 
                      opacity: 1, 
                      rotateY: 0
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    Every swap = <motion.span 
                      className="text-yellow-400"
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(255, 235, 59, 0.5)",
                          "0 0 20px rgba(255, 235, 59, 0.8)",
                          "0 0 10px rgba(255, 235, 59, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >lottery ticket</motion.span>
                  </motion.h2>
                  
                  {/* Golden coins burst effect */}
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ 
                          scale: 0,
                          x: 0,
                          y: 0,
                          opacity: 0
                        }}
                        animate={{ 
                          scale: [0, 1, 0.8, 0],
                          x: Math.cos(i * 30 * Math.PI / 180) * 150,
                          y: Math.sin(i * 30 * Math.PI / 180) * 150,
                          opacity: [0, 1, 1, 0],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 2, 
                          delay: 1 + i * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        <div className="w-full h-full bg-yellow-400 rounded-full animate-pulse" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
                <motion.p
                  className="text-lg text-soft-gray"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Larger swaps = better odds
                </motion.p>
              </motion.div>
            )}

            {/* Odds Table */}
            {showOddsTable && (
              <motion.div
                className="text-center bass-pulse"
                initial={{ opacity: 0, y: 150, scale: 0.1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -150, scale: 0.1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "backOut",
                  type: "spring",
                  stiffness: 700,
                  damping: 25
                }}
              >
                <motion.div
                  className="space-y-3 glitch-effect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <motion.div 
                    className="flex items-center justify-center space-x-6 shake-hard"
                    initial={{ opacity: 0, x: -200, rotate: -45 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotate: 0,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 900 }}
                  >
                    <span className="text-2xl font-bold text-blue-400 w-20 text-left glitch-effect">$10</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-blue-400 w-20 text-right bass-pulse">0.004%</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-6 shake-hard"
                    initial={{ opacity: 0, x: 200, rotate: 45 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotate: 0,
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 0.3, delay: 0.4, type: "spring", stiffness: 900 }}
                  >
                    <span className="text-2xl font-bold text-orange-400 w-20 text-left glitch-effect">$100</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-orange-400 w-20 text-right bass-pulse">0.04%</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-6 shake-hard"
                    initial={{ opacity: 0, y: 100, scale: 0.2 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: [0.2, 1.4, 1],
                      rotateY: [0, 360]
                    }}
                    transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 800 }}
                  >
                    <span className="text-2xl font-bold text-yellow-400 w-20 text-left">$1,000</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-yellow-400 w-20 text-right">0.4%</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <span className="text-2xl font-bold text-orange-500 w-20 text-left">$10,000</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-orange-500 w-20 text-right">4%</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* VRF Details */}
            {showVRFDetails && (
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Background fire/dragon effect */}
                <motion.div
                  className="absolute inset-0 -inset-12 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-orange-600/10 via-red-500/5 to-transparent"
                    animate={{ 
                      scale: [1, 1.2, 1.1, 1.3, 1],
                      rotate: [0, 5, -3, 8, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Floating embers */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-orange-400 rounded-full"
                      style={{
                        left: `${10 + i * 7}%`,
                        top: `${20 + (i % 4) * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, -40, -60],
                        opacity: [0, 0.8, 0.6, 0],
                        scale: [0.5, 1, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
                <motion.h2 
                  className="text-2xl font-light mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Provably fair with <span className="text-yellow-400">OmniDragonRandomness</span>
                </motion.h2>
                <motion.p
                  className="text-lg text-soft-gray mb-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Chainlink VRF2.5 + LayerZero + drand aggregation
                </motion.p>
                <motion.div className="relative">
                  <motion.p
                    className="text-lg text-yellow-400 font-medium relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    Results are instantaneous and unique to each swap
                  </motion.p>
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDemo && (
          <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="min-h-screen bg-gradient-to-br from-black via-charcoal/50 to-black">
              <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <motion.header
                  className="text-center mb-12"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full border border-golden-amber/50 flex items-center justify-center">
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                        alt="Dragon Logo"
                        className="w-5 h-5"
                      />
                    </div>
                    <h1 className="text-xl font-semibold">Token Swap Education</h1>
                  </div>
                  <p className="text-soft-gray max-w-2xl mx-auto">
                    Learn how decentralized token swaps work through our interactive educational platform
                  </p>
                </motion.header>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
                  {/* Step Sidebar */}
                  <motion.div
                    className="lg:col-span-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="sticky top-8">
                      <h3 className="text-sm font-medium text-soft-gray mb-6 uppercase tracking-wide">
                        Progress
                      </h3>
                      <div className="space-y-4">
                        {demoSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            className={`transition-all duration-300 cursor-pointer ${
                              index <= currentStep ? 'opacity-100' : 'opacity-50'
                            }`}
                            onClick={() => handleStepChange(index)}
                            whileHover={{ x: 4 }}
                          >
                            <div className={`text-sm font-medium mb-1 ${
                              index === currentStep ? 'text-warm-orange' : 'text-white'
                            }`}>
                              {step.title}
                            </div>
                            <div className="text-xs text-soft-gray">
                              {step.subtitle}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Main Content */}
                  <motion.div
                    className="lg:col-span-3"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <StepContent
                      currentStep={currentStep}
                      onStepChange={handleStepChange}
                      totalSteps={demoSteps.length}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}