import { FC, PropsWithChildren, useEffect, useRef } from "react";

import arrowRight from "../../assets/arrow-right.webp";
import arrowLeft from "../../assets/arrow-left.webp";

import styles from "./slider.module.css";

interface SliderProps extends PropsWithChildren {
  gap?: string;
}

export const Slider: FC<SliderProps> = ({ children, gap = "1rem" }) => {
  const contentSliderRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (contentSliderRef.current)
      contentSliderRef.current.style.setProperty("--slider-gap", gap);
  }, [gap]);

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
    <div className={`slider ${styles.slider}`}>
      <div
        aria-label="previous button"
        className={styles["slider__left-arrow-wrapper"]}
        onClick={scrollLeft}
      >
        <img
          alt="left arrow"
          className={styles["slider__arrow"]}
          src={arrowLeft}
        />
      </div>
      <div
        className={styles["slider__contents-wrapper"]}
        ref={contentSliderRef}
      >
        {children}
      </div>
      <div
        aria-label="next button"
        className={styles["slider__right-arrow-wrapper"]}
        onClick={scrollRight}
      >
        <img
          alt="right arrow"
          className={styles["slider__arrow"]}
          src={arrowRight}
        />
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
