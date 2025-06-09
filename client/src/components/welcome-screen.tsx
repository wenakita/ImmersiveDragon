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
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(41, 27, 12, 0.4) 0%, rgba(0, 0, 0, 0.9) 70%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="subtle-border rounded-3xl p-8 max-w-md w-full text-center"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Dragon Logo with Golden Glow */}
        <motion.div
          className="relative mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <img
              src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
              alt="Sonic Red Dragon Logo"
              className="dragon-logo-glow w-24 h-24 rounded-full object-cover cursor-pointer"
              onClick={() => handleClick("dragon-logo")}
            />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Welcome to Sonic Red Dragon
        </motion.h1>

        <motion.p
          className="text-soft-gray text-sm leading-relaxed mb-8"
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
          className="flex items-start gap-3 mb-8 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              id="termsAccept"
              className="sr-only"
              checked={termsAccepted}
              onChange={(e) => onTermsChange(e.target.checked)}
            />
            <motion.div
              className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${
                termsAccepted
                  ? "bg-electric-blue border-electric-blue"
                  : "border-electric-blue bg-transparent"
              }`}
              onClick={() => onTermsChange(!termsAccepted)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {termsAccepted && (
                <motion.svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </motion.div>
          </div>
          <label htmlFor="termsAccept" className="text-sm cursor-pointer">
            I accept the terms and conditions for OmniDragon Protocol listed on
            the{" "}
            <span
              className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              onClick={() => handleClick("terms-link")}
            >
              Terms of Service
            </span>{" "}
            page and the{" "}
            <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
          </label>
        </motion.div>

        {/* See Demo Button */}
        <motion.button
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            termsAccepted
              ? "gradient-button hover:scale-105 cursor-pointer"
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
          <Play className="w-4 h-4" />
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
