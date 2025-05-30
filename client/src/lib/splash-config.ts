export interface SplashStep {
  key: string;
  start: number; // ms
  duration: number; // ms
  action: string;
  text?: string;
  token?: string;
  direction?: string;
  effect?: string;
  variants?: Record<string, any>;
  from?: string;
  rows?: Array<{ row: string; from: string }>;
  details?: Record<string, any>;
  tokensCross?: boolean;
  exitDirection?: Record<string, string>;
}

export const splashSteps: SplashStep[] = [
  {
    key: "audio-fade-in",
    start: 0,
    duration: 2000,
    action: "audioFadeIn",
    details: { from: 0, to: 0.7 }
  },
  {
    key: "title",
    start: 2000,
    duration: 4000,
    action: "typewriter",
    text: "Sonic Red Dragon",
    variants: { neonGlow: true }
  },
  {
    key: "title-glitch",
    start: 5900,
    duration: 100,
    action: "glitchOut",
    text: "Sonic Red Dragon"
  },
  {
    key: "swap-phase-1",
    start: 6000,
    duration: 1500,
    action: "swapPhase1",
    text: "Swap $S",
    token: "S",
    direction: "left"
  },
  {
    key: "swap-phase-2", 
    start: 7500,
    duration: 1500,
    action: "swapPhase2",
    text: "for $DRAGON",
    token: "DRAGON",
    direction: "right"
  },
  {
    key: "swap-accelerate",
    start: 9000,
    duration: 1000,
    action: "swapAccelerate"
  },
  {
    key: "twist",
    start: 10000,
    duration: 2300,
    action: "zoomIn",
    text: "But there's a twist",
    variants: { shake: true, glitch: "last-word" }
  },
  {
    key: "fee",
    start: 11800,
    duration: 2000,
    action: "slideIn",
    text: "10% fee on all swaps",
    from: "left",
    effect: "countUpPercent"
  },
  {
    key: "lottery",
    start: 13800,
    duration: 3000,
    action: "flip3D",
    text: "Every swap = lottery ticket",
    effect: "coinBurst"
  },
  {
    key: "unique",
    start: 16800,
    duration: 2500,
    action: "shimmerFadeIn",
    text: "Results are instantaneous and unique",
    effect: "slotSpin"
  },
  {
    key: "table",
    start: 19300,
    duration: 8000,
    action: "alternatingSlideIn",
    rows: [
      { row: "$10 = 0.004%", from: "left" },
      { row: "$100 = 0.04%", from: "right" },
      { row: "$1,000 = 0.4%", from: "left" },
      { row: "$10,000 = 4%", from: "right" }
    ],
    effect: "glowOnArrival"
  },
  {
    key: "vrf",
    start: 27300,
    duration: 4000,
    action: "slideUpScale",
    text: "Provable Fairness Powered by Chainlink VRF",
    effect: "fireGlow"
  }
];

// Animation variants for different effects
export const animationVariants = {
  glitch: {
    visible: {
      filter: [
        "none",
        "blur(1px) contrast(1.5)",
        "none", 
        "hue-rotate(10deg)",
        "none"
      ],
      x: [0, -4, 2, 0, 0],
      transition: { duration: 0.12 }
    }
  },
  
  bounce: {
    visible: {
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  
  neonGlow: {
    visible: {
      textShadow: [
        "0 0 10px rgba(255, 107, 53, 0.5)",
        "0 0 20px rgba(255, 107, 53, 0.8)",
        "0 0 10px rgba(255, 107, 53, 0.5)"
      ],
      transition: { duration: 2, repeat: Infinity }
    }
  },
  
  slideFromLeft: {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "backOut" }
    }
  },
  
  flip3D: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }
};