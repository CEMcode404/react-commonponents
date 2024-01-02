import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

import styles from "./carousel.module.css";

type CarouselDirection = "LEFT" | "RIGHT";
type CarouselWidths = {
  content: undefined | number;
  container: undefined | number;
};

interface CarouselProps extends PropsWithChildren {
  blurEdges?: boolean;
  direction?: CarouselDirection;
  gap?: string;
  speed?: string;
  width?: string;
}

export const Carousel: FC<CarouselProps> = ({
  blurEdges = true,
  children,
  direction = "LEFT",
  gap = "1rem",
  speed = "7s",
  width = "100%",
}) => {
  document.documentElement.style.setProperty("--carousel-gap", gap);
  document.documentElement.style.setProperty("--carousel-speed", speed);
  document.documentElement.style.setProperty("--carousel-width", width);
  document.documentElement.style.setProperty(
    "--carousel-direction",
    direction === "LEFT" ? "none" : "reverse"
  );

  const carouselRef = useRef<null | HTMLDivElement>(null);
  const contentCarouselRef = useRef<null | HTMLDivElement>(null);
  const [carouselWidths, setCarouselWidths] = useState<CarouselWidths>({
    content: undefined,
    container: undefined,
  });
  const [isDuplicateHidden, setIsDuplicateHidden] = useState(true);
  const timeOutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const children = contentCarouselRef.current?.children;

    if (children) {
      injectAttributeTo(children, "data-carousel-item", "true");

      if (!isDuplicateHidden)
        injectAriaHiddenToDuplicates(children, children.length / 2);
    }
  }, [children, isDuplicateHidden]);

  useEffect(() => {
    const targetElement = contentCarouselRef.current as Element;
    const observer = new ResizeObserver(updateCarouselWidths);
    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
      observer.disconnect();
    };
  }, [isDuplicateHidden]);

  useEffect(() => {
    window.addEventListener("resize", updateCarouselWidths);

    return () => {
      window.removeEventListener("resize", updateCarouselWidths);
    };
  }, [isDuplicateHidden]);

  function updateCarouselWidths() {
    clearTimeout(timeOutIdRef.current);

    timeOutIdRef.current = setTimeout(() => {
      const content = contentCarouselRef.current?.scrollWidth as number;
      const container = carouselRef.current?.offsetWidth;

      isDuplicateHidden
        ? setCarouselWidths({
            content,
            container,
          })
        : setCarouselWidths({
            content: content / 2,
            container,
          });
    }, 1000);
  }

  useEffect(() => {
    const isContainerGreaterThanContent =
      (carouselWidths.container as number) > (carouselWidths.content as number);

    setIsDuplicateHidden(isContainerGreaterThanContent);
    contentCarouselRef.current?.setAttribute(
      "data-carousel-scroll",
      (!isContainerGreaterThanContent).toString()
    );
  }, [carouselWidths]);

  return (
    <div
      className={`${styles.carousel}`}
      data-carousel-blur-edge={blurEdges}
      ref={carouselRef}
    >
      <div
        className={styles["carousel__contents-wrapper"]}
        data-carousel-scroll={false}
        ref={contentCarouselRef}
      >
        {children}
        {!isDuplicateHidden && children}
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

function injectAriaHiddenToDuplicates(
  children: HTMLCollection,
  noOfDuplicates: number
) {
  for (let i = noOfDuplicates; i < children.length; i++)
    children[i].setAttribute("aria-hidden", "true");
}
