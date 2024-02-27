import React, { useRef, useState } from "react";

interface Props {
  todo: string;
  handleSave: (newTodo: string) => void;
}

const EditTodo: React.FC<Props> = (props) => {
  const { todo, handleSave } = props;
  const [newTodo, setNewTodo] = useState(todo);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("e.", e.key);
    if (e.key === "Enter") {
      console.log("triggered");

      handleSave(newTodo);
    }
  };

  return (
    <input
      type="text"
      value={newTodo}
      onKeyDown={handleKeyDown}
      onChange={(e) => setNewTodo(e.target.value)}
    />
  );
};

export default EditTodo;
