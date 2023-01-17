import { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { HabitDocType } from "../schema";
import { useHabit } from "../hooks/useHabit";

type HabitCardMenuProps = Pick<HabitDocType, "id">;

export const HabitCardMenu = ({ id }: HabitCardMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { archiveHabit } = useHabit();

  const handleArchiveHabit = () => {
    archiveHabit(id);
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
            <MenuItem onClick={handleArchiveHabit}>
              <ListItemText>Archive</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </>
  );
};
