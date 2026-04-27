"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Terminal Commands ─────────────────────────────────────────────────────────
const COMMANDS = {
  help: () => [
    "> Available commands:",
    "  help     — Show this help message",
    "  about    — Display bio information",
    "  skills   — List technical skills",
    "  projects — List all projects",
    "  contact  — Show contact information",
    "  matrix   — Trigger Matrix rain animation",
    "  clear    — Clear terminal",
    "  exit     — Close terminal",
    "",
    "> CHALLENGE: What does this output?",
    ">   const x = [1,2,3].reduce((a,b) => a + b, 0)",
    ">   console.log(typeof x + x)",
    ">   ",
    "> Type your answer: _",
  ],
  about: () => [
    "",
    "  ╔══════════════════════════════════════╗",
    "  ║     ARSENIUS AUDLEY WAHYU DJATMIKO    ║",
    "  ╠══════════════════════════════════════╣",
    "  ║  Role: Fullstack Developer × ML Eng  ║",
    "  ║  Location: Surabaya, Indonesia        ║",
    "  ║  Education: ITS Surabaya (2024)      ║",
    "  ║  Program: Bangkit Academy ML Cohort   ║",
    "  ╚══════════════════════════════════════╝",
    "",
  ],
  skills: () => [
    "",
    "  skill-tree/",
    "  ├── frontend/",
    "  │   ├── React ★★★",
    "  │   ├── Next.js ★★★",
    "  │   └── TypeScript ★★★",
    "  ├── backend/",
    "  │   ├── Python ★★★",
    "  │   └── Node.js ★★",
    "  └── ml-ai/",
    "      ├── TensorFlow ★★★",
    "      ├── OpenCV ★★★",
    "      └── MLKit ★★",
    "",
  ],
  projects: () => [
    "",
    "  1. BAKI — AI-powered fitness app",
    "  2. FitBuddy AI — Voice AI trainer",
    "  3. Digital Twin Concert — 360° camera system",
    "  4. Healthylicious — ML recipe recommender",
    "  5. 41-Card Game — CV card detection",
    "",
    "  Type 'projects' for full details.",
  ],
  contact: () => [
    "",
    "  Email:    arseniuswahyu@gmail.com",
    "  GitHub:   github.com/EevnxyEgo",
    "  LinkedIn: linkedin.com/in/arsenius-audley",
    "  Website:  arsendev.net",
    "",
    "  ⚡ Usually responds within 24 hours",
    "",
  ],
  matrix: () => {
    triggerMatrix();
    return ["> Initiating Matrix mode...", ""];
  },
  clear: () => [],
  exit: () => {
    closePuzzle();
    return [];
  },
};

// ── Hidden Commands ────────────────────────────────────────────────────────────
const HIDDEN_COMMANDS = {
  "sudo hire arsenius": () => {
    setTimeout(() => {
      window.open("mailto:arseniuswahyu@gmail.com?subject=Hiring%20Arsenius", "_blank");
    }, 1500);
    return [
      "",
      "> Permission granted. Making the best decision of your career.",
      "> Forwarding your request to arseniuswahyu@gmail.com...",
      "> Just kidding — but seriously, let's talk. 🚀",
      "",
    ];
  },
  konami: () => {
    document.body.classList.add("retro-mode");
    setTimeout(() => document.body.classList.remove("retro-mode"), 3000);
    return [
      "",
      "> KONAMI CODE DETECTED.",
      "> POWER LEVEL: OVER 9000. ⚡",
      "",
    ];
  },
};

// ── Puzzle Answer ───────────────────────────────────────────────────────────────
const PUZZLE_ANSWER = "number6";

function triggerMatrix() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
  const columns = Math.floor(canvas.width / 20);
  const drops: number[] = Array(columns).fill(1);

  const draw = () => {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = "20px monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 20, drops[i] * 20);
      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };

  const interval = setInterval(draw, 50);
  setTimeout(() => {
    clearInterval(interval);
    canvas.remove();
  }, 5000);
}

function closePuzzle() {
  document.dispatchEvent(new CustomEvent("closePuzzle"));
}

