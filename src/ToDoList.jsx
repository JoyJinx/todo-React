import List from "@mui/material/List";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ToDoForm from "./ToDoForm";

const toDos = [
  { id: uuid(), text: "listen to react course", finished: false },
  { id: uuid(), text: "going to the gym", finished: false },
  { id: uuid(), text: "doing the laundry", finished: false },
  { id: uuid(), text: "thinking about my mistakes", finished: true },
];

export default function ToDoList() {
  const [todos, setTodos] = useState(toDos);

  const removeToDo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((x) => x.id !== id);
    });
  };
  const toggleToDo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((x) => {
        if (x.id === id) return { ...x, finished: !x.finished };
        else return x;
      });
    });
  };

  const addToDo = (text) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), text: text, finished: false }];
    });
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 480, bgcolor: "background.paper" }}
    >
      {todos.map((todo) => {
        return (
          <ToDoItem
            item={todo}
            key={todo.id}
            remove={() => removeToDo(todo.id)}
            toggle={() => toggleToDo(todo.id)}
          />
        );
      })}
      <ToDoForm add={addToDo} />
    </List>
  );
}
