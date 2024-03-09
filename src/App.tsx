import React, { useMemo, useRef, useState } from "react";
import { Todo } from "./models/model";
import InputField from "./components/InputField/InputField";
import TodoItem from "./components/TodoItem/TodoItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
// import ForwardRefDemo from "./components/ForwardRefDemo/ForwardRefDemo";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const completedTodos = useRef<Todo[]>([]);
  const incompletedTodos = useRef<Todo[]>([]);

  const groups = [
    { id: 122314, name: "Active Tasks", values: incompletedTodos },
    { id: 456721, name: "Completed Tasks", values: completedTodos },
  ];

  useMemo(() => {
    completedTodos.current = todos?.filter((e) => e.isDone);
    incompletedTodos.current = todos?.filter((e) => !e.isDone);
  }, [todos]);

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId: taskId } = result;
    // dropped into different list
    if (source.droppableId !== destination?.droppableId) {
      // toggle the isDone flag
      setTodos(
        todos.map((e) => {
          if (e.id.toString() === taskId) {
            return { ...e, isDone: !e.isDone };
          }
          return e;
        })
      );
    }
  };
  // const [test, setTest] = useState(true);
  // if (test) {
  //   return <ForwardRefDemo />;
  // }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col bg-blue-500 h-screen w-screen">
        <span className="mx-auto my-3 text-3xl font-medium text-slate-50">
          Plan Pilot
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <div className="w-1/2 flex flex-1 mx-auto">
          {groups.map(({ id, name, values }) => (
            <Droppable droppableId={id.toString()}>
              {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot
              ) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${
                    name === "Active Tasks" ? "bg-blue-400" : "bg-red-500"
                  } w-full flex-1 mx-1 px-2 pt-2`}
                >
                  <span className="text-xl text-white">{name}</span>
                  {values.current.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(
                        provided: DraggableProvided,
                        snapshot: DraggableStateSnapshot
                      ) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="w-full"
                        >
                          <TodoItem
                            key={item.id}
                            todoItem={item}
                            handleSaveEdit={handleSaveEdit}
                            handleDelete={handleDelete}
                            handleDone={handleDone}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
