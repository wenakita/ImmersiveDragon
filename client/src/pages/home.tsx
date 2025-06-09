import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DemoScreen from "../components/demo-screen";
import WelcomeScreen from "../components/welcome-screen";

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleStartDemo = () => {
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showDemo ? (
          <WelcomeScreen 
            key="welcome"
            termsAccepted={termsAccepted}
            onTermsChange={setTermsAccepted}
            onStartDemo={handleStartDemo}
          />
        ) : (
          <DemoScreen key="demo" autoStart={true} />
        )}
      </AnimatePresence>
    </div>
  );
}