import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { css } from 'emotion';

const Accordion = ({ visible, children }) => {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className={css`
            overflow: hidden;
          `}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 1, height: 0 },
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 100 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Accordion);
