import { MouseEvent, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}
function handleClick(e: MouseEvent<HTMLDivElement>) {
  e.stopPropagation();
}

export function Modal({ children, open, setOpen }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modal = modalRef.current;

  if (!modal) {
    console.warn('Modal ref is null');
  } else {
    setTimeout(() => {
      if (open) {
        modal.showModal();
      } else {
        modal.close();
      }
    });
  }

  return (
    <>
      {createPortal(
        <dialog ref={modalRef} className="m-auto bg-transparent" onClick={() => setOpen(false)}>
          <div className="max-h-8/10 overflow-auto rounded-md" onClick={handleClick}>
            {children}
          </div>
        </dialog>,
        document.body
      )}
    </>
  );
}
