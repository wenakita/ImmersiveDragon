import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trophy, Star, Crown, Sparkles, Copy, Check } from "lucide-react";

interface EasterEggRewardsProps {
  triggeredCount: number;
  easterEggs: Array<{
    id: string;
    name: string;
    triggered: boolean;
  }>;
}

const REWARDS = {
  1: {
    title: "Dragon Seeker",
    description: "Access to exclusive dragon wallpapers",
    content: "🖼️ Unlock high-resolution Sonic Red Dragon wallpapers for desktop and mobile",
    icon: Star,
    color: "text-blue-400"
  },
  2: {
    title: "Dragon Scholar", 
    description: "Early access to protocol documentation",
    content: "📚 Get early access to technical documentation and whitepaper drafts",
    icon: Sparkles,
    color: "text-purple-400"
  },
  3: {
    title: "Dragon Guardian",
    description: "Beta testing privileges",
    content: "🛡️ Invitation to exclusive beta testing program with direct developer feedback",
    icon: Trophy,
    color: "text-orange-400"
  },
  4: {
    title: "Dragon Master",
    description: "Legendary NFT and governance rights",
    content: "👑 Exclusive 'Dragon Master' NFT + governance token allocation + priority support",
    icon: Crown,
    color: "text-yellow-400"
  }
};

const SPECIAL_CODES = {
  1: "SEEKER2025",
  2: "SCHOLAR2025", 
  3: "GUARDIAN2025",
  4: "DRAGONMASTER2025"
};

export default function EasterEggRewards({ triggeredCount }: EasterEggRewardsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showRewards, setShowRewards] = useState(false);

  if (triggeredCount === 0) return null;

  const copyCode = async (code: string, level: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.log('Failed to copy code');
    }
  };

  const currentReward = REWARDS[triggeredCount as keyof typeof REWARDS];
  const currentCode = SPECIAL_CODES[triggeredCount as keyof typeof SPECIAL_CODES];

  return (
    <>
      {/* Rewards Notification */}
      <AnimatePresence>
        {currentReward && !showRewards && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] max-w-md"
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="bg-black/90 backdrop-blur-lg border-2 border-gradient rounded-2xl p-6 text-center">
              <motion.div
                className={`mb-4 ${currentReward.color}`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <currentReward.icon className="w-16 h-16 mx-auto" />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                {currentReward.title}
              </h2>
              
              <p className="text-gray-300 mb-4">{currentReward.description}</p>
              
              <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                <p className="text-sm text-white">{currentReward.content}</p>
              </div>

              {/* Exclusive Code */}
              <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-400 mb-1">Your Exclusive Code:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-yellow-400 font-mono font-bold">{currentCode}</code>
                  <button
                    onClick={() => copyCode(currentCode, triggeredCount)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === currentCode ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowRewards(true)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  View All Rewards
                </button>
                <button
                  onClick={() => setShowRewards(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Rewards Panel */}
      <AnimatePresence>
        {showRewards && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/90 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                  Dragon Master Rewards
                </h2>
                <button
                  onClick={() => setShowRewards(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-4">
                {Object.entries(REWARDS).map(([level, reward]) => {
                  const levelNum = parseInt(level);
                  const isUnlocked = triggeredCount >= levelNum;
                  const code = SPECIAL_CODES[levelNum as keyof typeof SPECIAL_CODES];
                  
                  return (
                    <motion.div
                      key={level}
                      className={`border rounded-lg p-4 ${
                        isUnlocked 
                          ? 'border-yellow-400/30 bg-yellow-400/5' 
                          : 'border-gray-600 bg-gray-800/30'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: levelNum * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <reward.icon className={`w-8 h-8 ${isUnlocked ? reward.color : 'text-gray-500'}`} />
                        <div className="flex-1">
                          <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                            Level {level}: {reward.title}
                          </h3>
                          <p className={`text-sm mb-2 ${isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                            {reward.description}
                          </p>
                          <p className={`text-xs ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                            {reward.content}
                          </p>
                          
                          {isUnlocked && (
                            <div className="mt-3 flex items-center gap-2">
                              <code className="text-yellow-400 font-mono text-sm bg-black/50 px-2 py-1 rounded">
                                {code}
                              </code>
                              <button
                                onClick={() => copyCode(code, levelNum)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                {copiedCode === code ? (
                                  <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {isUnlocked ? (
                          <div className="text-green-400">✓</div>
                        ) : (
                          <div className="text-gray-500">🔒</div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300">
                  💡 <strong>How to redeem:</strong> Save your codes and contact support with your wallet address to claim rewards. 
                  Some rewards require additional verification.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}