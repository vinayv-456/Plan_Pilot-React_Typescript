import React, { useState } from "react";
import { Todo } from "./models/model";
import InputField from "./components/InputField/InputField";
import TodoItem from "./components/TodoItem/TodoItem";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [completedItems, setCompletedItems] = useState<Todo[]>([]);
  console.log("todos", todos);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), name: todo, isDone: false },
    ]);
    setTodo("");
  };

  const handleSaveEdit = ({ id, ...rest }: Todo) => {
    const newTodos = todos.map((e) => {
      if (e.id === id) {
        return { id, ...rest };
      }
      return e;
    });
    setTodos(newTodos);
  };

  const handleDelete = ({ id }: Todo) => {
    setTodos(todos.filter((e) => e.id !== id));
  };

  const handleDone = ({ id, ...rest }: Todo) => {
    const newTodos = todos.map((e) => {
      if (e.id === id) {
        return { id: id, ...rest };
      }
      return e;
    });
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col bg-blue-500 h-screen w-screen">
      <span className="mx-auto my-3 text-3xl font-medium text-slate-50">
        Plan Pilot
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {todos.map((e) => (
        <>
          {!e.isDone && (
            <TodoItem
              key={e.id}
              todoItem={e}
              handleSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
          )}
        </>
      ))}
      <hr></hr>
      {todos.map((e) => (
        <>
          {e.isDone && (
            <TodoItem
              key={e.id}
              todoItem={e}
              handleSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
              handleDone={handleDone}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default App;
