"use client";

import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const circleRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    targetX: number;
    targetY: number;
    time: number;
  }>({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    dx: (Math.random() - 0.5) * 1.4,
    dy: (Math.random() - 0.5) * 1.4,
    targetX: Math.random() * window.innerWidth,
    targetY: Math.random() * window.innerHeight,
    time: 0
  });

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const state = animationRef.current;
    
    // Perlin noise-like function for smooth randomness
    const noise = (t: number) => {
      return Math.sin(t) * Math.cos(t * 1.5) * Math.sin(t * 0.5);
    };

    // Generate new target point
    const updateTarget = () => {
      state.targetX = Math.random() * (window.innerWidth - 700);
      state.targetY = Math.random() * (window.innerHeight - 700);
      
      // Update velocity based on new target
      const dx = state.targetX - state.x;
      const dy = state.targetY - state.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize and set speed
      const speed = 1.4;
      state.dx = (dx / distance) * speed;
      state.dy = (dy / distance) * speed;
    };

    const animate = () => {
      if (!circle) return;
      state.time += 0.0035;

      // Move towards target
      const dx = state.targetX - state.x;
      const dy = state.targetY - state.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If we're close to target, generate new target
      if (distance < 10) {
        updateTarget();
      }

      // Update position with momentum and noise
      state.x += state.dx + noise(state.time) * 0.35;
      state.y += state.dy + noise(state.time + 100) * 0.35;

      // Keep within bounds
      if (state.x < 0 || state.x > window.innerWidth - 700) {
        state.dx *= -0.8;
        state.x = Math.max(0, Math.min(state.x, window.innerWidth - 700));
        updateTarget();
      }
      if (state.y < 0 || state.y > window.innerHeight - 700) {
        state.dy *= -0.8;
        state.y = Math.max(0, Math.min(state.y, window.innerHeight - 700));
        updateTarget();
      }

      // Update color based on position
      const normalizedX = state.x / window.innerWidth;
      const hue = 30 * (1 - normalizedX);
      
      // Apply position and color
      circle.style.transform = `translate(${state.x}px, ${state.y}px)`;
      
      const lightness = hue < 5 ? '100%' : '50%';
      const alpha = hue < 5 ? '0.2' : '0.3';
      circle.style.background = `hsla(${hue}, 100%, ${lightness}, ${alpha})`;

      requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      state.x = Math.min(state.x, window.innerWidth - 700);
      state.y = Math.min(state.y, window.innerHeight - 700);
      state.targetX = Math.min(state.targetX, window.innerWidth - 700);
      state.targetY = Math.min(state.targetY, window.innerHeight - 700);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        ref={circleRef}
        className="absolute w-[700px] h-[700px] rounded-full blur-[200px]"
        style={{ 
          willChange: 'transform, background',
          background: 'hsla(30, 100%, 50%, 0.3)',
          transition: 'background 0.3s ease'
        }}
      />
    </div>
  );
}
