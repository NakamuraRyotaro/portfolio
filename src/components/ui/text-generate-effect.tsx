"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export default function TextGenerateEffect({
  words,
  className,
  delay = 0,
}: {
  words: string;
  className?: string;
  delay?: number;
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.6, delay: stagger(0.12, { startDelay: delay }) },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={scope} className={cn("inline", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="inline-block opacity-0"
          style={{ filter: "blur(8px)" }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
