import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMotionAllowed } from '../hooks/useMotionAllowed';

type TiltCardProps = { children: ReactNode; className?: string };

export function TiltCard({ children, className }: TiltCardProps) {
  const motionAllowed = useMotionAllowed();

  if (!motionAllowed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 800 }}
      whileHover={{ y: -4, rotateX: 4, rotateY: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
