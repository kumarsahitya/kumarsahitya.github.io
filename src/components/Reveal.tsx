import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMotionAllowed } from '../hooks/useMotionAllowed';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
};

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const motionAllowed = useMotionAllowed();

  if (!motionAllowed) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </MotionTag>
  );
}
