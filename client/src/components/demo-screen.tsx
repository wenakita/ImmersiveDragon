import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepContent from "@/components/step-content";
import { demoSteps } from "@/lib/demo-steps";
import { Typewriter } from "@/components/ui/typewriter";

export default function DemoScreen() {
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

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowReadyText(true), 1500),
      setTimeout(() => { setShowReadyText(false); setShowSwapIntro(true); }, 5000),
      setTimeout(() => { setShowSwapIntro(false); setShowTwist(true); }, 8500),
      setTimeout(() => { setShowTwist(false); setShowFeeDetails(true); }, 12000),
      setTimeout(() => { setShowFeeDetails(false); setShowFeeBreakdown(true); }, 15500),
      setTimeout(() => { setShowFeeBreakdown(false); setShowJackpotExplanation(true); }, 20000),
      setTimeout(() => { setShowJackpotExplanation(false); setShowOddsTable(true); }, 24000),
      setTimeout(() => { setShowOddsTable(false); setShowVRFDetails(true); }, 28000),
      setTimeout(() => {
        setShowBlackScreen(false);
        setShowDemo(true);
      }, 32000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStepChange = (step: number) => {
    if (step >= 0 && step < demoSteps.length) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence>
        {showBlackScreen && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ready Text */}
            {showReadyText && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-4xl font-light bg-gradient-to-r from-white via-warm-orange to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typewriter text="Sonic Red Dragon" delay={500} speed={80} />
                </motion.h2>
                <motion.div
                  className="w-16 h-0.5 bg-warm-orange mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.div>
            )}

            {/* Swap Introduction */}
            {showSwapIntro && (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-3xl font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Swap $S for $DRAGON
                </motion.h2>

                <motion.div
                  className="flex justify-center items-center space-x-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="SONIC Token"
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400"></div>
                  <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-10 h-10"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* The Twist */}
            {showTwist && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-4xl font-light text-warm-orange"
                  initial={{ opacity: 0, rotateY: 180, scale: 0.5 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                >
                  <motion.span
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(255, 107, 53, 0.5)",
                        "0 0 20px rgba(255, 107, 53, 0.8)",
                        "0 0 10px rgba(255, 107, 53, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    But there's a twist
                  </motion.span>
                </motion.h2>
              </motion.div>
            )}

            {/* Fee Details */}
            {showFeeDetails && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-4xl font-light mb-6"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <motion.span 
                    className="text-warm-orange font-semibold inline-block"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  >
                    10% fee
                  </motion.span> on all swaps
                </motion.h2>
                <motion.div
                  className="w-20 h-20 rounded-full bg-warm-orange/20 border-2 border-warm-orange/50 flex items-center justify-center mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-2xl font-bold text-warm-orange">10%</span>
                </motion.div>
              </motion.div>
            )}

            {/* Fee Breakdown */}
            {showFeeBreakdown && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-400">6.9%</span>
                    </div>
                    <span className="text-lg text-yellow-400 font-medium">→ Jackpot</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-400">2.41%</span>
                    </div>
                    <span className="text-lg text-blue-400 font-medium">→ LP Rewards</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-400">0.69%</span>
                    </div>
                    <span className="text-lg text-orange-400 font-medium">→ Burned</span>
                  </div>
                </motion.div>
              </motion.div>
            )}



            {/* Jackpot Explanation */}
            {showJackpotExplanation && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-4"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Every swap = <span className="text-yellow-400">lottery ticket</span>
                </motion.h2>
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
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="flex items-center justify-center space-x-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="text-2xl font-bold text-blue-400 w-16 text-left">$10</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-blue-400 w-20 text-right">0.004%</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <span className="text-2xl font-bold text-orange-400 w-16 text-left">$100</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-orange-400 w-20 text-right">0.04%</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <span className="text-2xl font-bold text-yellow-400 w-16 text-left">$1K</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-yellow-400 w-20 text-right">0.4%</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <span className="text-2xl font-bold text-orange-500 w-16 text-left">$10K</span>
                    <span className="text-lg text-soft-gray">=</span>
                    <span className="text-xl font-medium text-orange-500 w-20 text-right">4%</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* VRF Details */}
            {showVRFDetails && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-2xl font-light mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Provably fair with <span className="text-yellow-400">OmniDragonRandomness</span>
                </motion.h2>
                <motion.p
                  className="text-lg text-soft-gray"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Chainlink VRF2.5 + LayerZero + drand aggregation
                </motion.p>
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