import { FC, PropsWithChildren, useEffect, useRef } from "react";

import arrowRight from "../../assets/arrow-right.webp";
import arrowLeft from "../../assets/arrow-left.webp";

import styles from "./slider.module.css";

interface SliderProps extends PropsWithChildren {
  className?: string;
  gap?: string;
  width?: string;
}

export const Slider: FC<SliderProps> = ({
  children,
  className = "",
  gap = "1rem",
  width = "100%",
}) => {
  const contentSliderRef = useRef<null | HTMLDivElement>(null);
  const sliderRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--slider-gap", gap);
      sliderRef.current.style.setProperty("--slider-width", width);
    }
  }, [gap, width]);

  useEffect(() => {
    if (contentSliderRef.current)
      injectAttributeTo(
        contentSliderRef.current.children,
        "data-slider-item",
        "true"
      );
  }, [children]);

  function scrollLeft() {
    const contentSliderElement = contentSliderRef.current;
    const width = contentSliderElement?.offsetWidth;

    if (width)
      contentSliderElement.scrollBy({ left: -width, behavior: "smooth" });
  }

  function scrollRight() {
    const contentSliderElement = contentSliderRef.current;
    const width = contentSliderElement?.offsetWidth;

    if (width)
      contentSliderElement.scrollBy({ left: width, behavior: "smooth" });
  }

  return (
    <div className={`${styles.slider} ${className}`} ref={sliderRef}>
      <div
        aria-label="previous button"
        className={styles["left-arrow-wrapper"]}
        onClick={scrollLeft}
      >
        <img alt="left arrow" className={styles.arrow} src={arrowLeft} />
      </div>
      <div className={styles["children-wrapper"]} ref={contentSliderRef}>
        {children}
      </div>
      <div
        aria-label="next button"
        className={styles["right-arrow-wrapper"]}
        onClick={scrollRight}
      >
        <img alt="right arrow" className={styles.arrow} src={arrowRight} />
      </div>
    </div>
  );
};

function injectAttributeTo(
  children: HTMLCollection,
  attributeName: string,
  value: string
) {
  for (const child of children) child.setAttribute(attributeName, value);
}
