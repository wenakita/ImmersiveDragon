import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEasterEggs } from "../hooks/use-easter-eggs";
import { useIsMobile } from "../hooks/use-mobile";
import { getAssetUrl } from "@/lib/assets";
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
        {/* Clean Dragon Logo with Faint Glow */}
        <motion.div
          className="relative mb-8 flex justify-center"
          initial={{ scale: 0.6, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Background Glow - Centered Behind Token */}
            <motion.div
              className={`absolute rounded-full ${
                isMobile ? "w-32 h-32" : "w-40 h-40"
              }`}
              style={{
                background: "radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)",
                filter: "blur(12px)",
                zIndex: 0
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Dragon Token - Centered On Top */}
            <motion.img
              src={getAssetUrl('DRAGON')}
              alt="Dragon Token"
              className={`rounded-full object-cover cursor-pointer ${
                isMobile ? "w-24 h-24" : "w-32 h-32"
              }`}
              style={{ zIndex: 10 }}
              onClick={() => handleClick("dragon-logo")}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }
              }}
              whileTap={{ scale: 0.95 }}
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
          <div className="relative mt-1">
            <input
              type="checkbox"
              id="termsAccept"
              className="sr-only"
              checked={termsAccepted}
              onChange={(e) => onTermsChange(e.target.checked)}
            />
            <motion.div
              className={`relative cursor-pointer flex items-center justify-center transition-all duration-300 ${
                isMobile ? "w-7 h-7" : "w-6 h-6"
              }`}
              onClick={() => onTermsChange(!termsAccepted)}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2, ease: [0.68, -0.55, 0.265, 1.55] }
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Elegant Glass Background */}
              <motion.div
                className={`absolute inset-0 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                  termsAccepted
                    ? "bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    : "bg-white/5 border-gray-400/30 hover:border-blue-400/40"
                }`}
                animate={termsAccepted ? {
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.4)",
                    "0 0 30px rgba(59, 130, 246, 0.6)",
                    "0 0 20px rgba(59, 130, 246, 0.4)"
                  ]
                } : {}}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Checkmark with Smooth Animation */}
              {termsAccepted && (
                <motion.svg
                  className={`relative z-10 text-blue-100 ${isMobile ? "w-4 h-4" : "w-3.5 h-3.5"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.3,
                    rotate: -90
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.1,
                      ease: "easeOut" 
                    }}
                  />
                </motion.svg>
              )}
            </motion.div>
          </div>
          <label htmlFor="termsAccept" className={`cursor-pointer opacity-75 ${
            isMobile ? "text-[9px]" : "text-[10px]"
          }`}>
            I accept the terms and conditions for OmniDragon Protocol listed on the<span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer" onClick={() => handleClick("terms-link")}>Terms of Service</span>page and the<span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">Privacy Policy</span>
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

        {/* Hidden Easter Egg Counter - Removed yellow circle */}
        {triggeredCount > 0 && (
          <motion.div
            className="absolute bottom-4 left-4 text-xs text-amber-200/60 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {triggeredCount}/4 dragons awakened
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
