import React, { useState } from "react";
import { Todo } from "./models/model";
import InputField from "./components/InputField/InputField";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  console.log("todos", todos);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => [...prev, { id: 1, name: todo, isDone: true }]);
    setTodo("");
  };

  return (
    <div className="flex flex-col bg-blue-500 h-screen w-screen">
      <span className="mx-auto my-3 text-3xl font-medium text-slate-50">
        Plan Pilot
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {todos.map((e) => (
        <span>{e.name}</span>
      ))}
    </div>
  );
};

export default App;
