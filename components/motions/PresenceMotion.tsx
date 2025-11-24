import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProductAwarenessLeftSVG from '@/public/assets/images/banner/img_product_awareness_left.svg';
import ProductAwarenessRightSVG from '@/public/assets/images/banner/img_product_awareness_right.svg';

const images = [
  { Component: ProductAwarenessLeftSVG, key: 'left' },
  { Component: ProductAwarenessRightSVG, key: 'right' },
];

export const PresenceMotion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const { Component } = images[currentIndex];

  return (
    <div
      style={{
        position: 'relative',
        width: '336px',
        height: '280px',
        display: 'flex',
        border: '1px solid #C2BDBA',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex' }}
        >
          <Component style={{ width: '100%', height: 'auto' }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