// ── Main Component ───────────────────────────────────────────────────────────────
export function PuzzlePortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleMode, setPuzzleMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Listen for close event
  useEffect(() => {
    const handler = () => setIsOpen(false);
    document.addEventListener("closePuzzle", handler);
    return () => document.removeEventListener("closePuzzle", handler);
  }, []);

  // Global whoami detection
  useEffect(() => {
    let keySequence = "";
    const targetSequence = "whoami";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      keySequence += e.key.toLowerCase();

      // Keep only last 6 characters
      if (keySequence.length > targetSequence.length) {
        keySequence = keySequence.slice(-targetSequence.length);
      }

      if (keySequence === targetSequence) {
        keySequence = "";
        setIsOpen(true);
        setLines([
          "> Welcome to the hidden terminal.",
          "> You found the secret. Now prove yourself.",
          "> Type 'help' to see available commands.",
          "",
        ]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Handle help command - triggers puzzle mode
    if (trimmedCmd === "help") {
      setPuzzleMode(true);
    }

    // Check hidden commands first
    if (HIDDEN_COMMANDS[trimmedCmd as keyof typeof HIDDEN_COMMANDS]) {
      const result = HIDDEN_COMMANDS[trimmedCmd as keyof typeof HIDDEN_COMMANDS]();
      setLines((prev) => [...prev, `> ${cmd}`, ...result]);
      return;
    }

    // Check puzzle mode
    if (puzzleMode && !puzzleSolved) {
      if (trimmedCmd === PUZZLE_ANSWER) {
        setPuzzleSolved(true);
        setPuzzleMode(false);
        setLines((prev) => [
          ...prev,
          `> ${cmd}`,
          "",
          "> ✓ Correct! You actually know JavaScript. 🎯",
          "> Unlocking secret content...",
          "",
          "> ── Secret Fun Facts ──────────────────",
          "> • I trained a CNN on 2600+ card images. Alone. In one weekend.",
          "> • My thesis involved a virtual K-pop concert in Unreal Engine 5.",
          "> • I use vim keybindings. Sometimes.",
          "",
          "> 🔒 Extended CV download:",
          ">   Hidden content unlocked for JavaScript experts.",
          "",
        ]);
      } else {
        setLines((prev) => [
          ...prev,
          `> ${cmd}`,
          "> Incorrect. Try again. Hint: concatenation is sneaky.",
          "",
        ]);
      }
      return;
    }

    // Regular commands
    if (COMMANDS[trimmedCmd as keyof typeof COMMANDS]) {
      const result = COMMANDS[trimmedCmd as keyof typeof COMMANDS]();
      setLines((prev) => [...prev, `> ${cmd}`, ...result]);
    } else if (trimmedCmd !== "") {
      setLines((prev) => [
        ...prev,
        `> ${cmd}`,
        `> Command not found: ${trimmedCmd}. Type 'help' for available commands.`,
        "",
      ]);
    } else {
      setLines((prev) => [...prev, `> ${cmd}`, ""]);
    }
  }, [puzzleMode, puzzleSolved]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Tab completion
  const handleTabComplete = (value: string) => {
    const commands = ["help", "about", "skills", "projects", "contact", "matrix", "clear", "exit"];
    const matches = commands.filter((c) => c.startsWith(value.toLowerCase()));
    if (matches.length === 1) {
      setInput(matches[0]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[99998] flex flex-col"
          style={{ background: "#0D0B09" }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "#1a1a1a" }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28ca41" }} />
            </div>

            {/* Title */}
            <div className="font-mono text-sm" style={{ color: "#888" }}>
              arsenius@portfolio:~$
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded text-xs font-mono"
              style={{
                background: "#1a1a1a",
                color: "#888",
              }}
            >
              ESC to close
            </button>
          </div>

          {/* Terminal output */}
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm"
            style={{ color: "#0f0" }}
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>

          {/* Terminal input */}
          <div
            className="flex items-center gap-2 p-4 border-t"
            style={{ borderColor: "#1a1a1a" }}
          >
            <span style={{ color: "#0f0" }}>{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={(e) => {
                if (e.key === "Tab") {
                  handleTabComplete(input);
                }
              }}
              className="flex-1 bg-transparent outline-none font-mono text-sm"
              style={{ color: "#0f0" }}
              placeholder="Type a command..."
              autoFocus
            />
            <span className="w-2 h-5 bg-[#0f0] animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}