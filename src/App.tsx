import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Column } from "./components/Column";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { ToDoCard } from "./components/ToDoCard";
import { isToday, isTomorrow } from "date-fns";
import { useToDos } from "./hooks/useToDo";

export function App() {
  const { toDos, createToDo } = useToDos();

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
              <Typography variant="h6">Done</Typography>
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
