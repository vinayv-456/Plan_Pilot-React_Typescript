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

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const completedTodos = useRef<Todo[]>([]);
  const incompletedTodos = useRef<Todo[]>([]);

  const groups = [
    { id: 1234, name: "pending", values: completedTodos },
    { id: 4567, name: "completed", values: incompletedTodos },
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
    const { source, destination } = result;
    console.log("source, destination", source, destination);
    // dropped outside the list
    if (!destination) {
      return;
    }

    // same
    // if (source.droppableId === destination.droppableId) {
    //   const items = reorder(
    //     this.getList(source.droppableId),
    //     source.index,
    //     destination.index
    //   );

    //   let state = { items };

    //   if (source.droppableId === "droppable2") {
    //     state = { selected: items };
    //   }

    //   this.setState(state);
    // } else {
    //   const result = move(
    //     this.getList(source.droppableId),
    //     this.getList(destination.droppableId),
    //     source,
    //     destination
    //   );

    //   this.setState({
    //     items: result.droppable,
    //     selected: result.droppable2,
    //   });
    // }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col bg-blue-500 h-screen w-screen">
        <span className="mx-auto my-3 text-3xl font-medium text-slate-50">
          Plan Pilot
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <hr></hr>
        {groups.map(({ id, name, values }) => (
          <Droppable droppableId={id.toString()}>
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
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
    </DragDropContext>
  );
};

export default App;
