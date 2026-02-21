import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Hide default cursor on non-touch devices via global style injection in index.html, 
  // but here we just render the visual
  
  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button { cursor: none; }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      >
        {/* Main Cursor Circle */}
        <div className={`relative w-8 h-8 rounded-full border border-green-500 transition-all duration-200 flex items-center justify-center ${isHovering ? 'bg-green-500/20' : ''}`}>
           {/* Center Dot */}
           <div className="w-1 h-1 bg-green-500 rounded-full" />
           
           {/* Crosshair Lines (visible mostly when not hovering) */}
           {!isHovering && (
             <>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-[1px] h-2 bg-green-500/50" />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-2 w-[1px] h-2 bg-green-500/50" />
               <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 h-[1px] w-2 bg-green-500/50" />
               <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 h-[1px] w-2 bg-green-500/50" />
             </>
           )}
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;