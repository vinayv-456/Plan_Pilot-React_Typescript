import React, { useState } from "react";
import { Todo } from "../../models/model";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import "../styles.css";
import EditTodo from "../EditTodo/EditTodo";

interface Props {
  todoItem: Todo;
  handleSaveEdit: (newTodo: Todo) => void;
  handleDelete: (todo: Todo) => void;
  handleDone: (todo: Todo) => void;
}

const TodoItem: React.FC<Props> = (props) => {
  const { todoItem, handleSaveEdit, handleDelete, handleDone } = props;
  const { name, isDone } = todoItem;

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const handleSaveChange = (newTodo: string) => {
    handleSaveEdit({
      ...todoItem,
      name: newTodo,
    });
    setIsEdit(false);
  };

  const handleItemDelete = () => {
    handleDelete(todoItem);
  };

  const handleItemDone = () => {
    handleDone({ ...todoItem, isDone: !todoItem.isDone });
  };

  return (
    // TODO: Add media query for width
    <li className="bg-yellow-400 rounded-md flex-1 hover:scale-105 h-12 mx-auto my-2 flex items-center justify-between px-4">
      {!isEdit ? (
        <span>{name}</span>
      ) : (
        <EditTodo todo={name} handleSave={handleSaveChange} />
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
