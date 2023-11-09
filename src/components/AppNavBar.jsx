import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
import ToDoModal from "./ToDoModal";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function AppNavBar() {
  const [open, setOpen] = useState(false);
  const todoList = useSelector((state) => state.todos.todoList);

  const finishedTodos = todoList.filter((todo) => todo.finished === true);
  const unfinishedTodos = todoList.filter((todo) => todo.finished === false);
  const orderedList = [...unfinishedTodos, ...finishedTodos];

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
        className="headerPage"
        variant="h3"
        gutterBottom
        component="div"
        sx={{ p: 2, pb: 0 }}
      >
        Todos
      </Typography>
      <motion.div
        className="backPaper"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <Paper className="paper" elevation={7}>
          <AnimatePresence>
            {todoList && todoList.length > 0 ? (
              orderedList.map((todo) => (
                <motion.div
                  key={todo.id}
                  variants={child}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 1 }}
                >
                  <ToDoItem item={todo} />
                </motion.div>
              ))
            ) : (
              <motion.p
                style={{
                  textAlign: "center",
                  paddingBottom: "0.75rem",
                }}
                variants={child}
              >
                Nothing to do!
              </motion.p>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
      <Toolbar>
        <ToDoModal type="add" modal={open} setModal={setOpen} />
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </div>
  );
}
