import { useState, FC, FormEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { ToDoType } from "../types";

const extractTags = (string: string) =>
  string
    .split(" ")
    .filter((word) => word[0] == "#")
    .map((word) => word.slice(1));

const extractTitle = (string: string) =>
  string
    .split(" ")
    .filter((word) => word[0] != "#")
    .join(" ");

type CreateToDoFormProps = {
  onCreateToDo: (task: Pick<ToDoType, "title" | "tags">) => void;
};

export const CreateToDoForm: FC<CreateToDoFormProps> = ({ onCreateToDo }) => {
  const [title, setTitle] = useState("");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateToDo({ title: extractTitle(title), tags: extractTags(title) });
    setTitle("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Search>
        <StyledInputBase
          value={title}
          placeholder="Search/Create"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Search>
    </form>
  );
};

const Search = styled("div")(({ theme }) => ({
  "position": "relative",
  "borderRadius": theme.shape.borderRadius,
  "backgroundColor": alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "marginRight": theme.spacing(2),
  "marginLeft": 0,
  "width": "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "color": "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));
