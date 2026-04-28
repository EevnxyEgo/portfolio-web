'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { PixelSprite } from './PixelSprite';
import { developerCharacter, monitorSprite, deskSprite, coffeeCup } from './data/characterSprites';
import { monitorContent } from './data/monitorContent';

interface TheLabPanelProps {
  activeCategory: string | null;
  activeSkill: string | null;
}

export function TheLabPanel({ activeCategory, activeSkill }: TheLabPanelProps) {
  const prefersReduced = useReducedMotion();
  const [statusText, setStatusText] = useState('// coding in progress...');

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
            <div
              className="relative"
              style={{
                transform: activeSkill ? 'rotate(-5deg) translateY(-1px)' : 'rotate(0deg) translateY(0px)',
                transition: 'transform 0.3s ease',
              }}
            >
              <PixelSprite pixels={developerCharacter} pixelSize={4} />
              {/* Typing animation on hand */}
              {!prefersReduced && (
                <motion.div
                  className="absolute w-2 h-2 rounded-sm"
                  style={{ background: '#C8956C', bottom: 2, right: 4 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </div>
            <PixelSprite pixels={deskSprite} pixelSize={4} />
          </div>

          {/* Coffee cup with steam */}
          <div className="flex items-end gap-1 mt-1">
            <div className="relative">
              <PixelSprite pixels={coffeeCup} pixelSize={4} />
              {/* Steam dots */}
              {!prefersReduced && (
                <>
                  <motion.div
                    className="absolute w-1 h-1 rounded-full"
                    style={{ background: 'rgba(247,243,238,0.6)', top: -2, left: 2 }}
                    animate={{ y: [-2, -6], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="absolute w-1 h-1 rounded-full"
                    style={{ background: 'rgba(247,243,238,0.4)', top: -2, left: 4 }}
                    animate={{ y: [-2, -8], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
