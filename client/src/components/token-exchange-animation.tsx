import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { getAssetUrl } from "@/lib/assets";

interface TokenExchangeAnimationProps {
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  delay?: number;
  duration?: number;
  showTradeIndicators?: boolean;
  showFeeBreakdown?: boolean;
  scale?: number;
  repeat?: boolean;
  index?: number;
}

export default function TokenExchangeAnimation({
  containerStyle = {},
  containerClassName = "",
  delay = 0,
  duration = 2.8,
  showTradeIndicators = false,
  showFeeBreakdown = false,
  scale = 1,
  repeat = true,
  index = 0
}: TokenExchangeAnimationProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const sonicControls = useAnimation();
  const dragonControls = useAnimation();
  const burstControls = useAnimation();

  const runCleanSwapAnimation = useCallback(async () => {
    // Reset to initial positions
    await Promise.all([
      sonicControls.set({ 
        x: -180, 
        y: 0, 
        opacity: 0, 
        scale: 0.6, 
        rotate: 0,
        filter: 'blur(2px)'
      }),
      dragonControls.set({ 
        x: 180, 
        y: 0, 
        opacity: 0, 
        scale: 0.6, 
        rotate: 0,
        filter: 'blur(2px)'
      }),
      burstControls.set({ scale: 0, opacity: 0 })
    ]);

    // Phase 1: Tokens appear and converge toward center
    const convergencePromise = Promise.all([
      sonicControls.start({
        x: -10,
        y: 0,
        opacity: 1,
        scale: 1.1,
        rotate: 270,
        filter: 'blur(0px)',
        transition: { 
          duration: 1.0,
          ease: [0.25, 0.1, 0.25, 1.0] // Smooth ease-out
        }
      }),
      dragonControls.start({
        x: 10,
        y: 0,
        opacity: 1,
        scale: 1.1,
        rotate: -270,
        filter: 'blur(0px)',
        transition: { 
          duration: 1.0,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      })
    ]);

    await convergencePromise;

    // Phase 2: Brief moment at center with energy burst
    const centerMomentPromise = Promise.all([
      sonicControls.start({
        scale: 1.2,
        x: 0,
        transition: { duration: 0.15, ease: "easeOut" }
      }),
      dragonControls.start({
        scale: 1.2,
        x: 0,
        transition: { duration: 0.15, ease: "easeOut" }
      }),
      burstControls.start({
        scale: [0, 2.5, 0],
        opacity: [0, 0.9, 0],
        transition: { 
          duration: 0.8, 
          ease: [0.19, 1.0, 0.22, 1.0] // Smooth burst
        }
      })
    ]);

    await centerMomentPromise;

    // Phase 3: Accelerated divergence exit
    await Promise.all([
      sonicControls.start({
        x: 250,
        y: -40,
        opacity: 0,
        scale: 0.4,
        rotate: 720,
        filter: 'blur(4px)',
        transition: { 
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1] // Sharp acceleration curve
        }
      }),
      dragonControls.start({
        x: -250,
        y: 40,
        opacity: 0,
        scale: 0.4,
        rotate: -720,
        filter: 'blur(4px)',
        transition: { 
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }
      })
    ]);
  }, [sonicControls, dragonControls, burstControls]);

  useEffect(() => {
    const startSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, (delay + index * 0.5) * 1000));
      await runCleanSwapAnimation();
    };

    startSequence();

    if (repeat) {
      const interval = setInterval(() => {
        setAnimationKey(prev => prev + 1);
        runCleanSwapAnimation();
      }, (duration + 1.5) * 1000);
      return () => clearInterval(interval);
    }
  }, [delay, duration, repeat, index, runCleanSwapAnimation, animationKey]);

  return (
    <div 
      className={`relative flex items-center justify-center w-full h-32 ${containerClassName}`}
      style={{
        transform: `scale(${scale})`,
        ...containerStyle
      }}
    >
      <AnimatePresence mode="wait">
        {/* Sonic Token */}
        <motion.div
          key={`sonic-${animationKey}-${index}`}
          className="absolute flex items-center justify-center"
          animate={sonicControls}
        >
          <div className="relative">
            <motion.img 
              src={getAssetUrl('S')} 
              alt="Sonic Token" 
              className="w-24 h-24 rounded-full border-3 border-blue-300/60"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))',
                willChange: 'transform, filter'
              }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4))'
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* Dragon Token */}
        <motion.div
          key={`dragon-${animationKey}-${index}`}
          className="absolute flex items-center justify-center"
          animate={dragonControls}
        >
          <div className="relative">
            <motion.img 
              src={getAssetUrl('DRAGON')} 
              alt="Dragon Token" 
              className="w-24 h-24 rounded-full border-3 border-amber-300/60"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))',
                willChange: 'transform, filter'
              }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 180deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.4), rgba(251, 191, 36, 0.4))'
              }}
              animate={{
                rotate: [0, -360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* Enhanced Energy Burst at Center */}
        <motion.div
          key={`burst-${animationKey}-${index}`}
          className="absolute flex items-center justify-center"
          animate={burstControls}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-radial from-white via-purple-300 to-transparent opacity-80 blur-md" />
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-radial from-cyan-200 via-blue-300 to-transparent opacity-60 blur-sm" />
            <motion.div 
              className="absolute inset-0 w-24 h-24 border-2 border-white/60 rounded-full -translate-x-1 -translate-y-1"
              animate={{
                scale: [1, 2.5, 4],
                opacity: [0.6, 0.3, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 w-28 h-28 border border-blue-200/40 rounded-full -translate-x-2 -translate-y-2"
              animate={{
                scale: [1, 3, 5],
                opacity: [0.4, 0.2, 0],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
                delay: 0.1
              }}
            />
          </div>
        </motion.div>

        {/* Modern Trade Indicators */}
        {showTradeIndicators && (
          <>
            <motion.div
              className="absolute -top-12 left-8 px-4 py-2 bg-green-400/20 border border-green-300/40 rounded-full backdrop-blur-md"
              initial={{ opacity: 0, y: 15, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: delay + 0.8, duration: 0.4 }}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '700'
              }}
            >
              <span className="text-green-200 text-sm tracking-widest">BUY</span>
            </motion.div>
            <motion.div
              className="absolute -top-12 right-8 px-4 py-2 bg-red-400/20 border border-red-300/40 rounded-full backdrop-blur-md"
              initial={{ opacity: 0, y: 15, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: delay + 0.8, duration: 0.4 }}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '700'
              }}
            >
              <span className="text-red-200 text-sm tracking-widest">SELL</span>
            </motion.div>
          </>
        )}

        {/* Premium Fee Breakdown */}
        {showFeeBreakdown && (
          <motion.div
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: delay + 1.2, duration: 0.5 }}
          >
            <div className="flex space-x-6 px-6 py-3 bg-black/30 border border-white/20 rounded-xl backdrop-blur-md">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-yellow-300 text-lg font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  6.9%
                </div>
                <div className="text-yellow-200/80 text-xs font-medium tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  JACKPOT
                </div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-blue-300 text-lg font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  2.41%
                </div>
                <div className="text-blue-200/80 text-xs font-medium tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  LIQUIDITY
                </div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-red-300 text-lg font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  0.69%
                </div>
                <div className="text-red-200/80 text-xs font-medium tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  BURN
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}