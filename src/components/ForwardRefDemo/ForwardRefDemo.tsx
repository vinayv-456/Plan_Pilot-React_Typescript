import React, { useRef } from "react";
import FancyInput, { Ref } from "./FancyInput";

function ForwardRefDemo() {
  const inputRef = useRef<Ref>(null);
  const handleFocus = () => {
    inputRef.current?.handleFocus();
  };
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </>
  );
}

export default ForwardRefDemo;
