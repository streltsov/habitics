import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Column } from "./components/Column";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { ToDoCard } from "./components/ToDoCard";
import { isToday, isTomorrow } from "date-fns";
import { useToDos } from "./hooks/useToDo";
import { useState } from "react";
import { Stack } from "@mui/material";

export function App() {
  const { toDos, createToDo } = useToDos();

  const points = toDos
    .filter(({ isDone }) => Boolean(isDone))
    .filter(({ dueDate }) => isToday(new Date(dueDate)))
    .reduce((a, b) => a + b.points, 0);

  return (
    <>
      <Box sx={{ margin: "8px", flexGrow: 1 }}>
        <Grid container xs={12} spacing={1}>
          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Backlog</Typography>
              <CreateToDoForm onCreateToDo={createToDo} />
              {toDos
                .filter(({ isDone }) => Boolean(!isDone))
                .filter(
                  ({ dueDate }) =>
                    !(
                      isToday(new Date(dueDate)) ||
                      isTomorrow(new Date(dueDate))
                    )
                )
                .map((todo) => (
                  <ToDoCard key={todo.id} toDo={todo} />
                ))}
            </Column>
          </Grid>

          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Tomorrow</Typography>
              {toDos
                .filter(({ isDone }) => Boolean(!isDone))
                .filter(({ dueDate }) => isTomorrow(new Date(dueDate)))
                .map((toDo) => (
                  <ToDoCard key={toDo.id} toDo={toDo} />
                ))}
            </Column>
          </Grid>
          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Today</Typography>
              {toDos
                .filter(({ isDone }) => Boolean(!isDone))
                .filter(({ dueDate }) => isToday(new Date(dueDate)))
                .map((toDo) => (
                  <ToDoCard key={toDo.id} toDo={toDo} />
                ))}
            </Column>
          </Grid>
          <Grid xs={3}>
            <Column>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Done</Typography>
                <Rating
                  value={points / 2}
                  precision={0.5}
                  size="large"
                  max={Math.ceil(points / 2)}
                />
              </Stack>
              {toDos
                .filter(({ isDone }) => Boolean(isDone))
                .filter(({ dueDate }) => isToday(new Date(dueDate)))
                .map((toDo) => (
                  <ToDoCard key={toDo.id} toDo={toDo} />
                ))}
            </Column>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
