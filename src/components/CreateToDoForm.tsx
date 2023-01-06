import { useState, FC, FormEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  getEndOfToday,
  getEndOfTomorrow,
  getEndOfThisWeek,
  getEndOfNextWeek,
  getMaxDate,
} from "../helpers/date";
import { CreateToDoType } from "../hooks/useToDo";

export const dueDateMap: Record<string, () => string> = {
  today: getEndOfToday,
  tomorrow: getEndOfTomorrow,
  thisWeek: getEndOfThisWeek,
  nextWeek: getEndOfNextWeek,

  // Abbreviations
  tod: getEndOfToday,
  tom: getEndOfTomorrow,
  tw: getEndOfThisWeek,
  nw: getEndOfNextWeek,

  // Default
  undefined: getMaxDate,
};

const extractDueDate = (string: string): string =>
  string
    .split(" ")
    .filter((word) => word[0] == "@")
    .map((word) => word.slice(1))[0];

const extractTags = (string: string): string[] =>
  string
    .split(" ")
    .filter((word) => word[0] == "#")
    .map((word) => word.slice(1));

const extractTitle = (string: string): string =>
  string
    .split(" ")
    .filter((word) => word[0] != "#")
    .filter((word) => word[0] != "@")
    .join(" ");

type CreateToDoFormProps = {
  onCreateToDo: (task: CreateToDoType) => void;
};

export const CreateToDoForm: FC<CreateToDoFormProps> = ({ onCreateToDo }) => {
  const [title, setTitle] = useState("");

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(extractDueDate(title));
    onCreateToDo({
      title: extractTitle(title),
      dueDate: dueDateMap[extractDueDate(title)](),
      tags: extractTags(title),
    });
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
