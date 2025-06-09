import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";

export default function ProbabilityTables() {
  const baseProbabilities = [
    { amount: "$10", probability: "0.004%" },
    { amount: "$100", probability: "0.04%" },
    { amount: "$1,000", probability: "0.4%" },
    { amount: "$10,000", probability: "4%" },
  ];

  const veDragonProbabilities = [
    { amount: "$10", probability: "0.01%", multiplier: "2.5x" },
    { amount: "$100", probability: "0.1%", multiplier: "2.5x" },
    { amount: "$1,000", probability: "1%", multiplier: "2.5x" },
    { amount: "$10,000", probability: "10%", multiplier: "2.5x" },
  ];

  return (
    <div className="space-y-6">
      {/* Base Probability Table */}
      <motion.div
        className="bg-dark-surface/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-elegant-teal" />
          <h3 className="text-lg font-semibold text-elegant-teal">Base Jackpot Probabilities</h3>
        </div>
        <div className="space-y-3">
          {baseProbabilities.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-gray-700/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="font-medium text-white">{item.amount}</span>
              <span className="text-elegant-teal font-semibold">{item.probability}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-soft-gray mt-4">
          Base probability increases with transaction amount. Higher amounts = better jackpot chances.
        </p>
      </motion.div>

      {/* veDRAGON Enhanced Probability Table */}
      <motion.div
        className="bg-dark-surface/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-dragon-red" />
          <h3 className="text-lg font-semibold text-dragon-red">veDRAGON Enhanced Probabilities</h3>
          <span className="px-2 py-1 bg-dragon-red/20 text-dragon-red text-xs rounded-full font-medium">
            MAX BOOST
          </span>
        </div>
        <div className="space-y-3">
          {veDragonProbabilities.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-dragon-red/10 to-transparent rounded-xl border border-dragon-red/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <span className="font-medium text-white">{item.amount}</span>
              <div className="flex items-center gap-2">
                <span className="text-dragon-red font-semibold">{item.probability}</span>
                <span className="px-2 py-1 bg-dragon-red/20 text-dragon-red text-xs rounded-full">
                  {item.multiplier}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-dragon-red/10 rounded-xl border border-dragon-red/20">
          <p className="text-xs text-soft-gray">
            <span className="text-dragon-red font-medium">veDRAGON holders</span> get 2.5x probability multiplier. 
            Maximum boost achievable through staking DRAGON tokens for voting power.
          </p>
        </div>
      </motion.div>
    </div>
  );
}