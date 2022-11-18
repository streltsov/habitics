import { useEffect } from "react";
import { Column } from "./components/Column";
import { get } from "./database";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import { CreateToDoForm } from "./components/CreateToDoForm";
import { ToDoCard } from "./components/ToDoCard";
import { ToDoType, IdType, SubToDoType } from "./types";
import { isToday, isTomorrow } from "date-fns";
import Typography from "@mui/material/Typography";
import { SubToDos } from "./components/SubToDos";

function App() {
  const [todos, setTodos] = useState<ToDoType[]>([]);

  useEffect(() => {
    (async () => {
      const db = await get();
      db.todos.find().$.subscribe(setTodos);
    })();
  }, []);

  const createTask = async ({
    title,
    tags,
  }: Pick<ToDoType, "title" | "tags">) => {
    const timestamp = String(Date.now());
    const initialData = {
      id: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const db = await get();
    return db.todos.insert({ title, tags, ...initialData });
  };

  const handleUpdateToDo =
    ({ id }: IdType) =>
    async (data: Partial<ToDoType>) => {
      const db = await get();
      const document = db.todos.findOne({ selector: { id } });
      return document.update({ $set: data });
    };

  const handleDeleteToDo =
    ({ id }: IdType) =>
    async () => {
      const db = await get();
      const document = db.todos.findOne({ selector: { id } });
      return document.remove();
    };

  const handleCreateSubToDo =
    ({ id }: IdType) =>
    async (subToDo: SubToDoType) => {
      const db = await get();
      const document = await db.todos.findOne({ selector: { id } });
      return document.update({ $push: { subToDos: subToDo } });
    };

  const handleUpdateSubToDo = async ({
    idx,
    ...subToDo
  }: Partial<SubToDoType> & { idx: number }) => {
    const db = await get();
    const document = await db.todos.findOne({
      selector: { subToDos: { $elemMatch: { id: subToDo.id } } },
    });

    console.log(idx);

    document.update({
      // Hack, because positional operator .$. doesn't work
      // $set: { ["subToDos.1.isDone"]: subToDo.isDone },
      $set: { ["subToDos." + idx + ".isDone"]: subToDo.isDone },
    });
  };

  return (
    <>
      <Box sx={{ margin: "8px", flexGrow: 1 }}>
        <Grid container xs={12} spacing={1}>
          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Backlog</Typography>
              <CreateToDoForm onCreateToDo={createTask} />
              {todos
                .filter(({ isDone }) => Boolean(!isDone))
                .filter(
                  ({ dueDate }) =>
                    !(
                      isToday(new Date(dueDate)) ||
                      isTomorrow(new Date(dueDate))
                    )
                )
                .map((todo) => (
                  <ToDoCard
                    onUpdateToDo={handleUpdateToDo({ id: todo.id })}
                    onDeleteToDo={handleDeleteToDo({ id: todo.id })}
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isDone={todo.isDone}
                    tags={todo.tags}
                    createdAt={todo.createdAt}
                    updatedAt={todo.updatedAt}
                    dueDate={todo.dueDate}
                  >
                    <SubToDos
                      subToDos={todo.subToDos}
                      onCreateSubToDo={handleCreateSubToDo({ id: todo.id })}
                      onUpdateSubToDo={handleUpdateSubToDo}
                    />
                  </ToDoCard>
                ))}
            </Column>
          </Grid>
          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Tomorrow</Typography>
              {todos
                .filter(({ isDone }) => Boolean(!isDone))
                .filter(({ dueDate }) => isTomorrow(new Date(dueDate)))
                .map((todo) => (
                  <ToDoCard
                    onUpdateToDo={handleUpdateToDo({ id: todo.id })}
                    onDeleteToDo={handleDeleteToDo({ id: todo.id })}
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isDone={todo.isDone}
                    tags={todo.tags}
                    createdAt={todo.createdAt}
                    updatedAt={todo.updatedAt}
                    dueDate={todo.dueDate}
                  >
                    <SubToDos
                      subToDos={todo.subToDos}
                      onCreateSubToDo={handleCreateSubToDo({ id: todo.id })}
                      onUpdateSubToDo={handleUpdateSubToDo}
                    />
                  </ToDoCard>
                ))}
            </Column>
          </Grid>
          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Today</Typography>
              {todos
                .filter(({ isDone }) => Boolean(!isDone))
                .filter(({ dueDate }) => isToday(new Date(dueDate)))
                .map((todo) => (
                  <ToDoCard
                    onUpdateToDo={handleUpdateToDo({ id: todo.id })}
                    onDeleteToDo={handleDeleteToDo({ id: todo.id })}
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isDone={todo.isDone}
                    tags={todo.tags}
                    createdAt={todo.createdAt}
                    updatedAt={todo.updatedAt}
                    dueDate={todo.dueDate}
                  >
                    <SubToDos
                      subToDos={todo.subToDos}
                      onCreateSubToDo={handleCreateSubToDo({ id: todo.id })}
                      onUpdateSubToDo={handleUpdateSubToDo}
                    />
                  </ToDoCard>
                ))}
            </Column>
          </Grid>
          <Grid xs={3}>
            <Column>
              <Typography variant="h6">Done</Typography>
              {todos
                .filter(({ isDone }) => Boolean(isDone))
                .filter(({ dueDate }) => isToday(new Date(dueDate)))
                .map((todo) => (
                  <ToDoCard
                    onUpdateToDo={handleUpdateToDo({ id: todo.id })}
                    onDeleteToDo={handleDeleteToDo({ id: todo.id })}
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isDone={todo.isDone}
                    tags={todo.tags}
                    createdAt={todo.createdAt}
                    updatedAt={todo.updatedAt}
                    dueDate={todo.dueDate}
                  >
                    <SubToDos
                      subToDos={todo.subToDos}
                      onCreateSubToDo={handleCreateSubToDo({ id: todo.id })}
                      onUpdateSubToDo={handleUpdateSubToDo}
                    />
                  </ToDoCard>
                ))}
            </Column>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
