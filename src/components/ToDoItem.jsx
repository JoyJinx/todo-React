import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, IconButton, ListItemIcon } from "@mui/material";

export default function ToDoItem({ item, remove, toggle }) {
  const labelId = `checkbox-list-label-${item.id}`;
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="Delete" onClick={remove}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton onClick={toggle}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.finished}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
}
