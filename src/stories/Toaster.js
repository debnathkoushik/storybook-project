import React, { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

import Toast from "./Toast";
import "./Toaster.css";

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
gsap.registerPlugin(Flip);

export default function Toaster({ label = "" }) {
  // store toasts received from a component
  const [toasts, setToasts] = useState([]);
  const MAXIMUM_NUMBER = 4;

  const toasterContainer = useRef(null);

  useEffect(() => {
    setToasts((prev) => [...prev, { label }]);
  }, [label]);

  // ensures only the newly added maximum number of items are only rendered
  function toBeDisplayed(index) {
    if (
      toasts.length > MAXIMUM_NUMBER &&
      toasts.length - MAXIMUM_NUMBER >= index
    ) {
      return false;
    }

    return true;
  }

  // ensures Toast does not gets called when the length of toasts has not changed
  const renderedToasts = useMemo(() => {
    return toasts.map(({ label }, index) => (
      <Toast
        key={index + 1}
        index={index + 1}
        label={label}
        totalToasts={toasts.length}
        toBeDisplayed={toBeDisplayed(index + 1)}
      />
    ));
  }, [toasts]);

  return (
    <ol className="toaster" ref={toasterContainer}>
      {renderedToasts}
    </ol>
  );
}
