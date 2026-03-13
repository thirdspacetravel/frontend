import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

interface SlideshowProps {
  images: string[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextIndex = index + newDirection;
    if (nextIndex >= 0 && nextIndex < images.length) {
      setIndex([nextIndex, newDirection]);
    }
  };

  return (
    <div className="framer-slideshow">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="slide-image"
        />
      </AnimatePresence>
      {index != 0 && (
        <button className="nav-btn prev" onClick={() => paginate(-1)}>
          <ArrowLeftIcon />
        </button>
      )}
      {index != images.length - 1 && (
        <button className="nav-btn next" onClick={() => paginate(1)}>
          <ArrowRightIcon />
        </button>
      )}
    </div>
  );
};

export default Slideshow;
