import { useState, FC, FormEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
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
    <Card sx={{ flex: "1 0 fit-content" }}>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            value={title}
            placeholder="Go to a grocery #routine @today"
            onChange={({ target }) => setTitle(target.value)}
          />
        </CardContent>
      </form>
    </Card>
  );
};
