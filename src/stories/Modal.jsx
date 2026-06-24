import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Button } from "./Button";
import "./Modal.css";

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      gsap.killTweensOf(dialogRef.current);
      gsap.fromTo(
        dialogRef.current,
        {
          opacity: 0,
          scale: 0.95,
          filter: "blur(2px)",
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transformOrigin: "center center",
          duration: 0.15,
          ease: "power2.out",
        },
      );
    }
  }, [isOpen]);

  const close = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsClosing(false);
        setIsOpen(false);
      },
    });

    tl.to(
      dialogRef.current,
      {
        opacity: 0,
        scale: 0.95,
        filter: "blur(2px)",
        duration: 0.15,
        ease: "power2.in",
      },
      0,
    );

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.15,
        filter: "blur(2px)",
        ease: "power2.in",
      },
      0,
    );

    // if (!dialogRef.current || !overlayRef.current) return;
    // setIsClosing(true);
    // gsap.killTweensOf(dialogRef.current);
    // gsap.to(dialogRef.current, {
    //   opacity: 0,
    //   scale: 0.95,
    //   filter: "blur(2px)",
    //   transformOrigin: "center center",
    //   duration: 0.15,
    //   ease: "power2.out",
    //   // onComplete: () => {
    //   //   setIsClosing(false);
    //   //   setIsOpen(false);
    //   // },
    // });
    // gsap.killTweensOf(overlayRef.current);
    // gsap.to(overlayRef.current, {
    //   opacity: 0,
    //   duration: 0.15,
    //   ease: "power2.out",
    //   onComplete: () => {
    //     setIsClosing(false);
    //     setIsOpen(false);
    //   },
    // });
  };

  return (
    <>
      <Button label="Open" onClick={() => setIsOpen(true)}></Button>

      {(isOpen || isClosing) && (
        <div className="modal-dialog-overlay" ref={overlayRef} onClick={close}>
          <div
            className="modal-dialog"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Modal Title</h3>
            <p>The content for modal goes here.</p>

            <div className="modal-dialog-actions">
              <Button label="Cancel" onClick={close} />
              <Button primary label="Confirm" onClick={close} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
