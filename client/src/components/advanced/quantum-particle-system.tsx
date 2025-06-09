import { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useDemoStore, animationState, performanceState } from '@/stores/demo-store';
import { gsap } from 'gsap';
import * as Tone from 'tone';

interface Particle {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'trade' | 'burn' | 'reward' | 'energy' | 'quantum';
  mass: number;
  charge: number;
  frequency: number;
}

interface QuantumField {
  x: number;
  y: number;
  intensity: number;
  frequency: number;
  phase: number;
}

export default function QuantumParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const quantumFieldsRef = useRef<QuantumField[]>([]);
  
  const { activeTrades, animationEngine, currentStep } = useDemoStore();
  const animSnap = useSnapshot(animationState);
  const perfSnap = useSnapshot(performanceState);
  
  // Advanced physics constants
  const PHYSICS_CONFIG = useMemo(() => ({
    GRAVITY: -0.0003,
    FRICTION: 0.985,
    QUANTUM_RESONANCE: 0.12,
    ELECTROMAGNETIC_FORCE: 0.08,
    CHROMODYNAMIC_COUPLING: 0.15,
    FIELD_STRENGTH: 0.25,
    PARTICLE_INTERACTION_RADIUS: 80,
    WAVE_PROPAGATION_SPEED: 0.4,
  }), []);
  
  // Initialize quantum fields
  const initializeQuantumFields = useCallback(() => {
    quantumFieldsRef.current = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      intensity: 0.3 + Math.random() * 0.7,
      frequency: 0.01 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);
  
  // Create particle based on trading activity
  const createTradeParticle = useCallback((trade: typeof activeTrades[0]) => {
    const particle: Particle = {
      id: `trade-${trade.id}-${Date.now()}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      vz: (Math.random() - 0.5) * 4,
      life: 1.0,
      maxLife: 1.0,
      size: 2 + trade.amount * 0.00001,
      color: trade.type === 'buy' ? '#22c55e' : '#ef4444',
      type: 'trade',
      mass: 1 + trade.amount * 0.000001,
      charge: trade.type === 'buy' ? 1 : -1,
      frequency: 440 + trade.amount * 0.01,
    };
    
    particlesRef.current.push(particle);
    
    // Audio feedback for particle creation
    if (Tone.context.state === 'running') {
      const synth = new Tone.Oscillator(particle.frequency, 'sine').toDestination();
      synth.start();
      synth.stop('+0.1');
    }
  }, []);
  
  // Advanced particle physics simulation
  const updateParticles = useCallback((deltaTime: number) => {
    const particles = particlesRef.current;
    const fields = quantumFieldsRef.current;
    
    // Update quantum fields
    fields.forEach(field => {
      field.phase += field.frequency * deltaTime;
      field.intensity = 0.3 + 0.4 * Math.sin(field.phase);
    });
    
    // Particle interactions and physics
    particles.forEach((particle, i) => {
      // Quantum field influence
      fields.forEach(field => {
        const dx = particle.x - field.x;
        const dy = particle.y - field.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (field.intensity * PHYSICS_CONFIG.FIELD_STRENGTH) / (distance + 1);
          const angle = Math.atan2(dy, dx);
          
          particle.vx += Math.cos(angle) * force * particle.charge;
          particle.vy += Math.sin(angle) * force * particle.charge;
        }
      });
      
      // Particle-to-particle interactions
      particles.forEach((other, j) => {
        if (i !== j) {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < PHYSICS_CONFIG.PARTICLE_INTERACTION_RADIUS && distance > 0) {
            // Electromagnetic force
            const force = (particle.charge * other.charge * PHYSICS_CONFIG.ELECTROMAGNETIC_FORCE) / (distance * distance);
            const angle = Math.atan2(dy, dx);
            
            particle.vx -= Math.cos(angle) * force / particle.mass;
            particle.vy -= Math.sin(angle) * force / particle.mass;
            
            // Quantum entanglement effect
            if (Math.abs(particle.frequency - other.frequency) < 50) {
              const resonance = PHYSICS_CONFIG.QUANTUM_RESONANCE * Math.sin(Date.now() * 0.01);
              particle.vx += Math.cos(angle) * resonance;
              particle.vy += Math.sin(angle) * resonance;
            }
          }
        }
      });
      
      // Apply physics
      particle.vy += PHYSICS_CONFIG.GRAVITY * particle.mass;
      particle.vx *= PHYSICS_CONFIG.FRICTION;
      particle.vy *= PHYSICS_CONFIG.FRICTION;
      particle.vz *= PHYSICS_CONFIG.FRICTION;
      
      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.z += particle.vz * deltaTime;
      
      // Boundary conditions with quantum tunneling probability
      if (particle.x < 0 || particle.x > window.innerWidth) {
        if (Math.random() > 0.95) { // 5% quantum tunneling chance
          particle.x = particle.x < 0 ? window.innerWidth : 0;
        } else {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
      }
      
      if (particle.y < 0 || particle.y > window.innerHeight) {
        if (Math.random() > 0.95) { // 5% quantum tunneling chance
          particle.y = particle.y < 0 ? window.innerHeight : 0;
        } else {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        }
      }
      
      // Life decay with quantum uncertainty
      const uncertainty = 0.98 + Math.random() * 0.04; // Heisenberg uncertainty principle
      particle.life *= uncertainty;
      
      // Size evolution based on quantum state
      particle.size *= 0.999 + Math.sin(Date.now() * 0.01 + particle.frequency * 0.001) * 0.001;
    });
    
    // Remove dead particles
    particlesRef.current = particles.filter(p => p.life > 0.01);
    
    // Update performance metrics
    performanceState.particleCount = particles.length;
    performanceState.drawCalls = particles.length + fields.length;
  }, [PHYSICS_CONFIG]);
  
  // Render particles with advanced effects
  const renderParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;
    const fields = quantumFieldsRef.current;
    
    // Clear with quantum background
    const gradient = ctx.createRadialGradient(
      window.innerWidth / 2, window.innerHeight / 2, 0,
      window.innerWidth / 2, window.innerHeight / 2, window.innerWidth
    );
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
    gradient.addColorStop(1, 'rgba(2, 6, 23, 0.98)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Render quantum fields
    fields.forEach(field => {
      const radius = 60 + 40 * field.intensity;
      const fieldGradient = ctx.createRadialGradient(
        field.x, field.y, 0,
        field.x, field.y, radius
      );
      fieldGradient.addColorStop(0, `rgba(59, 130, 246, ${field.intensity * 0.3})`);
      fieldGradient.addColorStop(0.5, `rgba(147, 51, 234, ${field.intensity * 0.2})`);
      fieldGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = fieldGradient;
      ctx.beginPath();
      ctx.arc(field.x, field.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Render particles with quantum effects
    particles.forEach(particle => {
      const alpha = particle.life;
      const size = particle.size * (1 + 0.3 * Math.sin(Date.now() * 0.01 + particle.frequency * 0.001));
      
      // Quantum interference pattern
      const interference = Math.sin(particle.frequency * Date.now() * 0.001) * 0.5 + 0.5;
      
      // Particle glow
      const glowGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size * 3
      );
      glowGradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
      glowGradient.addColorStop(0.3, `${particle.color}${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core particle
      ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * interference, 0, Math.PI * 2);
      ctx.fill();
      
      // Quantum wave function visualization
      if (particle.type === 'quantum') {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const waveRadius = size * 2 + 10 * Math.sin(angle * 4 + Date.now() * 0.01);
          const x = particle.x + Math.cos(angle) * waveRadius;
          const y = particle.y + Math.sin(angle) * waveRadius;
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    });
  }, []);
  
  // Main animation loop
  const animate = useCallback((timestamp: number) => {
    const deltaTime = timestamp - performanceState.lastFrameTime;
    performanceState.lastFrameTime = timestamp;
    performanceState.frameTime = deltaTime;
    performanceState.fps = Math.round(1000 / deltaTime);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    updateParticles(deltaTime);
    renderParticles(ctx);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles]);
  
  // Handle new trades
  useEffect(() => {
    activeTrades.forEach(trade => {
      if (!particlesRef.current.find(p => p.id.includes(trade.id))) {
        createTradeParticle(trade);
      }
    });
  }, [activeTrades, createTradeParticle]);
  
  // Initialize and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initializeQuantumFields();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeQuantumFields();
    };
    
    window.addEventListener('resize', handleResize);
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, initializeQuantumFields]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: animationEngine.effectsEnabled ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        mixBlendMode: 'screen',
        filter: `blur(${animSnap.effects.blur.amount}px)`,
      }}
    />
  );
}