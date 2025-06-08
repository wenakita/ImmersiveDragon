import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import audioFile from "@assets/kwa-tempo-phonk-212904.mp3";

interface DemoScreenProps {
  autoStart?: boolean;
}

export default function DemoScreen({ autoStart = false }: DemoScreenProps) {
  const [audioStarted, setAudioStarted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle autoStart
  useEffect(() => {
    if (autoStart && audioRef.current && !audioStarted) {
      console.log("AutoStart detected, starting audio automatically");
      setTimeout(() => {
        handlePlayAudio();
      }, 100);
    }
  }, [autoStart, audioStarted]);

  const handlePlayAudio = () => {
    console.log("Play button clicked");
    if (audioRef.current) {
      console.log("Audio element found, starting play");
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio started successfully");
          setAudioStarted(true);
          setShowPlayButton(false);

          // Fade in audio from 0% to 70% over 2 seconds
          const fadeInDuration = 2000;
          const targetVolume = 0.7;
          const startTime = Date.now();

          const fadeIn = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / fadeInDuration, 1);
            if (audioRef.current) {
              audioRef.current.volume = progress * targetVolume;
            }

            if (progress < 1) {
              requestAnimationFrame(fadeIn);
            }
          };

          fadeIn();
        })
        .catch((e) => {
          console.log("Audio play prevented:", e);
        });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Audio element */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        onLoadStart={() => console.log("Audio loading started")}
        onCanPlay={() => console.log("Audio can play")}
        onError={(e) => console.log("Audio error:", e)}
      >
        <source src={audioFile} type="audio/mpeg" />
      </audio>

      {/* Play button overlay */}
      {showPlayButton && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
          <button
            type="button"
            onClick={handlePlayAudio}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-xl px-8 py-4 rounded-lg flex items-center space-x-3 transition-colors cursor-pointer border-2 border-orange-400"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Demo with Audio</span>
          </button>
        </div>
      )}

      {/* Complete Animation Sequence */}
      <AnimatePresence>
        {audioStarted && (
          <motion.div
            className="fixed inset-0 bg-black overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-32 py-16">
              
              {/* Section 1: Title */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.h2
                    className="text-5xl font-light bg-gradient-to-r from-white via-warm-orange to-white bg-clip-text text-transparent relative z-10 drop-shadow-[0_0_20px_rgba(255,107,53,0.7)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Typewriter
                      text="Sonic Red Dragon"
                      delay={0}
                      speed={100}
                    />
                  </motion.h2>
                </motion.div>
              </div>

              {/* Section 2: Token Swap */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div 
                  className="text-center relative h-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <motion.h2
                    className="text-3xl font-light mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  >
                    Swap $S for $DRAGON
                  </motion.h2>

                  <motion.div
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-x-10 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center"
                    initial={{ x: -400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafkreih643el43uv4qeadtvklx4yyfc2rcbasz2uaxe4uar6635c7lukcy"
                      alt="S Token"
                      className="w-10 h-10"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 translate-x-10 w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center"
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 2 }}
                  >
                    <img
                      src="https://teal-working-dormouse-113.mypinata.cloud/ipfs/bafybeifb35ia5dbpnerqmz32za5yi7uc2lwlhoucyl2zkavkusd6qrbxam"
                      alt="DRAGON Token"
                      className="w-10 h-10"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Section 3: The Twist */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 3 }}
                >
                  <motion.h2
                    className="text-4xl font-light text-warm-orange"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255, 107, 53, 0.8)",
                        "0 0 40px rgba(255, 107, 53, 1)",
                        "0 0 15px rgba(255, 107, 53, 0.6)",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    But there's a twist...
                  </motion.h2>
                </motion.div>
              </div>

              {/* Section 4: Fee Details */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "backOut", delay: 4 }}
                >
                  <motion.h2
                    className="text-4xl font-bold mb-6 text-warm-orange"
                    animate={{
                      scale: [1, 1.1, 1],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: 2,
                      delay: 0.5,
                    }}
                  >
                    10% fee on all swaps
                  </motion.h2>
                  <motion.div
                    className="w-full h-1 bg-warm-orange mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.4, delay: 1 }}
                  />
                </motion.div>
              </div>

              {/* Section 5: Fee Breakdown */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 5 }}
                >
                  <motion.h2
                    className="text-3xl font-light mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Fee Breakdown
                  </motion.h2>

                  <motion.div className="space-y-4">
                    <motion.div
                      className="flex items-center justify-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
                        <span className="text-sm font-bold text-yellow-400">6.9%</span>
                      </div>
                      <span className="text-lg text-yellow-400 font-medium">→ Jackpot</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-400">2.41%</span>
                      </div>
                      <span className="text-lg text-blue-400 font-medium">→ LP Rewards</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-400">0.69%</span>
                      </div>
                      <span className="text-lg text-orange-400 font-medium">→ Burned</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Section 6: Lottery Explanation */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 6 }}
                >
                  <motion.h2
                    className="text-3xl font-light mb-4"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 235, 59, 0.5)",
                        "0 0 20px rgba(255, 235, 59, 0.8)",
                        "0 0 10px rgba(255, 235, 59, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Every swap = <span className="text-yellow-400">lottery ticket</span>
                  </motion.h2>
                  <motion.p
                    className="text-lg text-soft-gray"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Larger swaps = better odds
                  </motion.p>
                </motion.div>
              </div>

              {/* Section 7: Odds Table */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 150, scale: 0.1 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "backOut", delay: 7 }}
                >
                  <motion.div className="space-y-3">
                    <motion.div
                      className="flex items-center justify-center space-x-6"
                      initial={{ opacity: 0, x: -200 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <span className="text-2xl font-bold text-blue-400 w-20 text-left">$10</span>
                      <span className="text-lg text-soft-gray">=</span>
                      <span className="text-xl font-medium text-blue-400 w-20 text-right">0.004%</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center space-x-6"
                      initial={{ opacity: 0, x: 200 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <span className="text-2xl font-bold text-orange-400 w-20 text-left">$100</span>
                      <span className="text-lg text-soft-gray">=</span>
                      <span className="text-xl font-medium text-orange-400 w-20 text-right">0.04%</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center space-x-6"
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <span className="text-2xl font-bold text-yellow-400 w-20 text-left">$1,000</span>
                      <span className="text-lg text-soft-gray">=</span>
                      <span className="text-xl font-medium text-yellow-400 w-20 text-right">0.4%</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center space-x-6"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                    >
                      <span className="text-2xl font-bold text-orange-500 w-20 text-left">$10,000</span>
                      <span className="text-lg text-soft-gray">=</span>
                      <span className="text-xl font-medium text-orange-500 w-20 text-right">4%</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Section 8: Jackpot Amount */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "backOut", delay: 8 }}
                >
                  <motion.h2
                    className="text-2xl font-light mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Current Jackpot
                  </motion.h2>

                  <motion.div
                    className="text-6xl font-bold text-yellow-400"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255, 235, 59, 0.8)",
                        "0 0 40px rgba(255, 235, 59, 1)",
                        "0 0 20px rgba(255, 235, 59, 0.8)",
                      ],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      textShadow: { duration: 1.5, repeat: Infinity },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                  >
                    $69,420
                  </motion.div>
                </motion.div>
              </div>

              {/* Section 9: Final Call to Action */}
              <div className="flex items-center justify-center min-h-screen">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "backOut", delay: 9 }}
                >
                  <motion.h2
                    className="text-4xl font-bold text-warm-orange mb-8"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255, 107, 53, 0.8)",
                        "0 0 40px rgba(255, 107, 53, 1)",
                        "0 0 20px rgba(255, 107, 53, 0.8)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Ready to play?
                  </motion.h2>

                  <motion.div
                    className="text-xl text-soft-gray"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7, 1] }}
                    transition={{ duration: 2, delay: 0.5 }}
                  >
                    Every swap is a chance to win it all
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}