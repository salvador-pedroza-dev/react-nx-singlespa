import { MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Modal({ children, open, setOpen }: Props) {
  if (open) {
    function handleClick(e: MouseEvent<HTMLDivElement>) {
      e.stopPropagation();
    }
    return (
      <>
        {createPortal(
          <>
            <div className="fixed w-full h-full bg-scrim opacity-40 top-0"></div>
            <dialog
              className="fixed w-full h-full bg-transparent top-0 flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <div
                className="max-h-8/10 overflow-auto rounded-md"
                onClick={handleClick}
              >
                {children}
              </div>
            </dialog>
          </>,
          document.body
        )}
      </>
    );
  } else {
    return null;
  }
}
