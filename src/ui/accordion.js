import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { css } from 'emotion';

const Accordion = ({ visible, children, ...rest }) => {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          {...rest}
          className={css`
            overflow: hidden;
          `}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { height: 'auto' },
            collapsed: { height: 0 },
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
