import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: "SONIC RED DRAGON", subtitle: "The Future of DeFi Trading" },
    { title: "TOKEN SWAPS", subtitle: "$S ⟷ $DRAGON Exchange" },
    { title: "VRF JACKPOTS", subtitle: "$137,852 Growing Prize Pool" },
    { title: "FEE STRUCTURE", subtitle: "6.9% Jackpot • 2.41% LP • 0.69% Burn" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-8">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {steps[step].title}
        </motion.h1>
        
        <motion.p
          className="text-2xl md:text-3xl text-yellow-400 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {steps[step].subtitle}
        </motion.p>

        <div className="flex justify-center space-x-4 mb-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setStep(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === step ? 'bg-orange-400' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <motion.div
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Experience revolutionary blockchain mechanics with VRF-powered jackpots
        </motion.div>
      </div>
    </div>
  );
}