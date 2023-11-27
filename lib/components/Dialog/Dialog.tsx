import { FC, PropsWithChildren, ReactNode, useEffect, useRef } from "react";

type DialogProps = PropsWithChildren<{
  backDropClickCallBack?: () => void;
  children: ReactNode | ReactNode[];
  className?: string;
  isOpen: boolean;
  style?: object;
}>;

export const Dialog: FC<DialogProps> = ({
  backDropClickCallBack,
  children,
  className,
  isOpen = false,
  style = {},
}) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isOpen]);

  function handleBackDropClickCallBack(e: React.MouseEvent<HTMLDialogElement>) {
    const dialogElement = dialogRef.current;
    const dialogDimensions = dialogElement?.getBoundingClientRect();
    if (
      dialogDimensions &&
      (e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom ||
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right)
    ) {
      if (backDropClickCallBack) backDropClickCallBack();
    }
  }

  return (
    <dialog
      className={className}
      ref={dialogRef}
      onClick={handleBackDropClickCallBack}
      style={style}
    >
      {children}
    </dialog>
  );
};
