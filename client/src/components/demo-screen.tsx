import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepContent from "@/components/step-content";
import { demoSteps } from "@/lib/demo-steps";

export default function DemoScreen() {
  const [showBlackScreen, setShowBlackScreen] = useState(true);
  const [showReadyText, setShowReadyText] = useState(false);
  const [showPoolIntro, setShowPoolIntro] = useState(false);
  const [showPoolTokens, setShowPoolTokens] = useState(false);
  const [showSwapDemo, setShowSwapDemo] = useState(false);
  const [showFeeIntro, setShowFeeIntro] = useState(false);
  const [showFeeDestination, setShowFeeDestination] = useState(false);
  const [showLotteryExplanation, setShowLotteryExplanation] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show "Ready to see..." text after 1 second
    const timer1 = setTimeout(() => {
      setShowReadyText(true);
    }, 1000);

    // Show pool intro after 4 seconds
    const timer2 = setTimeout(() => {
      setShowPoolIntro(true);
    }, 4000);

    // Show pool tokens after 6 seconds
    const timer3 = setTimeout(() => {
      setShowPoolTokens(true);
    }, 6000);

    // Show swap demo after 9 seconds
    const timer4 = setTimeout(() => {
      setShowSwapDemo(true);
    }, 9000);

    // Show fee intro after 12 seconds
    const timer5 = setTimeout(() => {
      setShowFeeIntro(true);
    }, 12000);

    // Show fee destination after 15 seconds
    const timer6 = setTimeout(() => {
      setShowFeeDestination(true);
    }, 15000);

    // Show lottery explanation after 18 seconds
    const timer7 = setTimeout(() => {
      setShowLotteryExplanation(true);
    }, 18000);

    // Hide black screen and show demo after 22 seconds
    const timer8 = setTimeout(() => {
      setShowBlackScreen(false);
      setShowDemo(true);
    }, 22000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
    };
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
            {showReadyText && !showPoolIntro && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-light mb-4">
                  Ready to see how Sonic Red Dragon works?
                </h2>
                <motion.div
                  className="w-16 h-0.5 bg-warm-orange mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </motion.div>
            )}

            {showPoolIntro && !showSwapDemo && (
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
                  This is a liquidity pool containing SONIC and DRAGON
                </motion.h2>

                {/* Liquidity Pool Visualization */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="relative">
                    {/* Pool Container */}
                    <motion.div
                      className="w-80 h-48 rounded-3xl bg-gradient-to-br from-dark-surface/80 to-charcoal/60 border border-gray-700/50 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    >
                      {/* Pool Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-golden-amber/10 to-dragon-red/10 animate-pulse" />
                      
                      {/* Pool Label */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        <span className="text-sm font-medium text-soft-gray">Liquidity Pool</span>
                      </div>

                      {/* Token Animations */}
                      {showPoolTokens && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* SONIC Token */}
                          <motion.div
                            className="absolute"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: -40, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div className="w-16 h-16 rounded-full bg-black/50 border-2 border-electric-blue/50 flex items-center justify-center">
                                <img
                                  src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                                  alt="SONIC Token"
                                  className="w-10 h-10"
                                />
                              </div>
                              <span className="text-xs font-medium text-electric-blue">SONIC</span>
                            </div>
                          </motion.div>

                          {/* Connection Line */}
                          <motion.div
                            className="w-16 h-0.5 bg-gradient-to-r from-electric-blue/50 to-dragon-red/50"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                          />

                          {/* DRAGON Token */}
                          <motion.div
                            className="absolute"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 40, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div className="w-16 h-16 rounded-full bg-black/50 border-2 border-dragon-red/50 flex items-center justify-center">
                                <img
                                  src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                                  alt="DRAGON Token"
                                  className="w-10 h-10"
                                />
                              </div>
                              <span className="text-xs font-medium text-dragon-red">DRAGON</span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Explanatory Text */}
                {showPoolTokens && (
                  <motion.p
                    className="text-soft-gray text-lg max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                  >
                    These tokens are paired together, allowing seamless exchanges between them
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Swap Demo Section */}
            {showSwapDemo && !showFeeIntro && (
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
                  Users can swap SONIC to DRAGON
                </motion.h2>

                {/* Swap Visualization */}
                <motion.div
                  className="flex justify-center items-center space-x-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {/* SONIC Token */}
                  <motion.div
                    className="flex flex-col items-center space-y-3"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-black/50 border-2 border-electric-blue/50 flex items-center justify-center">
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                        alt="SONIC Token"
                        className="w-12 h-12"
                      />
                    </div>
                    <span className="text-sm font-medium text-electric-blue">100 SONIC</span>
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="w-16 h-0.5 bg-gradient-to-r from-electric-blue to-dragon-red"></div>
                    <div className="w-0 h-0 border-l-8 border-l-dragon-red border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </motion.div>

                  {/* DRAGON Token */}
                  <motion.div
                    className="flex flex-col items-center space-y-3"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-black/50 border-2 border-dragon-red/50 flex items-center justify-center">
                      <img
                        src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                        alt="DRAGON Token"
                        className="w-12 h-12"
                      />
                    </div>
                    <span className="text-sm font-medium text-dragon-red">90 DRAGON</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Fee Introduction Section */}
            {showFeeIntro && !showFeeDestination && (
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
                  But on DRAGON, things work slightly differently
                </motion.h2>

                <motion.p
                  className="text-warm-orange text-xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  There is a 10% fee on all swaps
                </motion.p>
              </motion.div>
            )}

            {/* Fee Destination Section */}
            {showFeeDestination && !showLotteryExplanation && (
              <motion.div
                className="text-center space-y-8"
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
                  Where do the fees go?
                </motion.h2>

                {/* Fee Flow Visualization */}
                <motion.div
                  className="flex justify-center items-center space-x-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-warm-orange/20 border-2 border-warm-orange/50 flex items-center justify-center mb-2">
                      <span className="text-warm-orange font-bold text-lg">10%</span>
                    </div>
                    <span className="text-xs text-soft-gray">Swap Fee</span>
                  </div>

                  <motion.div
                    className="w-8 h-0.5 bg-warm-orange"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-golden-amber/20 border-2 border-golden-amber/50 flex items-center justify-center mb-2">
                      <span className="text-golden-amber font-bold text-sm">🎰</span>
                    </div>
                    <span className="text-xs text-soft-gray">Jackpot Pool</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Lottery Explanation Section */}
            {showLotteryExplanation && (
              <motion.div
                className="text-center space-y-6 max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.h2 
                  className="text-3xl font-light mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Why is there a 10% fee?
                </motion.h2>

                <motion.p
                  className="text-xl text-soft-gray leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  All swaps are entered into a lottery system. Each person who swaps gets an individualized chance at the jackpot, with larger swaps having better odds.
                </motion.p>

                {/* Lottery Visual */}
                <motion.div
                  className="flex justify-center items-center space-x-8 mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-electric-blue/20 border-2 border-electric-blue/50 flex items-center justify-center mb-2">
                      <span className="text-electric-blue font-bold text-sm">Small<br/>Swap</span>
                    </div>
                    <span className="text-xs text-soft-gray">Lower Odds</span>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-warm-orange/20 border-2 border-warm-orange/50 flex items-center justify-center mb-2">
                      <span className="text-warm-orange font-bold text-sm">Large<br/>Swap</span>
                    </div>
                    <span className="text-xs text-soft-gray">Higher Odds</span>
                  </div>

                  <div className="text-center">
                    <div className="w-28 h-28 rounded-full bg-golden-amber/20 border-2 border-golden-amber/50 flex items-center justify-center mb-2 animate-pulse">
                      <span className="text-golden-amber font-bold text-lg">💎<br/>JACKPOT</span>
                    </div>
                    <span className="text-xs text-soft-gray">Prize Pool</span>
                  </div>
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
