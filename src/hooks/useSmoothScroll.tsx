import { useLayoutEffect, useRef } from "react";

export const useSmoothScroll = () => {
  const scrollState = useRef({
    current: window.scrollY,
    target: window.scrollY,
    ease: 0.08,
    touchStartY: 0,
  });

  useLayoutEffect(() => {
    scrollState.current.target = window.scrollY;
    scrollState.current.current = window.scrollY;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    /* =========================
       WHEEL (mouse + trackpad)
    ========================== */
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Use actual deltaY (trackpads need this)
      scrollState.current.target += e.deltaY;

      // Clamp
      scrollState.current.target = Math.max(
        0,
        Math.min(scrollState.current.target, maxScroll()),
      );
    };
    let rafId: number;

    const animate = () => {
      const state = scrollState.current;
      const diff = state.target - state.current;

      if (Math.abs(diff) > 0.1) {
        state.current += diff * state.ease;
        window.scrollTo({
          top: state.current,
          behavior: "auto",
        });
      } else {
        state.current = state.target;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);
};
