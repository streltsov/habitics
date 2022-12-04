import { useState, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import {
  DragDropContext,
  DraggableRubric,
  DropResult,
} from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ToDoDocType } from "../schema";
import { useToDos, useToDo } from "../hooks/useToDo";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Autocomplete from "@mui/material/Autocomplete";
import { reorderList } from "../utils";

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
    setSubToDos,
    setPriority,
    setTags,
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

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(Number(event.target.value));
  };

  const handleDeleteSubToDo = (id: string) => {
    setSubToDos(subToDos.filter((subToDo) => subToDo.id != id));
  };

  const handleDragEnd = (drop: DropResult) => {
    if (!drop.destination) {
      return;
    }

    const { destination, source } = drop;
    const toIndex = destination.index;
    const fromIndex = source.index;

    if (toIndex === fromIndex) {
      return;
    }

    setSubToDos(reorderList(subToDos, fromIndex, toIndex));
  };

  return (
    <Card sx={style}>
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
      <Box mb={2}>
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

      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={String(toDo.priority || 1)}
            label="Age"
            onChange={handlePriorityChange}
          >
            <MenuItem value={1}>Urgent, Important</MenuItem>
            <MenuItem value={2}>Not Urgent, Important</MenuItem>
            <MenuItem value={3}>Urgent, Not Important</MenuItem>
            <MenuItem value={4}>Not Urgent, Not Important</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="droppable-1"
          renderClone={(provided, _, rubric: DraggableRubric) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {subToDos[rubric.source.index].title}
            </div>
          )}
        >
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {subToDos.map((subToDo, idx) => (
                <Draggable
                  key={subToDo.id}
                  draggableId={subToDo.id as string}
                  index={idx}
                >
                  {(provided) => (
                    <Box
                      sx={{ transform: "none" }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      display="flex"
                      alignItems="center"
                      justifyItems="space-between"
                    >
                      <Checkbox
                        size="small"
                        sx={{ padding: "2px 4px " }}
                        checked={subToDo.isDone}
                        onChange={(_, isDone) => setSubToDoIsDone(idx)(isDone)}
                      />
                      <Typography noWrap variant="subtitle2">
                        {subToDo.title}
                      </Typography>
                      <ClearIcon
                        sx={{ marginLeft: "auto" }}
                        onClick={() =>
                          handleDeleteSubToDo(subToDo.id as string)
                        }
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Box mt={2}>
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
