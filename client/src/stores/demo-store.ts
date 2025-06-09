import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { proxy } from 'valtio';

// Advanced State Management for Real-time Demo
interface DemoState {
  // Core Timeline
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  timelineProgress: number;
  audioTime: number;
  
  // Market Data (Real-time simulation)
  sonicPrice: number;
  dragonPrice: number;
  jackpotAmount: number;
  liquidityPool: number;
  totalVolume: number;
  burnedTokens: number;
  
  // Live Trading Simulation
  activeTrades: Array<{
    id: string;
    type: 'buy' | 'sell';
    amount: number;
    timestamp: number;
    fromToken: 'SONIC' | 'DRAGON';
    toToken: 'SONIC' | 'DRAGON';
    fees: {
      jackpot: number;
      liquidity: number;
      burn: number;
    };
  }>;
  
  // VRF Lottery System
  lotteryState: {
    isDrawing: boolean;
    participants: number;
    nextDraw: number;
    winners: Array<{
      address: string;
      amount: number;
      timestamp: number;
    }>;
  };
  
  // Animation System
  animationEngine: {
    particleCount: number;
    effectsEnabled: boolean;
    performanceMode: 'high' | 'medium' | 'low';
    currentEffect: string | null;
  };
  
  // User Interaction
  userMetrics: {
    interactions: number;
    timeSpent: number;
    stepsCompleted: number;
    easterEggsFound: number;
  };
}

interface DemoActions {
  // Timeline Control
  setStep: (step: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  updateProgress: (progress: number) => void;
  updateAudioTime: (time: number) => void;
  
  // Market Simulation
  updateMarketData: (data: Partial<Pick<DemoState, 'sonicPrice' | 'dragonPrice' | 'jackpotAmount' | 'liquidityPool' | 'totalVolume' | 'burnedTokens'>>) => void;
  addTrade: (trade: DemoState['activeTrades'][0]) => void;
  clearOldTrades: () => void;
  
  // Lottery System
  triggerLotteryDraw: () => void;
  addLotteryWinner: (winner: DemoState['lotteryState']['winners'][0]) => void;
  updateLotteryState: (state: Partial<DemoState['lotteryState']>) => void;
  
  // Animation Control
  setAnimationEngine: (config: Partial<DemoState['animationEngine']>) => void;
  triggerEffect: (effectName: string) => void;
  
  // User Tracking
  incrementInteraction: () => void;
  addTimeSpent: (seconds: number) => void;
  markStepCompleted: (step: number) => void;
  foundEasterEgg: () => void;
}

export const useDemoStore = create<DemoState & DemoActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    currentStep: 0,
    totalSteps: 8,
    isPlaying: false,
    timelineProgress: 0,
    audioTime: 0,
    
    sonicPrice: 1.2456,
    dragonPrice: 0.0847,
    jackpotAmount: 2847693.42,
    liquidityPool: 15847392.18,
    totalVolume: 98472635.91,
    burnedTokens: 4729184.73,
    
    activeTrades: [],
    
    lotteryState: {
      isDrawing: false,
      participants: 24891,
      nextDraw: Date.now() + 7200000, // 2 hours
      winners: [],
    },
    
    animationEngine: {
      particleCount: 1000,
      effectsEnabled: true,
      performanceMode: 'high',
      currentEffect: null,
    },
    
    userMetrics: {
      interactions: 0,
      timeSpent: 0,
      stepsCompleted: 0,
      easterEggsFound: 0,
    },
    
    // Actions
    setStep: (step) => set({ currentStep: step }),
    
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    reset: () => set({ 
      currentStep: 0, 
      timelineProgress: 0, 
      audioTime: 0, 
      isPlaying: false,
      activeTrades: [],
    }),
    
    updateProgress: (progress) => set({ timelineProgress: progress }),
    updateAudioTime: (time) => set({ audioTime: time }),
    
    updateMarketData: (data) => set((state) => ({ ...state, ...data })),
    
    addTrade: (trade) => set((state) => ({
      activeTrades: [trade, ...state.activeTrades].slice(0, 50), // Keep last 50 trades
    })),
    
    clearOldTrades: () => set((state) => ({
      activeTrades: state.activeTrades.filter(
        trade => Date.now() - trade.timestamp < 30000 // Keep trades from last 30 seconds
      ),
    })),
    
    triggerLotteryDraw: () => set((state) => ({
      lotteryState: { ...state.lotteryState, isDrawing: true },
    })),
    
    addLotteryWinner: (winner) => set((state) => ({
      lotteryState: {
        ...state.lotteryState,
        winners: [winner, ...state.lotteryState.winners].slice(0, 10),
      },
    })),
    
    updateLotteryState: (newState) => set((state) => ({
      lotteryState: { ...state.lotteryState, ...newState },
    })),
    
    setAnimationEngine: (config) => set((state) => ({
      animationEngine: { ...state.animationEngine, ...config },
    })),
    
    triggerEffect: (effectName) => set((state) => ({
      animationEngine: { ...state.animationEngine, currentEffect: effectName },
    })),
    
    incrementInteraction: () => set((state) => ({
      userMetrics: { ...state.userMetrics, interactions: state.userMetrics.interactions + 1 },
    })),
    
    addTimeSpent: (seconds) => set((state) => ({
      userMetrics: { ...state.userMetrics, timeSpent: state.userMetrics.timeSpent + seconds },
    })),
    
    markStepCompleted: (step) => set((state) => ({
      userMetrics: { ...state.userMetrics, stepsCompleted: Math.max(state.userMetrics.stepsCompleted, step) },
    })),
    
    foundEasterEgg: () => set((state) => ({
      userMetrics: { ...state.userMetrics, easterEggsFound: state.userMetrics.easterEggsFound + 1 },
    })),
  }))
);

// Reactive State for Animations (Valtio)
export const animationState = proxy({
  particles: {
    count: 0,
    positions: [] as Array<{x: number, y: number, z: number}>,
    velocities: [] as Array<{x: number, y: number, z: number}>,
    colors: [] as string[],
    life: [] as number[],
  },
  
  effects: {
    screenShake: { intensity: 0, duration: 0 },
    flash: { opacity: 0, color: '#ffffff' },
    blur: { amount: 0 },
    chromatic: { intensity: 0 },
    distortion: { amount: 0 },
  },
  
  camera: {
    position: { x: 0, y: 0, z: 10 },
    rotation: { x: 0, y: 0, z: 0 },
    fov: 75,
    shake: { x: 0, y: 0 },
  },
  
  timeline: {
    keyframes: [] as Array<{
      time: number;
      action: string;
      data: any;
    }>,
    currentKeyframe: 0,
  },
});

// Performance monitoring
export const performanceState = proxy({
  fps: 60,
  frameTime: 16.67,
  memoryUsage: 0,
  particleCount: 0,
  drawCalls: 0,
  lastFrameTime: 0,
});