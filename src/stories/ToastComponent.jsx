import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import Toaster from "./Toaster";

export function ToastComponent() {
  const [label, setLabel] = useState([]);

  const createToastLabel = () => {
    setLabel(["This is a toast message."]);
  };

  return (
    <div className="show-toast">
      <Button label="Render Toast" onClick={createToastLabel} />
      {label.map((item) => (
        <Toaster label={label} />
      ))}
    </div>
  );
}
