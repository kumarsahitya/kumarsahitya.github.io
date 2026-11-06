import { useEffect, useState } from 'react';

type TypingOptions = { typeMs?: number; deleteMs?: number; holdMs?: number };

const SEP = '\u0000';

export function useTyping(
  words: string[],
  { typeMs = 80, deleteMs = 40, holdMs = 1500 }: TypingOptions = {},
): string {
  const [text, setText] = useState('');
  // Key on content so callers can pass an inline array without restarting the effect each render.
  const key = words.join(SEP);

  useEffect(() => {
    if (!key) return;
    const list = key.split(SEP);
    let wordIndex = 0;
    let length = 0;
    let phase: 'typing' | 'holding' | 'deleting' = 'typing';
    let timer: ReturnType<typeof setTimeout>;

    const schedule = (ms: number) => {
      timer = setTimeout(step, ms);
    };

    function step() {
      const word = list[wordIndex];
      if (phase === 'typing') {
        length += 1;
        setText(word.slice(0, length));
        if (length === word.length) {
          phase = 'holding';
          schedule(holdMs);
        } else {
          schedule(typeMs);
        }
      } else if (phase === 'holding') {
        phase = 'deleting';
        schedule(deleteMs);
      } else {
        length -= 1;
        setText(word.slice(0, length));
        if (length === 0) {
          wordIndex = (wordIndex + 1) % list.length;
          phase = 'typing';
          schedule(typeMs);
        } else {
          schedule(deleteMs);
        }
      }
    }

    schedule(typeMs);
    return () => clearTimeout(timer);
  }, [key, typeMs, deleteMs, holdMs]);

  return key ? text : '';
}
