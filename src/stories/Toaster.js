import React, { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

import Toast from "./Toast";
import "./Toaster.css";
// import "./Toast.css";

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
gsap.registerPlugin(Flip);

export default function Toaster({ label = "" }) {
  // store toasts received from a component
  const [toasts, setToasts] = useState([]);
  const toasterContainer = useRef(null);

  // scope ensures GSAP animations are applied correctly
  // const { contextSafe } = useGSAP(
  //   // () => {
  //   //   toasterContainer.addEventListener("mouseenter", () => {
  //   //     console.log("hovered");
  //   //   });
  //   //   // const toastsList = gsap.utils.toArray(".toast");
  //   //   // console.log("toasts: ", toastsList);
  //   //   // toastsList.forEach((toast) => {
  //   //   //   toast.addEventListener("mouseenter", () => {
  //   //   //     const state = Flip.getState(toast);
  //   //   //     gsap.set(toast, {
  //   //   //       position: "static",
  //   //   //       // clearProps: "top,right,bottom,left,transform",
  //   //   //     });
  //   //   //     Flip.from(state, {
  //   //   //       duration: 0.25,
  //   //   //       ease: "power2.out",
  //   //   //       absolute: false,
  //   //   //     });
  //   //   //   });
  //   //   //   // toast.addEventListener("mouseleave", () => {
  //   //   //   //   const state = Flip.getState(toast);
  //   //   //   //   gsap.set(toast, {
  //   //   //   //     position: "absolute",
  //   //   //   //     right: 16,
  //   //   //   //     bottom: 16,
  //   //   //   //   });
  //   //   //   //   Flip.from(state, {
  //   //   //   //     duration: 0.25,
  //   //   //   //     ease: "power2.out",
  //   //   //   //     absolute: true,
  //   //   //   //   });
  //   //   //   // });
  //   //   // });
  //   //   // const toastsList = document.querySelector(".toaster");
  //   //   // console.log("toasts: ", toastsList);
  //   // },
  //   {
  //     scope: toasterContainer,
  //     // dependencies: [toasts],
  //     revertOnUpdate: true,
  //   },
  // );

  // const handleMouseEnter = contextSafe(() => {
  //   // const state = Flip.getState(toasterContainer);
  //   // console.log("state: ", state);
  //   // gsap.set(toast, {
  //   //   position: "static",
  //   //   // clearProps: "top,right,bottom,left,transform",
  //   // });
  //   // Flip.from(state, {
  //   //   duration: 0.25,
  //   //   ease: "power2.out",
  //   //   absolute: false,
  //   // });
  // });

  useEffect(() => {
    setToasts((prev) => [...prev, { label }]);
  }, [label]);

  // ensures Toast does not gets called when the length of toasts has not changed
  const renderedToasts = useMemo(() => {
    return toasts.map(({ label }, index) => (
      <Toast
        key={index + 1}
        index={index + 1}
        label={label}
        totalToasts={toasts.length}
      />
    ));
  }, [toasts.length]);

  return (
    <ol
      className="toaster"
      ref={toasterContainer}
      // onMouseEnter={handleMouseEnter}
    >
      {renderedToasts}
    </ol>
  );
}
