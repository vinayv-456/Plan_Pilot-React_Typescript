import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {}

export interface Ref {
  handleFocus: () => void;
}
const FancyInput = forwardRef<Ref, Props>((props, inputRef) => {
  const [val, setVal] = useState<string>("");
  const editInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(inputRef, () => ({
    handleFocus: () => {
      editInputRef.current?.focus();
    },
  }));
  return (
    <input
      className="border-solid border-2px border-black"
      ref={editInputRef}
      type="text"
      value={val}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target?.value);
      }}
    />
  );
});

export default FancyInput;
