import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ToDoDocType } from "../schema";
import { useToDos, useToDo } from "../hooks/useToDo";

interface EditToDoCardProps {
  id: ToDoDocType["id"];
}

export const EditToDoCard = ({ id }: EditToDoCardProps) => {
  const toDo = useToDos().toDos.find((toDo) => toDo.id == id);
  const { setTitle, setDescription } = useToDo(id);

  if (!toDo) return null;

  const { isDone, title, description, subToDos, tags } = toDo;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Card sx={style}>
      <TextField
        fullWidth
        label="Title"
        variant="standard"
        defaultValue={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        defaultValue={description}
        variant="standard"
        onChange={(event) => setDescription(event.target.value)}
      />
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
