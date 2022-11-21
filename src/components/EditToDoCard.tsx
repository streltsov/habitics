import { useState, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ToDoDocType } from "../schema";
import { useToDos, useToDo } from "../hooks/useToDo";
import Rating from "@mui/material/Rating";

import Autocomplete from "@mui/material/Autocomplete";

interface EditToDoCardProps {
  id: ToDoDocType["id"];
}

export const EditToDoCard = ({ id }: EditToDoCardProps) => {
  const [newSubToDoTitle, setNewSubToDoTitle] = useState("");
  const toDo = useToDos().toDos.find((toDo) => toDo.id == id);
  const {
    setTitle,
    setDescription,
    createSubToDo,
    setSubToDoIsDone,
    setTags,
    setPoints,
  } = useToDo(id);

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
      <Box ml="auto" mb={1}>
        <Rating
          onChange={(_, points) => setPoints(points || 0)}
          defaultValue={toDo.points}
          size="large"
        />
      </Box>
      <Box mb={2}>
        <TextField
          size="small"
          fullWidth
          label="Title"
          variant="outlined"
          defaultValue={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Box>
      <Box mb={4}>
        <TextField
          fullWidth
          size="small"
          label="Description"
          multiline
          rows={3}
          defaultValue={description}
          variant="outlined"
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

      <Box>
        <form onSubmit={handleCreateSubToDo}>
          <TextField
            fullWidth
            name="title"
            size="small"
            variant="outlined"
            value={newSubToDoTitle}
            label="Add sub ToDo"
            onChange={(event) => setNewSubToDoTitle(event.target.value)}
          />
        </form>
      </Box>
      <Box mt={4}>
        <Autocomplete
          multiple
          freeSolo
          size="small"
          options={[]}
          defaultValue={toDo.tags}
          onChange={(_, tags) => setTags(tags.flat())}
          renderInput={(params) => (
            <TextField label="Tags" variant="outlined" {...params} />
          )}
        />
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
