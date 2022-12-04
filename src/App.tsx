import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Column } from "./components/Column";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { ToDoCard } from "./components/ToDoCard";
import { isToday, isTomorrow } from "date-fns";
import { useToDos } from "./hooks/useToDo";
import { Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  const { toDos, createToDo } = useToDos();

  const points = toDos
    .filter(({ isDone }) => Boolean(isDone))
    .filter(({ dueDate }) => isToday(new Date(dueDate)))
    .reduce((a, b) => a + b.points, 0);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flex: 1, width: "100%" }}>
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
      <CssBaseline />
    </ThemeProvider>
  );
}
