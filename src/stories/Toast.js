import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Toast.css";

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

export default function Toast({ index, label = "" }) {
  const toastContainer = useRef(null);

  // scope ensures GSAP animations are applied correctly
  useGSAP(
    () => {
      gsap.fromTo(
        toastContainer.current,
        {
          opacity: 0,
          filter: "blur(2px)",
          translateY: "100%",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          translateY: "0",
          duration: 0.4,
          ease: "power1.out",
        },
      );
    },
    { scope: toastContainer, revertOnUpdate: true },
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
