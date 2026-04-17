import { motion } from 'framer-motion';
import './SectionTitle.css';

function SectionTitle({
  as = 'h2',
  children,
  className = '',
  align = 'left',
}) {
  const MotionTag = motion[as];
  const classes = `section-title section-title--${align}${className ? ` ${className}` : ''}`;

  return (
    <MotionTag
      className={classes}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}

export default SectionTitle;
