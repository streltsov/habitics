import { useState } from "react";
import {
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  Typography,
  CardHeader,
  CardActions,
} from "@mui/material";
import { Tags } from "./Tags";
import { Box } from "@mui/system";

export const Accumulator = () => {
  const [value, setValue] = useState(0);
  const handleSubmit = () => {
    setValue(0);
  };
  // <Typography variant="h6">Helluva title</Typography>
  return (
    <Card>
      <CardHeader title={"Comedy"} />
      <CardContent>
        <Stack>
          <TextField
            value={value}
            onChange={({ target }) => setValue(Number(target.value))}
            sx={{ marginBottom: "16px" }}
            label="Amount"
            type="number"
            variant="outlined"
          />
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Stack>
      </CardContent>

      <CardActions>
        <Box sx={{ marginLeft: "auto" }}>
          <Tags tags={["helluva", "tags"]} />
        </Box>
      </CardActions>
    </Card>
  );
};
