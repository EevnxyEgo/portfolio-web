'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { PixelSprite } from './PixelSprite';
import { developerCharacter, monitorSprite, deskSprite, coffeeCup } from './data/characterSprites';

// Pre-sliced character sprite sections (Issue 3)
const headPixels    = developerCharacter.slice(0, 5);   // rows 0-4: head
const bodyPixels    = developerCharacter.slice(5, 15);  // rows 5-14: torso + legs
const armsPixels    = developerCharacter.slice(15, 20); // rows 15-19: arms + keyboard
import { monitorContent } from './data/monitorContent';

interface TheLabPanelProps {
  activeCategory: string | null;
  activeSkill: string | null;
}

export function TheLabPanel({ activeCategory, activeSkill }: TheLabPanelProps) {
  const prefersReduced = useReducedMotion();
  const [statusText, setStatusText] = useState('// coding in progress...');
  const prevActiveSkillRef = useRef<string | null>(null);
  const [isJumping, setIsJumping] = useState(false);

  // Detect transition from null to non-null activeSkill → trigger jump
  useEffect(() => {
    if (activeSkill && prevActiveSkillRef.current === null && !prefersReduced) {
      setIsJumping(true);
      const timer = setTimeout(() => setIsJumping(false), 600);
      return () => clearTimeout(timer);
    }
    prevActiveSkillRef.current = activeSkill;
  }, [activeSkill, prefersReduced]);

  // Update status text based on active category
  useEffect(() => {
    if (!activeCategory) {
      setStatusText('// coding in progress...');
    } else if (activeCategory === 'Frontend & Web') {
      setStatusText('// building UI...');
    } else if (activeCategory === 'Backend & APIs') {
      setStatusText('// serving API...');
    } else if (activeCategory === 'AI / Machine Learning') {
      setStatusText('// training model...');
    } else if (activeCategory === '3D & Creative Tech') {
      setStatusText('// rendering world...');
    } else if (activeCategory === 'Mobile') {
      setStatusText('// mobile dev...');
    } else {
      setStatusText('// exploring...');
    }
  }, [activeCategory]);

  const currentLines = monitorContent[activeCategory || 'default'] || monitorContent.default;

  return (
    <div
      className="hidden lg:flex flex-col w-[200px] shrink-0 rounded-xl overflow-hidden"
      style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <span
          className="font-mono text-[0.6rem] tracking-widest uppercase"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          THE LAB
        </span>
      </div>

      {/* Scene */}
      <div className="relative p-3 flex-1" style={{ minHeight: 320 }}>
        {/* Status text */}
        <div className="mb-2 font-mono text-[0.6rem] leading-tight whitespace-nowrap overflow-hidden" style={{ color: 'var(--color-text-tertiary)' }}>
          {statusText}
        </div>

        {/* Pixel art scene */}
        <div className="flex flex-col gap-1">
          {/* Monitor with dynamic content */}
          <div className="relative">
            <PixelSprite pixels={monitorSprite} pixelSize={4} />
            {/* Monitor flicker when skill is hovered */}
            {!prefersReduced && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: activeSkill
                    ? [1, 0.7, 1, 0.8, 1, 0.85, 1, 0.75, 1]
                    : 1,
                }}
                transition={{
                  duration: activeSkill ? 1.2 : 0,
                  repeat: activeSkill ? Infinity : 0,
                  repeatDelay: activeSkill ? 0.4 : 0,
                  ease: 'easeInOut',
                }}
              />
            )}
            {/* Notification dot — blinks when skill is active */}
            <AnimatePresence>
              {activeSkill && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: 'var(--color-primary)',
                    top: -2,
                    right: -2,
                    boxShadow: '0 0 4px var(--color-primary)',
                    animation: 'notificationPulse 1s ease-in-out infinite',
                  }}
                />
              )}
            </AnimatePresence>
            {/* Code lines overlay — positioned to match monitor screen area */}
            <div
              className="absolute top-4 left-3 flex flex-col gap-[1px]"
              style={{ maxWidth: 60 }}
            >
              {currentLines.map((line, i) => (
                <div
                  key={i}
                  className="font-mono text-[0.45rem] leading-tight"
                  style={{
                    color: line.includes(':') ? '#00D4FF' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Desk + Character row */}
          <div className="flex items-end gap-1">
            {/* Character */}
            <motion.div
              className="relative"
              animate={
                isJumping
                  ? { y: [0, -8, 0] }
                  : { y: activeSkill ? -1 : 0 }
              }
              transition={
                isJumping
                  ? { duration: 0.6, ease: [0.36, 0.07, 0.19, 0.97] }
                  : { duration: 0.3, ease: 'easeOut' }
              }
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Head — tilts when skill is hovered (Issue 2: Framer Motion) */}
              <motion.div
                animate={activeSkill ? { rotate: -8, x: -2 } : { rotate: 0, x: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ display: 'flex' }}
              >
                <PixelSprite pixels={headPixels} pixelSize={4} />
              </motion.div>
              {/* Body (torso + legs) */}
              <PixelSprite pixels={bodyPixels} pixelSize={4} />
              {/* Arms + keyboard */}
              <PixelSprite pixels={armsPixels} pixelSize={4} />
              {/* Typing animation on hand */}
              {!prefersReduced && (
                <motion.div
                  className="absolute w-2 h-2 rounded-sm"
                  style={{ background: '#C8956C', bottom: 2, right: 4 }}
                  animate={{ y: activeSkill ? [0, -2, 0, -4, 0] : [0, -4, 0] }}
                  transition={{
                    duration: activeSkill ? 0.3 : 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.div>
            <PixelSprite pixels={deskSprite} pixelSize={4} />
          </div>

          {/* Coffee cup with steam */}
          <div className="flex items-end gap-1 mt-1">
            <div className="relative">
              <PixelSprite pixels={coffeeCup} pixelSize={4} />
              {/* Steam dots — more and faster when skill is hovered */}
              {!prefersReduced && (
                <>
                  <motion.div
                    className="absolute w-1 h-1 rounded-full"
                    style={{ background: 'rgba(247,243,238,0.6)', top: -2, left: 2 }}
                    animate={{
                      y: activeSkill ? [-2, -12] : [-2, -6],
                      opacity: [0.6, 0],
                      scale: activeSkill ? [1, 1.5, 0.8] : [1, 0.8],
                    }}
                    transition={{
                      duration: activeSkill ? 0.8 : 1.5,
                      repeat: Infinity,
                      delay: 0,
                    }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 rounded-full"
                    style={{ background: 'rgba(247,243,238,0.4)', top: -2, left: 4 }}
                    animate={{
                      y: activeSkill ? [-2, -14] : [-2, -8],
                      opacity: [0.4, 0],
                      scale: activeSkill ? [1, 1.8, 0.8] : [1, 0.8],
                    }}
                    transition={{
                      duration: activeSkill ? 1.0 : 2,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />
                  {/* Extra steam particles when skill is hovered */}
                  <AnimatePresence>
                    {activeSkill && (
                      <>
                        <motion.div
                          key="steam-0"
                          className="absolute w-[3px] h-[3px] rounded-full"
                          style={{ background: 'rgba(247,243,238,0.5)', top: -4, left: 0 }}
                          animate={{ y: [-4, -16], opacity: [0.5, 0], scale: [1, 2, 0.5] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: 0.15 }}
                        />
                        <motion.div
                          key="steam-1"
                          className="absolute w-[3px] h-[3px] rounded-full"
                          style={{ background: 'rgba(247,243,238,0.5)', top: -4, left: 6 }}
                          animate={{ y: [-4, -18], opacity: [0.5, 0], scale: [1, 2, 0.5] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div
                          key="steam-2"
                          className="absolute w-1 h-1 rounded-full"
                          style={{ background: 'rgba(247,243,238,0.3)', top: -2, left: 8 }}
                          animate={{ y: [-2, -12], opacity: [0.3, 0] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: 0.1 }}
                        />
                        <motion.div
                          key="steam-3"
                          className="absolute w-1 h-1 rounded-full"
                          style={{ background: 'rgba(247,243,238,0.3)', top: -2, left: -2 }}
                          animate={{ y: [-2, -10], opacity: [0.3, 0] }}
                          transition={{ duration: 1.3, repeat: Infinity, delay: 0.6 }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
