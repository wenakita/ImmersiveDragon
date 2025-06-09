import { useState, useEffect, useCallback } from 'react';

interface EasterEgg {
  id: string;
  name: string;
  description: string;
  triggered: boolean;
  sequence?: string[];
  clickTarget?: string;
  clickCount?: number;
}

const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'konami',
    name: 'Dragon Konami Code',
    description: 'Enter the ancient dragon sequence',
    triggered: false,
    sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
  },
  {
    id: 'dragon-clicks',
    name: 'Dragon Awakening',
    description: 'Click the dragon logo rapidly',
    triggered: false,
    clickTarget: 'dragon-logo',
    clickCount: 10
  },
  {
    id: 'secret-phrase',
    name: 'Dragon Whisper',
    description: 'Type the secret dragon phrase',
    triggered: false,
    sequence: ['KeyD', 'KeyR', 'KeyA', 'KeyG', 'KeyO', 'KeyN']
  },
  {
    id: 'triple-click',
    name: 'Terms Triple Click',
    description: 'Triple click on Terms of Service',
    triggered: false,
    clickTarget: 'terms-link',
    clickCount: 3
  }
];

export function useEasterEggs() {
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>(EASTER_EGGS);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [showEasterEggNotification, setShowEasterEggNotification] = useState<string | null>(null);

  // Handle key sequences
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence(prev => {
        const newSequence = [...prev, event.code];
        
        // Keep only last 10 keys to prevent memory issues
        if (newSequence.length > 10) {
          newSequence.shift();
        }
        
        // Check for easter egg matches
        easterEggs.forEach(egg => {
          if (egg.sequence && !egg.triggered) {
            const sequence = egg.sequence;
            if (newSequence.length >= sequence.length) {
              const lastKeys = newSequence.slice(-sequence.length);
              if (JSON.stringify(lastKeys) === JSON.stringify(sequence)) {
                triggerEasterEgg(egg.id);
              }
            }
          }
        });
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [easterEggs]);

  const triggerEasterEgg = useCallback((eggId: string) => {
    setEasterEggs(prev => 
      prev.map(egg => 
        egg.id === eggId ? { ...egg, triggered: true } : egg
      )
    );
    
    const egg = easterEggs.find(e => e.id === eggId);
    if (egg) {
      setShowEasterEggNotification(egg.name);
      setTimeout(() => setShowEasterEggNotification(null), 3000);
      
      // Trigger special effects based on easter egg
      handleEasterEggEffect(eggId);
    }
  }, [easterEggs]);

  const handleClick = useCallback((targetId: string) => {
    setClickCounts(prev => {
      const newCount = (prev[targetId] || 0) + 1;
      const updated = { ...prev, [targetId]: newCount };
      
      // Check for click-based easter eggs
      easterEggs.forEach(egg => {
        if (egg.clickTarget === targetId && egg.clickCount && !egg.triggered) {
          if (newCount >= egg.clickCount) {
            triggerEasterEgg(egg.id);
          }
        }
      });
      
      return updated;
    });
  }, [easterEggs, triggerEasterEgg]);

  const handleEasterEggEffect = (eggId: string) => {
    switch (eggId) {
      case 'konami':
        // Add rainbow dragon effect
        document.body.classList.add('rainbow-dragon');
        setTimeout(() => document.body.classList.remove('rainbow-dragon'), 5000);
        break;
      case 'dragon-clicks':
        // Add screen shake effect
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 2000);
        break;
      case 'secret-phrase':
        // Add golden glow to everything
        document.body.classList.add('golden-everything');
        setTimeout(() => document.body.classList.remove('golden-everything'), 4000);
        break;
      case 'triple-click':
        // Add matrix rain effect
        document.body.classList.add('matrix-rain');
        setTimeout(() => document.body.classList.remove('matrix-rain'), 6000);
        break;
    }
  };

  const resetEasterEggs = () => {
    setEasterEggs(EASTER_EGGS.map(egg => ({ ...egg, triggered: false })));
    setClickCounts({});
    setKeySequence([]);
  };

  return {
    easterEggs,
    showEasterEggNotification,
    handleClick,
    resetEasterEggs,
    triggeredCount: easterEggs.filter(egg => egg.triggered).length
  };
}