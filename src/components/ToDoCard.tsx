import { useState, PropsWithChildren, MouseEvent } from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Tags } from "../components/Tags";
import { ToDoType } from "../types";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { endOfToday, endOfTomorrow } from "date-fns";

interface ToDoCardProps extends Omit<ToDoType, "subToDos"> {
  onUpdateToDo: (data: Partial<ToDoType>) => Promise<any>;
  onDeleteToDo: () => Promise<any>;
}

export const ToDoCard = ({
  onUpdateToDo,
  onDeleteToDo,
  children,
  ...todo
}: PropsWithChildren<ToDoCardProps>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (_: any, isChecked: boolean) => {
    onUpdateToDo({ isDone: isChecked });
  };

  const handleDeleteToDo = onDeleteToDo;

  const handleTodayMenuItemClick = () => {
    onUpdateToDo({ dueDate: endOfToday() });
  };

  const handleTomorrowMenuItemClick = () => {
    onUpdateToDo({ dueDate: endOfTomorrow() });
  };

  const handleUnsetMenuItemClick = () => {
    // $unset?
    onUpdateToDo({ dueDate: undefined });
  };

  return (
    <Card>
      <Box display="flex" alignItems="center">
        <Checkbox checked={todo.isDone} onChange={handleCheckboxChange} />
        <Typography noWrap variant="subtitle2">
          {todo.title}
        </Typography>
        <IconButton
          sx={{ marginLeft: "auto" }}
          color="primary"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Paper sx={{ width: 320 }}>
          <MenuList>
            <MenuItem onClick={handleTodayMenuItemClick}>
              <ListItemText>Today</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleTomorrowMenuItemClick}>
              <ListItemText>Tomorrow</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleUnsetMenuItemClick}>
              <ListItemText>Unset</ListItemText>
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleDeleteToDo}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>

      <CardContent>{children}</CardContent>

      <Tags tags={todo.tags} />
    </Card>
  );
};
