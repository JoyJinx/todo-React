import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Checkbox, Tooltip } from "@mui/material";
import { updateTodo, deleteTodo } from "../features/todoSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDoModal from "./ToDoModal";

export default function ToDoItem({ item }) {
  const [update, setUpdate] = useState(false);
  const labelId = `checkbox-list-label-${item.id}`;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
    toast.success("Todo Deleted Successfully");
  };
  const handleToggle = () => {
    dispatch(updateTodo({ ...item, finished: item.finished ? false : true }));
  };
  const handleUpdate = () => {
    setUpdate(true);
  };
  return (
    <ListItem sx={{ paddingRight: "0" }} className="todoItem">
      <Checkbox
        onClick={() => handleToggle(item)}
        id={labelId}
        size="large"
        edge="start"
        checked={item.finished}
        tabIndex={-1}
        disableRipple
        inputProps={{ "aria-labelledby": labelId }}
      />

      <ListItemText
        sx={{
          width: "100%",
          textAlign: "start",
          unicodeBidi: "plaintext",
          height: "auto",
        }}
        id="todoText"
        className={item.finished ? "checkedText--finished" : "checkedText"}
        primary={item.text}
        secondary={item.time}
      />

      <div className="todoIcons">
        <div className="todoicon">
          <Tooltip title="delete task" arrow>
            <DeleteForever
              sx={{ color: "crimson" }}
              onClick={() => handleDelete(item.id)}
            />
          </Tooltip>
        </div>

        <div className="todoicon" onClick={() => handleUpdate}>
          <ToDoModal
            type="update"
            modal={update}
            setModal={setUpdate}
            todo={item}
          />
        </div>
      </div>
    </ListItem>
  );
}
