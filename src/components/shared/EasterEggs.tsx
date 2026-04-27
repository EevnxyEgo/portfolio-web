"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConfettiModule = any;

// ── Logo click confetti ──────────────────────────────────────────────
function LogoConfetti() {
  const clickCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const logo = document.querySelector("[data-logo]");
    if (!logo) return;

    const handler = () => {
      clickCount.current++;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        clickCount.current = 0;
      }, 2000);

      if (clickCount.current >= 5) {
        clickCount.current = 0;
        import("canvas-confetti").then((confettiModule: ConfettiModule) => {
          confettiModule.fire?.({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#E8330A", "#D97706", "#4A7C59", "#2E78B5"],
          });
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };

    logo.addEventListener("click", handler);
    return () => logo.removeEventListener("click", handler);
  }, []);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] px-5 py-2.5 rounded-full font-body text-sm shadow-lg"
        >
          You found it!
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Konami Code ────────────────────────────────────────────────────
function KonamiEgg() {
  const [retroMode, setRetroMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const sequence = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];
    const indexRef = { current: 0 };

    const handler = (e: KeyboardEvent) => {
      if (e.code === sequence[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === sequence.length) {
          indexRef.current = 0;
          setRetroMode(true);
          setShowToast(true);
          setTimeout(() => {
            setRetroMode(false);
            setShowToast(false);
          }, 3000);
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {retroMode && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-black text-lime-400 font-mono text-sm py-2 text-center" aria-live="polite">
          CHEAT CODE ACTIVATED
        </div>
      )}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-black text-white px-5 py-2.5 rounded-full font-mono text-xs shadow-lg"
          >
            Retro mode activated... just kidding
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Idle Easter Egg ───────────────────────────────────────────────
function IdleEasterEgg() {
  const [showTip, setShowTip] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const reset = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      setShowTip(false);
      idleTimer.current = setTimeout(() => {
        if (!triggered.current) {
          triggered.current = true;
          setShowTip(true);
          setTimeout(() => setShowTip(false), 4000);
        }
      }, 30000);
    };
    reset();
    window.addEventListener("mousemove", reset, { once: true });
    window.addEventListener("scroll", reset, { once: true });
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {showTip && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] px-4 py-2 rounded-full font-mono text-xs text-[var(--color-text-secondary)] shadow-md"
        >
          psst... still there?
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Master export ─────────────────────────────────────────────────
export function EasterEggs() {
  return (
    <>
      <LogoConfetti />
      <KonamiEgg />
      <IdleEasterEgg />
    </>
  );
}
