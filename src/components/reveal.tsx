"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useInView, useMotionValue, useReducedMotion } from "framer-motion";

const elements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  header: motion.header,
  footer: motion.footer,
};

type RevealProps = {
  as?: keyof typeof elements;
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  delay?: number;
  onMount?: boolean;
};

/** Reveal once, keeping the server-rendered content visible before hydration. */
export function Reveal({ as = "div", children, delay = 0, onMount = false, ...props }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimationControls();
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const inView = useInView(ref, { once: true, amount: 0.12, margin: "0px 0px -32px 0px" });
  const reducedMotion = useReducedMotion();
  const Element = elements[as];

  useEffect(() => {
    controls.set(reducedMotion ? "visible" : "hidden");
    return () => controls.stop();
  }, [controls, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      controls.set("visible");
    } else if (onMount || inView) {
      void controls.start("visible");
    }
  }, [controls, inView, onMount, reducedMotion]);

  return (
    <Element
      {...props}
      ref={(element) => { ref.current = element; }}
      data-reveal
      style={{ opacity, y }}
      initial={false}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Element>
  );
}
