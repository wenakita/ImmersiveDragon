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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typewriter text="Swap $S for $DRAGON" delay={300} speed={70} />
                </motion.h2>

                <motion.div
                  className="flex justify-center items-center space-x-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-electric-blue/20 border border-electric-blue/50 flex items-center justify-center">
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="SONIC Token"
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-electric-blue to-dragon-red"></div>
                  <div className="w-16 h-16 rounded-full bg-dragon-red/20 border border-dragon-red/50 flex items-center justify-center">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typewriter text="But there's a twist" delay={300} speed={80} />
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typewriter text="10% fee on all swaps" delay={300} speed={70} className="text-warm-orange font-semibold" />
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
                    <div className="w-16 h-16 rounded-full bg-golden-amber/20 border-2 border-golden-amber/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-golden-amber">6.9%</span>
                    </div>
                    <span className="text-lg text-golden-amber font-medium">→ Jackpot</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-electric-blue/20 border-2 border-electric-blue/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-electric-blue">2.41%</span>
                    </div>
                    <span className="text-lg text-electric-blue font-medium">→ LP Rewards</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-dragon-red/20 border-2 border-dragon-red/50 flex items-center justify-center">
                      <span className="text-sm font-bold text-dragon-red">0.69%</span>
                    </div>
                    <span className="text-lg text-dragon-red font-medium">→ Burned</span>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typewriter text="Every swap = " delay={300} speed={70} />
                  <Typewriter text="lottery ticket" delay={1200} speed={70} className="text-golden-amber" />
                </motion.h2>
                <motion.p
                  className="text-lg text-soft-gray"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
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
                <motion.h2 
                  className="text-2xl font-light mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  $10 = 0.004% • $100 = 0.04% • $1K = 0.4% • $10K = 4%
                </motion.h2>
                <motion.div
                  className="flex justify-center space-x-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-full bg-electric-blue/20 border border-electric-blue/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-electric-blue">$10</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-warm-orange/20 border border-warm-orange/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-warm-orange">$100</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-golden-amber/20 border border-golden-amber/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-golden-amber">$1K</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-dragon-red/20 border border-dragon-red/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-dragon-red">$10K</span>
                  </div>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Provably fair with <span className="text-golden-amber">OmniDragonRandomness</span>
                </motion.h2>
                <motion.p
                  className="text-lg text-soft-gray"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
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