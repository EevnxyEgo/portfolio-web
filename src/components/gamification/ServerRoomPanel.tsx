'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface ServerRoomPanelProps {
  activeCategory: string | null;
  activeSkill: string | null;
}

function ServerLED({ isActive, color, isProcessing, index }: { isActive: boolean; color: string; isProcessing: boolean; index: number }) {
  const prefersReduced = useReducedMotion();
  const idleColor = index % 2 === 0 ? '#E8330A' : '#00D4FF';
  const effectiveColor = isProcessing ? color : idleColor;
  const effectiveIsActive = isProcessing ? true : isActive;

  if (isProcessing && !prefersReduced) {
    return (
      <motion.div
        className="w-2 h-2 rounded-sm"
        animate={{ opacity: [1, 0.1, 1, 0.1, 1, 0.1, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
        style={{
          background: effectiveColor,
          boxShadow: `0 0 4px ${effectiveColor}`,
        }}
      />
    );
  }

  return (
    <div
      className="w-2 h-2 rounded-sm"
      style={{
        background: effectiveIsActive ? effectiveColor : `${effectiveColor}40`,
        boxShadow: effectiveIsActive ? `0 0 4px ${effectiveColor}` : 'none',
      }}
    />
  );
}

function ServerUnit({ index, isProcessing, ledColor }: { index: number; isProcessing: boolean; ledColor: string }) {
  return (
    <div
      className="w-full h-[36px] rounded flex items-center justify-center gap-[3px] px-2"
      style={{ background: '#1A1714', border: '1px solid #2C2825' }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ServerLED
          key={i}
          color={ledColor}
          isActive={(i + index) % (isProcessing ? 1 : 2) === 0}
          isProcessing={isProcessing}
          index={i}
        />
      ))}
    </div>
  );
}

function CoolingFan({ speed }: { speed: number }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className="w-8 h-8 rounded-full border-2 flex items-center justify-center relative"
      style={{ borderColor: '#3C3733', background: '#1A1714' }}
      animate={prefersReduced ? {} : { rotate: 360 }}
      transition={prefersReduced ? {} : { duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {[0, 90, 180, 270].map((angle) => (
        <div
          key={angle}
          className="absolute w-6 h-1 rounded-full"
          style={{ background: '#3C3733', transform: `rotate(${angle}deg)` }}
        />
      ))}
      <div className="w-2 h-2 rounded-full" style={{ background: '#3C3733', zIndex: 1 }} />
    </motion.div>
  );
}

export function ServerRoomPanel({ activeCategory, activeSkill }: ServerRoomPanelProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const [temperature, setTemperature] = useState(0);
  const [uptime, setUptime] = useState(99.9);
  const [loadingSkill, setLoadingSkill] = useState<string | null>(null);
  const [ledColor, setLedColor] = useState('#E8330A');
  const tempRef = useRef(0);

  const isProcessing = !!activeSkill;
  const fanSpeed = isProcessing ? 0.3 : 2;

  useEffect(() => {
    if (activeSkill) {
      setLoadingSkill(activeSkill);
      tempRef.current = Math.min(tempRef.current + 2, 10);
      setTemperature(tempRef.current);
      if (activeCategory === 'AI / Machine Learning') {
        setLedColor('#D97706');
      } else if (activeCategory === 'Backend & APIs') {
        setLedColor('#4ade80');
      } else if (activeCategory === '3D & Creative Tech') {
        setLedColor('#a855f7');
      } else {
        setLedColor('#E8330A');
      }
    } else {
      setLoadingSkill(null);
      tempRef.current = Math.max(tempRef.current - 1, 0);
      setTemperature(tempRef.current);
      setLedColor('#E8330A');
    }
  }, [activeSkill, activeCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => Math.min(99.9, parseFloat((prev + 0.0001).toFixed(1))));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const tempColor = temperature > 7 ? '#ef4444' : temperature > 4 ? '#D97706' : '#4ade80';

  return (
    <div
      className="hidden lg:flex flex-col w-[200px] shrink-0 rounded-xl overflow-hidden"
      style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
        <span className="font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
          THE SERVER ROOM
        </span>
        <span className="font-mono text-[0.55rem]" style={{ color: temperature > 7 ? '#ef4444' : '#4ade80' }}>
          UPTIME: {uptime.toFixed(1)}%
        </span>
      </div>

      {/* Scene */}
      <div className="relative p-3 flex-1">
        {/* Server rack */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-[3px] flex-1">
            {[0, 1, 2].map(i => (
              <ServerUnit key={i} index={i} isProcessing={isProcessing} ledColor={ledColor} />
            ))}
          </div>
          <div className="flex flex-col justify-around py-1">
            <CoolingFan speed={fanSpeed} />
            <CoolingFan speed={fanSpeed * 1.5} />
          </div>
        </div>

        {/* Loading bar */}
        <AnimatePresence>
          {loadingSkill && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <motion.div
                animate={prefersReduced ? {} : { x: [0, -1, 1, -1, 0] }}
                transition={prefersReduced ? {} : { duration: 0.3, repeat: Infinity }}
              >
                <div className="font-mono text-[0.55rem] mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                  LOADING: {loadingSkill}
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#2C2825' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: ledColor, originX: 0, scaleX: 0 }}
                    animate={prefersReduced ? { scaleX: 1 } : { scaleX: [0, 0.8, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Temperature gauge */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[0.55rem]" style={{ color: 'var(--color-text-tertiary)' }}>
              TEMP
            </span>
            <span className="font-mono text-[0.55rem]" style={{ color: tempColor }}>
              {temperature}0°C
            </span>
          </div>
          <motion.div
            className="flex gap-[2px]"
            animate={temperature > 5 && !prefersReduced ? {
              boxShadow: [`0 0 4px ${tempColor}`, `0 0 16px ${tempColor}`, `0 0 4px ${tempColor}`],
            } : {}}
            transition={temperature > 5 && !prefersReduced ? { duration: 1.2, repeat: Infinity } : {}}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-3 rounded-sm"
                style={{
                  background: i < temperature ? tempColor : `${tempColor}20`,
                }}
              />
            ))}
          </motion.div>
          {temperature > 7 && !prefersReduced && (
            <div className="flex gap-1 mt-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#ef4444' }}
                  animate={{ y: [-2, -8, -12], opacity: [0.8, 0.4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
