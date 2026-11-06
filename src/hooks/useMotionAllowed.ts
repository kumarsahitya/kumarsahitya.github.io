import { useReducedMotion } from 'motion/react';

export function useMotionAllowed(): boolean {
  return !useReducedMotion();
}
