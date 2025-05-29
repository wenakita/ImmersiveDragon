import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/welcome-screen";
import DemoScreen from "@/components/demo-screen";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleStartDemo = () => {
    if (termsAccepted) {
      setShowWelcome(false);
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
          <DemoScreen key="demo" />
        )}
      </AnimatePresence>
    </div>
  );
}
