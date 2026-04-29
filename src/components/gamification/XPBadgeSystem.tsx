"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const LEVEL_THRESHOLDS = [0, 50, 100, 200, 300];
export const LEVEL_NAMES = ["Rookie", "Explorer", "Adept", "Master", "Legend"];

export function getLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GameState {
  xp: number;
  unlockedBadges: string[];
  exploredSkills: string[];
}

const STORAGE_KEY = "arsenius_skills_gamestate";

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGameState() {
  const [state, setState] = useState<GameState>({
    xp: 0,
    unlockedBadges: [],
    exploredSkills: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(0);
  const levelUpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch {
        // ignore corrupt data
      }
    }
    setIsLoaded(true);
  }, []);

  const addXP = useCallback((amount: number) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = getLevel(newXp);
      const oldLevel = getLevel(prev.xp);
      if (newLevel > oldLevel) {
        if (levelUpTimerRef.current) clearTimeout(levelUpTimerRef.current);
        setPrevLevel(oldLevel);
        setShowLevelUp(true);
        levelUpTimerRef.current = setTimeout(() => {
          setShowLevelUp(false);
          levelUpTimerRef.current = null;
        }, 2000);
      }
      const next: GameState = { ...prev, xp: newXp };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const markSkillExplored = useCallback((skill: string) => {
    setState((prev) => {
      if (prev.exploredSkills.includes(skill)) return prev;
      const next: GameState = {
        ...prev,
        xp: prev.xp + 2,
        exploredSkills: [...prev.exploredSkills, skill],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const checkBadgeUnlock = useCallback(
    (category: string, allSkillsInCategory: string[]): boolean => {
      const allExplored = allSkillsInCategory.every((s) =>
        state.exploredSkills.includes(s)
      );
      const badgeAlreadyUnlocked = state.unlockedBadges.includes(category);
      if (allExplored && !badgeAlreadyUnlocked) {
        setState((prev) => {
          const next: GameState = {
            ...prev,
            xp: prev.xp + 50,
            unlockedBadges: [...prev.unlockedBadges, category],
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        });
        return true;
      }
      return false;
    },
    [state.exploredSkills, state.unlockedBadges]
  );

  return {
    state,
    isLoaded,
    currentLevel: getLevel(state.xp),
    levelName: LEVEL_NAMES[getLevel(state.xp)],
    xpToNextLevel:
      LEVEL_THRESHOLDS[
        Math.min(getLevel(state.xp) + 1, LEVEL_THRESHOLDS.length - 1)
      ] - state.xp,
    showLevelUp,
    prevLevel,
    addXP,
    markSkillExplored,
    checkBadgeUnlock,
  };
}

// ---------------------------------------------------------------------------
// Visual Component
// ---------------------------------------------------------------------------

const CATEGORY_BADGES: Record<string, string> = {
  "Frontend & Web": "⚡",
  "Backend & APIs": "⚙️",
  "AI / Machine Learning": "🧠",
  "Mobile": "📱",
  "3D & Creative Tech": "🎮",
  "Tools & DevOps": "🔧",
};

interface XPBadgeSystemProps {
  state: GameState;
  currentLevel: number;
  levelName: string;
  showLevelUp: boolean;
  isLoaded: boolean;
}

export function XPBadgeSystem({
  state,
  currentLevel,
  levelName,
  showLevelUp,
  isLoaded,
}: XPBadgeSystemProps) {
  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-4">
      {/* XP Counter */}
      <motion.div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "var(--color-bg-elevated)",
          border: "1px solid rgba(232,51,10,0.25)",
        }}
        animate={showLevelUp ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <span
          className="font-mono text-[0.65rem]"
          style={{ color: "var(--color-primary)" }}
        >
          XP
        </span>
        <span
          className="font-mono text-[0.7rem] font-bold"
          style={{ color: "var(--color-text)" }}
        >
          {state.xp}
        </span>
      </motion.div>

      {/* Level badge */}
      <motion.div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-mono"
        style={{
          background: "var(--color-bg-elevated)",
          border: "1px solid var(--color-border)",
        }}
      >
        <span style={{ color: "var(--color-text-secondary)" }}>LVL</span>
        <span className="font-bold" style={{ color: "var(--color-amber)" }}>
          {currentLevel + 1}
        </span>
        <span style={{ color: "var(--color-text-tertiary)" }}>{levelName}</span>
      </motion.div>

      {/* Unlocked badges */}
      <div className="flex items-center gap-1">
        {Object.entries(CATEGORY_BADGES).map(([cat, emoji]) => {
          const unlocked = state.unlockedBadges.includes(cat);
          return (
            <motion.div
              key={cat}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[0.7rem]"
              style={{
                background: unlocked
                  ? "var(--color-primary)"
                  : "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                opacity: unlocked ? 1 : 0.3,
              }}
              title={unlocked ? cat : "???"}
              animate={unlocked ? { scale: [1, 1.2, 1] } : {}}
            >
              {emoji}
            </motion.div>
          );
        })}
      </div>

      {/* Level up notification */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--color-primary), #ff6b35)",
          color: "white",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={
          showLevelUp ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ duration: 0.3 }}
      >
        <span className="font-bold">LEVEL UP!</span>
        <span className="ml-2">You are now {levelName}</span>
      </motion.div>
    </div>
  );
}