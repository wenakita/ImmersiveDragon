import { motion } from "framer-motion";

interface WelcomeScreenProps {
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
  onStartDemo: () => void;
}

export default function WelcomeScreen({
  termsAccepted,
  onTermsChange,
  onStartDemo,
}: WelcomeScreenProps) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center max-w-4xl mx-auto px-8">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          SONIC RED DRAGON
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Experience the future of DeFi trading with VRF-powered jackpots
        </motion.p>

        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => onTermsChange(e.target.checked)}
              className="mr-3 w-5 h-5"
            />
            <span className="text-gray-300">
              I agree to the terms and conditions
            </span>
          </label>
        </motion.div>

        <motion.button
          onClick={onStartDemo}
          disabled={!termsAccepted}
          className={`px-8 py-4 text-xl font-bold rounded-lg transition-all duration-300 ${
            termsAccepted
              ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={termsAccepted ? { scale: 1.05 } : {}}
          whileTap={termsAccepted ? { scale: 0.95 } : {}}
        >
          START DEMO
        </motion.button>
      </div>
    </motion.div>
  );
}