import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/welcome-screen";
import DemoScreenRevampedFixed from "@/components/demo-screen-revamped-fixed";

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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen
            key="welcome"
            termsAccepted={termsAccepted}
            onTermsChange={setTermsAccepted}
            onStartDemo={handleStartDemo}
          />
        ) : (
          <DemoScreenRevamped key="demo" autoStart={startAudio} />
        )}
      </AnimatePresence>
    </div>
  );
}
