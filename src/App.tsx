import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Habit } from "./components/Habit";
import Grid from "@mui/material/Unstable_Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Column } from "./components/Column";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { ToDoCard } from "./components/ToDoCard";
import { format, isToday, isTomorrow } from "date-fns";
import { useToDos } from "./hooks/useToDo";
import { Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Button from "@mui/material/Button";
import { CreateHabitForm } from "./components/CreateHabitForm";
import { useHabit } from "./hooks/useHabit";
import AppBar from "@mui/material/AppBar";
import { get } from "./database";

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

  const { habits } = useHabit();

  const handleExportJson = async () => {
    const db = await get();
    const json = await db.exportJSON();
    const date = format(new Date(), "MM-dd-yyyy.H-m");

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = `db-snapshot-${date}.json`;
    a.click();
  };

  const handleUpload = async (event: any) => {
    const db = await get();
    printFile(event.target.files[0]);

    function printFile(file: any) {
      const reader = new FileReader();

      reader.onload = async function (evt) {
        const json = evt.target?.result;
        console.log("JSON: ", json);

        // await db.remove();
        db.importJSON(JSON.parse(json as string))
          .then(console.log)
          .catch(console.error);
      };
      reader.readAsText(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Tabs value={tab} onChange={(_, n) => setTab(n)}>
            <Tab label="ToDo's" />
            <Tab label="Habits" />
          </Tabs>
          <Box ml={2}>
            <CreateToDoForm onCreateToDo={createToDo} />
          </Box>
        </Toolbar>
      </AppBar>
      <TabPanel value={tab} index={1}>
        <Stack>
          <Button onClick={() => setIsCreateHabitModalVisible(true)}>
            Create a Habit
          </Button>
          <Button onClick={handleExportJson}>Export JSON</Button>
          <Button variant="contained" component="label">
            Import JSON
            <input hidden accept=".json" type="file" onChange={handleUpload} />
          </Button>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 2 }} justifyContent="center">
          {habits.map((habit) => (
            <Grid xs={12} sm={10} md={6} lg={4} xl={4} key={habit.id}>
              <Habit habit={habit} />
            </Grid>
          ))}
        </Grid>
        <Modal
          open={isCreateHabitModalVisible}
          onClose={() => setIsCreateHabitModalVisible(false)}
        >
          <>
            <CreateHabitForm />
          </>
        </Modal>
      </TabPanel>

      <TabPanel value={tab} index={0}>
        <Box sx={{ flex: 1, width: "100%" }}>
          <Grid container xs={12} spacing={1}>
            <Grid xs={3}>
              <Column>
                <Typography variant="h6">Backlog</Typography>
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
  );
}
