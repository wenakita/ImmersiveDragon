import { motion } from "framer-motion";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { demoSteps } from "@/lib/demo-steps";
import { useIsMobile } from "@/hooks/use-mobile";
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
                  <img
                    src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                    alt="SONIC Token"
                    className={isMobile ? "w-10 h-10 token-mobile-size" : "w-8 h-8"}
                  />
                  <div>
                    <div className={`font-medium ${
                      isMobile ? "text-base" : ""
                    }`}>SONIC</div>
                    <div className={`text-soft-gray ${
                      isMobile ? "text-xs mobile-text-sm" : "text-xs"
                    }`}>Sonic Token</div>
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

          {/* Swap Direction */}
          <div className="flex justify-center">
            <motion.button
              className="w-10 h-10 rounded-full bg-dark-surface border border-gray-700/50 flex items-center justify-center hover:border-warm-orange/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpDown className="w-4 h-4 text-warm-orange" />
            </motion.button>
          </div>

          {/* To Token */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-soft-gray">To</label>
            <div className="bg-black/30 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                    alt="DRAGON Token"
                    className="w-8 h-8"
                  />
                  <div>
                    <div className="font-medium">DRAGON</div>
                    <div className="text-xs text-soft-gray">Red Dragon Token</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold">{toAmount}</div>
                  <div className="text-xs text-soft-gray">≈ $249.82</div>
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
