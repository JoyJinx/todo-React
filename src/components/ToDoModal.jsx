import { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { Stack, TextField, Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../features/todoSlice";
import { v4 as uuid } from "uuid";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";

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
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  bgcolor: "#e3e1f1",
  border: "none",
  borderRadius: "12px",
  boxShadow: "12px 18px 8px rgb(0,0,0, 0.2)",
  padding: "1rem 1.5rem ",
};

export default function ToDoModal({ type, modal, setModal, todo }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const matches = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (type === "update" && todo) {
      setText(todo.text);
    } else {
      setText("");
    }
  }, [type, todo, modal]);

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

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -40,
    left: 0,
    right: 0,
    margin: "0 auto",
    width: "6.6rem",
    height: "6.6rem",
  });

  const mobileAppBar = () => {
    return (
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          height: "6.4rem",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <Toolbar>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon sx={{ fontSize: "3rem" }} />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    );
  };
  return (
    <div>
      <Tooltip title={type === "add" ? "" : "Edit Task"} arrow>
        <div className="clickBtn" onClick={handleOpen}>
          {type === "add" ? (
            matches ? (
              mobileAppBar()
            ) : (
              <button className="addBtn">
                <AddIcon sx={{ color: "ghostwhite" }} fontSize="large" />
              </button>
            )
          ) : (
            <EditOutlinedIcon />
          )}
        </div>
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
              {type === "add" ? "Add a" : "Edit"} ToDo
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                autoFocus
                fullWidth
                value={text}
                onChange={handleChange}
                margin="dense"
              />
              <Stack sx={{ mt: 2 }} spacing={1.4} direction="row">
                <Button type="submit" color="info" variant="contained">
                  Submit
                </Button>
                <Button
                  type="button"
                  color="info"
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
