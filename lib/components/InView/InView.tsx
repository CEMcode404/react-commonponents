import { ReactNode, useEffect, useRef, useState } from "react";
import { FC } from "react";

interface ChildrenParam {
  inView: boolean | undefined;
  entry: IntersectionObserverEntry | undefined;
}

interface InViewProps {
  children: (childrenParam: ChildrenParam) => ReactNode;
  className?: string;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const InView: FC<InViewProps> = ({
  children,
  className = "",
  root,
  rootMargin,
  threshold = 1,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [childrenParam, setChildrenParam] = useState<ChildrenParam>({
    inView: undefined,
    entry: undefined,
  });

  useEffect(() => {
    const targetElement = ref.current;

    const observer = new IntersectionObserver(
      (entries, _observer) => {
        entries.forEach((entry) => {
          setChildrenParam({
            inView: entry.isIntersecting,
            entry: entry,
          });
        });
      },
      { root, rootMargin, threshold }
    );
    observer.observe(targetElement as Element);

    return () => {
      observer.unobserve(targetElement as Element);
      observer.disconnect();
    };
  }, []);

  // put the ref in the wrapper div to have a stable element to observe which
  // prevents flickering cause by transform or any position altering css prop

  return (
    <div className={className} ref={ref}>
      {children(childrenParam)}
    </div>
  );
};
