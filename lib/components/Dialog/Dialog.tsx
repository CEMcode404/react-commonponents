import {
  DialogHTMLAttributes,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";

interface DialogProps
  extends DialogHTMLAttributes<HTMLDialogElement>,
    PropsWithChildren {
  backDropClickCallBack?: (e: React.MouseEvent<HTMLDialogElement>) => void;
  isOpen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDialogElement>) => void;
}

export const Dialog: FC<DialogProps> = ({
  backDropClickCallBack,
  children,
  isOpen = false,
  onClick,
  ...rest
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
      if (backDropClickCallBack) backDropClickCallBack(e);
    }
  }
  function handleOnClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (onClick) onClick(e);
    if (backDropClickCallBack) handleBackDropClickCallBack(e);
  }

  return (
    <dialog onClick={handleOnClick} ref={dialogRef} {...rest}>
      {children}
    </dialog>
  );
};
