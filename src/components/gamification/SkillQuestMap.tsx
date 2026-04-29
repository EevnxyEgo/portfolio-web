'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface SkillQuestMapProps {
  activeCategory: string | null;
  onCategorySelect: (cat: string | null) => void;
}

const zones = [
  { id: 'Frontend & Web', label: 'Frontend Kingdom', color: '#E8330A', order: 0 },
  { id: 'Backend & APIs', label: 'Backend Fortress', color: '#2E78B5', order: 1 },
  { id: 'AI / Machine Learning', label: 'AI/ML Laboratory', color: '#D97706', order: 2 },
  { id: '3D & Creative Tech', label: '3D Space Station', color: '#C2556A', order: 3 },
];

// Ambient floating particles — pre-computed for performance
const ambientParticles = [
  { id: 0, size: 3, opacity: 0.35, color: zones[0].color, startX: 5, startY: 30, pathX: 80, pathY: 60, duration: 8 },
  { id: 1, size: 4, opacity: 0.4, color: zones[1].color, startX: 20, startY: 70, pathX: 60, pathY: 20, duration: 10 },
  { id: 2, size: 3, opacity: 0.3, color: zones[2].color, startX: 40, startY: 20, pathX: 50, pathY: 80, duration: 12 },
  { id: 3, size: 4, opacity: 0.45, color: zones[3].color, startX: 65, startY: 60, pathX: 25, pathY: 35, duration: 9 },
  { id: 4, size: 3, opacity: 0.35, color: zones[0].color, startX: 80, startY: 40, pathX: 10, pathY: 70, duration: 11 },
  { id: 5, size: 4, opacity: 0.3, color: zones[2].color, startX: 55, startY: 80, pathX: 35, pathY: 15, duration: 7 },
];

function getZoneIconStyle(i: number, zoneColor: string): React.CSSProperties {
  if (i === 0) {
    return {
      width: '2rem',
      height: '2rem',
      background: zoneColor,
      clipPath: 'polygon(0 100%, 30% 40%, 30% 0, 50% 30%, 70% 0, 70% 40%, 100% 100%)',
    };
  }
  if (i === 1) {
    return {
      width: '2rem',
      height: '2rem',
      background: zoneColor,
      clipPath: 'polygon(0 100%, 0 60%, 20% 40%, 20% 0, 40% 0, 40% 30%, 60% 30%, 60% 0, 80% 0, 80% 30%, 100% 30%, 100% 100%)',
    };
  }
  if (i === 2) {
    return {
      width: '2rem',
      height: '2rem',
      background: `radial-gradient(circle at 50% 50%, ${zoneColor} 0%, ${zoneColor}60 100%)`,
      borderRadius: '50%',
    };
  }
  return {
    width: '2rem',
    height: '2rem',
    background: zoneColor,
    borderRadius: '50%',
    boxShadow: `0 0 12px ${zoneColor}60`,
  };
}

