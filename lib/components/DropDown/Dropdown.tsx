import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

import style from "./dropdown.module.css";

interface DropdownProps extends PropsWithChildren {
  className?: string;
  isHidden?: boolean;
  minHeight?: string;
  transitionSpeed?: number;
}

export const Dropdown: FC<DropdownProps> = ({
  children,
  className = "",
  isHidden = true,
  minHeight = "0",
  transitionSpeed = 1000,
}) => {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState<number | string>(
    isHidden ? minHeight : "auto"
  );

  useEffect(() => {
    setHeight(contentsRef.current?.scrollHeight as number);
  }, [children]);

  useEffect(() => {
    // Give the container height proper numerical value to allow
    //transition animation to happen. "auto" prevent transition animation
    if (contentsRef.current) setHeight(contentsRef.current.scrollHeight);
  }, [isHidden]);

  useEffect(() => {
    if (height === contentsRef.current?.scrollHeight && isHidden)
      setHeight(minHeight);
  }, [height, isHidden]);

  // Set the container to auto at the end of transition after opening to
  // have a responsive container
  function handleTransitionEnd() {
    if (!isHidden) setHeight("auto");
  }

  useEffect(() => {
    window.addEventListener("resize", handleViewportResize);

    return () => window.removeEventListener("resize", handleViewportResize);
  }, [isHidden]);

  function handleViewportResize() {
    isHidden ? setHeight(minHeight) : setHeight("auto");
  }

  return (
    <div
      className={`${style["dropdown__contents-container"]} ${className}`}
      ref={containerRef}
      onTransitionEnd={handleTransitionEnd}
      style={{
        height,
        transition: `height ${transitionSpeed / 1000}s`,
        minHeight,
      }}
    >
      <div className={style.dropdown__contents} ref={contentsRef}>
        {children}
      </div>
    </div>
  );
};
