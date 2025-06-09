import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/welcome-screen";
import DemoScreen from "@/components/demo-screen";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [startAudio, setStartAudio] = useState(false);

  const handleStartDemo = () => {
    if (termsAccepted) {
      setShowWelcome(false);
      setStartAudio(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative camera-drift">
      {/* Multi-layered Animated Grid Background for Depth */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid-background-depth opacity-15"></div>
        <div className="absolute inset-0 grid-background-secondary opacity-20"></div>
        <div className="absolute inset-0 grid-background opacity-30"></div>
      </div>
      
      {/* Content with camera float animation */}
      <div className="relative z-10 camera-float">
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <WelcomeScreen
              key="welcome"
              termsAccepted={termsAccepted}
              onTermsChange={setTermsAccepted}
              onStartDemo={handleStartDemo}
            />
          ) : (
            <DemoScreen key="demo" autoStart={startAudio} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
