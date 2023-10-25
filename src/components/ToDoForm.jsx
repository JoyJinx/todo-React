import { InputAdornment, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { IconButton } from "@mui/material";

export default function ToDoForm({ add }) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    add(text);
    setText("");
  };
  return (
    <ListItem>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter new task"
          variant="outlined"
          value={text}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Create" type="submit" edge="end">
                  <AddCircleTwoToneIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </ListItem>
  );
}
