import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { SubToDoType } from "../schema";
import { useToDo } from "../hooks/useToDo";

interface SubToDosProps {
  subToDos: SubToDoType[];
  id: string;
}

export const SubToDos = ({ subToDos, id }: SubToDosProps) => {
  const { setSubToDoIsDone } = useToDo(id);

  return (
    <>
      {subToDos.map((subToDo, idx) => {
        return (
          <Box key={subToDo.id} display="flex" alignItems="center">
            <Checkbox
              sx={{ padding: "2px 4px " }}
              size="small"
              checked={subToDo.isDone}
              onChange={(_, isDone) => setSubToDoIsDone(idx)(isDone)}
            />
            <Typography
              sx={{ textDecoration: subToDo.isDone ? "line-through" : "none" }}
              variant="caption"
            >
              {subToDo.title}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};
