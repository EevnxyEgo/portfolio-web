'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

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

export function SkillQuestMap({ activeCategory, onCategorySelect }: SkillQuestMapProps) {
  const prefersReduced = useReducedMotion();

  const activeIndex = zones.findIndex(z => z.id === activeCategory);
  // Character position: 0=first zone, 1=second, etc. Center when idle.
  const characterX = activeIndex >= 0 ? 12 + activeIndex * 25 : 50; // percentage along path

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

        {/* Zones */}
        <div className="relative z-10 flex justify-between w-full px-8">
          {zones.map((zone, i) => (
            <button
              key={zone.id}
              onClick={() => onCategorySelect(activeCategory === zone.id ? null : zone.id)}
              aria-label={zone.label}
              aria-pressed={activeCategory === zone.id}
              className="flex flex-col items-center gap-2 group transition-transform cursor-pointer"
              style={{ transform: activeCategory === zone.id ? 'scale(1.15)' : 'scale(1)' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = activeCategory === zone.id ? 'scale(1.15)' : 'scale(1)')}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: `${zone.color}20`,
                  border: `2px solid ${activeCategory === zone.id ? zone.color : 'transparent'}`,
                  boxShadow: activeCategory === zone.id ? `0 0 20px ${zone.color}40` : 'none',
                  filter: activeCategory === zone.id ? 'brightness(1.3)' : 'brightness(1)',
                }}
              >
                {/* Inline zone icons using clip-path shapes */}
                <div
                  className="w-8 h-8"
                  style={(() => {
                    const base: React.CSSProperties = { width: '2rem', height: '2rem' };
                    if (i === 0) {
                      return {
                        ...base,
                        background: zone.color,
                        clipPath: 'polygon(0 100%, 30% 40%, 30% 0, 50% 30%, 70% 0, 70% 40%, 100% 100%)',
                      };
                    }
                    if (i === 1) {
                      return {
                        ...base,
                        background: zone.color,
                        clipPath:
                          'polygon(0 100%, 0 60%, 20% 40%, 20% 0, 40% 0, 40% 30%, 60% 30%, 60% 0, 80% 0, 80% 30%, 100% 30%, 100% 100%)',
                      };
                    }
                    if (i === 2) {
                      return {
                        ...base,
                        background: `radial-gradient(circle at 50% 50%, ${zone.color} 0%, ${zone.color}60 100%)`,
                        borderRadius: '50%',
                      };
                    }
                    return {
                      ...base,
                      background: zone.color,
                      borderRadius: '50%',
                      boxShadow: `0 0 12px ${zone.color}60`,
                    };
                  })()}
                />
              </div>
              <span
                className="font-mono text-[0.55rem] transition-colors whitespace-nowrap"
                style={{
                  color: activeCategory === zone.id ? zone.color : 'var(--color-text-tertiary)',
                }}
              >
                {zone.label}
              </span>
            </button>
          ))}
        </div>

        {/* Walking character */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            left: `${characterX}%`,
            background: '#E8330A',
            boxShadow: '0 0 8px #E8330A80',
          }}
          animate={prefersReduced ? { left: `${characterX}%` } : { left: `${characterX}%`, y: [0, -3, 0] }}
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
