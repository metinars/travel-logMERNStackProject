import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import classes from './Modal.module.css';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className={classes.modal}
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
