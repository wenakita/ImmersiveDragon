import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface EasterEggHintsProps {
  triggeredCount: number;
  easterEggs: Array<{
    id: string;
    name: string;
    description: string;
    triggered: boolean;
  }>;
}

export default function EasterEggHints({ triggeredCount, easterEggs }: EasterEggHintsProps) {
  const [showHints, setShowHints] = useState(false);

  // Only show hints button after first easter egg is discovered
  if (triggeredCount === 0) return null;

  return (
    <>
      {/* Hints Toggle Button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm border border-yellow-400/30 rounded-full p-3 text-yellow-400 hover:bg-yellow-400/10 transition-colors z-50"
        onClick={() => setShowHints(!showHints)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        {showHints ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </motion.button>

      {/* Hints Panel */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            className="fixed bottom-20 right-4 bg-black/80 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-4 max-w-xs z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-yellow-400 font-bold mb-3 text-sm">Dragon Secrets</h3>
            <div className="space-y-2">
              {easterEggs.map((egg) => (
                <div key={egg.id} className="flex items-center gap-2 text-xs">
                  <span className={egg.triggered ? "text-green-400" : "text-gray-400"}>
                    {egg.triggered ? "✓" : "○"}
                  </span>
                  <span className={egg.triggered ? "text-white" : "text-gray-400"}>
                    {egg.description}
                  </span>
                </div>
              ))}
            </div>
            
            {triggeredCount === easterEggs.length && (
              <motion.div
                className="mt-3 pt-3 border-t border-yellow-400/20 text-yellow-400 text-xs font-bold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                🐉 All Dragons Awakened! 🐉
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}