export function SkillQuestMap({ activeCategory, onCategorySelect }: SkillQuestMapProps) {
  const prefersReduced = useReducedMotion();

  const activeIndex = zones.findIndex(z => z.id === activeCategory);
  const characterX = activeIndex >= 0 ? 12 + activeIndex * 25 : 50;

  return (
    <div className="hidden lg:block mt-12 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="text-center mb-4">
        <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
          Skill Quest Map
        </span>
      </div>

      {/* Map container */}
      <div
        className="relative w-full rounded-xl overflow-hidden flex items-center"
        style={{
          height: 120,
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Path line */}
        <div
          className="absolute top-1/2 left-[10%] right-[10%] h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${zones[0].color}40, ${zones[1].color}40, ${zones[2].color}40, ${zones[3].color}40)`,
          }}
        />

        {/* Ambient floating particles — only when motion is allowed */}
        {!prefersReduced &&
          ambientParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                background: particle.color,
                boxShadow: `0 0 6px ${particle.color}80`,
                left: `${particle.startX}%`,
                top: `${particle.startY}%`,
              }}
              animate={{
                x: [0, particle.pathX - particle.startX, 0],
                y: [0, particle.pathY - particle.startY, 0],
                opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

        {/* Zones */}
        <div className="relative z-10 flex justify-between w-full px-8">
          {zones.map((zone, i) => {
            const isSelected = activeCategory === zone.id;
            return (
              <motion.button
                key={zone.id}
                onClick={() => onCategorySelect(isSelected ? null : zone.id)}
                aria-label={zone.label}
                aria-pressed={isSelected}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.1 }}
                animate={isSelected ? { scale: 1.15 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Ring pulse on selected zone */}
                {!prefersReduced && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 48,
                      height: 48,
                      top: 2,
                      border: `2px solid ${zone.color}`,
                    }}
                    animate={
                      isSelected
                        ? { scale: [1, 1.8, 2], opacity: [0.8, 0.4, 0] }
                        : { scale: 1, opacity: 0 }
                    }
                    transition={
                      isSelected
                        ? { duration: 1, repeat: Infinity, ease: 'easeOut' }
                        : { duration: 0 }
                    }
                  />
                )}

                {/* Outer glow layer (appears on hover) */}
                <motion.div
                  className="absolute rounded-xl pointer-events-none"
                  style={{
                    width: 56,
                    height: 56,
                    top: -4,
                    background: `radial-gradient(circle, ${zone.color}30 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                  }}
                  whileHover={{ opacity: [0, 1], scale: [0.8, 1.2] }}
                  animate={isSelected ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Zone icon container */}
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${zone.color}20`,
                    border: `2px solid ${isSelected ? zone.color : 'transparent'}`,
                    boxShadow: isSelected ? `0 0 20px ${zone.color}40` : 'none',
                  }}
                  whileHover={{
                    boxShadow: [
                      `0 0 8px ${zone.color}30`,
                      `0 0 20px ${zone.color}50`,
                      `0 0 30px ${zone.color}40`,
                    ],
                    borderColor: zone.color,
                  }}
                  animate={
                    isSelected
                      ? {
                          boxShadow: [
                            `0 0 20px ${zone.color}40`,
                            `0 0 30px ${zone.color}50`,
                            `0 0 20px ${zone.color}40`,
                          ],
                          borderColor: zone.color,
                        }
                      : { boxShadow: 'none', borderColor: 'transparent' }
                  }
                  transition={{ duration: 0.3, repeat: isSelected ? Infinity : 0 }}
                >
                  {/* Zone icon with subtle pulse on hover */}
                  <motion.div
                    style={getZoneIconStyle(i, zone.color)}
                    whileHover={{ scale: [1, 1.15, 1], rotate: i === 2 ? [0, 5, -5, 0] : [0, 0, 0] }}
                    animate={
                      isSelected
                        ? { scale: [1, 1.08, 1], rotate: i === 2 ? [0, 3, -3, 0] : [0, 0, 0] }
                        : { scale: 1 }
                    }
                    transition={
                      isSelected
                        ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.4 }
                    }
                  />
                </motion.div>
                <span
                  className="font-mono text-[0.55rem] transition-colors whitespace-nowrap"
                  style={{
                    color: isSelected ? zone.color : 'var(--color-text-tertiary)',
                  }}
                >
                  {zone.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Walking character */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            left: `${characterX}%`,
            background: '#E8330A',
            boxShadow: '0 0 8px #E8330A80',
          }}
          animate={
            prefersReduced
              ? { left: `${characterX}%` }
              : { left: `${characterX}%`, y: [0, -3, 0] }
          }
          transition={
            prefersReduced
              ? {}
              : {
                  left: { duration: 0.8, ease: 'easeInOut' },
                  y: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
                }
          }
        />
      </div>
    </div>
  );
}
