import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import ToDoItem from "./ToDoItem";
import { useState, useEffect } from "react";
import ToDoModal from "./ToDoModal";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@mui/material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -50,
  left: 800,
  right: 0,
  margin: "auto auto",
});

export default function AppNavBar() {
  const [open, setOpen] = useState(false);
  const todoList = useSelector((state) => state.todos.todoList);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container">
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ p: 2, pb: 0 }}
      >
        Todos
      </Typography>
      <motion.div variants={container} initial="hidden" animate="visible">
        <Paper elevation={7} square={true} sx={{ mb: "50px" }}>
          <AnimatePresence>
            {todoList && todoList.length > 0 ? (
              todoList.map((todo) => (
                <motion.div key={todo.id} variants={child}>
                  <ToDoItem key={todo.id} item={todo} />
                </motion.div>
              ))
            ) : (
              <motion.p variants={child}>Nothing to do!</motion.p>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
      {/* <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}> */}
      <Toolbar>
        <StyledFab color="secondary" aria-label="add">
          <ToDoModal type="add" modal={open} setModal={setOpen} />
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
      {/* </AppBar> */}
    </div>
  );
}
