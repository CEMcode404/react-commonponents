import { FC, PropsWithChildren, useEffect, useRef } from "react";

import arrowRight from "../../assets/arrow-right.webp";
import arrowLeft from "../../assets/arrow-left.webp";
import parse from "style-to-object";

import styles from "./slider.module.css";

type DefaultStyle = {
  flexGrow?: number;
  flexShrink?: number;
  marginRight?: number | string;
};

interface SliderProps extends PropsWithChildren {
  gap?: string;
}

export const Slider: FC<SliderProps> = ({ children, gap = "1rem" }) => {
  const contentSliderRef = useRef<null | HTMLDivElement>(null);
  // This defaultStyling can be overidden manually by putting style property directly to the element
  // you want to override
  const defaultStyle: DefaultStyle = {
    flexGrow: 0,
    flexShrink: 0,
    marginRight: gap,
  };

  // Injected the default style directly to the real dom instead of the virtual dom
  // to avoid the the issue of default style not applying if the
  // a functional component or its outer element doesn't contain style attribute
  useEffect(() => {
    if (contentSliderRef.current)
      injectDefaultStyleToDom(contentSliderRef.current.children, defaultStyle);
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

function injectDefaultStyleToDom(
  children: HTMLCollection,
  style: DefaultStyle
) {
  const lastChild = children.length - 1;

  for (let i = 0; i < children.length; i++) {
    const fetchedElementStyle = children[i].getAttribute("style") as string;

    // last element should have 0 right margin
    if (i === lastChild)
      children[i].setAttribute(
        "style",
        convertObjectToCssString(
          Object.assign(
            {},
            style,
            { marginRight: 0 },
            parse(fetchedElementStyle)
          )
        )
      );
    else
      children[i].setAttribute(
        "style",
        convertObjectToCssString(
          Object.assign({}, style, parse(fetchedElementStyle))
        )
      );
  }
}

function convertObjectToCssString(object: object) {
  return `${Object.entries(object)
    .map(
      ([key, value]) =>
        `${key
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()
          .trim()}: ${value}`
    )
    .join("; ")};`;
}
