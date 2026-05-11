"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

type RevealDirection = "start" | "end" | "center";
type AnimateOn = "hover" | "click" | "view" | "inViewHover";
type ClickMode = "once" | "toggle";

type DecryptedTextProps = Omit<HTMLMotionProps<"span">, "children"> & {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: RevealDirection;
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: AnimateOn;
  clickMode?: ClickMode;
  startDelay?: number;
  revealInterval?: number;
};

const styles: Record<"wrapper" | "srOnly", CSSProperties> = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  startDelay = 0,
  revealInterval = 1,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click" && animateOn !== "view");
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");

  const containerRef = useRef<HTMLSpanElement>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAnimatedRef = useRef(false);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly ? Array.from(new Set(text.split(""))).filter((char) => char !== " ") : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (currentRevealed.has(index)) return originalText[index];
          return availableChars[Math.floor(Math.random() * availableChars.length)] ?? char;
        })
        .join("");
    },
    [availableChars],
  );

  const computeOrder = useCallback(
    (length: number) => {
      const order: number[] = [];
      if (length <= 0) return order;

      if (revealDirection === "start") {
        for (let i = 0; i < length; i++) order.push(i);
        return order;
      }

      if (revealDirection === "end") {
        for (let i = length - 1; i >= 0; i--) order.push(i);
        return order;
      }

      const middle = Math.floor(length / 2);
      let offset = 0;
      while (order.length < length) {
        const index = offset % 2 === 0 ? middle + offset / 2 : middle - Math.ceil(offset / 2);
        if (index >= 0 && index < length) order.push(index);
        offset++;
      }
      return order;
    },
    [revealDirection],
  );

  const fillAllIndices = useCallback(() => {
    const set = new Set<number>();
    for (let i = 0; i < text.length; i++) set.add(i);
    return set;
  }, [text]);

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const indices = Array.from(set);
    for (let i = 0; i < count && indices.length > 0; i++) {
      const index = Math.floor(Math.random() * indices.length);
      indices.splice(index, 1);
    }
    return new Set(indices);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set<number>();
    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
    }
    setRevealedIndices(new Set());
    setDirection("forward");
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
    }
    const allIndices = fillAllIndices();
    setRevealedIndices(allIndices);
    setDisplayText(shuffleText(text, allIndices));
    setDirection("reverse");
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      if (revealDirection === "end") return textLength - 1 - revealedSet.size;
      if (revealDirection === "center") {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
        if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) return nextIndex;
        for (let i = 0; i < textLength; i++) {
          if (!revealedSet.has(i)) return i;
        }
      }
      return revealedSet.size;
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((previousRevealed) => {
        if (sequential && direction === "forward") {
          if (previousRevealed.size < text.length) {
            currentIteration++;
            const nextRevealed = new Set(previousRevealed);
            if (currentIteration % revealInterval === 0) {
              const nextIndex = getNextIndex(previousRevealed);
              nextRevealed.add(nextIndex);
            }
            setDisplayText(shuffleText(text, nextRevealed));
            return nextRevealed;
          }

          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(true);
          return previousRevealed;
        }

        if (sequential && direction === "reverse") {
          if (pointerRef.current < orderRef.current.length) {
            const nextRevealed = new Set(previousRevealed);
            currentIteration++;
            if (currentIteration % revealInterval === 0) {
              const indexToRemove = orderRef.current[pointerRef.current++];
              if (typeof indexToRemove === "number") nextRevealed.delete(indexToRemove);
            }
            setDisplayText(shuffleText(text, nextRevealed));

            if (nextRevealed.size === 0) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
            }
            return nextRevealed;
          }

          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          return previousRevealed;
        }

        if (direction === "forward") {
          setDisplayText(shuffleText(text, previousRevealed));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return previousRevealed;
        }

        let currentSet = previousRevealed.size === 0 ? fillAllIndices() : previousRevealed;
        const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)));
        currentSet = removeRandomIndices(currentSet, removeCount);
        setDisplayText(shuffleText(text, currentSet));
        currentIteration++;
        if (currentSet.size === 0 || currentIteration >= maxIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          setDisplayText(shuffleText(text, new Set()));
          return new Set();
        }
        return currentSet;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, revealInterval, shuffleText, direction, fillAllIndices, removeRandomIndices]);

  const handleClick = () => {
    if (animateOn !== "click") return;

    if (clickMode === "once") {
      if (isDecrypted) return;
      triggerDecrypt();
      return;
    }

    if (isDecrypted) {
      triggerReverse();
    } else {
      triggerDecrypt();
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;

    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection("forward");
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection("forward");
  }, [text]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            startTimeoutRef.current = setTimeout(triggerDecrypt, startDelay);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, startDelay, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === "click" || animateOn === "view") {
      encryptInstantly();
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set());
    setDirection("forward");
  }, [animateOn, text, encryptInstantly]);

  const animateProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? {
          onMouseEnter: triggerHoverDecrypt,
          onMouseLeave: resetToPlainText,
        }
      : animateOn === "click"
        ? {
            onClick: handleClick,
          }
        : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...animateProps} {...props}>
      <span style={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || (!isAnimating && isDecrypted);

          return (
            <span key={`${char}-${index}`} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
