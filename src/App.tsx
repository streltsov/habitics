import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Column } from "./components/Column";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { ToDoCard } from "./components/ToDoCard";
import { isToday, isTomorrow } from "date-fns";
import { useToDos } from "./hooks/useToDo";
import { Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Button from "@mui/material/Button";
import { CreateHabitForm } from "./components/CreateHabitForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  const { toDos, createToDo } = useToDos();
  const [tab, setTab] = useState(1);
  const [isCreateHabitModalVisible, setIsCreateHabitModalVisible] =
    useState(false);

  return (
    <>
      <Box>
        <Tabs
          value={tab}
          onChange={(_, n) => setTab(n)}
          aria-label="basic tabs example"
        >
          <Tab label="ToDo's" />
          <Tab label="Habits" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={1}>
        <Button onClick={() => setIsCreateHabitModalVisible(true)}>
          Create a Habit
        </Button>
        <Modal
          open={isCreateHabitModalVisible}
          onClose={() => setIsCreateHabitModalVisible(false)}
        >
          <CreateHabitForm />
        </Modal>
      </TabPanel>

      <ThemeProvider theme={theme}>
        <TabPanel value={tab} index={0}>
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
        </TabPanel>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}
