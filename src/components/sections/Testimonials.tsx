import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle?: string;
}

interface TestimonialSliderProps {
  items: Testimonial[];
  autoPlayInterval?: number; // 4000 for 4 seconds
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  items,
  autoPlayInterval = 4000,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = Math.abs(page % items.length);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  // Automatic Sliding Logic
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [paginate, autoPlayInterval]);

  return (
    <section className="testimonial-slider">
      <div className="testimonial-slider__container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="testimonial-slider__slide"
          >
            <blockquote className="testimonial-slider__quote">
              “{items[activeIndex].quote}”
            </blockquote>
            <div className="testimonial-slider__author">
              <cite className="testimonial-slider__name">
                {items[activeIndex].authorName}
              </cite>
              <span className="testimonial-slider__title">
                {items[activeIndex].authorTitle}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          className="testimonial-slider__nav testimonial-slider__nav--prev"
          onClick={() => paginate(-1)}
        >
          <ArrowLeftIcon />
        </button>
        <button
          className="testimonial-slider__nav testimonial-slider__nav--next"
          onClick={() => paginate(1)}
        >
          <ArrowRightIcon />
        </button>

        {/* Dots Indicator */}
        <div className="testimonial-slider__dots">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
              className={`testimonial-slider__dot ${
                i === activeIndex ? "testimonial-slider__dot--active" : ""
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
