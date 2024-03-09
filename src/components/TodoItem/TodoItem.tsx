import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/model";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import "../styles.css";

interface Props {
  todoItem: Todo;
  handleSaveEdit: (newTodo: Todo) => void;
  handleDelete: (todo: Todo) => void;
  handleDone: (todo: Todo) => void;
}

const TodoItem: React.FC<Props> = (props) => {
  const { todoItem, handleSaveEdit, handleDelete, handleDone } = props;
  const { name } = todoItem;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit({
        ...todoItem,
        name: newTodo,
      });
      setIsEdit(false);
    }
  };

  const handleItemDelete = () => {
    handleDelete(todoItem);
  };

  const handleItemDone = () => {
    handleDone({ ...todoItem, isDone: !todoItem.isDone });
  };
  const [newTodo, setNewTodo] = useState(todoItem.name);
  return (
    // TODO: Add media query for width
    <li className="bg-yellow-400 rounded-md flex-1 hover:scale-105 h-12 mx-auto my-2 flex items-center justify-between px-4">
      {!isEdit ? (
        <span style={{ display: !isEdit ? "block" : "none" }}>{name}</span>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={newTodo}
          onKeyDown={handleKeyDown}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      )}
      <div className="w-1/3 flex justify-between">
        <span className="icon" onClick={handleEdit}>
          <MdOutlineEdit title="edit" size={25} />
        </span>
        <span className="icon" onClick={handleItemDelete}>
          <MdDeleteOutline title="delete" size={25} />
        </span>
        <span className="icon" onClick={handleItemDone}>
          <MdDone title="done" size={25} />
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
