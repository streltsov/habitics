import { useState, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ToDoDocType } from "../schema";
import { useToDos, useToDo } from "../hooks/useToDo";

interface EditToDoCardProps {
  id: ToDoDocType["id"];
}

export const EditToDoCard = ({ id }: EditToDoCardProps) => {
  const [newSubToDoTitle, setNewSubToDoTitle] = useState("");
  const toDo = useToDos().toDos.find((toDo) => toDo.id == id);
  const { setTitle, setDescription, createSubToDo, setSubToDoIsDone } =
    useToDo(id);

  if (!toDo) return null;

  const { title, description, subToDos } = toDo;

  const handleCreateSubToDo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timestamp = Date.now();
    createSubToDo({
      id: String(timestamp),
      title: newSubToDoTitle,
      isDone: false,
    });
    setNewSubToDoTitle("");
  };

  return (
    <Card sx={style}>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Title"
          variant="standard"
          defaultValue={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          defaultValue={description}
          variant="standard"
          onChange={(event) => setDescription(event.target.value)}
        />
      </Box>

      {subToDos.map((subToDo, idx) => {
        return (
          <Box key={subToDo.id} display="flex" alignItems="center">
            <Checkbox
              size="small"
              checked={subToDo.isDone}
              onChange={(_, isDone) => setSubToDoIsDone(idx)(isDone)}
            />
            <Typography noWrap variant="subtitle2">
              {subToDo.title}
            </Typography>
          </Box>
        );
      })}

      <Box ml={1}>
        <form onSubmit={handleCreateSubToDo}>
          <TextField
            name="title"
            size="small"
            variant="standard"
            value={newSubToDoTitle}
            onChange={(event) => setNewSubToDoTitle(event.target.value)}
          />
        </form>
      </Box>
    </Card>
  );
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
