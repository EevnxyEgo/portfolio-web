"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Toast {
  id: string;
  message: string;
  emoji: string;
  color: string;
}

interface ToastContextType {
  showToast: (message: string, emoji: string, color: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

interface ToastEntry extends Toast {
  createdAt: number;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showToast = useCallback((message: string, emoji: string, color: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, message, emoji, color, createdAt: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="flex items-center gap-3 px-5 py-3 rounded-full shadow-xl"
            style={{
              background: "var(--color-bg-elevated)",
              border: `2px solid ${toast.color}`,
              boxShadow: `0 0 20px ${toast.color}30`,
            }}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: 20, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -20, scale: 0.9 }
            }
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xl">{toast.emoji}</span>
            <span className="font-mono text-sm" style={{ color: "var(--color-text)" }}>
              {toast.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}