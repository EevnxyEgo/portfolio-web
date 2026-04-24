"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function toast(type: Toast["type"], message: string) {
  const id = Math.random().toString(36).substring(7);
  toastListeners.forEach((listener) => listener({ id, type, message }));
}

export function ToastContainer() {
  const prefersReduced = useReducedMotion();
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    };

    toastListeners.push(handleToast);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== handleToast);
    };
  }, []);

  const getStyles = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/40 text-green-400";
      case "error":
        return "bg-red-500/20 border-red-500/40 text-red-400";
      case "info":
        return "bg-blue-500/20 border-blue-500/40 text-blue-400";
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`px-4 py-3 rounded-lg border backdrop-blur-sm ${getStyles(t.type)}`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}