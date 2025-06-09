import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import TokenExchangeAnimation from "./token-exchange-animation";
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
      alt="S Token"
      className={imageSize}
    />
  </motion.div>
);

// Dragon Token Component
const DragonToken = ({
  size = "w-12 h-12",
  borderColor = "border-amber-400",
  gradientFrom = "from-amber-400",
  gradientTo = "to-orange-500",
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
      alt="DRAGON Token"
      className={imageSize}
    />
  </motion.div>
);

// Animated Counter Component
const AnimatedCounter = ({ showGrowthIndicator = true }: { showGrowthIndicator?: boolean }) => {
  const [count, setCount] = useState(137852);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 50) + 25);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span>${count.toLocaleString()}</span>
      {showGrowthIndicator && (
        <motion.span
          className="text-green-400 text-sm"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ↗
        </motion.span>
      )}
    </div>
  );
};

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [currentStep, setCurrentStep] = useState(-1);
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
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="text-center relative">
                  <motion.h1
                    className="text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent"
                    initial={{ scale: 0.1, y: 300, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    SONIC RED DRAGON
                  </motion.h1>
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
                    <motion.span
                      className="text-5xl font-light text-white"
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      SWAP{" "}
                      <span className="text-yellow-400 font-bold">$S</span>
                      {" "}FOR{" "}
                      <span className="text-amber-400 font-bold">$DRAGON</span>
                    </motion.span>
                  </div>

                  {/* Large token swap animation */}
                  <motion.div
                    className="absolute left-16 top-1/2 w-40 h-40 rounded-full border-3 border-yellow-400/80 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-md"
                    initial={{ x: -1200, scale: 0, opacity: 0 }}
                    animate={{ x: [0, 200, 1600], scale: [1, 1.2, 1.2], opacity: [1, 1, 1] }}
                    transition={{ duration: 5, times: [0, 0.6, 1], delay: 2 }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="S Token"
                      className="w-28 h-28"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute right-16 top-1/2 w-40 h-40 rounded-full border-3 border-amber-400/80 flex items-center justify-center transform -translate-y-1/2 backdrop-blur-md"
                    initial={{ x: 1200, scale: 0, opacity: 0 }}
                    animate={{ x: [0, -200, -1600], scale: [1, 1.2, 1.2], opacity: [1, 1, 1] }}
                    transition={{ duration: 5, times: [0, 0.6, 1], delay: 2 }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-24 h-24"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Jackpot Reveal */}
            {currentStep === 2 && (
              <motion.div
                key="jackpot"
                className="flex items-center justify-center min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                {/* Trading animation background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: 'absolute',
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
                  <motion.h2
                    className="text-9xl font-bold text-amber-400 mb-8"
                    initial={{ scale: 0.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.3 }}
                  >
                    WIN THE JACKPOT!
                  </motion.h2>

                  <motion.div
                    className="text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    <motion.div className="text-5xl font-bold text-green-400 mb-2">
                      <AnimatedCounter />
                    </motion.div>
                    <div className="text-lg text-gray-400">Current Jackpot Prize</div>
                  </motion.div>
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
                  >
                    10% FEE
                  </motion.h2>
                  <motion.div
                    className="text-4xl text-yellow-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                  >
                    ON EVERY SINGLE SWAP
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Fee Breakdown */}
            {currentStep === 4 && (
              <motion.div
                key="breakdown"
                className="flex items-center justify-center min-h-screen relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                {/* Background trading animations */}
                <div className="absolute inset-0 opacity-60 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: 'absolute',
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
                  <motion.h2
                    className="text-6xl font-light text-yellow-400 mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    YOUR 10% FEE BECOMES
                  </motion.h2>

                  <div className="space-y-12">
                    {[
                      { percent: "6.9%", label: "JACKPOT VAULT", color: "amber" },
                      { percent: "2.41%", label: "LP REWARDS", color: "blue" },
                      { percent: "0.69%", label: "TOKEN BURN", color: "orange" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-center space-x-8"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 2 + index * 0.3 }}
                      >
                        <div className={`text-4xl font-bold text-${item.color}-400`}>
                          {item.percent}
                        </div>
                        <div className={`text-xl text-${item.color}-300`}>
                          {item.label}
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
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                {/* Background trading activity */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <TokenExchangeAnimation
                      key={i}
                      containerStyle={{
                        position: 'absolute',
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
                  <motion.h2
                    className="text-5xl font-light text-gray-300 mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    BUT HOW DOES THE JACKPOT GROW?
                  </motion.h2>

                  <motion.p
                    className="text-3xl text-yellow-400 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                  >
                    BIGGER SWAPS = BIGGER CONTRIBUTIONS
                  </motion.p>

                  <motion.div
                    className="text-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                  >
                    <motion.div className="text-5xl font-bold text-green-400">
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