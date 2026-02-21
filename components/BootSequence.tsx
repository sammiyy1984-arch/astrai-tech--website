import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  const bootLogs = [
    "INITIALIZING_KERNEL...",
    "LOADING_NEURAL_NET_V2.4...",
    "MOUNTING_VIRTUAL_MEMORY...",
    "CHECKING_INTEGRITY... OK",
    "ESTABLISHING_SECURE_CONNECTION...",
    "SYNCING_WITH_SINGAPORE_NODE...",
    "LOADING_UI_MODULES...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    let delay = 0;
    const timeouts: number[] = [];

    bootLogs.forEach((log, index) => {
      // Randomize delay slightly for realism
      const stepDelay = Math.random() * 300 + 100;
      delay += stepDelay;

      const timeout = window.setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, delay);
      timeouts.push(timeout);
    });

    // Completion timeout
    const finishTimeout = window.setTimeout(() => {
      onComplete();
    }, delay + 800);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-start justify-end p-8 md:p-16 font-mono text-xs md:text-sm text-green-500 overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-2xl">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1"
          >
            <span className="opacity-50 mr-2">
              {`[${(Math.random() * 1000).toFixed(4)}]`}
            </span>
            {log}
          </motion.div>
        ))}
        <motion.div
          className="w-3 h-5 bg-green-500 mt-2"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      </div>
      
      {/* Background visual noise */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900 via-black to-black" />
    </motion.div>
  );
};

export default BootSequence;