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

interface ToDoCardProps {
  toDo: ToDoDocType;
}

export const ToDoCard = ({ toDo }: ToDoCardProps) => {
  const [isEditToDoModalVisible, setIsEditToDoModalVisible] = useState(false);
  const { id, isDone, title, description, subToDos, tags } = toDo;
  const { setIsDone } = useToDo(id);

  return (
    <>
      <Card>
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

        <CardContent>
          {description && (
            <Typography variant="body2">{description}</Typography>
          )}
          <SubToDos id={id} subToDos={subToDos} />
        </CardContent>

        <Tags tags={tags} />
      </Card>
      <Modal
        open={isEditToDoModalVisible}
        onClose={() => setIsEditToDoModalVisible(false)}
      >
        <EditToDoCard id={id} />
      </Modal>
    </>
  );
};
