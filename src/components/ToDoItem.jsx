import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, IconButton, ListItemIcon } from "@mui/material";
import { updateTodo, deleteTodo } from "../features/todoSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDoModal from "./ToDoModal";
import { useState } from "react";

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
    <ListItem
      secondaryAction={
        <div className="todoIcons">
          <IconButton
            edge="end"
            aria-label="Delete"
            onClick={() => handleDelete(item.id)}
          >
            <DeleteIcon sx={{ color: "Red" }} />
          </IconButton>

          <IconButton edge="end" aria-label="Edit" onClick={() => handleUpdate}>
            <ToDoModal
              type="update"
              modal={update}
              setModal={setUpdate}
              todo={item}
            />
          </IconButton>
        </div>
      }
      disablePadding
    >
      <ListItemButton onClick={() => handleToggle(item)}>
        <ListItemIcon>
          <Checkbox
            size="large"
            edge="start"
            checked={item.finished}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={item.text} secondary={item.time} />
      </ListItemButton>
    </ListItem>
  );
}
