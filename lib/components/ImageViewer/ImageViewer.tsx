import { FC, PropsWithChildren, useState } from "react";

import { Dialog } from "../Dialog/Dialog";

import arrowRight from "../../assets/arrow-right.webp";
import arrowLeft from "../../assets/arrow-left.webp";
import closeIcon from "../../assets/close-icon.webp";

import styles from "./imageViewer.module.css";

type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;
type ImageViewerArrow = HTMLDivElement;

interface ImageViewerProps extends PropsWithChildren {
  className?: string;
  crossOrigin?: CrossOrigin;
  imgSrcs: string[];
  isOpen?: boolean;
  onClose?: () => void;
}

export const ImageViewer: FC<ImageViewerProps> = ({
  className,
  crossOrigin = "anonymous",
  isOpen = false,
  imgSrcs,
  onClose: onCloseCallBack,
}) => {
  const firstImage = 0;
  const lastImage = imgSrcs?.length - 1;
  const [currentImage, setCurrentImage] = useState(firstImage);
  const isNoImageSrcs = !imgSrcs || !imgSrcs.length;

  function next(e: React.MouseEvent<ImageViewerArrow>) {
    e.stopPropagation();

    currentImage >= lastImage
      ? setCurrentImage(firstImage)
      : setCurrentImage(currentImage + 1);
  }

  function previous(e: React.MouseEvent<ImageViewerArrow>) {
    e.stopPropagation();

    currentImage <= firstImage
      ? setCurrentImage(lastImage)
      : setCurrentImage(currentImage - 1);
  }

  return (
    <Dialog className={`${styles.dialog} ${className}`} isOpen={isOpen}>
      {imgSrcs && (
        <div className={styles["image-viewer"]}>
          <div className={styles["prev-arrow"]}>
            <img
              alt="arrow-left"
              aria-label="previous button"
              className={styles.arrow}
              onClick={previous}
              src={arrowLeft}
            />
          </div>
          {imgSrcs.map((src, index) =>
            index === currentImage ? (
              <img
                alt=""
                className={styles.images}
                crossOrigin={crossOrigin}
                data-testid="image on display"
                key={index}
                src={src}
              />
            ) : null
          )}
          {isNoImageSrcs && (
            <p className={styles["error-message"]}>No image/s</p>
          )}
          <div className={styles["next-arrow"]}>
            <img
              alt="arrow-right"
              aria-label="next button"
              className={styles.arrow}
              onClick={next}
              src={arrowRight}
            />
          </div>
          <div
            aria-label="close button"
            className={styles["close-bttn-wrapper"]}
            onClick={onCloseCallBack}
          >
            <img
              alt="arrow-right"
              className={styles["close-bttn"]}
              src={closeIcon}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};
