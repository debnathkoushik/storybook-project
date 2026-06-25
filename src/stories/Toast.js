import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Toast.css";

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

export default function Toast({ index, label = "", totalToasts }) {
  const toastContainer = useRef(null);

  const calculatedTranslateY = `${(totalToasts - index) * -14}px`;
  const calculatedOffset = `${(totalToasts - index) * 6}px`;

  console.log(`${index} out of ${totalToasts}`);

  // scope ensures GSAP animations are applied correctly
  useGSAP(
    () => {
      console.log(
        `translateY for ${index} out of ${totalToasts}:`,
        `${(totalToasts - index) * -14}px`,
      );
      gsap.fromTo(
        toastContainer.current,
        {
          opacity: 0,
          filter: "blur(2px)",
          y: "100%",
          right: 0,
          left: 0,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          right: 0,
          left: 0,
          duration: 0.4,
          ease: "power1.out",
        },
      );
    },
    {
      scope: toastContainer,
      revertOnUpdate: true,
    },
  );

  //recalculates the y, the left and the right offsets for previously mounted toasts
  useGSAP(
    () => {
      gsap.to(toastContainer.current, {
        y: calculatedTranslateY,
        right: calculatedOffset,
        left: calculatedOffset,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    {
      scope: toastContainer,
      dependencies: [calculatedTranslateY, calculatedOffset],
    },
  );

  return (
    <li
      className="toast"
      data-id={`toast-${index}`}
      key={index}
      ref={toastContainer}
    >
      {label + index}
    </li>
  );
}
