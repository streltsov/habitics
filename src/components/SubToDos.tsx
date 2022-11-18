import { FormEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { SubToDoType } from "../types";

interface SubToDosProps {
  subToDos: SubToDoType[];
  onCreateSubToDo: (subToDo: SubToDoType) => void;
  onUpdateSubToDo: (subToDo: Partial<SubToDoType> & { idx: number }) => void;
}

export const SubToDos = ({
  subToDos,
  onCreateSubToDo,
  onUpdateSubToDo,
}: SubToDosProps) => {
  const [title, setTitle] = useState("");

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const timestamp = Date.now();
    onCreateSubToDo({ id: String(timestamp), isDone: false, title });
  };

  const handleCheckboxChange =
    (idx: number) =>
    ({ id }: { id: string }) =>
    (_: any, isChecked: boolean) => {
      onUpdateSubToDo({ idx, id, isDone: isChecked });
    };

  return (
    <>
      {subToDos.map((subToDo, idx) => {
        return (
          <Box key={subToDo.id} display="flex" alignItems="center">
            <Checkbox
              size="small"
              checked={subToDo.isDone}
              onChange={handleCheckboxChange(idx)({ id: subToDo.id })}
            />
            <Typography noWrap variant="subtitle2">
              {subToDo.title}
            </Typography>
          </Box>
        );
      })}
      <form onSubmit={handleFormSubmit}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </form>
    </>
  );
};
