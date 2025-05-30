import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepContent from "@/components/step-content";
import { demoSteps } from "@/lib/demo-steps";

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
      setTimeout(() => setShowSwapIntro(true), 5000),
      setTimeout(() => setShowTwist(true), 9000),
      setTimeout(() => setShowFeeDetails(true), 13000),
      setTimeout(() => setShowFeeBreakdown(true), 18000),
      setTimeout(() => setShowSwapExample(true), 23000),
      setTimeout(() => setShowJackpotExplanation(true), 28000),
      setTimeout(() => setShowOddsTable(true), 33000),
      setTimeout(() => setShowVRFDetails(true), 38000),
      setTimeout(() => {
        setShowBlackScreen(false);
        setShowDemo(true);
      }, 43000)
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
            {showReadyText && !showSwapIntro && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-4xl font-light mb-6 bg-gradient-to-r from-white via-warm-orange to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                >
                  Ready to see how Sonic Red Dragon works?
                </motion.h2>
                <motion.div
                  className="w-20 h-0.5 bg-gradient-to-r from-transparent via-warm-orange to-transparent mx-auto"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 80, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-warm-orange/10 to-transparent opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
            )}

            {/* Swap Introduction */}
            {showSwapIntro && !showTwist && (
              <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Users can swap Sonic ($S) for Dragon ($DRAGON)
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-soft-gray"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    like any other ERC-20 token
                  </motion.span>
                </motion.h2>

                {/* Token Swap Visualization */}
                <motion.div
                  className="flex justify-center items-center space-x-12"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 1.8 }}
                >
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-black/50 border-2 border-electric-blue/50 flex items-center justify-center relative"
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(59, 130, 246, 0)",
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                          "0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity, delay: 2.5 }
                      }}
                    >
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                        alt="SONIC Token"
                        className="w-14 h-14"
                      />
                    </motion.div>
                    <motion.span 
                      className="text-lg font-medium text-electric-blue"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.8 }}
                    >
                      $S
                    </motion.span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 3.2 }}
                  >
                    <motion.div
                      className="w-20 h-0.5 bg-gradient-to-r from-electric-blue to-dragon-red"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 3.5 }}
                    />
                    <motion.div
                      className="w-0 h-0 border-l-8 border-l-dragon-red border-t-4 border-t-transparent border-b-4 border-b-transparent"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 4.2 }}
                    />
                  </motion.div>

                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-black/50 border-2 border-dragon-red/50 flex items-center justify-center relative"
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(220, 38, 38, 0)",
                          "0 0 20px rgba(220, 38, 38, 0.3)",
                          "0 0 0 rgba(220, 38, 38, 0)"
                        ]
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity, delay: 3 }
                      }}
                    >
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                        alt="DRAGON Token"
                        className="w-14 h-14"
                      />
                    </motion.div>
                    <motion.span 
                      className="text-lg font-medium text-dragon-red"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 3.1 }}
                    >
                      $DRAGON
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* The Twist */}
            {showTwist && !showFeeDetails && (
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-warm-orange/20 to-transparent"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.h2 
                  className="text-5xl font-light relative z-10"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                >
                  <motion.span
                    className="bg-gradient-to-r from-warm-orange via-golden-amber to-warm-orange bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    But there is a twist.
                  </motion.span>
                </motion.h2>
                <motion.div
                  className="w-32 h-1 bg-gradient-to-r from-transparent via-warm-orange to-transparent mx-auto mt-6"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 128, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
              </motion.div>
            )}

            {/* Fee Details */}
            {showFeeDetails && !showFeeBreakdown && (
              <motion.div
                className="text-center space-y-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-4xl font-light mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    Every transaction incurs a
                  </motion.span>
                  {" "}
                  <motion.span
                    className="text-warm-orange font-semibold inline-block"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  >
                    10% fee
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-2xl text-soft-gray inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                  >
                    whether it is a buy or sell
                  </motion.span>
                </motion.h2>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 2.3 }}
                >
                  <motion.div
                    className="w-24 h-24 rounded-full bg-warm-orange/20 border-4 border-warm-orange/40 flex items-center justify-center mx-auto relative"
                    animate={{ 
                      rotate: 360,
                      boxShadow: [
                        "0 0 0 0 rgba(255, 107, 53, 0.3)",
                        "0 0 0 20px rgba(255, 107, 53, 0)",
                      ]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 2, repeat: Infinity, delay: 2.5 }
                    }}
                  >
                    <span className="text-3xl font-bold text-warm-orange">10%</span>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-xl text-soft-gray leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 3 }}
                >
                  This fee is implemented to fund the jackpot and reward locked liquidity providers
                </motion.p>
              </motion.div>
            )}

            {/* Fee Breakdown */}
            {showFeeBreakdown && !showSwapExample && (
              <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  The 10% fee is split into:
                </motion.h2>

                <motion.div
                  className="grid grid-cols-3 gap-6 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-golden-amber/20 border-2 border-golden-amber/50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-golden-amber font-bold text-lg">6.9%</span>
                    </div>
                    <p className="text-sm text-golden-amber font-medium">($S) to Jackpot</p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-electric-blue/20 border-2 border-electric-blue/50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-electric-blue font-bold text-lg">2.41%</span>
                    </div>
                    <p className="text-sm text-electric-blue font-medium">($S) to Locked LP</p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-dragon-red/20 border-2 border-dragon-red/50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-dragon-red font-bold text-lg">0.69%</span>
                    </div>
                    <p className="text-sm text-dragon-red font-medium">($DRAGON) Burned</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Swap Example */}
            {showSwapExample && !showJackpotExplanation && (
              <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  So if a user swaps $100 worth of $S, they should expect to receive about $90 in $DRAGON
                </motion.h2>

                <motion.div
                  className="flex justify-center items-center space-x-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-electric-blue/20 border-2 border-electric-blue/50 flex items-center justify-center mb-3">
                      <span className="text-electric-blue font-bold text-xl">$100</span>
                    </div>
                    <p className="text-sm text-electric-blue">$S Input</p>
                  </div>

                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <div className="w-20 h-0.5 bg-gradient-to-r from-electric-blue to-dragon-red"></div>
                    <div className="w-0 h-0 border-l-8 border-l-dragon-red border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </motion.div>

                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-dragon-red/20 border-2 border-dragon-red/50 flex items-center justify-center mb-3">
                      <span className="text-dragon-red font-bold text-xl">$90</span>
                    </div>
                    <p className="text-sm text-dragon-red">$DRAGON Output</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Jackpot Explanation */}
            {showJackpotExplanation && !showOddsTable && (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Why would anyone do this?
                </motion.h2>

                <motion.p
                  className="text-xl text-golden-amber font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Any buy above $10 enters a user into their own individualized chance to win the jackpot!
                </motion.p>
              </motion.div>
            )}

            {/* Odds Table */}
            {showOddsTable && !showVRFDetails && (
              <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2 
                  className="text-2xl font-light mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Jackpot Odds by Swap Amount
                </motion.h2>

                <motion.div
                  className="grid grid-cols-2 gap-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="bg-dark-surface/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-electric-blue mb-2">$10</div>
                    <div className="text-sm text-soft-gray">0.004% chance</div>
                  </div>

                  <div className="bg-dark-surface/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-warm-orange mb-2">$100</div>
                    <div className="text-sm text-soft-gray">0.04% chance</div>
                  </div>

                  <div className="bg-dark-surface/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-2xl font-bold text-golden-amber mb-2">$1,000</div>
                    <div className="text-sm text-soft-gray">0.4% chance</div>
                  </div>

                  <div className="bg-dark-surface/50 rounded-xl p-4 border border-dragon-red/50">
                    <div className="text-2xl font-bold text-dragon-red mb-2">$10,000</div>
                    <div className="text-sm text-soft-gray">4% chance</div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* VRF Details */}
            {showVRFDetails && (
              <motion.div
                className="text-center space-y-6 max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.h2 
                  className="text-2xl font-light mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  This chance is determined via Chainlink VRF2.5 on Arbitrum using LayerZero messaging
                </motion.h2>

                <motion.p
                  className="text-lg text-soft-gray leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  In addition to drand's League of Entropy, EVMnet and quicknet all aggregated into our VRF aggregator which we call <span className="text-golden-amber font-medium">OmniDragonRandomness</span>
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