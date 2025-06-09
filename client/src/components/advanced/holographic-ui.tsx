import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useDemoStore, animationState } from '@/stores/demo-store';
import { gsap } from 'gsap';
import { AnimatedCounter } from '@/components/animated-counter';

interface HologramLayer {
  id: string;
  depth: number;
  opacity: number;
  scale: number;
  rotation: number;
  content: React.ReactNode;
  parallax: number;
}

export default function HolographicUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  
  const { 
    sonicPrice, 
    dragonPrice, 
    jackpotAmount, 
    liquidityPool, 
    totalVolume,
    burnedTokens,
    activeTrades,
    lotteryState,
    currentStep 
  } = useDemoStore();
  
  const animSnap = useSnapshot(animationState);
  
  // Advanced holographic layers with depth and parallax
  const hologramLayers = useMemo<HologramLayer[]>(() => [
    {
      id: 'background-field',
      depth: -100,
      opacity: 0.1,
      scale: 1.5,
      rotation: 0,
      parallax: 0.02,
      content: (
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent animate-pulse" />
      ),
    },
    {
      id: 'data-matrix',
      depth: -80,
      opacity: 0.3,
      scale: 1.2,
      rotation: 1,
      parallax: 0.05,
      content: (
        <div className="grid grid-cols-20 grid-rows-20 gap-1 absolute inset-0">
          {Array.from({ length: 400 }, (_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-cyan-400/20 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'price-holograms',
      depth: -60,
      opacity: 0.8,
      scale: 1,
      rotation: 0,
      parallax: 0.08,
      content: (
        <div className="absolute top-1/4 left-1/4 space-y-8">
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
              rotateX: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-lg p-6 border border-cyan-400/30">
              <div className="text-sm text-cyan-300 mb-2">SONIC PRICE</div>
              <div className="text-3xl font-light text-white">${sonicPrice.toFixed(4)}</div>
              <div className="text-xs text-cyan-400 mt-1">+2.47% (24h)</div>
            </div>
            <div className="absolute inset-0 bg-cyan-400/10 rounded-lg blur-xl" />
          </motion.div>
          
          <motion.div
            className="relative"
            animate={{
              y: [0, 10, 0],
              rotateX: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md rounded-lg p-6 border border-amber-400/30">
              <div className="text-sm text-amber-300 mb-2">DRAGON PRICE</div>
              <div className="text-3xl font-light text-white">${dragonPrice.toFixed(6)}</div>
              <div className="text-xs text-amber-400 mt-1">+15.83% (24h)</div>
            </div>
            <div className="absolute inset-0 bg-amber-400/10 rounded-lg blur-xl" />
          </motion.div>
        </div>
      ),
    },
    {
      id: 'jackpot-hologram',
      depth: -40,
      opacity: 0.9,
      scale: 1,
      rotation: 0,
      parallax: 0.12,
      content: (
        <motion.div
          className="absolute top-1/2 right-1/4 transform -translate-y-1/2"
          animate={{
            scale: [1, 1.05, 1],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl p-8 border border-yellow-400/40">
              <div className="text-lg text-yellow-300 mb-4 text-center">JACKPOT VAULT</div>
              <div className="text-5xl font-light text-white text-center mb-2">
                <AnimatedCounter />
              </div>
              <div className="text-sm text-yellow-400 text-center">
                {lotteryState.participants.toLocaleString()} participants
              </div>
              <div className="mt-4 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    animate={{
                      width: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-2xl" />
          </div>
        </motion.div>
      ),
    },
    {
      id: 'trading-feed',
      depth: -20,
      opacity: 0.7,
      scale: 1,
      rotation: 0,
      parallax: 0.15,
      content: (
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-96">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-lg border border-slate-700/50 p-4">
            <div className="text-sm text-slate-300 mb-3">LIVE TRADING FEED</div>
            <div className="space-y-2 h-40 overflow-hidden">
              {activeTrades.slice(0, 8).map((trade, i) => (
                <motion.div
                  key={trade.id}
                  className="flex justify-between items-center text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className={`font-medium ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="text-slate-300">
                    ${trade.amount.toLocaleString()}
                  </span>
                  <span className="text-slate-500">
                    {new Date(trade.timestamp).toLocaleTimeString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'interactive-overlay',
      depth: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      parallax: 0.2,
      content: (
        <div className="absolute inset-0 pointer-events-none">
          {/* Interactive particles following mouse */}
          <motion.div
            className="absolute w-4 h-4 bg-cyan-400/50 rounded-full blur-sm"
            animate={{
              x: mousePosition.x - 8,
              y: mousePosition.y - 8,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          />
          
          {/* Ripple effects on interaction */}
          {isInteracting && (
            <motion.div
              className="absolute border-2 border-cyan-400/30 rounded-full"
              style={{
                left: mousePosition.x - 25,
                top: mousePosition.y - 25,
                width: 50,
                height: 50,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </div>
      ),
    },
  ], [sonicPrice, dragonPrice, jackpotAmount, lotteryState, activeTrades, mousePosition, isInteracting]);
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    const handleMouseDown = () => setIsInteracting(true);
    const handleMouseUp = () => setIsInteracting(false);
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);
  
  // GSAP-powered holographic effects
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ repeat: -1 });
    
    // Ambient holographic shimmer
    tl.to('.hologram-layer', {
      duration: 8,
      ease: "sine.inOut",
      stagger: 0.5,
      rotationY: "+=360",
      opacity: "+=0.1",
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  if (currentStep === 0) return null;
  
  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {hologramLayers.map((layer) => (
        <motion.div
          key={layer.id}
          className="hologram-layer absolute inset-0"
          style={{
            transform: `translateZ(${layer.depth}px) scale(${layer.scale}) rotateY(${layer.rotation}deg)`,
            opacity: layer.opacity,
          }}
          animate={{
            x: mousePosition.x * layer.parallax,
            y: mousePosition.y * layer.parallax,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
          }}
        >
          {layer.content}
        </motion.div>
      ))}
      
      {/* Screen effects based on animation state */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(59, 130, 246, ${animSnap.effects.flash.opacity * 0.1}), 
            transparent 50%)`,
        }}
      />
      
      {/* Chromatic aberration effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          filter: `blur(${animSnap.effects.chromatic.intensity}px)`,
          transform: `translate(${animSnap.effects.chromatic.intensity}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-red-500/10" />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          filter: `blur(${animSnap.effects.chromatic.intensity}px)`,
          transform: `translate(-${animSnap.effects.chromatic.intensity}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-cyan-500/10" />
      </motion.div>
    </motion.div>
  );
}