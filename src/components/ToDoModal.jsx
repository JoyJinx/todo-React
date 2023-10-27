import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../features/todoSlice";
import { v4 as uuid } from "uuid";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ToDoModal({ type, modal, setModal, todo }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const add = (text) => {
    dispatch(
      addTodo({
        id: uuid(),
        text: text,
        time: format(new Date(), "p, MM/dd/yyyy"),
        finished: false,
      })
    );
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      toast.error("Please fill the void!");
      return;
    }
    if (text) {
      if (type === "add") {
        add(text);
        toast.success("Task added successfully.");
      }
      if (type === "update") {
        if (todo.text !== text) {
          dispatch(updateTodo({ ...todo, text }));
          toast.success("Task updated successfully.");
        } else {
          toast.error("You wanted to change...");
          return;
        }
      }
      setModal(false);
    }
  };

  return (
    <div>
      <Tooltip title={type === "add" ? "New Task" : "Edit Task"}>
        {type === "add" ? (
          <AddIcon onClick={handleOpen} />
        ) : (
          <EditIcon onClick={handleOpen} />
        )}
      </Tooltip>
      {console.log(type)}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={modal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              {type === "add" ? "Add" : "Edit"} a ToDo
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="Enter new task"
                variant="outlined"
                value={text}
                onChange={handleChange}
              />
              <Stack sx={{ mt: 2 }} spacing={1} direction="row">
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
                <Button
                  type="button"
                  color="primary"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
