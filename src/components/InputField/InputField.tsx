import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (input: React.FormEvent<HTMLFormElement>) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    inputRef.current?.blur();
    handleAdd(e);
  };

  return (
    // TODO: Add media query for width
    <form className="bg-red-300 w-1/4 mx-auto" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default InputField;
