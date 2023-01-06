import { useState, MouseEvent } from "react";
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
import { useToDo } from "../hooks/useToDo";
import { ToDoDocType } from "../schema";
import { endOfWeek, addWeeks, formatRFC3339 } from "date-fns";

type ToDoCardMenuProps = Pick<ToDoDocType, "id">;

export const ToDoCardMenu = ({ id }: ToDoCardMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setDueDate, unsetDueDate, deleteToDo } = useToDo(id);

  const handleTodayClick = () => {
    setDueDate(formatRFC3339(endOfToday()));
  };

  const handleTomorrowClick = () => {
    setDueDate(formatRFC3339(endOfTomorrow()));
  };

  const handleThisWeekClick = () => {
    setDueDate(formatRFC3339(endOfWeek(new Date())));
  };

  const handleNextWeekClick = () => {
    setDueDate(formatRFC3339(endOfWeek(addWeeks(new Date(), 1))));
  };

  return (
    <>
      <IconButton
        color="primary"
        sx={{ marginLeft: "auto" }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Paper sx={{ width: 320 }}>
          <MenuList>
            <MenuItem onClick={handleTodayClick}>
              <ListItemText>Today</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleTomorrowClick}>
              <ListItemText>Tomorrow</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleThisWeekClick}>
              <ListItemText>This Week</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleNextWeekClick}>
              <ListItemText>Next Week</ListItemText>
            </MenuItem>

            <MenuItem onClick={unsetDueDate}>
              <ListItemText>Unset</ListItemText>
            </MenuItem>
            <Divider />

            <MenuItem onClick={deleteToDo}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </>
  );
};
