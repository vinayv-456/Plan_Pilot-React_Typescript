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
    <form
      className="relative flex items-center w-1/4 h-12 mx-auto mb-9"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full h-full rounded-2xl p-2"
        ref={inputRef}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-3 bg-blue-500 p-2 rounded-full"
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
