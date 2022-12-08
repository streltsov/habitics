import { TextField, Card, Autocomplete, Button } from "@mui/material";
import { useState } from "react";
import { HabitDocType } from "../schema";

import { useHabit } from "../hooks/useHabit";

export const CreateHabitForm = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<HabitDocType["tags"]>([]);
  const { createHabit } = useHabit();

  const handleCreateHabit = () => {
    createHabit({ title, tags });
  };

  return (
    <Card sx={style}>
      <TextField
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        size="small"
        fullWidth
        label="Title"
      />
      <Autocomplete
        multiple
        freeSolo
        size="small"
        options={[]}
        onChange={(_, tags) => setTags(tags.flat())}
        renderInput={(params) => (
          <TextField label="Tags" variant="outlined" {...params} />
        )}
      />
      <Button onClick={handleCreateHabit}>Create a Habit!</Button>
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
