import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import ToDoItem from "./ToDoItem";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import ToDoForm from "./ToDoForm";
import ToDoModal from "./ToDoModal";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return [];
  return data;
};

export default function AppNavBar() {
  const [todos, setTodos] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    <React.Fragment>
      <CssBaseline />
      <Paper elevation={7} square sx={{ pb: "50px", mb: "50px" }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          Todos
        </Typography>
        <List sx={{ mb: 2 }}>
          {todos.map((todo) => (
            <React.Fragment key={todo.id}>
              <ToDoItem
                item={todo}
                remove={() => removeToDo(todo.id)}
                toggle={() => toggleToDo(todo.id)}
              />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <StyledFab color="secondary" aria-label="add">
            {/* <AddIcon /> */}
            <ToDoModal />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <List
        dense
        sx={{ width: "100%", maxWidth: 480, bgcolor: "background.paper" }}
      >
        <ToDoForm add={addToDo} />
      </List>
    </React.Fragment>
  );
}
