import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEasterEggs } from "../hooks/use-easter-eggs";
import { useIsMobile } from "../hooks/use-mobile";
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
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center mobile-container no-select"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(41, 27, 12, 0.4) 0%, rgba(0, 0, 0, 0.9) 70%)",
        padding: isMobile ? "1rem" : "1.5rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={`subtle-border rounded-3xl text-center ${
          isMobile 
            ? "p-6 max-w-sm w-full mx-4" 
            : "p-8 max-w-md w-full"
        }`}
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
              className={`dragon-logo-glow rounded-full object-cover cursor-pointer touch-target ${
                isMobile ? "w-20 h-20" : "w-24 h-24"
              }`}
              onClick={() => handleClick("dragon-logo")}
            />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          className={`font-semibold mb-4 ${
            isMobile ? "text-xl mobile-text-lg" : "text-2xl"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Welcome to Sonic Red Dragon
        </motion.h1>

        <motion.p
          className={`text-soft-gray leading-relaxed mb-8 ${
            isMobile ? "text-sm mobile-text-sm" : "text-sm"
          }`}
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
          className={`flex items-start gap-3 mb-8 text-left ${
            isMobile ? "mobile-spacing" : ""
          }`}
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
              className={`border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200 touch-target ${
                isMobile ? "w-6 h-6" : "w-5 h-5"
              } ${
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
          <label htmlFor="termsAccept" className={`cursor-pointer ${
            isMobile ? "text-sm mobile-text-sm" : "text-sm"
          }`}>
            I accept the terms and conditions for OmniDragon Protocol listed on
            the{" "}
            <span
              className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer touch-target"
              onClick={() => handleClick("terms-link")}
            >
              Terms of Service
            </span>{" "}
            page and the{" "}
            <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer touch-target">
              Privacy Policy
            </span>
          </label>
        </motion.div>

        {/* See Demo Button */}
        <motion.button
          className={`w-full font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-lg touch-target ${
            isMobile ? "py-4 px-6 text-base" : "py-3 px-6"
          } ${
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
          <Play className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
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
