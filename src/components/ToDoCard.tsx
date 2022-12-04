import { useState } from "react";
import { EditToDoCard } from "./EditToDoCard";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Tags } from "../components/Tags";
import { useToDo } from "../hooks/useToDo";
import { ToDoCardMenu } from "./ToDoCardMenu";
import { ToDoDocType } from "../schema";
import { SubToDos } from "./SubToDos";
import ReactMarkdown from "react-markdown";
import { Stack } from "@mui/material";

interface ToDoCardProps {
  toDo: ToDoDocType;
}

export const ToDoCard = ({ toDo }: ToDoCardProps) => {
  const [isEditToDoModalVisible, setIsEditToDoModalVisible] = useState(false);
  const { id, isDone, title, description, subToDos, tags } = toDo;
  const { setIsDone } = useToDo(id);

  return (
    <>
      <Card style={{ flex: "1 0 fit-content" }}>
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={isDone}
            onChange={(_, isChecked) => setIsDone(isChecked)}
          />
          <Typography
            onClick={() => setIsEditToDoModalVisible(true)}
            noWrap
            variant="subtitle2"
          >
            {title}
          </Typography>
          <ToDoCardMenu id={id} />
        </Box>

        {Boolean(description || subToDos.length) && (
          <CardContent sx={{ padding: "4px 16px" }}>
            {description && <ReactMarkdown>{description}</ReactMarkdown>}
            <SubToDos id={id} subToDos={subToDos} />
          </CardContent>
        )}

        <Stack flexDirection="row-reverse" padding={1}>
          <Tags tags={tags} />
        </Stack>
      </Card>
      <Modal
        open={isEditToDoModalVisible}
        onClose={() => setIsEditToDoModalVisible(false)}
      >
        <>
          <EditToDoCard id={id} />
        </>
      </Modal>
    </>
  );
};
