import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDemoStore } from '@/stores/demo-store';
import { gsap } from 'gsap';
import * as Tone from 'tone';

interface TradingBot {
  id: string;
  type: 'arbitrage' | 'market_maker' | 'whale' | 'retail' | 'mev';
  intelligence: number;
  capital: number;
  frequency: number;
  strategy: string;
  lastTrade: number;
  profitability: number;
}

interface MarketCondition {
  volatility: number;
  liquidity: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  momentum: number;
  resistance: number;
  support: number;
}

export default function TradingSimulationEngine() {
  const botsRef = useRef<TradingBot[]>([]);
  const marketRef = useRef<MarketCondition>({
    volatility: 0.05,
    liquidity: 1000000,
    sentiment: 'neutral',
    momentum: 0,
    resistance: 1.3,
    support: 1.1,
  });
  
  const simulationRef = useRef<number>();
  const { 
    addTrade, 
    updateMarketData, 
    sonicPrice, 
    dragonPrice, 
    totalVolume,
    liquidityPool,
    jackpotAmount,
    currentStep 
  } = useDemoStore();
  
  // Initialize sophisticated trading bots
  const initializeTradingBots = useCallback(() => {
    botsRef.current = [
      // High-frequency arbitrage bots
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `arb-${i}`,
        type: 'arbitrage' as const,
        intelligence: 0.85 + Math.random() * 0.1,
        capital: 50000 + Math.random() * 200000,
        frequency: 2000 + Math.random() * 3000, // ms between trades
        strategy: 'cross_exchange_arbitrage',
        lastTrade: Date.now() - Math.random() * 10000,
        profitability: 0.002 + Math.random() * 0.008,
      })),
      
      // Market makers providing liquidity
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `mm-${i}`,
        type: 'market_maker' as const,
        intelligence: 0.9 + Math.random() * 0.05,
        capital: 500000 + Math.random() * 1000000,
        frequency: 5000 + Math.random() * 10000,
        strategy: 'liquidity_provision',
        lastTrade: Date.now() - Math.random() * 20000,
        profitability: 0.001 + Math.random() * 0.003,
      })),
      
      // Whale traders moving markets
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `whale-${i}`,
        type: 'whale' as const,
        intelligence: 0.95 + Math.random() * 0.04,
        capital: 5000000 + Math.random() * 10000000,
        frequency: 30000 + Math.random() * 60000,
        strategy: 'momentum_trading',
        lastTrade: Date.now() - Math.random() * 60000,
        profitability: 0.005 + Math.random() * 0.015,
      })),
      
      // Retail traders with varying strategies
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `retail-${i}`,
        type: 'retail' as const,
        intelligence: 0.3 + Math.random() * 0.4,
        capital: 1000 + Math.random() * 50000,
        frequency: 10000 + Math.random() * 120000,
        strategy: ['swing_trading', 'day_trading', 'hodl', 'fomo'][Math.floor(Math.random() * 4)],
        lastTrade: Date.now() - Math.random() * 300000,
        profitability: -0.02 + Math.random() * 0.06, // Some lose money
      })),
      
      // MEV bots extracting value
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `mev-${i}`,
        type: 'mev' as const,
        intelligence: 0.98 + Math.random() * 0.01,
        capital: 100000 + Math.random() * 500000,
        frequency: 1000 + Math.random() * 2000,
        strategy: 'front_running',
        lastTrade: Date.now() - Math.random() * 5000,
        profitability: 0.01 + Math.random() * 0.03,
      })),
    ];
  }, []);
  
  // Advanced market dynamics simulation
  const updateMarketConditions = useCallback(() => {
    const market = marketRef.current;
    const now = Date.now();
    
    // Simulate market sentiment shifts
    const sentimentShift = (Math.random() - 0.5) * 0.02;
    market.momentum += sentimentShift;
    market.momentum *= 0.98; // Decay
    
    // Update volatility based on trading activity
    const volumeImpact = Math.min(totalVolume / 1000000, 2);
    market.volatility = 0.02 + volumeImpact * 0.08 + Math.random() * 0.02;
    
    // Liquidity responds to market maker activity
    const mmBots = botsRef.current.filter(bot => bot.type === 'market_maker');
    const liquidityProvision = mmBots.reduce((sum, bot) => sum + bot.capital * bot.intelligence, 0);
    market.liquidity = Math.max(500000, liquidityProvision * 0.1);
    
    // Dynamic support and resistance levels
    market.support += (Math.random() - 0.5) * 0.001;
    market.resistance += (Math.random() - 0.5) * 0.001;
    
    // Ensure support < resistance
    if (market.support >= market.resistance) {
      market.support = market.resistance - 0.05;
    }
    
    // Update sentiment based on momentum
    if (market.momentum > 0.1) market.sentiment = 'bullish';
    else if (market.momentum < -0.1) market.sentiment = 'bearish';
    else market.sentiment = 'neutral';
  }, [totalVolume]);
  
  // Sophisticated bot decision making
  const getBotDecision = useCallback((bot: TradingBot, currentPrice: number): {
    shouldTrade: boolean;
    action: 'buy' | 'sell';
    amount: number;
    confidence: number;
  } => {
    const market = marketRef.current;
    const now = Date.now();
    
    // Check if enough time has passed since last trade
    if (now - bot.lastTrade < bot.frequency) {
      return { shouldTrade: false, action: 'buy', amount: 0, confidence: 0 };
    }
    
    let buySignal = 0;
    let sellSignal = 0;
    
    // Bot-specific strategies
    switch (bot.type) {
      case 'arbitrage':
        // Look for price discrepancies
        const expectedPrice = sonicPrice * 0.068; // Expected DRAGON price
        const priceDiff = (currentPrice - expectedPrice) / expectedPrice;
        if (Math.abs(priceDiff) > 0.02) {
          if (priceDiff > 0) sellSignal += 0.8;
          else buySignal += 0.8;
        }
        break;
        
      case 'market_maker':
        // Provide liquidity at spread
        const spread = market.volatility * 2;
        if (Math.random() < 0.3) {
          buySignal += 0.4;
          sellSignal += 0.4; // Both sides
        }
        break;
        
      case 'whale':
        // Momentum-based strategy
        if (market.momentum > 0.05) buySignal += 0.7;
        if (market.momentum < -0.05) sellSignal += 0.7;
        break;
        
      case 'retail':
        // Emotion-driven decisions
        const fomo = market.sentiment === 'bullish' ? 0.6 : 0;
        const fear = market.sentiment === 'bearish' ? 0.6 : 0;
        buySignal += fomo * (1 - bot.intelligence);
        sellSignal += fear * (1 - bot.intelligence);
        
        // Technical analysis (for smarter retail)
        if (bot.intelligence > 0.5) {
          if (currentPrice < market.support * 1.02) buySignal += 0.3;
          if (currentPrice > market.resistance * 0.98) sellSignal += 0.3;
        }
        break;
        
      case 'mev':
        // Front-running and sandwich attacks
        const otherBotActivity = botsRef.current.filter(b => 
          b.id !== bot.id && now - b.lastTrade < 5000
        ).length;
        if (otherBotActivity > 2) {
          buySignal += 0.5;
        }
        break;
    }
    
    // Apply intelligence factor
    buySignal *= bot.intelligence;
    sellSignal *= bot.intelligence;
    
    // Add noise for realism
    buySignal += (Math.random() - 0.5) * 0.2;
    sellSignal += (Math.random() - 0.5) * 0.2;
    
    const shouldTrade = Math.max(buySignal, sellSignal) > 0.4;
    const action = buySignal > sellSignal ? 'buy' : 'sell';
    
    // Calculate trade amount based on bot capital and confidence
    const confidence = Math.max(buySignal, sellSignal);
    const maxTradeSize = bot.capital * 0.1; // Max 10% of capital per trade
    const amount = maxTradeSize * confidence * (0.5 + Math.random() * 0.5);
    
    return { shouldTrade, action, confidence, amount };
  }, [sonicPrice]);
  
  // Execute bot trades with realistic slippage and fees
  const executeTrade = useCallback((bot: TradingBot, decision: ReturnType<typeof getBotDecision>) => {
    if (!decision.shouldTrade) return;
    
    const market = marketRef.current;
    const now = Date.now();
    
    // Calculate slippage based on trade size and liquidity
    const slippageFactor = Math.min(decision.amount / market.liquidity, 0.05);
    const slippage = slippageFactor * market.volatility;
    
    // Price impact
    let tradePrice = decision.action === 'buy' ? 
      dragonPrice * (1 + slippage) : 
      dragonPrice * (1 - slippage);
    
    // Calculate fees (10% total)
    const jackpotFee = decision.amount * 0.069; // 6.9% to jackpot
    const liquidityFee = decision.amount * 0.0241; // 2.41% to LP
    const burnAmount = (decision.amount / tradePrice) * 0.0069; // 0.69% of DRAGON burned
    
    // Create trade record
    const trade = {
      id: `${bot.id}-${now}`,
      type: decision.action,
      amount: decision.amount,
      timestamp: now,
      fromToken: decision.action === 'buy' ? 'SONIC' : 'DRAGON',
      toToken: decision.action === 'buy' ? 'DRAGON' : 'SONIC',
      fees: {
        jackpot: jackpotFee,
        liquidity: liquidityFee,
        burn: burnAmount,
      },
    } as const;
    
    // Update bot state
    bot.lastTrade = now;
    
    // Market impact on price
    const priceImpact = (decision.amount / market.liquidity) * 0.1;
    const newDragonPrice = decision.action === 'buy' ? 
      dragonPrice * (1 + priceImpact) : 
      dragonPrice * (1 - priceImpact);
    
    // Update global state
    addTrade(trade);
    updateMarketData({
      dragonPrice: Math.max(0.001, newDragonPrice),
      jackpotAmount: jackpotAmount + jackpotFee,
      liquidityPool: liquidityPool + liquidityFee,
      totalVolume: totalVolume + decision.amount,
      burnedTokens: (useDemoStore.getState().burnedTokens || 0) + burnAmount,
    });
    
    // Audio feedback for significant trades
    if (decision.amount > 10000) {
      try {
        const frequency = decision.action === 'buy' ? 440 : 330;
        const synth = new Tone.Oscillator(frequency, 'triangle').toDestination();
        synth.volume.value = -20;
        synth.start();
        synth.stop(`+${0.1 + decision.amount / 100000}`);
      } catch (e) {
        // Audio not available
      }
    }
  }, [dragonPrice, jackpotAmount, liquidityPool, totalVolume, addTrade, updateMarketData]);
  
  // Main simulation loop
  const runSimulation = useCallback(() => {
    updateMarketConditions();
    
    // Process each bot's decision
    botsRef.current.forEach(bot => {
      const decision = getBotDecision(bot, dragonPrice);
      executeTrade(bot, decision);
    });
    
    // Schedule next simulation step
    const nextStep = 100 + Math.random() * 200; // 100-300ms intervals
    simulationRef.current = window.setTimeout(runSimulation, nextStep);
  }, [updateMarketConditions, getBotDecision, executeTrade, dragonPrice]);
  
  // Start/stop simulation based on demo state
  useEffect(() => {
    if (currentStep > 0) {
      initializeTradingBots();
      runSimulation();
    }
    
    return () => {
      if (simulationRef.current) {
        clearTimeout(simulationRef.current);
      }
    };
  }, [currentStep, initializeTradingBots, runSimulation]);
  
  return null; // This is a background simulation engine
}