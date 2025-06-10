import { motion } from "framer-motion";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { demoSteps } from "@/lib/demo-steps";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAssetUrl } from "@/lib/assets";
import { useState } from "react";

interface StepContentProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  totalSteps: number;
}

export default function StepContent({ currentStep, onStepChange, totalSteps }: StepContentProps) {
  const [fromAmount, setFromAmount] = useState("100");
  const [toAmount, setToAmount] = useState("75.5");
  const isMobile = useIsMobile();
  
  const step = demoSteps[currentStep];

  const calculateToAmount = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    const rate = 0.755; // 1 SONIC = 0.755 DRAGON
    return (numAmount * rate).toFixed(1);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className={`space-y-8 ${isMobile ? "mobile-container" : ""}`}>
      {/* Main Swap Card */}
      <motion.div
        className={`bg-dark-surface/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl ${
          isMobile ? "p-4 mx-2" : "p-8"
        }`}
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Current Step Display */}
        <div className={isMobile ? "mb-6" : "mb-8"}>
          <div className={`flex items-center gap-3 ${isMobile ? "mb-4" : "mb-6"}`}>
            <div className={`rounded-full bg-warm-orange/20 border border-warm-orange/30 flex items-center justify-center ${
              isMobile ? "w-7 h-7" : "w-8 h-8"
            }`}>
              <span className={`text-warm-orange font-semibold ${
                isMobile ? "text-xs" : "text-sm"
              }`}>
                {currentStep + 1}
              </span>
            </div>
            <h2 className={`font-semibold ${
              isMobile ? "text-lg mobile-text-lg" : "text-xl"
            }`}>{step.title}</h2>
          </div>
          
          <p className={`text-soft-gray ${
            isMobile ? "mb-4 mobile-text-sm" : "mb-6"
          }`}>{step.description}</p>
        </div>

        {/* Token Selection Interface */}
        <div className={isMobile ? "space-y-4" : "space-y-6"}>
          {/* From Token */}
          <div className="space-y-3">
            <label className={`font-medium text-soft-gray ${
              isMobile ? "text-sm mobile-text-sm" : "text-sm"
            }`}>From</label>
            <div className={`bg-black/30 border border-gray-700/50 rounded-xl hover:border-gray-600/50 transition-colors touch-target ${
              isMobile ? "p-3" : "p-4"
            }`}>
              <div className={`flex items-center ${
                isMobile ? "flex-col space-y-3" : "justify-between"
              }`}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }
                    }}
                  >
                    <motion.img
                      src={getAssetUrl('S')}
                      alt="SONIC Token"
                      className={`rounded-full border-2 border-blue-400/60 ${
                        isMobile ? "w-12 h-12" : "w-10 h-10"
                      }`}
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))',
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 30px rgba(59, 130, 246, 0.4)",
                          "0 0 40px rgba(59, 130, 246, 0.6)",
                          "0 0 30px rgba(59, 130, 246, 0.4)"
                        ]
                      }}
                      transition={{
                        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                    />
                  </motion.div>
                  <div>
                    <motion.div 
                      className={`font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent ${
                        isMobile ? "text-base" : ""
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      SONIC
                    </motion.div>
                    <motion.div 
                      className={`text-blue-200/80 font-light ${
                        isMobile ? "text-xs" : "text-xs"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      Speed Token
                    </motion.div>
                  </div>
                </div>
                <div className={`text-right ${isMobile ? "w-full" : ""}`}>
                  <input
                    type="text"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                    className={`bg-transparent text-right font-semibold border-none outline-none touch-target ${
                      isMobile 
                        ? "text-lg w-full text-center" 
                        : "text-xl w-32"
                    }`}
                  />
                  <div className={`text-soft-gray ${
                    isMobile 
                      ? "text-xs mobile-text-sm text-center" 
                      : "text-xs"
                  }`}>≈ $250.00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Swap Direction with Token Animation */}
          <div className="flex justify-center relative">
            <motion.button
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-400/40 flex items-center justify-center backdrop-blur-md"
              whileHover={{ 
                scale: 1.15,
                rotate: 180,
                transition: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                  "0 0 30px rgba(251, 191, 36, 0.5)",
                  "0 0 20px rgba(251, 191, 36, 0.3)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <ArrowUpDown className="w-5 h-5 text-amber-300" />
            </motion.button>
            
            {/* Floating particles around swap button */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                style={{
                  left: `${50 + Math.cos(i * 90 * Math.PI / 180) * 30}%`,
                  top: `${50 + Math.sin(i * 90 * Math.PI / 180) * 30}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              />
            ))}
          </div>

          {/* To Token - Enhanced with Dragon Asset */}
          <div className="space-y-3">
            <label className={`font-medium text-soft-gray ${
              isMobile ? "text-sm" : "text-sm"
            }`}>To</label>
            <div className={`bg-black/30 border border-gray-700/50 rounded-xl hover:border-amber-600/50 transition-all duration-300 ${
              isMobile ? "p-3" : "p-4"
            }`}>
              <div className={`flex items-center ${
                isMobile ? "flex-col space-y-3" : "justify-between"
              }`}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }
                    }}
                  >
                    <motion.img
                      src={getAssetUrl('DRAGON')}
                      alt="DRAGON Token"
                      className={`rounded-full border-2 border-amber-400/60 ${
                        isMobile ? "w-12 h-12" : "w-10 h-10"
                      }`}
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                        boxShadow: "0 0 30px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 30px rgba(251, 191, 36, 0.4)",
                          "0 0 40px rgba(251, 191, 36, 0.6)",
                          "0 0 30px rgba(251, 191, 36, 0.4)"
                        ]
                      }}
                      transition={{
                        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                    />
                  </motion.div>
                  <div>
                    <motion.div 
                      className={`font-semibold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent ${
                        isMobile ? "text-base" : ""
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      DRAGON
                    </motion.div>
                    <motion.div 
                      className={`text-amber-200/80 font-light ${
                        isMobile ? "text-xs" : "text-xs"
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      Power Token
                    </motion.div>
                  </div>
                </div>
                <div className={`text-right ${isMobile ? "w-full" : ""}`}>
                  <motion.div 
                    className={`font-semibold text-amber-200 ${
                      isMobile ? "text-lg text-center" : "text-xl"
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    animate={{
                      color: [
                        "rgb(253 230 138)", // amber-200
                        "rgb(251 191 36)",  // amber-400
                        "rgb(253 230 138)"
                      ]
                    }}
                    transition={{
                      color: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    {toAmount}
                  </motion.div>
                  <div className={`text-amber-300/60 font-light ${
                    isMobile ? "text-xs text-center" : "text-xs"
                  }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    ≈ $249.82
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="bg-black/20 border border-gray-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-soft-gray">Exchange Rate</span>
              <span>1 SONIC = 0.755 DRAGON</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className="w-full mt-8 py-4 px-6 rounded-xl font-semibold text-white gradient-button transition-all duration-300"
          onClick={handleNextStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentStep === totalSteps - 1 ? "Complete Demo" : "Continue to Next Step"}
        </motion.button>
      </motion.div>

      {/* Educational Content */}
      <motion.div
        className="bg-dark-surface/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-warm-orange">
          {step.educationalTitle}
        </h3>
        <div className="space-y-3 text-sm text-soft-gray leading-relaxed">
          {step.educationalContent.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <motion.button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            currentStep === 0
              ? 'opacity-50 cursor-not-allowed bg-gray-700'
              : 'bg-dark-surface hover:bg-gray-700'
          }`}
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </motion.button>

        <div className="text-sm text-soft-gray">
          Step {currentStep + 1} of {totalSteps}
        </div>

        <motion.button
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium gradient-button"
          onClick={handleNextStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentStep === totalSteps - 1 ? "Complete" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
