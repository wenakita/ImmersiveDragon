import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEasterEggs } from "../hooks/use-easter-eggs";
import EasterEggHints from "./easter-egg-hints";
import EasterEggRewards from "./easter-egg-rewards";

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
  const { easterEggs, showEasterEggNotification, handleClick, triggeredCount } =
    useEasterEggs();
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Simple Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(41, 27, 12, 0.4) 0%, rgba(0, 0, 0, 0.9) 70%)",
        }}
      />

      <motion.div
        className="subtle-border rounded-3xl p-6 sm:p-8 max-w-md w-full text-center"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Dragon Logo with Golden Glow */}
        <motion.div
          className="relative mb-6 sm:mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <img
              src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
              alt="Sonic Red Dragon Logo"
              className="dragon-logo-glow w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover cursor-pointer"
              onClick={() => handleClick("dragon-logo")}
            />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Welcome to Sonic Red Dragon
        </motion.h1>

        <motion.p
          className="text-soft-gray text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          A cutting-edge blockchain protocol designed to revolutionize token
          swaps with provably fair jackpot mechanics via cross-chain VRF,
          providing an immersive financial gaming experience.
        </motion.p>

        {/* Terms Checkbox */}
        <motion.div
          className="flex items-start gap-2.5 sm:gap-3 mb-6 sm:mb-8 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              id="termsAccept"
              className="sr-only"
              checked={termsAccepted}
              onChange={(e) => onTermsChange(e.target.checked)}
            />
            <motion.div
              className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 ${
                termsAccepted
                  ? "bg-gradient-to-r from-electric-blue to-cyan-400 border-electric-blue shadow-lg shadow-electric-blue/30"
                  : "border-electric-blue/60 bg-transparent hover:border-electric-blue hover:bg-electric-blue/5"
              }`}
              onClick={() => onTermsChange(!termsAccepted)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {termsAccepted && (
                <motion.svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 25 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3.5}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </motion.div>
          </div>
          <label htmlFor="termsAccept" className="text-xs sm:text-sm cursor-pointer leading-relaxed">
            I accept the terms and conditions for OmniDragon Protocol listed on
            the{" "}
            <span
              className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
              onClick={() => handleClick("terms-link")}
            >
              Terms of Service
            </span>{" "}
            page and the{" "}
            <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer underline decoration-dotted underline-offset-2">
              Privacy Policy
            </span>
          </label>
        </motion.div>

        {/* See Demo Button */}
        <motion.button
          className={`w-full py-3 sm:py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
            termsAccepted
              ? "gradient-button hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
              : "opacity-50 cursor-not-allowed bg-gray-600"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          onClick={onStartDemo}
          disabled={!termsAccepted}
          whileHover={termsAccepted ? { scale: 1.02 } : {}}
          whileTap={termsAccepted ? { scale: 0.98 } : {}}
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
          Play Demo
        </motion.button>

        {/* Hidden Easter Egg Counter */}
        {triggeredCount > 0 && (
          <motion.div
            className="absolute bottom-4 left-4 text-xs text-yellow-400 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            🐉 {triggeredCount}/4 dragons awakened
          </motion.div>
        )}
      </motion.div>

      {/* Easter Egg Notification */}
      {showEasterEggNotification && (
        <div className="easter-egg-notification">
          🐉 Easter Egg Unlocked: {showEasterEggNotification}!
        </div>
      )}

      {/* Easter Egg Rewards */}
      <EasterEggRewards
        triggeredCount={triggeredCount}
        easterEggs={easterEggs}
      />
    </motion.div>
  );
}
