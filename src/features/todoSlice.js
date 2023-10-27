import { createSlice } from "@reduxjs/toolkit";

const getInitialData = () => {
  const localTodos = window.localStorage.getItem("todos");

  if (localTodos) {
    return JSON.parse(localTodos);
  }
  window.localStorage.setItem("todos", []);
  return [];
};

const initialValue = {
  todoList: getInitialData(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.unshift(action.payload);
      const todos = window.localStorage.getItem("todos");
      if (todos) {
        const todosArr = JSON.parse(todos);
        todosArr.unshift({
          ...action.payload,
        });
        window.localStorage.setItem("todos", JSON.stringify(todosArr));
      } else {
        window.localStorage.setItem(
          "todos",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateTodo: (state, action) => {
      const todos = window.localStorage.getItem("todos");
      if (todos) {
        const todosArr = JSON.parse(todos);
        todosArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.text = action.payload.text;
            todo.finished = action.payload.finished;
          }
        });
        window.localStorage.setItem("todos", JSON.stringify(todosArr));
        state.todoList = [...todosArr];
      }
    },
    deleteTodo: (state, action) => {
      const todos = window.localStorage.getItem("todos");
      if (todos) {
        const todosArr = JSON.parse(todos);
        const newTodos = todosArr.filter((todo) => todo.id !== action.payload);
        window.localStorage.setItem("todos", JSON.stringify(newTodos));
        state.todoList = newTodos;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
