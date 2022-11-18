import { useState, FC, FormEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToDoType } from "../types";

const extractTags = (string: string) =>
  string
    .split(" ")
    .filter((word) => word[0] == "#")
    .map((word) => word.slice(1));

const extractTitle = (string: string) =>
  string
    .split(" ")
    .filter((word) => word[0] != "#")
    .join(" ");

type CreateToDoFormProps = {
  onCreateToDo: (task: Pick<ToDoType, "title" | "tags">) => void;
};

export const CreateToDoForm: FC<CreateToDoFormProps> = ({ onCreateToDo }) => {
  const [title, setTitle] = useState("");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateToDo({ title: extractTitle(title), tags: extractTags(title) });
    setTitle("");
  };

  return (
    <Card>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </CardContent>
        <CardActions>
          <Button sx={{ marginLeft: "auto" }} type="submit" size="small">
            Create Task
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
