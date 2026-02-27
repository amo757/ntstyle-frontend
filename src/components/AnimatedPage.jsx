import React from 'react';
import { motion } from 'framer-motion';

// ანიმაცია მხოლოდ Opacity-ით (გამჭვირვალობის შეცვლით)
const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }} // 0.3 წამი იდეალური, რბილი დროა
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;